import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { uniqueId } from '../unique-id';
import {
  type PopoverPlacement,
  type PopoverPositionResult,
  computePopoverPosition,
} from './popover-positioning';

export type { PopoverPlacement } from './popover-positioning';

/** ARIA role to apply to the popover surface. */
export type PopoverRole = 'menu' | 'listbox' | 'dialog' | 'tooltip' | 'grid';

/**
 * How the popover should respond to scroll / resize events while open.
 *
 * - `reposition` (default): re-measure the anchor and update the popover's
 *   coordinates so it stays attached. Suitable for menus and tooltips.
 * - `close`: request close. Suitable for dropdown lists and the colour-picker
 *   popover, where re-tracking a tall popover during a scroll feels intrusive.
 * - `ignore`: do nothing. The popover stays at its initial coordinates and
 *   may visually detach from a scrolling anchor; useful when the anchor is
 *   guaranteed not to move (e.g. inside a non-scrolling region).
 */
export type PopoverScrollBehavior = 'reposition' | 'close' | 'ignore';

/**
 * Floating-element primitive. Renders projected content as `position: fixed`
 * anchored to an external element, with flip-on-overflow, viewport clamping,
 * outside-click and Escape dismissal, and SSR-safe scroll / resize handling.
 *
 * The primitive is intentionally low-level: a parent component drives the
 * `[open]` state and listens for `(closeRequested)` to mirror it back. Internal
 * library components (`<ea-menu>`, `<ea-dropdown>`, `<ea-color-picker>`,
 * `<ea-date-picker>`, `[eaTooltip]`) compose on top of it; downstream apps can
 * use it directly to build their own popover-based UI.
 *
 * @example
 * ```html
 * <button #trigger (click)="open.set(!open())">Open</button>
 * <ea-popover [anchor]="trigger" [open]="open()" (closeRequested)="open.set(false)">
 *   <div>Popover content</div>
 * </ea-popover>
 * ```
 */
@Component({
  selector: 'ea-popover',
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Strip ARIA attributes from the host element. Angular's template parser
  // mirrors any static `role="..."` / `aria-label="..."` on `<ea-popover>` to
  // both the matching input AND the host's DOM attributes; without these
  // clears, axe sees an empty `<ea-popover role="dialog">` (even when closed,
  // since the host is always in the document) and flags it for missing names
  // / nested roles. The role and label belong on the inner `__surface` div,
  // which already applies them conditionally on `open()`.
  host: {
    '[attr.role]': 'null',
    '[attr.aria-label]': 'null',
  },
})
export class PopoverComponent {
  private readonly destroyRef = inject(DestroyRef);

  private readonly surfaceEl = viewChild<ElementRef<HTMLElement>>('surfaceEl');

  /** Anchor element the popover positions itself against. */
  readonly anchor = input.required<HTMLElement | ElementRef<HTMLElement> | undefined>();

  /** Whether the popover is currently open. */
  readonly open = input<boolean>(false);

  /** Where the popover attaches relative to the anchor. */
  readonly placement = input<PopoverPlacement>('bottom-start');

  /** ARIA role applied to the popover surface. */
  readonly role = input<PopoverRole>('dialog');

  /** Accessible label. Falls back to nothing; consumers should provide one when no visible heading is in the popover. */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  /** DOM id for the surface so trigger elements can reference it via aria-controls. */
  readonly surfaceId = input<string>(uniqueId('ea-popover'));

  /** Gap in px between the anchor and the popover. */
  readonly offset = input<number>(0);

  /** Flip to the opposite side when the requested side overflows the viewport. */
  readonly flip = input<boolean>(true);

  /** Clamp the popover inside the viewport when it would otherwise overflow. */
  readonly clamp = input<boolean>(true);

  /** Set the popover's `min-width` to match the anchor's width (dropdown pattern). */
  readonly matchAnchorWidth = input<boolean>(false);

  /** Close on click outside the popover and the anchor. */
  readonly closeOnOutsideClick = input<boolean>(true);

  /** Close on Escape. */
  readonly closeOnEscape = input<boolean>(true);

  /** What to do on scroll / resize while open. */
  readonly scrollBehavior = input<PopoverScrollBehavior>('reposition');

  /** Requested close. The parent should mirror this into `[open]`. */
  readonly closeRequested = output<void>();

  private readonly position = signal<PopoverPositionResult | null>(null);

  /** True placement after flip, for class-based styling (e.g. arrow direction). */
  readonly effectivePlacement = computed(
    () => this.position()?.placement ?? this.placement(),
  );

  /** Latches true once the post-rAF reposition has run, so the surface is
   * only revealed after its dimensions are guaranteed stable. Reset on close. */
  private readonly stable = signal(false);

  /** True once the first `reposition()` has resolved a placement on a
   * laid-out surface. Drives the `--positioned` class. */
  readonly isPositioned = computed(
    () => this.open() && this.position() !== null && this.stable(),
  );

  /** Class list for the surface. Computed in TS so the placement key (with
   * its interpolated suffix) and the positioned modifier compose cleanly. */
  readonly surfaceClass = computed(
    () =>
      `ea-popover__surface ea-popover__surface--${this.effectivePlacement()}${
        this.isPositioned() ? ' ea-popover__surface--positioned' : ''
      }`,
  );

  /** Inline style applied to the surface element. */
  readonly surfaceStyle = computed<Record<string, string>>(() => {
    if (!this.open()) {
      return { display: 'none' };
    }
    const p = this.position();
    if (!p) {
      return {};
    }
    const style: Record<string, string> = {
      top: `${p.top}px`,
      left: `${p.left}px`,
    };
    if (p.width !== undefined) {
      style['min-width'] = `${p.width}px`;
    }
    return style;
  });

  constructor() {
    // Re-measure and reposition whenever the anchor, placement, surface, or
    // open state changes. Reading `surfaceEl()` here makes it a tracked signal
    // dependency, so the effect re-runs once Angular has rendered the `@if`
    // block and the viewChild signal has updated; at that point both the
    // anchor and the surface have a `getBoundingClientRect`, and the position
    // can be computed. This is more reliable than `afterNextRender` because it
    // doesn't depend on a single render cycle landing in the expected order
    // (some host environments, Storybook docs mode for example, defer that
    // callback in a way that leaves the surface stuck at `visibility: hidden`).
    // Naturally SSR-safe: the surface never renders on the server, so the
    // effect always early-returns during prerender.
    // Teleport the surface to `document.body` as soon as it exists so
    // `position: fixed` is always relative to the actual viewport (escaping
    // any transformed/contained ancestor that would otherwise create a new
    // containing block). Doing the move on init, not on open, also means
    // the first `getBoundingClientRect` call inside `reposition()` reads a
    // surface that's already in its final DOM home, so the browser's layout
    // is settled and dimensions are accurate. Skipped in SSR (no `document`).
    effect(() => {
      const surface = this.surfaceEl()?.nativeElement;
      if (
        surface &&
        typeof document !== 'undefined' &&
        surface.parentNode !== document.body
      ) {
        document.body.appendChild(surface);
      }
    });

    effect(() => {
      const surface = this.surfaceEl()?.nativeElement;
      const anchor = this.resolveAnchor();
      const isOpen = this.open();
      if (!surface || !anchor || !isOpen) {
        this.position.set(null);
        this.stable.set(false);
        return;
      }
      // Re-read inputs so signal subscriptions stay current after a re-open.
      this.placement();
      this.offset();
      this.flip();
      this.clamp();
      this.matchAnchorWidth();
      // First reposition runs synchronously off the open effect (fast), but
      // the surface is still transitioning out of `display: none` and the
      // first `getBoundingClientRect` can report the surface's natural width
      // even when that overflows the viewport. We deliberately keep the
      // surface hidden (`visibility: hidden` from CSS) until the next rAF
      // when the browser has finished laying it out at its real dimensions;
      // the second reposition then uses accurate measurements and the
      // `stable` latch flips, revealing the surface at the final position
      // with no visible jump. SSR / non-browser hosts fall back to flipping
      // `stable` synchronously.
      this.reposition();
      if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(() => {
          if (!this.open()) {
            return;
          }
          this.reposition();
          this.stable.set(true);
        });
      } else {
        this.stable.set(true);
      }
    });

    // Watch the surface's own size and reposition whenever it changes. The
    // first `reposition()` after open fires synchronously inside the open
    // effect, while the surface is still transitioning out of `display: none`;
    // in some browsers the layout pass hasn't completed, so the
    // `getBoundingClientRect` width can read as the surface's natural width
    // even when that overflows the viewport, so the clamp can't kick in. The
    // ResizeObserver fires once the surface has been laid out with its real
    // dimensions, giving us a second, accurate measurement to clamp against.
    // Also catches projected-content size changes while the popover is open
    // (e.g. virtualised lists adding rows).
    if (typeof ResizeObserver !== 'undefined') {
      const surfaceResizeObserver = new ResizeObserver(() => {
        if (this.open()) {
          this.reposition();
        }
      });
      effect(() => {
        const surface = this.surfaceEl()?.nativeElement;
        surfaceResizeObserver.disconnect();
        if (surface) {
          surfaceResizeObserver.observe(surface);
        }
      });
      this.destroyRef.onDestroy(() => surfaceResizeObserver.disconnect());
    }

    // Listen for scroll / resize while open. The `scrollBehavior` input picks
    // the response. SSR guard is required because the website prerenders pages
    // that mount popovers.
    if (typeof window !== 'undefined') {
      const onViewportChange = (): void => {
        if (!this.open()) {
          return;
        }
        const behavior = this.scrollBehavior();
        if (behavior === 'close') {
          this.closeRequested.emit();
        } else if (behavior === 'reposition') {
          this.reposition();
        }
      };
      window.addEventListener('scroll', onViewportChange, {
        capture: true,
        passive: true,
      });
      window.addEventListener('resize', onViewportChange);
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onViewportChange, { capture: true });
        window.removeEventListener('resize', onViewportChange);
      });
    }

    // Explicitly remove the portaled surface on destroy. Angular's view
    // destruction normally removes nodes the renderer created, but moving the
    // surface via raw `appendChild` (out of its original anchor slot) is
    // enough to break that tracking in some host environments: Storybook's
    // SPA navigation between docs pages, for one, leaves the surface stranded
    // in `document.body` after the parent component is gone. Removing it here
    // guarantees cleanup regardless of how Angular's view destruction handles
    // the relocated node.
    this.destroyRef.onDestroy(() => {
      const surface = this.surfaceEl()?.nativeElement;
      surface?.parentNode?.removeChild(surface);
    });
  }

  private resolveAnchor(): HTMLElement | null {
    const a = this.anchor();
    if (!a) {
      return null;
    }
    return a instanceof ElementRef ? a.nativeElement : a;
  }

  private reposition(): void {
    if (typeof window === 'undefined') {
      return;
    }
    const anchor = this.resolveAnchor();
    const surface = this.surfaceEl()?.nativeElement;
    if (!anchor || !surface) {
      return;
    }
    const anchorRect = anchor.getBoundingClientRect();
    const surfaceRect = surface.getBoundingClientRect();
    this.position.set(
      computePopoverPosition(
        anchorRect,
        { width: surfaceRect.width, height: surfaceRect.height },
        { width: window.innerWidth, height: window.innerHeight },
        {
          placement: this.placement(),
          offset: this.offset(),
          flip: this.flip(),
          clamp: this.clamp(),
          matchAnchorWidth: this.matchAnchorWidth(),
        },
      ),
    );
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.open() || !this.closeOnOutsideClick()) {
      return;
    }
    const target = event.target as Node | null;
    if (!target) {
      return;
    }
    const anchor = this.resolveAnchor();
    if (anchor?.contains(target)) {
      return;
    }
    if (this.surfaceEl()?.nativeElement.contains(target)) {
      return;
    }
    this.closeRequested.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.open() || !this.closeOnEscape()) {
      return;
    }
    this.closeRequested.emit();
  }
}
