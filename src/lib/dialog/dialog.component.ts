import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  effect,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';

import { XIconComponent } from '../icons/x.component';

/** Width preset of the dialog panel. */
export type DialogSize = 'sm' | 'md' | 'lg' | 'full';

/**
 * Modal dialog backed by the native `<dialog>` element. Uses `showModal()`
 * for browser-managed focus trapping, supports backdrop and Escape dismissal,
 * and exposes `header`, default, and `footer` content slots. The `open` state
 * is a two-way `model()` binding.
 */
@Component({
  selector: 'ea-dialog',
  imports: [NgClass, XIconComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DialogComponent {
  private readonly dialogEl = viewChild<ElementRef<HTMLDialogElement>>('dialogEl');
  private previouslyFocused: HTMLElement | null = null;

  // Inputs
  readonly size = input<DialogSize>('md');
  readonly closeOnBackdrop = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  readonly showClose = input<boolean>(true);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly id = input<string>(`ea-dialog-${Math.random().toString(36).slice(2, 9)}`);

  // Two-way open binding
  readonly open = model<boolean>(false);

  // Outputs
  /** Fires once the dialog has been shown via `showModal()`. */
  readonly opened = output<void>();
  /** Fires when the dialog closes (via close button, backdrop, or Escape). */
  readonly closed = output<void>();

  // Computed
  readonly panelClasses = computed(() => ({
    [`ea-dialog__panel--${this.size()}`]: true,
  }));

  constructor() {
    effect(() => {
      const dialogRef = this.dialogEl()?.nativeElement;
      if (!dialogRef) return;

      if (this.open()) {
        if (!dialogRef.open) {
          this.previouslyFocused = document.activeElement as HTMLElement | null;
          dialogRef.showModal();
          this.opened.emit();
        }
      } else {
        if (dialogRef.open) {
          dialogRef.close();
          this.previouslyFocused?.focus?.();
          this.previouslyFocused = null;
        }
      }
    });
  }

  handleClose(): void {
    this.open.set(false);
    this.closed.emit();
  }

  handleBackdropClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop()) return;
    const dialogRef = this.dialogEl()?.nativeElement;
    if (event.target === dialogRef) {
      this.handleClose();
    }
  }

  handleCancel(event: Event): void {
    if (!this.closeOnEscape()) {
      event.preventDefault();
      return;
    }
    this.handleClose();
  }
}
