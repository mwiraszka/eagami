import {
  Directive,
  ElementRef,
  type EmbeddedViewRef,
  type OnDestroy,
  Renderer2,
  RendererStyleFlags2,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';

import { resolveAriaTarget } from '../aria-target';
import { isRtl } from '../direction';
import { computePopoverPosition } from '../popover/popover-positioning';
import { enterTopLayer, leaveTopLayer } from '../top-layer';
import { isContentClipped } from '../truncation';

/** Placement of the tooltip relative to its host element. */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/** Gap between the trigger and the bubble. */
const TRIGGER_GAP = 8;
/** Matches the `--ea-tooltip-viewport-margin` fallback in `_tooltip.scss`. */
const DEFAULT_VIEWPORT_MARGIN = 8;

/** Keeps one axis inside the viewport, leaving `margin` at each edge. */
function clampToViewport(
  value: number,
  size: number,
  viewport: number,
  margin: number,
): number {
  return Math.min(Math.max(value, margin), Math.max(margin, viewport - size - margin));
}

/**
 * Attaches a positioned tooltip to its host element. Shows on hover and
 * focus, hides on leave/blur or Escape, and wires up `aria-describedby` so
 * the tooltip text is announced to assistive technology. Accepts either a
 * plain string or a `TemplateRef` for styled multi-part content. Binding an
 * empty string suppresses the bubble, which is how a host shows one only in
 * some states (a label that is currently truncated, say).
 *
 * The directive listens on `focusin`, not `focus`, so it fires for a focusable
 * descendant of the host as well as the host itself. A host listener paired
 * with `eaTooltip` has to use `focusin` for the same reason: `focus` does not
 * bubble, so it never fires when the focus lands on a child.
 *
 * Bubbles never grow past the viewport: they clamp to it, minus
 * `--ea-tooltip-viewport-margin` on each side, and scroll whatever the clamp
 * cuts off. A clamped bubble takes pointer events so that scrollbar is
 * reachable, which also means it waits `dismissDelay` before hiding rather than
 * going the moment the pointer leaves the trigger. Bubbles that fit stay
 * display-only.
 */
@Directive({
  selector: '[eaTooltip]',
})
export class TooltipDirective implements OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly viewContainer = inject(ViewContainerRef);

  readonly eaTooltip = input.required<string | TemplateRef<unknown>>();
  readonly tooltipPosition = input<TooltipPosition>('top');
  /**
   * Whether a bubble with no room on the requested side moves to the opposite
   * one. The side is resolved when the bubble opens and held while it still
   * fits, so a bubble does not hop across its trigger mid-hover.
   */
  readonly flip = input<boolean>(true);
  /**
   * Show only while the trigger is cutting its own content off, which is how a
   * label that ellipsizes reveals its full text without a bubble on every
   * label that fits. The whole subtree is measured, since the box doing the
   * cutting is usually an inner one.
   */
  readonly whenClipped = input<boolean>(false);
  /**
   * Max width in px; the text wraps at this width. Clamped to a 50px floor, and
   * to the viewport, which no value can push the bubble past.
   */
  readonly maxWidth = input<number | undefined>(200);
  /**
   * Grace period in ms before a bubble the viewport clamp made scrollable hides
   * after the pointer leaves, long enough to cross the gap onto the bubble and
   * reach its scrollbar. Bubbles that fit hide immediately.
   */
  readonly dismissDelay = input<number>(150);

  private tooltipEl: HTMLElement | null = null;
  /** Side the open bubble settled on, held across repositions while it fits. */
  private placedPosition: TooltipPosition = 'top';
  private templateView: EmbeddedViewRef<unknown> | null = null;
  private scrollable = false;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
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
  private readonly hideHandler = () => this.requestHide();
  private readonly bubbleEnterHandler = () => this.cancelPendingHide();
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
  /* Registered on `document` while the tooltip is visible so Escape dismisses
     hover-triggered tooltips too, wherever focus happens to be (WCAG 1.4.13). */
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
  /* A resize, and a page zoom with it, re-lays out the text at a new
     device-pixel grid, so the width is re-derived before the bubble is placed
     again. Scrolling moves the bubble without touching its text. */
  private readonly relayoutHandler = () => {
    this.shrinkToContent();
    this.repositionHandler();
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

    this.syncPointerListeners(this.hoverMql?.matches ?? true);
    this.hoverMql?.addEventListener('change', this.hoverChangeHandler);
  }

  ngOnDestroy(): void {
    const native = this.el.nativeElement;
    native.removeEventListener('mouseenter', this.showHandler);
    native.removeEventListener('mouseleave', this.hideHandler);
    native.removeEventListener('focusin', this.focusHandler);
    native.removeEventListener('focusout', this.hideHandler);
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
    if (this.tooltipEl) {
      // The pointer came back to the trigger before a scheduled hide fired
      this.cancelPendingHide();
      return;
    }
    if (!this.eaTooltip()) {
      return;
    }
    if (this.whenClipped() && !isContentClipped(this.el.nativeElement)) {
      return;
    }

    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipEl, 'ea-tooltip');
    this.placedPosition = this.tooltipPosition();
    this.renderer.addClass(this.tooltipEl, `ea-tooltip--${this.placedPosition}`);
    this.renderer.setAttribute(this.tooltipEl, 'role', 'tooltip');
    this.renderer.setAttribute(this.tooltipEl, 'id', this.tooltipId);
    const content = this.eaTooltip();
    if (content instanceof TemplateRef) {
      this.templateView = this.viewContainer.createEmbeddedView(content);
      this.templateView.detectChanges();
      for (const node of this.templateView.rootNodes) {
        this.renderer.appendChild(this.tooltipEl, node);
      }
    } else {
      this.tooltipEl!.textContent = content;
    }

    const maxWidth = this.maxWidth();
    if (maxWidth != null) {
      this.renderer.setStyle(
        this.tooltipEl,
        '--ea-tooltip-max-width',
        `${Math.max(50, maxWidth)}px`,
        RendererStyleFlags2.DashCase,
      );
      this.renderer.addClass(this.tooltipEl, 'ea-tooltip--wrapping');
    }

    this.renderer.appendChild(document.body, this.tooltipEl);
    // Inert until the bubble turns out to be scrollable and takes the pointer
    this.tooltipEl!.addEventListener('mouseenter', this.bubbleEnterHandler);
    this.tooltipEl!.addEventListener('mouseleave', this.hideHandler);
    // Before any measuring below: a trigger inside a modal needs its bubble in
    // the top layer to be visible at all, and a promoted bubble only has layout
    // once shown.
    enterTopLayer(this.tooltipEl!, this.el.nativeElement);
    document.addEventListener('keydown', this.keydownHandler);
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
    // A width pinned earlier is the wrap point the text would be measured
    // against, so the bubble could only ever get narrower from here
    this.renderer.removeStyle(this.tooltipEl, 'width');
    const range = document.createRange();
    range.selectNodeContents(this.tooltipEl);
    const textWidth = range.getBoundingClientRect().width;
    if (textWidth <= 0) {
      return;
    }
    const style = getComputedStyle(this.tooltipEl);
    const contentWidth = parseFloat(style.width);
    if (!Number.isFinite(contentWidth)) {
      return;
    }
    /* Whatever the border box holds beyond its content box: padding, borders,
       and a scrollbar if the height clamp put one there. Read as the difference
       between two fractional widths; `offsetWidth` and `clientWidth` round to
       whole pixels, and under a page zoom the box sits on fractional ones, so
       rounded arithmetic pins the bubble a hair narrower than its own text and
       the last word drops to a second line inside a box sized for one. */
    const horizontalChrome =
      style.boxSizing === 'border-box'
        ? this.tooltipEl.getBoundingClientRect().width - contentWidth
        : 0;
    this.renderer.setStyle(
      this.tooltipEl,
      'width',
      `${Math.ceil(textWidth + horizontalChrome)}px`,
    );
  }

  /* A scrollable bubble has to be reachable, so leaving the trigger only
     schedules the hide and moving onto the bubble in time cancels it. A bubble
     that fits shows nothing the pointer needs, so it goes straight away. */
  private requestHide(): void {
    if (!this.scrollable) {
      this.hide();
      return;
    }
    this.cancelPendingHide();
    this.hideTimer = setTimeout(
      () => {
        this.hideTimer = null;
        this.hide();
      },
      Math.max(0, this.dismissDelay()),
    );
  }

  private cancelPendingHide(): void {
    if (this.hideTimer !== null) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  private hide(): void {
    this.cancelPendingHide();
    this.detachRepositionListeners();
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.tooltipEl) {
      document.removeEventListener('keydown', this.keydownHandler);
      leaveTopLayer(this.tooltipEl);
      this.tooltipEl.remove();
      this.tooltipEl = null;
      this.scrollable = false;
      this.templateView?.destroy();
      this.templateView = null;
      this.removeDescribedBy();
    }
  }

  private attachRepositionListeners(): void {
    /* Guard against server-side rendering: ngOnDestroy can fire during SSR
       teardown and reach here even though the tooltip never actually shows. */
    if (typeof window === 'undefined') {
      return;
    }
    window.addEventListener('resize', this.relayoutHandler);
    /* `capture: true` so we catch scrolls on any ancestor (modal body, sidebar,
       overflow:auto wrappers), not just the window. */
    window.addEventListener('scroll', this.repositionHandler, this.scrollListenerOptions);
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(this.relayoutHandler);
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
    window.removeEventListener('resize', this.relayoutHandler);
    window.removeEventListener(
      'scroll',
      this.repositionHandler,
      this.scrollListenerOptions,
    );
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
  }

  private appendDescribedBy(): void {
    const native = resolveAriaTarget(this.el.nativeElement);
    const existing = (native.getAttribute('aria-describedby') ?? '').trim();
    const tokens = existing ? existing.split(/\s+/) : [];
    if (!tokens.includes(this.tooltipId)) {
      tokens.push(this.tooltipId);
    }
    this.renderer.setAttribute(native, 'aria-describedby', tokens.join(' '));
  }

  private removeDescribedBy(): void {
    const native = resolveAriaTarget(this.el.nativeElement);
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
       trigger's coordinates into the header chrome. A display-only bubble is
       invisible to `elementFromPoint` (`pointer-events: none`), so the hit-test
       reflects what the user actually sees at the trigger's centre; a scrollable
       one is not, and finding it there means the trigger is still on screen with
       its own bubble over it, not chrome. Also covers fully off-screen triggers
       without a separate viewport check. Feature-detected so jsdom (no
       `elementFromPoint`) and SSR skip the check rather than erroring. */
    const canHitTest = typeof document?.elementFromPoint === 'function';
    if (canHitTest) {
      const cx = hostRect.left + hostRect.width / 2;
      const cy = hostRect.top + hostRect.height / 2;
      const topmost = document.elementFromPoint(cx, cy);
      const visible =
        topmost &&
        (this.el.nativeElement.contains(topmost) || this.tooltipEl.contains(topmost));
      if (!visible) {
        this.hide();
        return;
      }
    }

    // The bubble lives on <body>, escaping the host's dir context, so mirror
    // the host's resolved direction onto it.
    this.renderer.setAttribute(
      this.tooltipEl,
      'dir',
      isRtl(this.el.nativeElement) ? 'rtl' : 'ltr',
    );
    // Read after the stylesheet's clamp has applied, so a bubble the viewport cut
    // down is placed at the size it actually renders at
    const tooltipRect = this.tooltipEl.getBoundingClientRect();
    const viewport = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
    const margin = this.viewportMargin();
    /* Defer placement math to the shared popover positioning helper. The side
       already resolved is the one fed back in, so a bubble moves off it only
       once it stops fitting rather than hopping across the trigger mid-hover;
       with `flip` off it is nudged inward at the edges instead. */
    const placed = computePopoverPosition(
      hostRect,
      { width: tooltipRect.width, height: tooltipRect.height },
      viewport,
      {
        placement: this.placedPosition,
        offset: TRIGGER_GAP,
        flip: this.flip(),
        margin,
      },
    );
    this.applyPlacedPosition(placed.placement as TooltipPosition);
    /* The helper leaves the placement axis alone so a panel too tall for the
       space beside its anchor can overflow and scroll with the page. A bubble
       cannot: it is clamped to the viewport and fixed there, so anything pushed
       past an edge is simply unreachable. Pin both axes and accept that a bubble
       as tall as the viewport ends up over its own trigger. */
    const left = clampToViewport(placed.left, tooltipRect.width, viewport.width, margin);
    const top = clampToViewport(placed.top, tooltipRect.height, viewport.height, margin);

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
      if (
        underBubble &&
        !this.el.nativeElement.contains(underBubble) &&
        !this.tooltipEl.contains(underBubble)
      ) {
        let cursor: Element | null = underBubble;
        while (cursor && cursor !== document.body) {
          /* A fixed / sticky container that also holds the trigger (a modal
             dialog, a popover surface) is the surface the bubble sits on, not
             chrome covering it, so stop before mistaking it for an overlay. */
          if (cursor.contains(this.el.nativeElement)) {
            break;
          }
          const pos = getComputedStyle(cursor).position;
          if (pos === 'fixed' || pos === 'sticky') {
            this.hide();
            return;
          }
          cursor = cursor.parentElement;
        }
      }
    }

    this.renderer.setStyle(this.tooltipEl, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${left}px`);
    this.syncScrollable();
  }

  private applyPlacedPosition(position: TooltipPosition): void {
    if (!this.tooltipEl || position === this.placedPosition) {
      return;
    }
    this.renderer.removeClass(this.tooltipEl, `ea-tooltip--${this.placedPosition}`);
    this.renderer.addClass(this.tooltipEl, `ea-tooltip--${position}`);
    this.placedPosition = position;
  }

  /* The stylesheet's viewport cap and the margin the bubble is placed against
     have to agree, so both read the same token. */
  private viewportMargin(): number {
    if (!this.tooltipEl) {
      return DEFAULT_VIEWPORT_MARGIN;
    }
    const declared = parseFloat(
      getComputedStyle(this.tooltipEl).getPropertyValue('--ea-tooltip-viewport-margin'),
    );
    return Number.isFinite(declared) ? declared : DEFAULT_VIEWPORT_MARGIN;
  }

  /* Content the clamp cut off is only reachable once the bubble takes the
     pointer. Re-checked on every reposition, since a resize can bring the cap
     into play or take it back out under a bubble that is already open. */
  private syncScrollable(): void {
    if (!this.tooltipEl) {
      return;
    }
    // A pixel of slack: sub-pixel content rounds `scrollHeight` up on a box that fits
    const scrollable =
      this.tooltipEl.scrollHeight > this.tooltipEl.clientHeight + 1 ||
      this.tooltipEl.scrollWidth > this.tooltipEl.clientWidth + 1;
    if (scrollable === this.scrollable) {
      return;
    }
    this.scrollable = scrollable;
    if (scrollable) {
      this.renderer.addClass(this.tooltipEl, 'ea-tooltip--scrollable');
    } else {
      this.renderer.removeClass(this.tooltipEl, 'ea-tooltip--scrollable');
    }
  }
}
