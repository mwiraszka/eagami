import { DerivedPalette } from './palette.types';

/**
 * Write the derived palette as inline CSS custom properties on a host
 * element (`document.documentElement` by default). Inline custom properties
 * on `<html>` take precedence over the library's SCSS defaults, so calling
 * this overrides them without rebuilding the stylesheet. Safe to call
 * repeatedly. No-ops outside a DOM context (SSR).
 */
export function applyPalette(palette: DerivedPalette, root?: HTMLElement): void {
  const target =
    root ?? (typeof document !== 'undefined' ? document.documentElement : null);
  if (!target) return;
  for (const [name, value] of Object.entries(palette)) {
    target.style.setProperty(name, value);
  }
}
