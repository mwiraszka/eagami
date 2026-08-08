import { en } from '../i18n/messages/en';
import { parseDateInput } from './parse-date';

const MONTHS = en.messages.datePicker.months;
const ENGLISH = { locale: 'en-GB', monthNames: MONTHS };
const AMERICAN = { locale: 'en-US', monthNames: MONTHS };

function parse(text: string, context = ENGLISH): Date | null {
  return parseDateInput(text, context);
}

describe('parseDateInput', () => {
  const target = new Date(2026, 3, 15);

  describe('ISO forms', () => {
    it('reads a dashed ISO date', () => {
      expect(parse('2026-04-15')).toEqual(target);
    });

    it('reads a slashed year-first date', () => {
      expect(parse('2026/04/15')).toEqual(target);
    });

    it('reads a separator-free ISO date', () => {
      expect(parse('20260415')).toEqual(target);
    });

    it('reads a year-first date regardless of the locale order', () => {
      expect(parse('2026-04-15', AMERICAN)).toEqual(target);
    });
  });

  describe('All-numeric forms', () => {
    it("follows a day-first locale's order", () => {
      expect(parse('15/04/2026')).toEqual(target);
      expect(parse('15.4.2026')).toEqual(target);
      expect(parse('15-4-26')).toEqual(target);
    });

    it("follows a month-first locale's order", () => {
      expect(parse('04/15/2026', AMERICAN)).toEqual(target);
      expect(parse('4/15/26', AMERICAN)).toEqual(target);
    });

    it('lets a value that can only be a day override the locale order', () => {
      expect(parse('15/04/2026', AMERICAN)).toEqual(target);
      expect(parse('04/15/2026')).toEqual(target);
    });

    it('takes the current year when none is given', () => {
      const year = new Date().getFullYear();

      expect(parse('15/04')).toEqual(new Date(year, 3, 15));
      expect(parse('4/15', AMERICAN)).toEqual(new Date(year, 3, 15));
    });

    it('splits a two-digit year across the century at 68', () => {
      expect(parse('15/04/68')!.getFullYear()).toBe(2068);
      expect(parse('15/04/69')!.getFullYear()).toBe(1969);
    });
  });

  describe('Month-name forms', () => {
    it('reads the month before or after the day', () => {
      expect(parse('15 April 2026')).toEqual(target);
      expect(parse('April 15, 2026')).toEqual(target);
    });

    it('reads an abbreviated month', () => {
      expect(parse('15 Apr 2026')).toEqual(target);
      expect(parse('Apr. 15 2026')).toEqual(target);
    });

    it('reads ordinal day suffixes', () => {
      expect(parse('April 15th, 2026')).toEqual(target);
    });

    it('takes the current year when none is given', () => {
      expect(parse('15 April')).toEqual(new Date(new Date().getFullYear(), 3, 15));
    });

    it('reads a month named in the locale rather than in English', () => {
      const french = { locale: 'fr-FR', monthNames: MONTHS };

      expect(parseDateInput('15 avril 2026', french)).toEqual(target);
    });

    it('ignores the connectives and weekday names a long form carries', () => {
      const spanish = { locale: 'es-ES', monthNames: MONTHS };

      expect(parseDateInput('15 de abril de 2026', spanish)).toEqual(target);
      expect(parse('Wed 15 April 2026')).toEqual(target);
    });

    it("reads a month named in the bundle's own language", () => {
      const polish = {
        locale: 'xx-unknown',
        monthNames: ['styczeń', 'luty', 'marzec', 'kwiecień'],
      };

      expect(parseDateInput('15 kwiecień 2026', polish)).toEqual(target);
    });
  });

  describe('Rejections', () => {
    it('rejects text that names no date', () => {
      expect(parse('')).toBeNull();
      expect(parse('whenever')).toBeNull();
      expect(parse('next tuesday')).toBeNull();
    });

    it('rejects a day the month does not have', () => {
      expect(parse('31/04/2026')).toBeNull();
      expect(parse('29/02/2026')).toBeNull();
    });

    it('accepts a leap day in a leap year', () => {
      expect(parse('29/02/2024')).toEqual(new Date(2024, 1, 29));
    });

    it('rejects an out-of-range month', () => {
      expect(parse('15/13/2026')).toBeNull();
    });

    it('rejects a lone number', () => {
      expect(parse('15')).toBeNull();
    });
  });

  describe('Non-ASCII entries', () => {
    it('reads Arabic-Indic digits', () => {
      expect(parse('١٥/٠٤/٢٠٢٦')).toEqual(target);
    });

    it('reads Devanagari digits', () => {
      expect(parse('१५/०४/२०२६')).toEqual(target);
    });

    it('reads a CJK-marked date', () => {
      const chinese = { locale: 'zh-CN', monthNames: MONTHS };

      expect(parseDateInput('2026年4月15日', chinese)).toEqual(target);
    });
  });
});
