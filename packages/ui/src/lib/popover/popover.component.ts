import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import {
  PopoverPlacement,
  PopoverPositionResult,
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
 *   may visually detach from a scrolling anchor — useful when the anchor is
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
})
export class PopoverComponent {
  private readonly injector = inject(Injector);
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
  readonly surfaceId = input<string>(
    `ea-popover-${Math.random().toString(36).slice(2, 9)}`,
  );

  /** Gap in px between the anchor and the popover. */
  readonly offset = input<number>(4);

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

  /** Inline style applied to the surface element. */
  readonly surfaceStyle = computed<Record<string, string>>(() => {
    const p = this.position();
    if (!p) return { visibility: 'hidden' };
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
    // Re-measure and reposition whenever the anchor, placement, or open state
    // changes. `afterNextRender` makes the popover's own `getBoundingClientRect`
    // measurable (it only has dimensions once Angular has actually rendered
    // the element), and is naturally SSR-safe — the callback never fires
    // during prerender.
    effect(() => {
      const anchor = this.resolveAnchor();
      const isOpen = this.open();
      if (!anchor || !isOpen) {
        this.position.set(null);
        return;
      }
      afterNextRender(() => this.reposition(), { injector: this.injector });
    });

    // Listen for scroll / resize while open. The `scrollBehavior` input picks
    // the response. SSR guard is required because the website prerenders pages
    // that mount popovers.
    if (typeof window !== 'undefined') {
      const onViewportChange = (): void => {
        if (!this.open()) return;
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
  }

  private resolveAnchor(): HTMLElement | null {
    const a = this.anchor();
    if (!a) return null;
    return a instanceof ElementRef ? a.nativeElement : a;
  }

  private reposition(): void {
    if (typeof window === 'undefined') return;
    const anchor = this.resolveAnchor();
    const surface = this.surfaceEl()?.nativeElement;
    if (!anchor || !surface) return;
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
    if (!this.open() || !this.closeOnOutsideClick()) return;
    const target = event.target as Node | null;
    if (!target) return;
    const anchor = this.resolveAnchor();
    if (anchor?.contains(target)) return;
    if (this.surfaceEl()?.nativeElement.contains(target)) return;
    this.closeRequested.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.open() || !this.closeOnEscape()) return;
    this.closeRequested.emit();
  }
}
