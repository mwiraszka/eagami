import { type Signal, afterRenderEffect, signal, untracked } from '@angular/core';

import { type PopoverComponent } from './popover.component';

/**
 * Returns a function that requests `focus` to run once `popover` has revealed its
 * surface. The surface stays invisible until it has measured and positioned itself,
 * and an invisible element cannot take focus, so moving focus into it on the first
 * render after opening does nothing. A request made while the surface already shows
 * runs after the next render. A request is dropped when the popover closes first, or
 * when focus has moved somewhere else in the meantime. Call it in an injection context.
 */
export function focusOnReveal(
  popover: Signal<PopoverComponent | undefined>,
  focus: () => void,
): () => void {
  const pending = signal(false);
  let focusedAtRequest: Element | null = null;

  afterRenderEffect(() => {
    const surface = popover();
    if (!pending() || !surface) {
      return;
    }
    if (!surface.open()) {
      pending.set(false);
      return;
    }
    if (!surface.isPositioned()) {
      return;
    }
    untracked(() => {
      pending.set(false);
      const active = document.activeElement;
      if (active === focusedAtRequest || active === null || active === document.body) {
        focus();
      }
    });
  });

  return () => {
    focusedAtRequest = typeof document === 'undefined' ? null : document.activeElement;
    pending.set(true);
  };
}
