import { type ToastPosition, type ToastSize } from '@eagami/ui';

import { Injectable, type Signal, computed, inject, signal } from '@angular/core';

import { WEB_LOCALE_DIRS } from '../i18n/locale.types';
import { WebI18nService } from '../i18n/web-i18n.service';

/**
 * Holds the live config for the single app-level `<ea-toast>` outlet so the
 * Toast playground can drive its `position`, `clearable`, and reading direction
 * without a second outlet (which would render every toast twice). Pages that
 * only trigger toasts leave these at their defaults.
 */
@Injectable({ providedIn: 'root' })
export class ToastOutletService {
  private readonly i18n = inject(WebI18nService);

  readonly position = signal<ToastPosition>('bottom-right');
  readonly size = signal<ToastSize>('sm');
  readonly clearable = signal<boolean>(true);

  // Inline style the UI playground applies (font-family custom properties) so
  // toasts fired from its showcase adopt the chosen font. Empty on other pages.
  readonly style = signal<Record<string, string>>({});

  // Toasts follow the active locale's reading direction (RTL for Arabic and
  // Hebrew). The Toast playground overrides this to preview the other direction
  // and clears the override on leave.
  private readonly directionOverride = signal<'ltr' | 'rtl' | null>(null);
  readonly direction: Signal<'ltr' | 'rtl'> = computed(
    () => this.directionOverride() ?? WEB_LOCALE_DIRS[this.i18n.locale()],
  );

  setDirection(direction: 'ltr' | 'rtl'): void {
    this.directionOverride.set(direction);
  }

  setStyle(style: Record<string, string>): void {
    this.style.set(style);
  }

  reset(): void {
    this.position.set('bottom-right');
    this.size.set('sm');
    this.clearable.set(true);
    this.directionOverride.set(null);
    this.style.set({});
  }
}
