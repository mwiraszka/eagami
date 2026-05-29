import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { XIconComponent } from '../icons/x.component';
import { type Toast, ToastService } from './toast.service';

/**
 * Outlet that renders the stack of active toasts produced by
 * {@link ToastService}. Place a single `<ea-toast />` once in the root
 * template so toasts created from anywhere in the app are surfaced.
 */
@Component({
  selector: 'ea-toast',
  imports: [XIconComponent],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToastComponent {
  protected readonly toastService = inject(ToastService);
  protected readonly i18n = inject(EagamiI18nService);

  protected getRole(toast: Toast): 'alert' | 'status' {
    return toast.variant === 'error' || toast.variant === 'warning' ? 'alert' : 'status';
  }
}
