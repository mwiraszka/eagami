/*
 * A modal `<dialog>` (`showModal()`) renders in the browser's top layer, which
 * paints above every z-index in the normal layer. An overlay portaled to
 * `<body>` therefore disappears behind the modal it was opened from, no matter
 * how high `--z-index-popover` climbs. The popover API is the only way to join
 * that layer; `manual` opts out of the UA's light-dismiss and Escape handling
 * so the owning component keeps full control of dismissal. Top-layer elements
 * stack in promotion order, so an overlay shown while a modal is open always
 * lands above it.
 *
 * Promotion is deliberately conditional: outside a top-layer container the
 * existing z-index scale already orders overlays against each other (toasts
 * above popovers, tooltips above both), and promoting unconditionally would
 * flatten that scale into "whatever opened last wins".
 */

const TOP_LAYER_CONTAINER = 'dialog:modal, :popover-open';

// `selector()` takes one complex selector, so probing a comma-separated list
// parses as invalid and answers false everywhere; test each selector alone
let selectorSupport: boolean | null = null;

function popoverSupported(): boolean {
  if (
    typeof HTMLElement === 'undefined' ||
    typeof HTMLElement.prototype.showPopover !== 'function' ||
    typeof CSS === 'undefined'
  ) {
    return false;
  }
  selectorSupport ??=
    CSS.supports?.('selector(dialog:modal)') === true &&
    CSS.supports?.('selector(:popover-open)') === true;
  return selectorSupport;
}

function isPromoted(el: HTMLElement): boolean {
  return el.hasAttribute('popover') && el.matches(':popover-open');
}

/**
 * Raises `surface` into the top layer when `anchor` sits inside something
 * that is already there. Callers must do this before measuring the surface: a
 * `popover` element is `display: none` until shown, so any rect read while it
 * is still hidden comes back zeroed.
 */
export function enterTopLayer(surface: HTMLElement, anchor: Element): void {
  if (!popoverSupported() || !surface.isConnected || isPromoted(surface)) {
    return;
  }
  if (!anchor.closest(TOP_LAYER_CONTAINER)) {
    return;
  }
  surface.setAttribute('popover', 'manual');
  try {
    surface.showPopover();
  } catch {
    // Refused promotion would leave the surface stuck at the UA's
    // `display: none`, so drop back to plain z-index stacking
    surface.removeAttribute('popover');
  }
}

/**
 * Where a portaled surface has to live to stay usable: inside the top-layer
 * container its anchor belongs to, or `<body>` when there is none.
 *
 * A modal `<dialog>` makes the rest of the document inert, and raising a
 * surface into the top layer does not lift that. An element portaled to
 * `<body>` while a modal is open paints above it and is still unfocusable and
 * untouchable: clicks land on the dialog behind it, so a field inside it takes
 * neither the caret nor a selection. Inertness follows the DOM, so the surface
 * has to sit inside the dialog; promotion then keeps it clear of any ancestor
 * that would clip it and above the dialog's own content.
 */
export function topLayerHost(anchor: Element | null | undefined): HTMLElement {
  const container = anchor?.closest(TOP_LAYER_CONTAINER);
  return container instanceof HTMLElement ? container : document.body;
}

/** Returns `surface` to the normal layer, undoing {@link enterTopLayer}. */
export function leaveTopLayer(surface: HTMLElement): void {
  if (!surface.hasAttribute('popover')) {
    return;
  }
  if (surface.isConnected && isPromoted(surface)) {
    surface.hidePopover();
  }
  surface.removeAttribute('popover');
}
