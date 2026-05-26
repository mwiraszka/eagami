import { WCAG_AA, contrastRatio } from './contrast';
import { ModePalette } from './palette.types';

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
  /** Which mode the violation occurred in. */
  mode: 'light' | 'dark';
}

/** One canvas + on-brand text pairing for a single colour mode. */
export interface ModeSurfaces {
  /** Page background the brand sits on (`--color-bg-canvas`). */
  canvas: string;
  /** Foreground colour that sits on the brand surface (button label). */
  onBrandText: string;
}

export interface ContrastSurfaces {
  light: ModeSurfaces;
  dark: ModeSurfaces;
}

/** Library defaults: white in light mode, near-black in dark mode. */
const DEFAULT_SURFACES: ContrastSurfaces = {
  light: { canvas: '#ffffff', onBrandText: '#ffffff' },
  dark: { canvas: '#030712', onBrandText: '#ffffff' },
};

/**
 * Walk every meaningful pairing in a derived palette and return any
 * violations of the WCAG 2.1 AA contrast bars. Empty array means the
 * palette is safe.
 *
 * Each check runs in both light and dark mode so a palette can't pass one
 * mode while silently failing the other.
 *
 * Checks per mode:
 *   - `--color-brand-text` vs `canvas` >= 4.5:1 (link / foreground text)
 *   - `--color-brand-default` vs `onBrandText` >= 4.5:1 (button label)
 *   - `--color-brand-default` vs `canvas` >= 3:1 (WCAG 1.4.11 non-text)
 */
export function validatePalette(
  palette: ModePalette,
  surfaces: ContrastSurfaces = DEFAULT_SURFACES,
): ContrastViolation[] {
  const violations: ContrastViolation[] = [];

  const check = (
    mode: 'light' | 'dark',
    token: string,
    surface: string,
    required: number,
    role: ContrastViolation['role'],
  ) => {
    const value = palette[mode][token];
    if (!value) return;
    const ratio = contrastRatio(value, surface);
    if (ratio < required) {
      violations.push({ token, value, surface, ratio, required, role, mode });
    }
  };

  for (const mode of ['light', 'dark'] as const) {
    const { canvas, onBrandText } = surfaces[mode];
    check(mode, '--color-brand-text', canvas, WCAG_AA.text, 'text');
    check(mode, '--color-brand-default', onBrandText, WCAG_AA.text, 'text');
    check(mode, '--color-brand-default', canvas, WCAG_AA.nonText, 'non-text');
  }

  return violations;
}

/** Format a violation list as a human-readable error message. */
export function formatViolations(violations: readonly ContrastViolation[]): string {
  const lines = violations.map(v => {
    const ratio = v.ratio.toFixed(2);
    return `  [${v.mode}] ${v.token} (${v.value}) vs ${v.surface}: ${ratio}:1 < ${v.required}:1 [${v.role}]`;
  });
  return [
    'eagami: derived palette fails WCAG AA contrast on the following pairings:',
    ...lines,
    'Pick a darker base hex (or adjust the role mapping) so the brand colour clears the contrast bars in both modes.',
  ].join('\n');
}
