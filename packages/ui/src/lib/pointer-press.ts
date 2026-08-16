import { DestroyRef, Injectable, inject } from '@angular/core';

/**
 * Tracks where the press behind the current `click` started and ended.
 *
 * A `click` is dispatched on the nearest common ancestor of the press and the
 * release, so a drag that begins on a panel and ends on the backdrop arrives as
 * a click on the backdrop. Dismissal handlers that only read `event.target`
 * therefore treat "select text in a dialog, release outside it" as an outside
 * click, and shut the dialog under the user. Consulting both ends of the press
 * keeps a dismissal to presses that stayed outside from start to finish.
 *
 * Both ends read `null` for a click with no pointer behind it (keyboard
 * activation, `element.click()`), which every check below treats as a plain
 * click on its target.
 */
@Injectable({ providedIn: 'root' })
export class PointerPressTracker {
  private downTarget: Node | null = null;
  private upTarget: Node | null = null;

  private readonly onDown = (event: Event): void => {
    this.downTarget = event.target as Node | null;
    this.upTarget = null;
  };
  private readonly onUp = (event: Event): void => {
    this.upTarget = event.target as Node | null;
  };
  // A keyboard-driven click carries no pointer events of its own, and would
  // otherwise be read against whichever press came before it
  private readonly onKeydown = (): void => {
    this.downTarget = null;
    this.upTarget = null;
  };

  constructor() {
    if (typeof document === 'undefined') {
      return;
    }
    // Capture phase, so a handler that stops propagation cannot hide the press
    document.addEventListener('pointerdown', this.onDown, true);
    document.addEventListener('pointerup', this.onUp, true);
    document.addEventListener('keydown', this.onKeydown, true);
    inject(DestroyRef).onDestroy(() => {
      document.removeEventListener('pointerdown', this.onDown, true);
      document.removeEventListener('pointerup', this.onUp, true);
      document.removeEventListener('keydown', this.onKeydown, true);
    });
  }

  /** True when either end of the press landed on `el` or inside it. */
  touchedInside(el: Element | null | undefined): boolean {
    if (!el) {
      return false;
    }
    return (
      (this.downTarget !== null && el.contains(this.downTarget)) ||
      (this.upTarget !== null && el.contains(this.upTarget))
    );
  }

  /** True when neither end of the press landed anywhere but `el` itself. */
  stayedOn(el: Element | null | undefined): boolean {
    if (!el) {
      return false;
    }
    return (
      (this.downTarget === null || this.downTarget === el) &&
      (this.upTarget === null || this.upTarget === el)
    );
  }
}
