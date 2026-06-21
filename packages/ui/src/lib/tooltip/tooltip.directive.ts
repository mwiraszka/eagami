import {
  Directive,
  ElementRef,
  type OnDestroy,
  Renderer2,
  inject,
  input,
} from '@angular/core';

import { computePopoverPosition } from '../popover/popover-positioning';

/** Placement of the tooltip relative to its host element. */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Attaches a positioned tooltip to its host element. Shows on hover and
 * focus, hides on leave/blur or Escape, and wires up `aria-describedby` so
 * the tooltip text is announced to assistive technology.
 */
@Directive({
  selector: '[eaTooltip]',
})
export class TooltipDirective implements OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  readonly eaTooltip = input.required<string>();
  readonly tooltipPosition = input<TooltipPosition>('top');
  /** Max width in px; the text wraps at this width. Clamped to a 50px floor. */
  readonly maxWidth = input<number | undefined>(200);

  private tooltipEl: HTMLElement | null = null;
  private readonly tooltipId = `ea-tooltip-${Math.random().toString(36).slice(2, 9)}`;

  // Touch devices fire `mouseenter` on tap but never fire `mouseleave` until
  // the user taps elsewhere, leaving hover-driven tooltips latched open. Track
  // hover capability reactively via the MediaQueryList so pointer listeners
  // are attached/detached when the device gains or loses hover (DevTools mobile
  // mode toggling, Bluetooth peripherals connecting, etc.) without a refresh.
  private readonly hoverMql =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(hover: hover)')
      : null;

  private readonly showHandler = () => this.show();
  private readonly hideHandler = () => this.hide();
  /* `:focus-visible` is supported in every targeted browser (Chrome, Firefox,
     Safari, Edge). Feature-detect so non-browser test environments (jsdom)
     fall back to always-on-focus behaviour rather than never showing. */
  private readonly supportsFocusVisible =
    typeof CSS !== 'undefined' && CSS.supports?.('selector(:focus-visible)') === true;
  /* Show on focus only when the focus is keyboard-driven. Clicking the
     trigger (e.g. a button that opens a menu) returns focus to the trigger
     after the menu closes; without this filter, the tooltip would latch
     open even though the user has moved their cursor away. `:focus-visible`
     is the browser's signal for "keyboard activation", which is exactly
     when a tooltip on focus is welcome. */
  private readonly focusHandler = (event: FocusEvent) => {
    // focusin bubbles, so the focused element may be a child of the host (e.g. the
    // inner <button> of <ea-button>); test it, not the host, for keyboard focus.
    const target = event.target as HTMLElement;
    if (!this.supportsFocusVisible || target.matches(':focus-visible')) {
      this.show();
    }
  };
  private readonly keydownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.tooltipEl) {
      this.hide();
    }
  };
  private readonly hoverChangeHandler = (event: MediaQueryListEvent) =>
    this.syncPointerListeners(event.matches);
  /* Re-runs the clamp so the tooltip stays inside the viewport when the page
     reflows under it (window resize, ancestor scroll, async content pushing
     the trigger around). Coalesced with rAF to keep scroll handling cheap. */
  private rafId: number | null = null;
  private readonly repositionHandler = () => {
    if (!this.tooltipEl || this.rafId !== null) {
      return;
    }
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      if (this.tooltipEl) {
        this.positionTooltip();
      }
    });
  };
  /* Capture-phase scroll listener catches scrolls on any ancestor, not just
     window. Without `capture: true`, only window-level scrolls fire here. */
  private readonly scrollListenerOptions: AddEventListenerOptions = {
    passive: true,
    capture: true,
  };
  /* Watches the trigger for size or position changes that don't fire any
     event (CSS transitions, image loads, sibling layout shifts). */
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    const native = this.el.nativeElement;
    // focusin/focusout (not focus/blur) so the tooltip still shows when the host
    // wraps the focusable element (focus does not bubble; focusin does).
    native.addEventListener('focusin', this.focusHandler);
    native.addEventListener('focusout', this.hideHandler);
    native.addEventListener('keydown', this.keydownHandler);

    this.syncPointerListeners(this.hoverMql?.matches ?? true);
    this.hoverMql?.addEventListener('change', this.hoverChangeHandler);
  }

  ngOnDestroy(): void {
    const native = this.el.nativeElement;
    native.removeEventListener('mouseenter', this.showHandler);
    native.removeEventListener('mouseleave', this.hideHandler);
    native.removeEventListener('focusin', this.focusHandler);
    native.removeEventListener('focusout', this.hideHandler);
    native.removeEventListener('keydown', this.keydownHandler);
    this.hoverMql?.removeEventListener('change', this.hoverChangeHandler);
    this.hide();
  }

  private syncPointerListeners(canHover: boolean): void {
    const native = this.el.nativeElement;
    // Remove first to keep this idempotent; addEventListener with the same
    // handler is a no-op anyway, but pairing keeps the bookkeeping obvious.
    native.removeEventListener('mouseenter', this.showHandler);
    native.removeEventListener('mouseleave', this.hideHandler);
    if (canHover) {
      native.addEventListener('mouseenter', this.showHandler);
      native.addEventListener('mouseleave', this.hideHandler);
    } else {
      this.hide();
    }
  }

  private show(): void {
    if (this.tooltipEl || !this.eaTooltip()) {
      return;
    }

    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipEl, 'ea-tooltip');
    this.renderer.addClass(this.tooltipEl, `ea-tooltip--${this.tooltipPosition()}`);
    this.renderer.setAttribute(this.tooltipEl, 'role', 'tooltip');
    this.renderer.setAttribute(this.tooltipEl, 'id', this.tooltipId);
    this.tooltipEl!.textContent = this.eaTooltip();

    const maxWidth = this.maxWidth();
    if (maxWidth != null) {
      this.renderer.setStyle(this.tooltipEl, 'max-width', `${Math.max(50, maxWidth)}px`);
      this.renderer.setStyle(this.tooltipEl, 'white-space', 'normal');
    }

    this.renderer.appendChild(document.body, this.tooltipEl);
    this.appendDescribedBy();
    this.shrinkToContent();
    this.positionTooltip();
    this.attachRepositionListeners();
  }

  /* A wrapping `max-width` box keeps its full max-width, leaving dead space to
     the right of every line that ends short. Pin the width to the longest
     rendered line so the bubble hugs its text. A Range over the contents spans
     all line boxes, so its bounding width is the longest line; it returns 0 in
     jsdom, where we leave the width alone. */
  private shrinkToContent(): void {
    if (this.maxWidth() == null || !this.tooltipEl) {
      return;
    }
    const range = document.createRange();
    range.selectNodeContents(this.tooltipEl);
    const textWidth = range.getBoundingClientRect().width;
    if (textWidth <= 0) {
      return;
    }
    const style = getComputedStyle(this.tooltipEl);
    const horizontalChrome =
      style.boxSizing === 'border-box'
        ? parseFloat(style.paddingLeft) +
          parseFloat(style.paddingRight) +
          parseFloat(style.borderLeftWidth) +
          parseFloat(style.borderRightWidth)
        : 0;
    this.renderer.setStyle(
      this.tooltipEl,
      'width',
      `${Math.ceil(textWidth + horizontalChrome)}px`,
    );
  }

  private hide(): void {
    this.detachRepositionListeners();
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.tooltipEl) {
      this.tooltipEl.remove();
      this.tooltipEl = null;
      this.removeDescribedBy();
    }
  }

  private attachRepositionListeners(): void {
    /* Guard against server-side rendering: ngOnDestroy can fire during SSR
       teardown and reach here even though the tooltip never actually shows. */
    if (typeof window === 'undefined') {
      return;
    }
    window.addEventListener('resize', this.repositionHandler);
    /* `capture: true` so we catch scrolls on any ancestor (modal body, sidebar,
       overflow:auto wrappers), not just the window. */
    window.addEventListener('scroll', this.repositionHandler, this.scrollListenerOptions);
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(this.repositionHandler);
      this.resizeObserver.observe(this.el.nativeElement);
      /* Body observer catches layout shifts that don't move the trigger
         (sibling content loads pushing the viewport's bottom around). */
      this.resizeObserver.observe(document.body);
    }
  }

  private detachRepositionListeners(): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.removeEventListener('resize', this.repositionHandler);
    window.removeEventListener(
      'scroll',
      this.repositionHandler,
      this.scrollListenerOptions,
    );
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
  }

  private appendDescribedBy(): void {
    const native = this.el.nativeElement;
    const existing = (native.getAttribute('aria-describedby') ?? '').trim();
    const tokens = existing ? existing.split(/\s+/) : [];
    if (!tokens.includes(this.tooltipId)) {
      tokens.push(this.tooltipId);
    }
    this.renderer.setAttribute(native, 'aria-describedby', tokens.join(' '));
  }

  private removeDescribedBy(): void {
    const native = this.el.nativeElement;
    const existing = (native.getAttribute('aria-describedby') ?? '').trim();
    const tokens = existing.split(/\s+/).filter((t: string) => t && t !== this.tooltipId);
    if (tokens.length) {
      this.renderer.setAttribute(native, 'aria-describedby', tokens.join(' '));
    } else {
      this.renderer.removeAttribute(native, 'aria-describedby');
    }
  }

  private positionTooltip(): void {
    if (!this.tooltipEl) {
      return;
    }

    const hostRect = this.el.nativeElement.getBoundingClientRect();

    /* Hide if the trigger itself has scrolled behind a sticky/fixed ancestor
       (typical app-header pattern) to keep the tooltip from tracking the
       trigger's coordinates into the header chrome. `elementFromPoint`
       ignores the tooltip (it sets `pointer-events: none`), so the hit-test
       reflects what the user actually sees at the trigger's centre. Also
       covers fully off-screen triggers without a separate viewport check.
       Feature-detected so jsdom (no `elementFromPoint`) and SSR skip the
       check rather than erroring. */
    const canHitTest = typeof document?.elementFromPoint === 'function';
    if (canHitTest) {
      const cx = hostRect.left + hostRect.width / 2;
      const cy = hostRect.top + hostRect.height / 2;
      const topmost = document.elementFromPoint(cx, cy);
      if (!topmost || !this.el.nativeElement.contains(topmost)) {
        this.hide();
        return;
      }
    }

    const tooltipRect = this.tooltipEl.getBoundingClientRect();
    /* Defer placement math to the shared popover positioning helper. `flip:
       false` keeps the tooltip on the requested side, only nudging inward at
       the edges: the caret is centered on the host and would point at empty
       space if we flipped. `margin: 8` keeps breathing room between the bubble
       and the viewport edge. */
    const placed = computePopoverPosition(
      hostRect,
      { width: tooltipRect.width, height: tooltipRect.height },
      {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      },
      { placement: this.tooltipPosition(), offset: 8, flip: false, margin: 8 },
    );
    const { top, left } = placed;

    /* Hide if the calculated bubble would render on top of a sticky/fixed
       overlay (typically the app header). Catches the case where the trigger
       is visible just below the header but a `position: top` tooltip would
       protrude into the header chrome; a trigger-only hit-test can't see this
       because the trigger itself is still on top. Walks the ancestor chain of
       whatever the user would see at the bubble's centre, looking for the
       first positioned (sticky / fixed) ancestor. */
    if (canHitTest) {
      const tcx = left + tooltipRect.width / 2;
      const tcy = top + tooltipRect.height / 2;
      const underBubble = document.elementFromPoint(tcx, tcy);
      if (underBubble && !this.el.nativeElement.contains(underBubble)) {
        let cursor: Element | null = underBubble;
        while (cursor && cursor !== document.body) {
          const pos = getComputedStyle(cursor).position;
          if (pos === 'fixed' || pos === 'sticky') {
            this.hide();
            return;
          }
          cursor = cursor.parentElement;
        }
      }
    }

    this.renderer.setStyle(this.tooltipEl, 'top', `${top + window.scrollY}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${left + window.scrollX}px`);
  }
}
