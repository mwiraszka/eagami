import { afterEach, beforeEach, vi } from 'vitest';
import 'vitest-axe/extend-expect';

// zone.js patches MutationObserver, but its wrapper breaks axe-core (observer.observe is
// not a function). zone.js stashes the original under its own symbol; restore it before
// specs load axe so axe uses the environment's native implementation.
const withZoneOriginal = globalThis as typeof globalThis & {
  __zone_symbol__MutationObserver?: typeof MutationObserver;
};
if (withZoneOriginal.__zone_symbol__MutationObserver) {
  globalThis.MutationObserver = withZoneOriginal.__zone_symbol__MutationObserver;
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

/**
 * jsdom does not resolve `dir` into a computed direction, so RTL specs spy on
 * `getComputedStyle` and answer for one element. Captured here, before any spy
 * can be installed, so a spy that delegates "to the original" can never end up
 * delegating to an earlier spy and recursing forever.
 */
export const REAL_GET_COMPUTED_STYLE = window.getComputedStyle.bind(window);

/**
 * Reveals the open popover surfaces so an accessibility scan can reach them.
 *
 * A surface is portaled to `document.body`, so it sits outside the fixture
 * element most specs scan, and it stays `visibility: hidden` until a
 * measurement-stable reposition adds `--positioned`, which never happens
 * without a layout engine. Left alone, axe treats the whole subtree as hidden
 * and silently skips it, so a scan of a menu, dropdown, or picker checks the
 * trigger and nothing else. Returns the surfaces so the caller can scan them.
 */
export function revealPopoverSurfaces(): HTMLElement[] {
  const surfaces = Array.from(
    document.querySelectorAll<HTMLElement>('.ea-popover__surface'),
  ).filter(surface => surface.style.display !== 'none');
  for (const surface of surfaces) {
    surface.classList.add('ea-popover__surface--positioned');
  }
  return surfaces;
}

// Popover surfaces are teleported to `document.body`, so they outlive the
// TestBed fixture that created them. Left behind, a later spec looking up "the
// open surface" finds a previous spec's, which passes in isolation and fails in
// a full run.
afterEach(() => {
  document.querySelectorAll('.ea-popover__surface').forEach(el => el.remove());
});
