/** Order the day, month, and year fields appear in for a locale's short date. */
type DateFieldOrder = 'dmy' | 'mdy' | 'ymd';

export interface DateParseContext {
  /** BCP 47 tag whose field order and month names the entry is read against. */
  locale: string;
  /** Long month names, January first, from the active locale bundle. */
  monthNames: readonly string[];
}

const ENGLISH_MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

// The century a bare two-digit year lands in, matching the ECMAScript window
const TWO_DIGIT_YEAR_PIVOT = 68;

/**
 * Reads a hand-typed date into a `Date`, accepting the shapes a user plausibly
 * types: ISO (`2026-04-15`, `20260415`), all-numeric in the locale's own field
 * order (`15/04/26`, `4.15.2026`), and month-name forms in any arrangement
 * (`15 Apr 2026`, `April 15, 2026`, `avril 15`). Returns `null` when the entry
 * is not a date or names a day the calendar does not have.
 *
 * Numeric entries follow `locale`'s field order, except where a value can only
 * be a day (over 12) or a year (four digits), which wins over the order so a
 * `15/04` typed into a month-first locale still lands on 15 April. A year left
 * off is taken as the current one.
 */
export function parseDateInput(text: string, context: DateParseContext): Date | null {
  const cleaned = normalize(text);
  if (!cleaned) {
    return null;
  }
  return (
    parseCompact(cleaned) ??
    parseNumeric(cleaned, fieldOrder(context.locale)) ??
    parseNamedMonth(cleaned, context)
  );
}

/**
 * Folds an entry down to lowercase ASCII digits and month names separated by
 * spaces, `-`, `/`, or `.`, dropping the ordinal suffixes, commas, and CJK date
 * markers that carry no information a parse needs.
 */
function normalize(text: string): string {
  return toAsciiDigits(text)
    .toLowerCase()
    .replace(/[,،、]/g, ' ')
    .replace(/[年月]/g, '/')
    .replace(/日/g, ' ')
    .replace(/(\d)(st|nd|rd|th)\b/g, '$1')
    .replace(/\s+/g, ' ')
    .replace(/^[\s/.-]+|[\s/.-]+$/g, '');
}

// Arabic-Indic, extended Arabic-Indic, and Devanagari digits, which the shipped
// ar and hi formats render and so a user editing a formatted value types back
function toAsciiDigits(text: string): string {
  return text.replace(/[٠-٩۰-۹०-९]/g, digit => {
    const code = digit.charCodeAt(0);
    const zero = code >= 0x0966 ? 0x0966 : code >= 0x06f0 ? 0x06f0 : 0x0660;
    return String(code - zero);
  });
}

/** Field order the locale writes a short date in, defaulting to day-first. */
function fieldOrder(locale: string): DateFieldOrder {
  try {
    const parts = new Intl.DateTimeFormat(locale, { dateStyle: 'short' }).formatToParts(
      new Date(2000, 0, 2),
    );
    const sequence = parts
      .filter(part => ['day', 'month', 'year'].includes(part.type))
      .map(part => part.type[0])
      .join('');
    if (sequence === 'dmy' || sequence === 'mdy' || sequence === 'ymd') {
      return sequence;
    }
  } catch {
    // Locales the runtime cannot format fall through to the most common order
  }
  return 'dmy';
}

/** `20260415`, the separator-free ISO form. */
function parseCompact(text: string): Date | null {
  const match = /^(\d{4})(\d{2})(\d{2})$/.exec(text);
  return match ? build(+match[1], +match[2], +match[3]) : null;
}

function parseNumeric(text: string, order: DateFieldOrder): Date | null {
  const parts = text.split(/[-/. ]+/);
  if (parts.length < 2 || parts.length > 3 || !parts.every(p => /^\d{1,4}$/.test(p))) {
    return null;
  }
  const numbers = parts.map(Number);
  const monthLeads = order !== 'dmy';

  if (parts.length === 2) {
    const [month, day] = monthLeads ? numbers : [numbers[1], numbers[0]];
    return buildOrdered(new Date().getFullYear(), month, day);
  }
  if (parts[0].length === 4) {
    return buildOrdered(numbers[0], numbers[1], numbers[2]);
  }
  if (order === 'ymd' && parts[2].length !== 4) {
    return buildOrdered(expandYear(numbers[0]), numbers[1], numbers[2]);
  }
  // Year trails whenever it is not the leading field, whatever the order says
  const [month, day] = order === 'mdy' ? numbers : [numbers[1], numbers[0]];
  return buildOrdered(expandYear(numbers[2]), month, day);
}

function parseNamedMonth(text: string, context: DateParseContext): Date | null {
  const tokens = text.split(/[\s./-]+/).filter(Boolean);
  const candidates = monthNameCandidates(context);

  let month = 0;
  let monthAt = -1;
  for (let index = 0; index < tokens.length && monthAt === -1; index++) {
    const matched = matchMonth(tokens[index], candidates);
    if (matched !== null) {
      month = matched + 1;
      monthAt = index;
    }
  }
  if (monthAt === -1) {
    return null;
  }

  // Anything else the entry carries (weekday names, the connectives long forms
  // string months together with) says nothing a date needs, so it is dropped
  const numbers = tokens.filter(
    (token, index) => index !== monthAt && /^\d{1,4}$/.test(token),
  );
  if (!numbers.length || numbers.length > 2) {
    return null;
  }
  if (numbers.length === 1) {
    return build(new Date().getFullYear(), month, +numbers[0]);
  }
  const yearTrails = numbers[0].length !== 4;
  const year = expandYear(yearTrails ? +numbers[1] : +numbers[0]);
  return build(year, month, yearTrails ? +numbers[0] : +numbers[1]);
}

/**
 * Month names an entry may use: the active bundle's own, whatever the runtime
 * formats for the locale, and English, which readers reach for regardless of
 * the interface language.
 */
function monthNameCandidates(context: DateParseContext): string[][] {
  const candidates = Array.from({ length: 12 }, (_, month) => [
    normalize(context.monthNames[month] ?? ''),
    ENGLISH_MONTHS[month],
    ENGLISH_MONTHS[month].slice(0, 3),
  ]);
  for (const style of ['long', 'short'] as const) {
    try {
      const formatter = new Intl.DateTimeFormat(context.locale, { month: style });
      for (let month = 0; month < 12; month++) {
        candidates[month].push(normalize(formatter.format(new Date(2000, month, 1))));
      }
    } catch {
      // Locales the runtime cannot format keep the bundle and English names
    }
  }
  return candidates;
}

/** Index of the month a token names, matching whole names and their stems. */
function matchMonth(token: string, candidates: string[][]): number | null {
  if (!token || /^\d+$/.test(token)) {
    return null;
  }
  for (let month = 0; month < candidates.length; month++) {
    const named = candidates[month].some(
      name =>
        name === token ||
        (name.length > token.length && token.length >= 3 && name.startsWith(token)),
    );
    if (named) {
      return month;
    }
  }
  return null;
}

/** Builds a date, first swapping a day and month that can only fit the other way. */
function buildOrdered(year: number, month: number, day: number): Date | null {
  return month > 12 && day <= 12 ? build(year, day, month) : build(year, month, day);
}

function expandYear(year: number): number {
  if (year > 99) {
    return year;
  }
  return year <= TWO_DIGIT_YEAR_PIVOT ? 2000 + year : 1900 + year;
}

/** Rejects out-of-range fields and the overflow a real calendar has no day for. */
function build(year: number, month: number, day: number): Date | null {
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }
  const date = new Date(year, month - 1, day);
  date.setFullYear(year);
  return date.getMonth() === month - 1 && date.getDate() === day ? date : null;
}
