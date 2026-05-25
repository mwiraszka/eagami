import { WCAG_AA, contrastRatio } from './contrast';
import { DerivedPalette } from './palette.types';

export interface ContrastViolation {
  /** CSS custom-property name that fails the contrast bar. */
  token: string;
  /** Hex value of that token. */
  value: string;
  /** Hex value of the surface it was checked against. */
  surface: string;
  /** Computed contrast ratio. */
  ratio: number;
  /** Minimum ratio the role required. */
  required: number;
  /** What the role represents (for the error message). */
  role: 'text' | 'large-text' | 'non-text';
}

/**
 * Surface a palette must clear contrast against. Defaults match the
 * library's `--color-bg-base` (white in light mode); consumers theming in
 * dark mode can pass a different surface.
 */
export interface ContrastSurfaces {
  /** Background the brand-text / surface foreground sits on. */
  surface: string;
  /** Foreground colour that sits on the brand surface (button text). */
  onBrandText: string;
}

const DEFAULT_LIGHT_SURFACES: ContrastSurfaces = {
  surface: '#ffffff',
  onBrandText: '#ffffff',
};

/**
 * Walk every meaningful pairing in a derived palette and return any
 * violations of the WCAG 2.1 AA contrast bars. Empty array means the
 * palette is safe.
 *
 * Checks:
 *   - `--color-brand-text` vs `surface` >= 4.5:1
 *   - `--color-brand-default` vs `onBrandText` >= 4.5:1
 *   - `--color-brand-default` vs `surface` >= 3:1
 */
export function validatePalette(
  palette: DerivedPalette,
  surfaces: ContrastSurfaces = DEFAULT_LIGHT_SURFACES,
): ContrastViolation[] {
  const violations: ContrastViolation[] = [];

  const check = (
    token: string,
    surface: string,
    required: number,
    role: ContrastViolation['role'],
  ) => {
    const value = palette[token];
    if (!value) return;
    const ratio = contrastRatio(value, surface);
    if (ratio < required) {
      violations.push({ token, value, surface, ratio, required, role });
    }
  };

  check('--color-brand-text', surfaces.surface, WCAG_AA.text, 'text');
  check('--color-brand-default', surfaces.onBrandText, WCAG_AA.text, 'text');
  check('--color-brand-default', surfaces.surface, WCAG_AA.nonText, 'non-text');

  return violations;
}

/** Format a violation list as a human-readable error message. */
export function formatViolations(violations: readonly ContrastViolation[]): string {
  const lines = violations.map(v => {
    const ratio = v.ratio.toFixed(2);
    return `  ${v.token} (${v.value}) vs ${v.surface}: ${ratio}:1 < ${v.required}:1 [${v.role}]`;
  });
  return [
    'eagami: derived palette fails WCAG AA contrast on the following pairings:',
    ...lines,
    'Pick a darker base hex (or adjust the role mapping) so the brand colour clears the contrast bars.',
  ].join('\n');
}
