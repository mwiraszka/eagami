import { type ToastPosition } from '@eagami/ui';

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
  readonly clearable = signal<boolean>(true);

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

  reset(): void {
    this.position.set('bottom-right');
    this.clearable.set(true);
    this.directionOverride.set(null);
  }
}
