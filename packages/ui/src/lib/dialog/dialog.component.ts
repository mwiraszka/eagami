import { NgClass, isPlatformBrowser } from '@angular/common';
import {
  type AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  type ElementRef,
  HostListener,
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
import { ScrollLock } from '../scroll-lock';
import { type EaWidth } from '../sizes';
import { uniqueId } from '../unique-id';

/** Width preset of the dialog panel. */
export type DialogWidth = EaWidth;

/**
 * Floating surfaces a click can land on without leaving the dialog's layer:
 * another dialog, and the pieces the library teleports to `document.body`
 * (popover surfaces, tooltips, toasts). A press on any of them is interaction
 * with an overlay, not with the page behind, so it never reads as a dismissal.
 */
const FLOATING_SURFACES = 'dialog, .ea-popover__surface, .ea-tooltip, .ea-toast';

/**
 * Dialog backed by the native `<dialog>` element. Modal by default, using
 * `showModal()` for browser-managed focus trapping with backdrop and Escape
 * dismissal, and holding the page's scrolling for as long as it is up;
 * `modal` false floats it over a page left scrollable instead. It exposes
 * `header`, default, and `footer` content slots, and the `open` state is a
 * two-way `model()` binding.
 *
 * The header is a row that lays its slot content out against the built-in
 * close button, and it applies the h4 type scale to that content, so a heading
 * element projected into it should carry `font: inherit`. Panel chrome is
 * tunable per dialog via `--ea-dialog-inset`, `--ea-dialog-radius`,
 * `--ea-dialog-max-height`, `--ea-dialog-header-padding`,
 * `--ea-dialog-body-padding`, and `--ea-dialog-status-padding`; an
 * edge-to-edge media surface zeroes the inset, radius, and paddings.
 *
 * Specs running under jsdom need `installNativeDialogShim()` from
 * `@eagami/ui/testing` before opening one.
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
  private readonly scrollLock = inject(ScrollLock);
  private holdsScroll = false;

  readonly width = input<DialogWidth>('md');
  /**
   * Modal by default: shown via `showModal()`, with the backdrop overlay and
   * the page behind made inert and held from scrolling. When false the dialog
   * floats via `show()` instead, with no backdrop, leaving the page behind
   * scrollable and interactive; Escape still closes (or reports) from inside
   * the dialog, and `closeOnBackdrop` dismisses on a click landing outside
   * the panel. Read when the dialog opens; flipping it while open has no
   * effect.
   */
  readonly modal = input<boolean>(true);
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
          if (this.modal()) {
            dialogRef.showModal();
            this.holdScroll();
          } else {
            dialogRef.show();
          }
          this.opened.emit();
        }
      } else {
        if (dialogRef.open) {
          dialogRef.close();
          this.dropScroll();
          this.previouslyFocused?.focus?.();
          this.previouslyFocused = null;
        }
      }
    });

    // A dialog taken down while open never sees its close, so the hold goes
    // with the component
    inject(DestroyRef).onDestroy(() => this.dropScroll());
  }

  private holdScroll(): void {
    if (!this.holdsScroll) {
      this.holdsScroll = true;
      this.scrollLock.acquire();
    }
  }

  private dropScroll(): void {
    if (this.holdsScroll) {
      this.holdsScroll = false;
      this.scrollLock.release();
    }
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

  // A non-modal dialog has no backdrop, so `closeOnBackdrop` dismisses on a
  // click landing outside the panel instead. The native open flag stands off
  // the opening click itself, which reaches here before the effect has shown
  // the dialog
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const dialogRef = this.dialogEl()?.nativeElement;
    if (this.modal() || !this.closeOnBackdrop() || !dialogRef?.open) {
      return;
    }
    const target = event.target;
    if (!(target instanceof Element) || target.closest(FLOATING_SURFACES)) {
      return;
    }
    // A drag that started or ended on the panel (selecting text, dragging a
    // slider) lands its click on an ancestor of both, which is not a dismissal
    if (this.press.touchedInside(dialogRef)) {
      return;
    }
    this.requestClose();
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

  // Escape reaches a non-modal dialog only as a keydown, since `show()` never
  // fires the native cancel; a modal one leaves it to `handleCancel`
  protected handleEscape(): void {
    if (this.modal() || !this.closeOnEscape()) {
      return;
    }
    this.requestClose();
  }
}
