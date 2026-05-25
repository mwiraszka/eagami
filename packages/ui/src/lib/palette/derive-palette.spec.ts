import { contrastRatio } from './contrast';
import { derivePalette } from './derive-palette';

describe('derivePalette', () => {
  it('returns the full 10-shade scale plus brand role tokens for primary', () => {
    const out = derivePalette({ primary: { base: '#3674a1' } });

    expect(out).toHaveProperty('--color-primary-50');
    expect(out).toHaveProperty('--color-primary-500');
    expect(out).toHaveProperty('--color-primary-900');
    expect(out).toHaveProperty('--color-brand-default');
    expect(out).toHaveProperty('--color-brand-hover');
    expect(out).toHaveProperty('--color-brand-active');
    expect(out).toHaveProperty('--color-brand-text');
    expect(out).toHaveProperty('--color-brand-subtle');
    expect(out).toHaveProperty('--color-brand-muted');
  });

  it('omits primary tokens when no primary config is given', () => {
    const out = derivePalette({});

    expect(Object.keys(out)).toHaveLength(0);
  });

  it('honours per-shade overrides verbatim', () => {
    const out = derivePalette({
      primary: { base: '#3674a1', overrides: { '500': '#abcdef' } },
    });

    expect(out['--color-primary-500']).toBe('#abcdef');
  });

  it('derives a perceptually-ordered scale (50 lightest → 900 darkest)', () => {
    const out = derivePalette({ primary: { base: '#3674a1' } });

    const l50 = contrastRatio(out['--color-primary-50'], '#000000');
    const l500 = contrastRatio(out['--color-primary-500'], '#000000');
    const l900 = contrastRatio(out['--color-primary-900'], '#000000');

    // Lighter colours have higher contrast against black, so the scale
    // monotonically decreases from 50 to 900.
    expect(l50).toBeGreaterThan(l500);
    expect(l500).toBeGreaterThan(l900);
  });

  it('lets `roles` remap which shade backs each semantic role', () => {
    const out = derivePalette({
      primary: { base: '#3674a1', roles: { surfaceLight: '500' } },
    });

    expect(out['--color-brand-default']).toBe(out['--color-primary-500']);
  });

  it('produces a secondary scale prefixed with `--color-secondary-*`', () => {
    const out = derivePalette({ secondary: { base: '#e07a5f' } });

    expect(out).toHaveProperty('--color-secondary-500');
    expect(out).toHaveProperty('--color-brand-secondary-default');
    // Secondary does not own the brand-text token; that stays primary-bound.
    expect(out).not.toHaveProperty('--color-brand-text');
  });
});
