import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { AlertCircleIconComponent } from '../icons/alert-circle.component';
import { AlertTriangleIconComponent } from '../icons/alert-triangle.component';
import { CheckCircleIconComponent } from '../icons/check-circle.component';
import { InfoIconComponent } from '../icons/info.component';
import { XIconComponent } from '../icons/x.component';
import { ToastService } from './toast.service';

/** Corner or edge of the viewport the toast stack is pinned to. */
export type ToastPosition =
  'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';

/**
 * Outlet that renders the stack of active toasts produced by
 * {@link ToastService}. Place a single `<ea-toast />` once in the root
 * template so toasts created from anywhere in the app are surfaced.
 */
@Component({
  selector: 'ea-toast',
  imports: [
    XIconComponent,
    CheckCircleIconComponent,
    InfoIconComponent,
    AlertTriangleIconComponent,
    AlertCircleIconComponent,
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToastComponent {
  protected readonly toastService = inject(ToastService);
  protected readonly i18n = inject(EagamiI18nService);

  /** Viewport corner or edge the toast stack is pinned to. */
  readonly position = input<ToastPosition>('bottom-right');
  /** Show a dismiss button on each toast. */
  readonly clearable = input<boolean>(true);

  protected readonly containerClass = computed(
    () => `ea-toast-container ea-toast-container--${this.position()}`,
  );
}
