import { derivePalette } from './derive-palette';
import { formatViolations, validatePalette } from './validate-palette';

describe('validatePalette', () => {
  it('returns no violations for the library default brand base', () => {
    // `#3674a1` is the library's hand-tuned `--color-primary-500`; the
    // derived `-700` (brand-text) and `-600` (brand-default) must clear
    // the WCAG bars against white.
    const palette = derivePalette({ primary: { base: '#3674a1' } });

    expect(validatePalette(palette)).toEqual([]);
  });

  it('flags a too-light overridden brand-text (text-on-white fails 4.5:1)', () => {
    // Consumer pins shade-700 to a too-light hex via `overrides`; the
    // brand-text role then fails the 4.5:1 body-text bar against white.
    const palette = derivePalette({
      primary: { base: '#3674a1', overrides: { '700': '#a0c4e0' } },
    });

    const violations = validatePalette(palette);
    const textViolation = violations.find(v => v.token === '--color-brand-text');

    expect(textViolation).toBeDefined();
    expect(textViolation!.ratio).toBeLessThan(4.5);
  });

  it('flags a role remap that picks a too-light shade for the surface', () => {
    // Consumer maps brand-default to shade-200, which is too light to
    // carry white text at the 4.5:1 bar.
    const palette = derivePalette({
      primary: { base: '#3674a1', roles: { surfaceLight: '200' } },
    });

    const violations = validatePalette(palette);
    const surfaceViolation = violations.find(v => v.token === '--color-brand-default');

    expect(surfaceViolation).toBeDefined();
  });

  it('formats violations with token, value, ratio, and required bar', () => {
    const palette = derivePalette({
      primary: { base: '#3674a1', overrides: { '700': '#a0c4e0' } },
    });
    const violations = validatePalette(palette);

    const msg = formatViolations(violations);

    expect(msg).toContain('--color-brand-text');
    expect(msg).toContain('4.5:1');
    expect(msg).toContain('WCAG AA');
  });
});
