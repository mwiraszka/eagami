import { NgClass, isPlatformBrowser } from '@angular/common';
import {
  type AfterContentChecked,
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
  signal,
  viewChild,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { XIconComponent } from '../icons/x.component';
import { PointerPressTracker } from '../pointer-press';
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
export class DialogComponent implements AfterContentChecked {
  private readonly dialogEl = viewChild<ElementRef<HTMLDialogElement>>('dialogEl');
  private readonly headerEl = viewChild<ElementRef<HTMLElement>>('headerEl');
  private previouslyFocused: HTMLElement | null = null;
  protected readonly i18n = inject(EagamiI18nService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly press = inject(PointerPressTracker);

  readonly width = input<DialogWidth>('md');
  readonly closeOnBackdrop = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  readonly showClose = input<boolean>(true);
  /**
   * Disables the built-in close button while a task is in flight (a save, an
   * upload). It governs that button alone; pair it with `closeOnEscape` /
   * `closeOnBackdrop` or `manualClose` to hold the other routes shut too.
   */
  readonly closeDisabled = input<boolean>(false);
  /**
   * Hands every close route to the consumer: the dialog reports
   * `closeRequested` and stays open until `open` is set false, so an unsaved
   * edit can be confirmed first. Escape and the backdrop still report, which is
   * what `closeOnEscape` / `closeOnBackdrop` remove entirely.
   */
  readonly manualClose = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly id = input<string>(uniqueId('ea-dialog'));

  readonly open = model<boolean>(false);

  /** Fires once the dialog has been shown via `showModal()`. */
  readonly opened = output<void>();
  /** Fires when the dialog closes (via close button, backdrop, or Escape). */
  readonly closed = output<void>();
  /** Fires under `manualClose` for every close the user asks for, leaving the dialog open. */
  readonly closeRequested = output<void>();

  readonly panelClasses = computed(() => ({
    [`ea-dialog__panel--${this.width()}`]: true,
  }));

  /** Whether the header slot received content, so labelledby never points at an empty node. */
  protected readonly hasHeader = signal(false);

  ngAfterContentChecked(): void {
    const header = this.headerEl()?.nativeElement;
    this.hasHeader.set(
      !!header && (header.children.length > 0 || !!header.textContent?.trim()),
    );
  }

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

  /** Every close route the user can take, routed through `manualClose`. */
  protected requestClose(): void {
    if (this.manualClose()) {
      this.closeRequested.emit();
      return;
    }
    this.handleClose();
  }

  handleBackdropClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop()) {
      return;
    }
    const dialogRef = this.dialogEl()?.nativeElement;
    // A press that touched the panel at either end reaches the dialog element
    // as a click too, since that is the first ancestor the panel and the
    // backdrop share; only a press confined to the backdrop dismisses
    if (event.target === dialogRef && this.press.stayedOn(dialogRef)) {
      this.requestClose();
    }
  }

  handleCancel(event: Event): void {
    if (!this.closeOnEscape()) {
      event.preventDefault();
      return;
    }
    // The native cancel is preventable, so a vetoed Escape leaves the dialog
    // showing rather than closing and reopening it a frame later
    if (this.manualClose()) {
      event.preventDefault();
      this.closeRequested.emit();
      return;
    }
    this.handleClose();
  }
}
