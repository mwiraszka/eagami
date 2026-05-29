import { derivePalette } from './derive-palette';
import { formatViolations, validatePalette } from './validate-palette';

describe('validatePalette', () => {
  it('returns no violations for the library default brand base in both modes', () => {
    const palette = derivePalette({ primary: { base: '#3674a1' } });

    expect(validatePalette(palette)).toEqual([]);
  });

  it('flags a too-light overridden brand-text against the light canvas', () => {
    // Too-light shade-700 (textLight) makes brand-text fail 4.5:1 against white
    const palette = derivePalette({
      primary: { base: '#3674a1', overrides: { '700': '#a0c4e0' } },
    });

    const violations = validatePalette(palette);
    const textViolation = violations.find(
      v => v.token === '--color-brand-text' && v.mode === 'light',
    );

    expect(textViolation).toBeDefined();
    expect(textViolation!.ratio).toBeLessThan(4.5);
  });

  it('flags a too-dark overridden brand-text against the dark canvas', () => {
    // Too-dark shade-300 (textDark) makes brand-text fail 4.5:1 against near-black
    const palette = derivePalette({
      primary: { base: '#3674a1', overrides: { '300': '#1a1a1a' } },
    });

    const violations = validatePalette(palette);
    const textViolation = violations.find(
      v => v.token === '--color-brand-text' && v.mode === 'dark',
    );

    expect(textViolation).toBeDefined();
    expect(textViolation!.ratio).toBeLessThan(4.5);
  });

  it('flags a role remap that picks a too-light surface shade', () => {
    const palette = derivePalette({
      primary: { base: '#3674a1', roles: { surfaceLight: '200', surfaceDark: '200' } },
    });

    const violations = validatePalette(palette);
    const surfaceViolation = violations.find(
      v => v.token === '--color-brand-default' && v.role === 'text',
    );

    expect(surfaceViolation).toBeDefined();
  });

  it('formats violations with mode, token, value, ratio, and required bar', () => {
    const palette = derivePalette({
      primary: { base: '#3674a1', overrides: { '700': '#a0c4e0' } },
    });
    const violations = validatePalette(palette);

    const msg = formatViolations(violations);

    expect(msg).toContain('[light]');
    expect(msg).toContain('--color-brand-text');
    expect(msg).toContain('4.5:1');
    expect(msg).toContain('WCAG AA');
  });
});
