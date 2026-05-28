import { contrastRatio } from './contrast';
import { derivePalette } from './derive-palette';

describe('derivePalette', () => {
  it('returns the full 10-shade scale plus brand role tokens for primary, in both modes', () => {
    const { light, dark } = derivePalette({ primary: { base: '#3674a1' } });

    for (const palette of [light, dark]) {
      expect(palette).toHaveProperty('--color-primary-50');
      expect(palette).toHaveProperty('--color-primary-500');
      expect(palette).toHaveProperty('--color-primary-900');
      expect(palette).toHaveProperty('--color-brand-default');
      expect(palette).toHaveProperty('--color-brand-hover');
      expect(palette).toHaveProperty('--color-brand-active');
      expect(palette).toHaveProperty('--color-brand-text');
    }
  });

  it('omits brand tokens when no family config is given', () => {
    const { light, dark } = derivePalette({});

    expect(Object.keys(light)).toHaveLength(0);
    expect(Object.keys(dark)).toHaveLength(0);
  });

  it('honours per-shade overrides verbatim', () => {
    const { light, dark } = derivePalette({
      primary: { base: '#3674a1', overrides: { '500': '#abcdef' } },
    });

    expect(light['--color-primary-500']).toBe('#abcdef');
    expect(dark['--color-primary-500']).toBe('#abcdef');
  });

  it('derives a perceptually-ordered scale (50 lightest to 900 darkest)', () => {
    const { light } = derivePalette({ primary: { base: '#3674a1' } });

    const l50 = contrastRatio(light['--color-primary-50'], '#000000');
    const l500 = contrastRatio(light['--color-primary-500'], '#000000');
    const l900 = contrastRatio(light['--color-primary-900'], '#000000');

    expect(l50).toBeGreaterThan(l500);
    expect(l500).toBeGreaterThan(l900);
  });

  it('flips brand-text between modes so each clears its canvas', () => {
    const { light, dark } = derivePalette({ primary: { base: '#3674a1' } });

    // brand-text defaults: textLight=700 for the white canvas, textDark=300 for near-black
    expect(light['--color-brand-text']).toBe(light['--color-primary-700']);
    expect(dark['--color-brand-text']).toBe(dark['--color-primary-300']);
  });

  it('flips brand-default one shade lighter in dark mode (600 -> 500)', () => {
    // The 600/500 flip clears WCAG 1.4.11 (3:1 brand-vs-canvas) without losing the white label
    const { light, dark } = derivePalette({ primary: { base: '#3674a1' } });

    expect(light['--color-brand-default']).toBe(light['--color-primary-600']);
    expect(dark['--color-brand-default']).toBe(dark['--color-primary-500']);
  });

  it('lets `roles` remap which shade backs each semantic role', () => {
    const { light } = derivePalette({
      primary: { base: '#3674a1', roles: { surfaceLight: '500' } },
    });

    expect(light['--color-brand-default']).toBe(light['--color-primary-500']);
  });

  it('produces a secondary scale prefixed with `--color-secondary-*`', () => {
    const { light } = derivePalette({ secondary: { base: '#e07a5f' } });

    expect(light).toHaveProperty('--color-secondary-500');
    expect(light).toHaveProperty('--color-brand-secondary-default');
    // brand-text stays primary-bound, never owned by secondary
    expect(light).not.toHaveProperty('--color-brand-text');
  });
});
