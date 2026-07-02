import type { EagamiMessages } from './i18n.types';

type EagamiNumberFormat = EagamiMessages['numberFormat'];

/** Whether the runtime's `Intl` actually has number data for `locale` rather
 *  than silently negotiating down to a default (as reduced-ICU builds do). */
function intlLocalizes(locale: string): boolean {
  try {
    const resolved = new Intl.NumberFormat(locale).resolvedOptions().locale;
    return resolved.split('-')[0] === locale.split('-')[0];
  } catch {
    return false;
  }
}

function groupInteger(digits: string, sep: string, grouping: readonly number[]): string {
  const primary = grouping[0] ?? 3;
  const secondary = grouping[1] ?? primary;
  if (digits.length <= primary) {
    return digits;
  }
  let result = digits.slice(digits.length - primary);
  let rest = digits.slice(0, digits.length - primary);
  while (rest.length > 0) {
    const take = Math.min(secondary, rest.length);
    result = `${rest.slice(rest.length - take)}${sep}${result}`;
    rest = rest.slice(0, rest.length - take);
  }
  return result;
}

/**
 * Group-formats a number for the active locale. Uses the runtime's `Intl` when
 * it actually has data for `locale`; otherwise formats from the locale bundle's
 * numeric rules so grouping stays correct on browsers whose ICU lacks the
 * locale (some Chrome builds drop long-tail locales, e.g. Icelandic). The
 * manual fallback honours the locale's separators and grouping pattern, not
 * `Intl` rounding options, which is sufficient for the values these components
 * display.
 */
export function formatGroupedNumber(
  value: number,
  locale: string,
  format: EagamiNumberFormat,
  options?: Intl.NumberFormatOptions,
): string {
  if (intlLocalizes(locale)) {
    return value.toLocaleString(locale, options);
  }
  if (!isFinite(value)) {
    return String(value);
  }
  const magnitude = Math.abs(value).toString();
  // Scientific notation can't be digit-grouped meaningfully; leave it as-is
  if (magnitude.includes('e') || magnitude.includes('E')) {
    return value.toString();
  }
  const [intPart, fracPart] = magnitude.split('.');
  const grouped = groupInteger(intPart, format.group, format.grouping);
  const body = fracPart != null ? `${grouped}${format.decimal}${fracPart}` : grouped;
  return value < 0 ? `-${body}` : body;
}
