import type { ModePalette } from './palette.types';

const STYLE_TAG_ID = 'eagami-palette';

/**
 * Install the derived palette as a `<style>` tag in `document.head`. Light
 * values land on `:root`; dark values land on `:root[data-theme="dark"]` and
 * inside `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])`,
 * mirroring the library's own SCSS dark-mode selectors so a consumer-supplied
 * palette participates in the same theme toggle.
 *
 * Idempotent: subsequent calls replace the previous stylesheet rather than
 * append, so a theme switcher can re-apply without leaking style tags.
 * No-ops outside a DOM context (SSR).
 */
export function applyPalette(palette: ModePalette): void {
  if (typeof document === 'undefined') {
    return;
  }

  const css = renderPaletteCss(palette);
  let tag = document.getElementById(STYLE_TAG_ID) as HTMLStyleElement | null;
  if (!tag) {
    tag = document.createElement('style');
    tag.id = STYLE_TAG_ID;
    document.head.appendChild(tag);
  }
  tag.textContent = css;
}

function renderPaletteCss(palette: ModePalette): string {
  const lightDecls = entries(palette.light);
  const darkDecls = entries(palette.dark);

  return [
    `:root {\n${lightDecls}\n}`,
    `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme='light']) {\n${darkDecls}\n  }\n}`,
    `:root[data-theme='dark'] {\n${darkDecls}\n}`,
  ].join('\n\n');
}

function entries(palette: Record<string, string>): string {
  return Object.entries(palette)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n');
}
