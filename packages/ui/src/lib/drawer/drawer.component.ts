import { isPlatformBrowser } from '@angular/common';
import {
  type AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
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

/**
 * Edge of the viewport from which the drawer slides in. `start`/`end` are
 * direction-aware (start = left in LTR, right in RTL); `left`/`right` are fixed.
 */
export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom' | 'start' | 'end';
/**
 * Extent of the drawer panel along its main axis: width for side drawers,
 * height for top/bottom drawers.
 */
export type DrawerSize = EaWidth;
/**
 * How the drawer relates to the page. `overlay` floats over a dimmed,
 * focus-trapped page (modal); `push` opens non-modally with no backdrop and
 * reflows the page content aside so it stays visible and interactive.
 */
export type DrawerMode = 'overlay' | 'push';
/**
 * Slide animation used when the drawer opens and closes. `none` shows and hides
 * it instantly; `linear` slides at a constant speed; `eased` slides on an
 * ease-out curve. All durations still collapse to 0ms under reduced motion.
 */
export type DrawerAnimation = 'none' | 'linear' | 'eased';

// The padding side, per position, applied to the push target so its content
// reflows away from the drawer's edge. `start`/`end` are direction-aware.
const PUSH_PROPERTY: Record<DrawerPosition, string> = {
  right: 'padding-right',
  left: 'padding-left',
  start: 'padding-inline-start',
  end: 'padding-inline-end',
  top: 'padding-top',
  bottom: 'padding-bottom',
};

// Every padding side push can set. All are cleared before applying the current
// one so a position change never leaves a stale offset that shifts content off.
const PUSH_PROPERTIES = Object.values(PUSH_PROPERTY);

// getAnimations() flushes pending style first, so a transition started by the
// caller's last class or style change is already among those returned
function runningTransitions(
  el: Element,
  matches: (property: string) => boolean,
): CSSTransition[] {
  return el
    .getAnimations()
    .filter(
      (animation): animation is CSSTransition =>
        animation instanceof CSSTransition &&
        animation.playState === 'running' &&
        matches(animation.transitionProperty),
    );
}

/**
 * Side panel backed by the native `<dialog>` element for browser-managed
 * focus trapping. Slides in from a configurable edge, supports backdrop and
 * Escape dismissal, and exposes `header`, default, and `footer` content
 * slots. The `open` state is a two-way `model()` binding. In `push` mode it
 * opens non-modally and reflows the page content aside instead of overlaying it.
 *
 * Specs running under jsdom need `installNativeDialogShim()` from
 * `@eagami/ui/testing` before opening one.
 */
@Component({
  selector: 'ea-drawer',
  imports: [XIconComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DrawerComponent implements AfterContentChecked {
  private readonly drawerEl = viewChild<ElementRef<HTMLDialogElement>>('drawerEl');
  private readonly panelEl = viewChild<ElementRef<HTMLElement>>('panelEl');
  private readonly headerEl = viewChild<ElementRef<HTMLElement>>('headerEl');
  private previouslyFocused: HTMLElement | null = null;
  private pushedTarget: HTMLElement | null = null;
  private pushRelease: Promise<unknown> | null = null;
  // Which modality the open dialog was shown with, so a `mode` change while it
  // is open can reopen it in the matching modality. `null` means it is closed.
  private shownAsModal: boolean | null = null;
  private reopening = false;
  private exitSlide: CSSTransition | null = null;
  private pushRaf: number | null = null;
  private documentClickListener: ((event: MouseEvent) => void) | null = null;
  protected readonly i18n = inject(EagamiI18nService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly press = inject(PointerPressTracker);

  readonly position = input<DrawerPosition>('right');
  /**
   * Extent of the panel along its main axis (width for side drawers, height for
   * top/bottom drawers).
   */
  readonly size = input<DrawerSize>('md');
  /**
   * `overlay` (default) opens the drawer as a modal over a dimmed page; `push`
   * opens it non-modally and reflows the page content aside.
   */
  readonly mode = input<DrawerMode>('overlay');
  /**
   * Element whose content is pushed aside in `push` mode, as a CSS selector or
   * element reference. Defaults to `document.body`.
   */
  readonly pushTarget = input<string | HTMLElement | null>(null);
  readonly closeOnBackdrop = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  /** Slide animation used as the panel opens and closes. */
  readonly animation = input<DrawerAnimation>('eased');
  readonly showClose = input<boolean>(true);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly id = input<string>(uniqueId('ea-drawer'));

  readonly open = model<boolean>(false);

  /** Fires once the drawer has been shown. */
  readonly opened = output<void>();
  /** Fires when the drawer closes (via close button, backdrop, or Escape). */
  readonly closed = output<void>();

  readonly panelClasses = computed(() => ({
    [`ea-drawer__panel--${this.position()}`]: true,
    [`ea-drawer__panel--${this.size()}`]: true,
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
      const drawerRef = this.drawerEl()?.nativeElement;
      const open = this.open();
      const mode = this.mode();
      // Re-run the push measurement if size, position, or target change while open
      this.size();
      this.position();
      this.pushTarget();
      // `<dialog>` APIs and focus management are browser-only, but the effect
      // still runs during SSR, so skip the DOM work on the server.
      if (!drawerRef || !this.isBrowser) {
        return;
      }

      // Push mode stays non-modal so the page behind it remains interactive
      const wantModal = mode !== 'push';

      if (open) {
        if (!drawerRef.open) {
          this.previouslyFocused = document.activeElement as HTMLElement | null;
          this.showDialog(drawerRef, wantModal);
          this.enter(true);
          this.opened.emit();
        } else if (this.exitSlide) {
          // Reopened mid-exit: cancel the pending close and slide back in
          this.enter(true);
        } else if (this.shownAsModal !== wantModal) {
          // A modality change while open can only be honoured by reopening: the
          // native dialog fixes its modality at show()/showModal() time. The
          // panel is already on screen, so re-enter without re-sliding it.
          this.reopening = true;
          drawerRef.close();
          this.showDialog(drawerRef, wantModal);
          this.enter(false);
          this.reopening = false;
        }
        if (mode === 'push') {
          this.applyPush();
          this.addPushDismiss();
        } else {
          this.clearPush();
          this.removePushDismiss();
        }
      } else {
        if (drawerRef.open) {
          this.leave(drawerRef);
        }
        this.clearPush();
        this.removePushDismiss();
      }
    });

    inject(DestroyRef).onDestroy(() => {
      this.teardownPush();
      this.removePushDismiss();
      this.cancelLeave();
    });
  }

  private showDialog(drawerRef: HTMLDialogElement, modal: boolean): void {
    if (modal) {
      drawerRef.showModal();
    } else {
      drawerRef.show();
    }
    this.shownAsModal = modal;
  }

  // Slides the panel in by toggling the `--entered` state. The panel rests off
  // its positioned edge until `--entered` is added. Driving this from a class
  // (rather than @starting-style / allow-discrete) keeps the enter and exit
  // deterministic across browsers. `animate` is false when the panel is already
  // on screen (a modality reopen), so it snaps into place.
  private enter(animate: boolean): void {
    const dialog = this.drawerEl()?.nativeElement;
    if (!dialog) {
      return;
    }
    this.cancelLeave();
    if (!animate || this.animation() === 'none') {
      dialog.classList.add('ea-drawer--entered');
      return;
    }
    // The dialog has just switched from display:none, so a bare reflow is not
    // enough to seed the transition. Paint the off-edge state, then add
    // `--entered` two frames later so the browser animates the slide in.
    dialog.classList.remove('ea-drawer--entered');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (this.open() && dialog.open) {
          dialog.classList.add('ea-drawer--entered');
        }
      });
    });
  }

  // Slides the panel back off its edge, then closes the dialog once that slide
  // finishes. Closes at once when no slide starts (animation `none`, reduced
  // motion, or a panel that never slid in).
  private leave(dialog: HTMLDialogElement): void {
    if (this.exitSlide) {
      return;
    }
    dialog.classList.remove('ea-drawer--entered');
    this.followExitSlide(dialog);
  }

  // A slide cancelled by anything but a reopen may have been retargeted into a
  // new one, so the panel is checked again rather than closed outright
  private followExitSlide(dialog: HTMLDialogElement): void {
    const panel = this.panelEl()?.nativeElement;
    const slide = panel
      ? runningTransitions(panel, property => property === 'transform').at(0)
      : undefined;
    if (!slide) {
      this.exitSlide = null;
      this.finishClose(dialog);
      return;
    }
    this.exitSlide = slide;
    slide.finished.then(
      () => {
        if (this.exitSlide === slide) {
          this.exitSlide = null;
          this.finishClose(dialog);
        }
      },
      () => {
        if (this.exitSlide === slide) {
          this.followExitSlide(dialog);
        }
      },
    );
  }

  // Drops a pending exit so a reopen mid-exit does not later close the drawer
  private cancelLeave(): void {
    this.exitSlide = null;
  }

  private finishClose(dialog: HTMLDialogElement): void {
    // A reopen during the exit animation supersedes the close
    if (this.open()) {
      return;
    }
    if (dialog.open) {
      dialog.close();
    }
    this.previouslyFocused?.focus?.();
    this.previouslyFocused = null;
    this.shownAsModal = null;
  }

  handleClose(): void {
    this.open.set(false);
    this.closed.emit();
  }

  // Non-modal push drawers do not emit `cancel`, so Escape is handled here.
  // An overlay inside the drawer (menu, dropdown, picker) consumes the key it
  // acts on, which a modal drawer honours through `cancel`; respect it here too
  // so one press never dismisses both the overlay and the drawer.
  handleKeydown(event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return;
    }
    if (this.mode() === 'push' && this.closeOnEscape() && event.key === 'Escape') {
      this.handleClose();
    }
  }

  private resolvePushTarget(): HTMLElement | null {
    const target = this.pushTarget();
    if (target instanceof HTMLElement) {
      return target;
    }
    if (typeof target === 'string' && target.length > 0) {
      return document.querySelector<HTMLElement>(target);
    }
    return document.body;
  }

  private applyPush(): void {
    const target = this.resolvePushTarget();
    if (!target) {
      return;
    }
    if (this.pushRaf !== null) {
      cancelAnimationFrame(this.pushRaf);
    }
    this.pushRelease = null;
    // Measure on the next frame, once the view reflects the current position and
    // size. Measuring synchronously reads the panel's previous dimensions, so a
    // `height:100%` side panel switched to `top` would push content down by the
    // full viewport height and shove it off screen.
    this.pushRaf = requestAnimationFrame(() => {
      this.pushRaf = null;
      const panel = this.panelEl()?.nativeElement;
      if (!panel || !this.open() || this.mode() !== 'push') {
        return;
      }
      const position = this.position();
      const size =
        position === 'top' || position === 'bottom'
          ? panel.offsetHeight
          : panel.offsetWidth;
      // Match the content reflow to the panel's slide. The tokens resolve from
      // :root, so the duration still honours reduced motion (collapses to 0ms).
      const animation = this.animation();
      if (animation === 'none') {
        target.style.removeProperty('transition');
      } else {
        const ease = animation === 'linear' ? 'var(--ease-linear)' : 'var(--ease-out)';
        target.style.transition = `padding var(--duration-slower) ${ease}`;
      }
      // A target swap while open has to release the previous element too, or its
      // offset sticks around with nothing left to clear it
      if (this.pushedTarget && this.pushedTarget !== target) {
        this.clearPushProperties(this.pushedTarget);
        this.pushedTarget.style.removeProperty('transition');
      }
      // Clear every side first so a position change never stacks two offsets
      this.clearPushProperties(target);
      target.style.setProperty(PUSH_PROPERTY[position], `${size}px`);
      this.pushedTarget = target;
    });
  }

  private clearPush(): void {
    if (this.pushRaf !== null) {
      cancelAnimationFrame(this.pushRaf);
      this.pushRaf = null;
    }
    const target = this.pushedTarget;
    this.pushedTarget = null;
    if (!target) {
      return;
    }
    // Reflow the content back, then strip the leftover transition once that
    // reflow finishes or is cancelled, or straight away when none runs
    this.clearPushProperties(target);
    const reflow = runningTransitions(target, property => property.startsWith('padding'));
    if (reflow.length === 0) {
      target.style.removeProperty('transition');
      return;
    }
    const release = Promise.allSettled(reflow.map(transition => transition.finished));
    this.pushRelease = release;
    release.then(() => {
      if (this.pushRelease !== release) {
        return;
      }
      this.pushRelease = null;
      target.style.removeProperty('transition');
    });
  }

  private clearPushProperties(target: HTMLElement): void {
    for (const property of PUSH_PROPERTIES) {
      target.style.removeProperty(property);
    }
  }

  // Push mode has no modal backdrop, so an outside-click dismissal is wired to
  // the document. The click that opened the drawer can still be on its way up
  // to the document, and was stamped before the drawer opened, so only a click
  // stamped later dismisses.
  private addPushDismiss(): void {
    if (this.documentClickListener || !this.isBrowser) {
      return;
    }
    const wiredAt = performance.now();
    const listener = (event: MouseEvent): void => {
      if (event.timeStamp <= wiredAt || !this.closeOnBackdrop()) {
        return;
      }
      const panel = this.panelEl()?.nativeElement;
      if (!panel || panel.contains(event.target as Node)) {
        return;
      }
      // A drag out of the panel (selecting text, dragging a control) lands its
      // click outside, and is not a dismissal
      if (this.press.touchedInside(panel)) {
        return;
      }
      this.handleClose();
    };
    this.documentClickListener = listener;
    document.addEventListener('click', listener);
  }

  private removePushDismiss(): void {
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);
      this.documentClickListener = null;
    }
  }

  // Removes the push styles immediately, for teardown where no animation is wanted
  private teardownPush(): void {
    if (this.pushRaf !== null) {
      cancelAnimationFrame(this.pushRaf);
      this.pushRaf = null;
    }
    this.pushRelease = null;
    const target = this.pushedTarget;
    this.pushedTarget = null;
    if (target) {
      this.clearPushProperties(target);
      target.style.removeProperty('transition');
    }
  }

  handleBackdropClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop()) {
      return;
    }
    const drawerRef = this.drawerEl()?.nativeElement;
    // A press that touched the panel at either end reaches the drawer element
    // as a click too, since that is the first ancestor the panel and the
    // backdrop share; only a press confined to the backdrop dismisses
    if (event.target === drawerRef && this.press.stayedOn(drawerRef)) {
      this.handleClose();
    }
  }

  handleCancel(event: Event): void {
    // Always cancel the native instant-close so the exit can animate; then drive
    // the close ourselves, or keep the drawer open when Escape is disabled.
    event.preventDefault();
    if (this.closeOnEscape()) {
      this.handleClose();
    }
  }

  // The native <dialog> can close on its own (e.g. Escape), so reconcile the open
  // model here. When closeOnEscape is off, Chrome's repeated-Escape abuse
  // mitigation can force the close past cancel's preventDefault, so re-show to
  // keep the drawer open; otherwise mirror the close back into the model.
  onDialogClose(): void {
    const drawerRef = this.drawerEl()?.nativeElement;
    // Ignore the stale close event fired while reopening to switch modality
    if (this.reopening || !this.open() || drawerRef?.open) {
      return;
    }
    if (this.closeOnEscape()) {
      this.open.set(false);
      this.closed.emit();
    } else if (drawerRef) {
      this.showDialog(drawerRef, this.mode() !== 'push');
    }
  }
}
