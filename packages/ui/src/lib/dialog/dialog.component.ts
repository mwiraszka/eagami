import { NgClass, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  PLATFORM_ID,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { XIconComponent } from '../icons/x.component';
import { type EaWidth } from '../sizes';
import { uniqueId } from '../unique-id';

/** Width preset of the dialog panel. */
export type DialogWidth = EaWidth;

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
  protected readonly i18n = inject(EagamiI18nService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly width = input<DialogWidth>('md');
  readonly closeOnBackdrop = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  readonly showClose = input<boolean>(true);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly id = input<string>(uniqueId('ea-dialog'));

  readonly open = model<boolean>(false);

  /** Fires once the dialog has been shown via `showModal()`. */
  readonly opened = output<void>();
  /** Fires when the dialog closes (via close button, backdrop, or Escape). */
  readonly closed = output<void>();

  readonly panelClasses = computed(() => ({
    [`ea-dialog__panel--${this.width()}`]: true,
  }));

  constructor() {
    effect(() => {
      const dialogRef = this.dialogEl()?.nativeElement;
      const open = this.open();
      // `<dialog>` APIs and focus management are browser-only, but the effect
      // still runs during SSR, so skip the DOM work on the server.
      if (!dialogRef || !this.isBrowser) {
        return;
      }

      if (open) {
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
    if (!this.closeOnBackdrop()) {
      return;
    }
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
