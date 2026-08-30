import { Injectable } from '@angular/core';

/**
 * Reference-counted hold on the page's own scrolling, taken by modal overlays
 * for as long as they are up.
 *
 * The native top layer leaves the page inert to clicks and focus, but wheel
 * and touch scrolling still chain through the backdrop to the viewport, so
 * the root scroller is shut off while any holder remains. The root scrollbar
 * disappears with it; its width is given back as body padding so the page
 * does not shift underneath the overlay.
 */
@Injectable({ providedIn: 'root' })
export class ScrollLock {
  private holds = 0;
  private restore: (() => void) | null = null;

  acquire(): void {
    if (++this.holds > 1 || typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const body = document.body;
    const scrollbar = window.innerWidth - root.clientWidth;
    const overflow = root.style.overflow;
    const padding = body.style.paddingRight;

    root.style.overflow = 'hidden';
    if (scrollbar > 0) {
      const held = parseFloat(getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${held + scrollbar}px`;
    }

    this.restore = () => {
      root.style.overflow = overflow;
      body.style.paddingRight = padding;
    };
  }

  release(): void {
    if (this.holds === 0 || --this.holds > 0) {
      return;
    }

    this.restore?.();
    this.restore = null;
  }
}
