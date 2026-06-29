import { type ToastPosition } from '@eagami/ui';

import { Injectable, signal } from '@angular/core';

/**
 * Holds the live config for the single app-level `<ea-toast>` outlet so the
 * Toast playground can drive its `position`, `clearable`, and reading direction
 * without a second outlet (which would render every toast twice). Pages that
 * only trigger toasts leave these at their defaults.
 */
@Injectable({ providedIn: 'root' })
export class ToastOutletService {
  readonly position = signal<ToastPosition>('bottom-right');
  readonly clearable = signal<boolean>(true);
  readonly direction = signal<'ltr' | 'rtl'>('ltr');

  reset(): void {
    this.position.set('bottom-right');
    this.clearable.set(true);
    this.direction.set('ltr');
  }
}
