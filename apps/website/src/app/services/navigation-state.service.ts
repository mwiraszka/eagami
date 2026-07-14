import { Injectable, inject, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  NavigationStart,
  Router,
} from '@angular/router';

const OVERLAY_SHOW_DELAY_MS = 200;
const OVERLAY_MIN_VISIBLE_MS = 300;

/**
 * Tracks in-flight router navigations. `pendingUrl` flips on NavigationStart so
 * links can show their destination state immediately, and `overlayVisible`
 * drives the page-wide loading overlay, delayed so fast navigations never
 * flash it and held briefly once shown so it never blinks.
 */
@Injectable({
  providedIn: 'root',
})
export class NavigationStateService {
  private readonly router = inject(Router);

  private readonly _pendingUrl = signal<string | null>(null);
  private readonly _overlayVisible = signal(false);

  readonly pendingUrl = this._pendingUrl.asReadonly();
  readonly overlayVisible = this._overlayVisible.asReadonly();

  private showTimer: ReturnType<typeof setTimeout> | undefined;
  private hideTimer: ReturnType<typeof setTimeout> | undefined;
  private shownAt = 0;

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // The initial navigation paints into a blank page; no overlay needed
        if (this.router.navigated) {
          this.beginPending(event.url);
        }
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError ||
        event instanceof NavigationSkipped
      ) {
        this.settle();
      }
    });
  }

  private beginPending(url: string): void {
    clearTimeout(this.showTimer);
    clearTimeout(this.hideTimer);
    this._pendingUrl.set(url);
    this.showTimer = setTimeout(() => {
      this.shownAt = Date.now();
      this._overlayVisible.set(true);
    }, OVERLAY_SHOW_DELAY_MS);
  }

  private settle(): void {
    clearTimeout(this.showTimer);
    this._pendingUrl.set(null);
    if (!this._overlayVisible()) {
      return;
    }
    const remainingMs = OVERLAY_MIN_VISIBLE_MS - (Date.now() - this.shownAt);
    if (remainingMs > 0) {
      this.hideTimer = setTimeout(() => this._overlayVisible.set(false), remainingMs);
    } else {
      this._overlayVisible.set(false);
    }
  }
}
