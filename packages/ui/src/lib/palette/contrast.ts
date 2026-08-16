import { hexToRgb } from './oklch';

/**
 * WCAG 2.1 relative luminance and contrast ratio.
 * Spec: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */

function linearChannel(c8: number): number {
  const c = c8 / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return (
    0.2126 * linearChannel(r) + 0.7152 * linearChannel(g) + 0.0722 * linearChannel(b)
  );
}

export function contrastRatio(hexA: string, hexB: string): number {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** The two inks a component paints on a caller-supplied fill. */
export const INK = {
  light: '#ffffff',
  dark: '#030712',
} as const;

/** `#abc` and `#aabbcc` alike as `#aabbcc`, or `null` for anything else. */
export function normalizeHex(color: string): string | null {
  const value = color.trim().replace(/^#/, '');
  if (/^[\da-f]{3}$/i.test(value)) {
    return `#${value.replace(/./g, channel => channel + channel)}`;
  }
  return /^[\da-f]{6}$/i.test(value) ? `#${value}` : null;
}

/**
 * Whichever of the two inks reads better on `background`, for a fill the
 * library cannot know ahead of time (a user-chosen tag colour). Returns `null`
 * when the background is not a hex colour this can measure.
 */
export function readableInk(background: string): 'light' | 'dark' | null {
  const hex = normalizeHex(background);
  if (!hex) {
    return null;
  }
  return contrastRatio(hex, INK.light) >= contrastRatio(hex, INK.dark) ? 'light' : 'dark';
}

/**
 * WCAG 2.1 AA contrast floors: 4.5:1 for body text, 3:1 for ≥ 18pt text
 * (or ≥ 14pt bold), 3:1 for UI components (icons, focus rings, meaningful
 * borders).
 */
export const WCAG_AA = {
  text: 4.5,
  largeText: 3,
  nonText: 3,
} as const;
