import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  inject,
  input,
} from '@angular/core';

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
  /* `:focus-visible` is supported in every browser we target (Chrome, Firefox,
     Safari, Edge — all stable for years). Feature-detect so non-browser test
     environments (jsdom) fall back to the previous always-on-focus behaviour
     rather than silently never showing. */
  private readonly supportsFocusVisible =
    typeof CSS !== 'undefined' && CSS.supports?.('selector(:focus-visible)') === true;
  /* Show on focus only when the focus is keyboard-driven. Clicking the
     trigger (e.g. a button that opens a menu) returns focus to the trigger
     after the menu closes; without this filter, the tooltip would latch
     open even though the user has moved their cursor away. `:focus-visible`
     is the browser's signal for "keyboard activation", which is exactly
     when a tooltip on focus is welcome. */
  private readonly focusHandler = () => {
    if (!this.supportsFocusVisible || this.el.nativeElement.matches(':focus-visible')) {
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
    if (!this.tooltipEl || this.rafId !== null) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      if (this.tooltipEl) this.positionTooltip();
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
    // Focus/blur/keydown always wire up — keyboard users benefit on any device.
    native.addEventListener('focus', this.focusHandler);
    native.addEventListener('blur', this.hideHandler);
    native.addEventListener('keydown', this.keydownHandler);

    this.syncPointerListeners(this.hoverMql?.matches ?? true);
    this.hoverMql?.addEventListener('change', this.hoverChangeHandler);
  }

  ngOnDestroy(): void {
    const native = this.el.nativeElement;
    native.removeEventListener('mouseenter', this.showHandler);
    native.removeEventListener('mouseleave', this.hideHandler);
    native.removeEventListener('focus', this.focusHandler);
    native.removeEventListener('blur', this.hideHandler);
    native.removeEventListener('keydown', this.keydownHandler);
    this.hoverMql?.removeEventListener('change', this.hoverChangeHandler);
    this.hide();
  }

  private syncPointerListeners(canHover: boolean): void {
    const native = this.el.nativeElement;
    // Remove first to keep this idempotent — addEventListener with the same
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
    if (this.tooltipEl || !this.eaTooltip()) return;

    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipEl, 'ea-tooltip');
    this.renderer.addClass(this.tooltipEl, `ea-tooltip--${this.tooltipPosition()}`);
    this.renderer.setAttribute(this.tooltipEl, 'role', 'tooltip');
    this.renderer.setAttribute(this.tooltipEl, 'id', this.tooltipId);
    this.tooltipEl!.textContent = this.eaTooltip();

    this.renderer.appendChild(document.body, this.tooltipEl);
    this.appendDescribedBy();
    this.positionTooltip();
    this.attachRepositionListeners();
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
    if (typeof window === 'undefined') return;
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
    if (typeof window === 'undefined') return;
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
    if (!tokens.includes(this.tooltipId)) tokens.push(this.tooltipId);
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
    if (!this.tooltipEl) return;

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
    const gap = 8;
    /* Keep at least this much breathing room between the tooltip and the
       viewport edge so the rounded corner and shadow don't kiss the chrome. */
    const edgePadding = 8;

    let top: number;
    let left: number;

    switch (this.tooltipPosition()) {
      case 'top':
        top = hostRect.top - tooltipRect.height - gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - gap;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + gap;
        break;
    }

    /* Clamp to the viewport so tooltips on near-edge triggers shift inward
       rather than getting clipped by the chrome. The position arrow (the small
       caret) stays centered on the host because the clamp only moves the
       bubble; we don't try to flip placement here, just nudge along the
       cross-axis. */
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    left = Math.max(
      edgePadding,
      Math.min(left, viewportWidth - tooltipRect.width - edgePadding),
    );
    top = Math.max(
      edgePadding,
      Math.min(top, viewportHeight - tooltipRect.height - edgePadding),
    );

    /* Hide if the calculated bubble would render on top of a sticky/fixed
       overlay (typically the app header). Catches the case where the trigger
       is visible just below the header but a `position: top` tooltip would
       protrude into the header chrome — the previous trigger-only hit-test
       can't see this because the trigger itself is still on top. Walks the
       ancestor chain of whatever the user would see at the bubble's centre,
       looking for the first positioned (sticky / fixed) ancestor. */
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
