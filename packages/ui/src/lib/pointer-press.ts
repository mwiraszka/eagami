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
 *
 * It also knows whether a press is still in progress, so work that would move
 * content under the pointer can wait until the press has landed its click.
 */
@Injectable({ providedIn: 'root' })
export class PointerPressTracker {
  private downTarget: Node | null = null;
  private upTarget: Node | null = null;
  private pressing = false;
  private readonly pressEndCallbacks = new Set<() => void>();

  private readonly onDown = (event: Event): void => {
    this.downTarget = event.target as Node | null;
    this.upTarget = null;
    this.pressing = true;
  };
  private readonly onUp = (event: Event): void => {
    this.upTarget = event.target as Node | null;
  };
  // A click is already bound to its target by the time capture listeners run,
  // so work released from here can no longer redirect it
  private readonly onPressEnd = (): void => {
    this.pressing = false;
    const callbacks = [...this.pressEndCallbacks];
    this.pressEndCallbacks.clear();
    callbacks.forEach(callback => callback());
  };
  // A keyboard-driven click carries no pointer events of its own, and would
  // otherwise be read against whichever press came before it
  private readonly onKeydown = (): void => {
    this.downTarget = null;
    this.upTarget = null;
    this.onPressEnd();
  };

  constructor() {
    if (typeof document === 'undefined') {
      return;
    }
    // Capture phase, so a handler that stops propagation cannot hide the press
    document.addEventListener('pointerdown', this.onDown, true);
    document.addEventListener('pointerup', this.onUp, true);
    document.addEventListener('click', this.onPressEnd, true);
    document.addEventListener('pointercancel', this.onPressEnd, true);
    document.addEventListener('keydown', this.onKeydown, true);
    inject(DestroyRef).onDestroy(() => {
      document.removeEventListener('pointerdown', this.onDown, true);
      document.removeEventListener('pointerup', this.onUp, true);
      document.removeEventListener('click', this.onPressEnd, true);
      document.removeEventListener('pointercancel', this.onPressEnd, true);
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

  /**
   * Runs `callback` once the press in progress has landed its click or been
   * cancelled, or straight away when no press is in progress. Returns a
   * function that drops the pending call.
   */
  whenPressEnds(callback: () => void): () => void {
    if (!this.pressing) {
      callback();
      return () => undefined;
    }
    this.pressEndCallbacks.add(callback);
    return () => this.pressEndCallbacks.delete(callback);
  }
}
