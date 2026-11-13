import { afterRenderEffect, signal, untracked } from '@angular/core';

import { type PopoverComponent } from './popover.component';

// Only the newest request on the page moves focus, so two surfaces revealed in the
// same frame do not pass it back and forth
let latestRequest = 0;

/**
 * Returns a function that requests `focus` to run once `popover` has revealed its
 * surface. The surface stays invisible until it has measured and positioned itself,
 * and an invisible element cannot take focus, so moving focus into it on the first
 * render after opening does nothing. `isOpen` reads the owner's own open state, which
 * is current as soon as the owner opens, unlike the popover's input. A request is
 * dropped once the owner closes, when a newer request is made, or when focus has moved
 * somewhere else before the reveal. Call it in an injection context.
 */
export function focusOnReveal(
  isOpen: () => boolean,
  popover: () => PopoverComponent | undefined,
  focus: () => void,
): () => void {
  const pending = signal(0);
  let focusedAtRequest: Element | null = null;

  afterRenderEffect(() => {
    const request = pending();
    if (request === 0) {
      return;
    }
    if (!isOpen() || request !== latestRequest) {
      pending.set(0);
      return;
    }
    if (!popover()?.isPositioned()) {
      return;
    }
    untracked(() => {
      pending.set(0);
      const active = document.activeElement;
      if (active === focusedAtRequest || active === null || active === document.body) {
        focus();
      }
    });
  });

  return () => {
    latestRequest += 1;
    focusedAtRequest = typeof document === 'undefined' ? null : document.activeElement;
    pending.set(latestRequest);
  };
}
