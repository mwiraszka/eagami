import { formatGroupedNumber } from './format-number';
import type { EagamiMessages } from './i18n.types';

type NumberFormat = EagamiMessages['numberFormat'];

// A locale tag no runtime has data for, so formatGroupedNumber always takes the
// manual bundle path, exercising the exact fallback a reduced-ICU browser hits.
const UNKNOWN = 'zz-Zzzz';

const EN: NumberFormat = { decimal: '.', group: ',', grouping: [3] };
const IS: NumberFormat = { decimal: ',', group: '.', grouping: [3] };
const HI: NumberFormat = { decimal: '.', group: ',', grouping: [3, 2] };

describe('formatGroupedNumber fallback (Intl lacks the locale)', () => {
  it('groups thousands with the locale separators', () => {
    expect(formatGroupedNumber(1234567, UNKNOWN, EN)).toBe('1,234,567');
    expect(formatGroupedNumber(1234567, UNKNOWN, IS)).toBe('1.234.567');
  });

  it('places the decimal mark for the locale', () => {
    expect(formatGroupedNumber(12345.6, UNKNOWN, IS)).toBe('12.345,6');
  });

  it('uses Indian lakh/crore grouping when the pattern is [3, 2]', () => {
    expect(formatGroupedNumber(1234567, UNKNOWN, HI)).toBe('12,34,567');
  });

  it('handles small numbers, negatives, and zero', () => {
    expect(formatGroupedNumber(42, UNKNOWN, EN)).toBe('42');
    expect(formatGroupedNumber(-98765.4, UNKNOWN, IS)).toBe('-98.765,4');
    expect(formatGroupedNumber(0, UNKNOWN, EN)).toBe('0');
  });

  it('delegates to Intl when the runtime does have the locale', () => {
    expect(formatGroupedNumber(1234567, 'en-US', EN)).toBe('1,234,567');
  });
});
