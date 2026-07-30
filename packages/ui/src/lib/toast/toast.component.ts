import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { AlertCircleIconComponent } from '../icons/alert-circle.component';
import { AlertTriangleIconComponent } from '../icons/alert-triangle.component';
import { CheckCircleIconComponent } from '../icons/check-circle.component';
import { InfoIconComponent } from '../icons/info.component';
import { XIconComponent } from '../icons/x.component';
import { type EaSize } from '../sizes';
import { ToastService } from './toast.service';

/** Corner or edge of the viewport the toast stack is pinned to. */
export type ToastPosition =
  'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';

/** Visual size of every toast rendered by the outlet. */
export type ToastSize = EaSize;

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
  private readonly containerEl = viewChild<ElementRef<HTMLElement>>('containerEl');

  private hovered = false;
  private focused = false;

  /** Viewport corner or edge the toast stack is pinned to. */
  readonly position = input<ToastPosition>('bottom-right');
  /** Visual size applied to every toast in the stack. */
  readonly size = input<ToastSize>('md');
  /** Show a dismiss button on each toast. */
  readonly clearable = input<boolean>(true);

  protected readonly containerClass = computed(
    () => `ea-toast-container ea-toast-container--${this.position()}`,
  );

  /** Errors and warnings interrupt like `ea-alert`; the rest wait politely. */
  protected toastRole(variant: string): 'alert' | 'status' {
    return variant === 'error' || variant === 'warning' ? 'alert' : 'status';
  }

  protected onMouseEnter(): void {
    this.hovered = true;
    this.syncPause();
  }

  protected onMouseLeave(): void {
    this.hovered = false;
    this.syncPause();
  }

  protected onFocusIn(): void {
    this.focused = true;
    this.syncPause();
  }

  protected onFocusOut(event: FocusEvent): void {
    const container = this.containerEl()?.nativeElement;
    this.focused = !!container && container.contains(event.relatedTarget as Node | null);
    this.syncPause();
  }

  private syncPause(): void {
    if (this.hovered || this.focused) {
      this.toastService.pause();
    } else {
      this.toastService.resume();
    }
  }
}
