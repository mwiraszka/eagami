import { type ToastPosition } from '@eagami/ui';

import { Injectable, signal } from '@angular/core';

/**
 * Holds the live config for the single docs-section `<ea-toast>` outlet so the
 * Toast playground can drive its `position` and `clearable` inputs without a
 * second outlet (which would render every toast twice). Pages that only trigger
 * toasts leave these at their defaults.
 */
@Injectable({ providedIn: 'root' })
export class ToastOutletService {
  readonly position = signal<ToastPosition>('bottom-right');
  readonly clearable = signal<boolean>(true);

  reset(): void {
    this.position.set('bottom-right');
    this.clearable.set(true);
  }
}
