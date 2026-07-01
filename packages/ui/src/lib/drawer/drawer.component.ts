import { NgClass, isPlatformBrowser } from '@angular/common';
import {
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
  viewChild,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { XIconComponent } from '../icons/x.component';
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

/**
 * Side panel backed by the native `<dialog>` element for browser-managed
 * focus trapping. Slides in from a configurable edge, supports backdrop and
 * Escape dismissal, and exposes `header`, default, and `footer` content
 * slots. The `open` state is a two-way `model()` binding. In `push` mode it
 * opens non-modally and reflows the page content aside instead of overlaying it.
 */
@Component({
  selector: 'ea-drawer',
  imports: [NgClass, XIconComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DrawerComponent {
  private readonly drawerEl = viewChild<ElementRef<HTMLDialogElement>>('drawerEl');
  private readonly panelEl = viewChild<ElementRef<HTMLElement>>('panelEl');
  private previouslyFocused: HTMLElement | null = null;
  private pushedTarget: HTMLElement | null = null;
  private pushedProperty: string | null = null;
  private pushCleanupTimer: ReturnType<typeof setTimeout> | null = null;
  // Which modality the open dialog was shown with, so a `mode` change while it
  // is open can reopen it in the matching modality. `null` means it is closed.
  private shownAsModal: boolean | null = null;
  private reopening = false;
  protected readonly i18n = inject(EagamiI18nService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

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

  constructor() {
    effect(() => {
      const drawerRef = this.drawerEl()?.nativeElement;
      const open = this.open();
      const mode = this.mode();
      // Re-run the push measurement if size, position, or target change while open.
      this.size();
      this.position();
      this.pushTarget();
      // `<dialog>` APIs and focus management are browser-only, but the effect
      // still runs during SSR, so skip the DOM work on the server.
      if (!drawerRef || !this.isBrowser) {
        return;
      }

      // Push mode stays non-modal so the page behind it remains interactive.
      const wantModal = mode !== 'push';

      if (open) {
        if (!drawerRef.open) {
          this.previouslyFocused = document.activeElement as HTMLElement | null;
          this.showDialog(drawerRef, wantModal);
          this.opened.emit();
        } else if (this.shownAsModal !== wantModal) {
          // A modality change while open can only be honoured by reopening: the
          // native dialog fixes its modality at show()/showModal() time.
          this.reopening = true;
          drawerRef.close();
          this.showDialog(drawerRef, wantModal);
          this.reopening = false;
        }
        if (mode === 'push') {
          this.applyPush();
        } else {
          this.clearPush();
        }
      } else {
        if (drawerRef.open) {
          drawerRef.close();
          this.previouslyFocused?.focus?.();
          this.previouslyFocused = null;
        }
        this.shownAsModal = null;
        this.clearPush();
      }
    });

    inject(DestroyRef).onDestroy(() => this.teardownPush());
  }

  private showDialog(drawerRef: HTMLDialogElement, modal: boolean): void {
    if (modal) {
      drawerRef.showModal();
    } else {
      drawerRef.show();
    }
    this.shownAsModal = modal;
  }

  handleClose(): void {
    this.open.set(false);
    this.closed.emit();
  }

  // Non-modal push drawers do not emit `cancel`, so Escape is handled here.
  handleKeydown(event: KeyboardEvent): void {
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
    const panel = this.panelEl()?.nativeElement;
    const target = this.resolvePushTarget();
    if (!panel || !target) {
      return;
    }
    const position = this.position();
    const property = PUSH_PROPERTY[position];
    // Undo a stale push if the target or side changed while the drawer is open.
    if (
      this.pushedTarget &&
      this.pushedProperty &&
      (this.pushedTarget !== target || this.pushedProperty !== property)
    ) {
      this.pushedTarget.style.removeProperty(this.pushedProperty);
    }
    if (this.pushCleanupTimer !== null) {
      clearTimeout(this.pushCleanupTimer);
      this.pushCleanupTimer = null;
    }
    const size =
      position === 'top' || position === 'bottom'
        ? panel.offsetHeight
        : panel.offsetWidth;
    // Match the content reflow to the panel's slide animation. The tokens resolve
    // from :root, so the duration still honours reduced motion (collapses to 0ms).
    const animation = this.animation();
    if (animation === 'none') {
      target.style.removeProperty('transition');
    } else {
      const ease = animation === 'linear' ? 'var(--ease-linear)' : 'var(--ease-out)';
      target.style.transition = `padding var(--duration-slow) ${ease}`;
    }
    target.style.setProperty(property, `${size}px`);
    this.pushedTarget = target;
    this.pushedProperty = property;
  }

  private clearPush(): void {
    const target = this.pushedTarget;
    const property = this.pushedProperty;
    this.pushedTarget = null;
    this.pushedProperty = null;
    if (!target || !property) {
      return;
    }
    // Reflow the content back, then strip the leftover transition once it
    // settles. A timer (rather than `transitionend`) keeps cleanup deterministic
    // when no transition fires, e.g. under reduced motion.
    target.style.removeProperty(property);
    if (this.pushCleanupTimer !== null) {
      clearTimeout(this.pushCleanupTimer);
    }
    this.pushCleanupTimer = setTimeout(() => {
      target.style.removeProperty('transition');
      this.pushCleanupTimer = null;
    }, this.pushTransitionMs(target));
  }

  // Removes the push styles immediately, for teardown where no animation is wanted.
  private teardownPush(): void {
    if (this.pushCleanupTimer !== null) {
      clearTimeout(this.pushCleanupTimer);
      this.pushCleanupTimer = null;
    }
    const target = this.pushedTarget;
    const property = this.pushedProperty;
    this.pushedTarget = null;
    this.pushedProperty = null;
    if (target && property) {
      target.style.removeProperty(property);
      target.style.removeProperty('transition');
    }
  }

  private pushTransitionMs(target: HTMLElement): number {
    const raw = getComputedStyle(target).transitionDuration.split(',')[0].trim();
    const value = parseFloat(raw);
    if (!Number.isFinite(value)) {
      return 0;
    }
    return raw.endsWith('ms') ? value : value * 1000;
  }

  handleBackdropClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop()) {
      return;
    }
    const drawerRef = this.drawerEl()?.nativeElement;
    if (event.target === drawerRef) {
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

  // The native <dialog> can close on its own (e.g. Escape), so reconcile the open
  // model here. When closeOnEscape is off, Chrome's repeated-Escape abuse
  // mitigation can force the close past cancel's preventDefault, so re-show to
  // keep the drawer open; otherwise mirror the close back into the model.
  onDialogClose(): void {
    const drawerRef = this.drawerEl()?.nativeElement;
    // Ignore the stale close event fired while reopening to switch modality.
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
