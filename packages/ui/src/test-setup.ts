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

const REAL_MATCHES = Element.prototype.matches;
const REAL_CLOSEST = Element.prototype.closest;
const REAL_SHOW_POPOVER: typeof HTMLElement.prototype.showPopover | undefined =
  HTMLElement.prototype.showPopover;
const REAL_HIDE_POPOVER: typeof HTMLElement.prototype.hidePopover | undefined =
  HTMLElement.prototype.hidePopover;

/** Handle returned by {@link installTopLayerStubs}. */
export interface TopLayerStubs {
  /** Marks an element as a modal container, as `showModal()` would. */
  openAsModal(el: Element): void;
  /** Elements currently raised into the fake top layer, in promotion order. */
  shown(): HTMLElement[];
  restore(): void;
}

/**
 * Stands in for the Popover API, which jsdom implements no part of: no
 * `showPopover`, no `:popover-open`, no `dialog:modal`, and a `CSS.supports`
 * that answers `false` for all of them. Without this the library's top-layer
 * code reads the environment as unsupported and silently no-ops, so a spec
 * covering it would pass no matter what the code did.
 *
 * Models the parts the library relies on: promotion order, the
 * `InvalidStateError` a double `showPopover()` throws, and ancestor lookup
 * through both fake modals and fake popovers.
 */
export function installTopLayerStubs(): TopLayerStubs {
  const shown = new Set<HTMLElement>();
  const modals = new Set<Element>();

  HTMLElement.prototype.showPopover = function (this: HTMLElement): void {
    if (shown.has(this)) {
      throw new DOMException('Popover already showing', 'InvalidStateError');
    }
    shown.add(this);
  };
  HTMLElement.prototype.hidePopover = function (this: HTMLElement): void {
    shown.delete(this);
  };
  const supportsSpy = vi.spyOn(CSS, 'supports').mockReturnValue(true);

  // Cast to the DOM's own overloaded signatures: both methods carry tag-name
  // generics a plain string implementation cannot express.
  Element.prototype.matches = function (this: Element, selector: string): boolean {
    if (selector === ':popover-open') {
      return shown.has(this as HTMLElement);
    }
    return REAL_MATCHES.call(this, selector);
  } as typeof Element.prototype.matches;
  const findContainer = (start: Element): Element | null => {
    let el: Element | null = start;
    while (el) {
      if (modals.has(el) || shown.has(el as HTMLElement)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  };
  Element.prototype.closest = function (this: Element, selector: string): Element | null {
    return selector.includes(':popover-open')
      ? findContainer(this)
      : REAL_CLOSEST.call(this, selector);
  } as typeof Element.prototype.closest;

  return {
    openAsModal: el => modals.add(el),
    shown: () => [...shown],
    restore: () => {
      shown.clear();
      modals.clear();
      supportsSpy.mockRestore();
      Element.prototype.matches = REAL_MATCHES;
      Element.prototype.closest = REAL_CLOSEST;
      const proto = HTMLElement.prototype as Partial<HTMLElement>;
      // Put back whatever was there rather than deleting, so a runtime that
      // does implement the popover API keeps it after a spec restores
      if (REAL_SHOW_POPOVER && REAL_HIDE_POPOVER) {
        proto.showPopover = REAL_SHOW_POPOVER;
        proto.hidePopover = REAL_HIDE_POPOVER;
      } else {
        delete proto.showPopover;
        delete proto.hidePopover;
      }
    },
  };
}
