import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
  viewChildren,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { ChevronRightIconComponent } from '../icons/chevron-right.component';
import { MoreHorizontalIconComponent } from '../icons/more-horizontal.component';
import { PopoverComponent } from '../popover/popover.component';
import { type EaSize } from '../sizes';
import { uniqueId } from '../unique-id';

/** Visual style of the separator rendered between breadcrumb items. */
export type BreadcrumbsSeparator = 'chevron' | 'slash';

/** Visual size of the breadcrumb trail. */
export type BreadcrumbsSize = EaSize;

/** What a trail wider than its container does: move levels into a menu, or scroll sideways. */
export type BreadcrumbsOverflow = 'menu' | 'scroll';

/** Single entry in a breadcrumb trail. */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  disabled?: boolean;
}

/** Payload emitted when a breadcrumb is activated. */
export interface BreadcrumbClickEvent {
  item: BreadcrumbItem;
  index: number;
  event: MouseEvent;
}

/** A breadcrumb paired with its position in the full trail. */
interface IndexedBreadcrumb {
  item: BreadcrumbItem;
  index: number;
}

/**
 * Navigation trail that shows the user's location within a hierarchy. Items
 * with an `href` render as links, others render as buttons; the final item is
 * always treated as the current page and is non-interactive. Levels that go
 * past `maxItems`, or that the container has no room for, move into a menu
 * behind a button after the first item, earliest levels first, and return to
 * the trail as room opens up.
 */
@Component({
  selector: 'ea-breadcrumbs',
  imports: [
    ChevronRightIconComponent,
    MoreHorizontalIconComponent,
    NgTemplateOutlet,
    PopoverComponent,
  ],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbsComponent {
  protected readonly i18n = inject(EagamiI18nService);
  private readonly popover = viewChild(PopoverComponent);
  protected readonly expandEl = viewChild<ElementRef<HTMLButtonElement>>('expandEl');
  private readonly menuEl = viewChild<ElementRef<HTMLElement>>('menuEl');
  private readonly sizerEl = viewChild<ElementRef<HTMLElement>>('sizerEl');
  private readonly sizerItemEls = viewChildren<ElementRef<HTMLElement>>('sizerItemEl');
  private readonly sizerExpandEl = viewChild<ElementRef<HTMLElement>>('sizerExpandEl');

  readonly items = input<BreadcrumbItem[]>([]);
  readonly separator = input<BreadcrumbsSeparator>('chevron');
  /** Visual size of the breadcrumb trail. */
  readonly size = input<BreadcrumbsSize>('md');
  /**
   * Most items shown in the trail at once. The earliest levels after the first
   * item move into a menu to stay within it. Never fewer than two.
   */
  readonly maxItems = input<number | undefined>(undefined);
  /**
   * What happens when the trail is wider than its container. `menu` moves as
   * many levels as it takes into a menu, earliest first, keeping the first and
   * last item in the trail. `scroll` keeps every level and scrolls sideways.
   */
  readonly overflow = input<BreadcrumbsOverflow>('menu');
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: 'aria-label',
  });

  /** Fires when a non-disabled, non-final breadcrumb is activated. */
  readonly clicked = output<BreadcrumbClickEvent>();

  protected readonly menuId = uniqueId('ea-breadcrumbs-menu');
  protected readonly menuOpen = signal(false);
  // A menu opened by a click or a key stays until dismissed; one opened by
  // hovering closes when the pointer leaves
  private menuPinned = false;
  private readonly menuFocusPending = signal(false);

  /** Levels the container has no room for, counted from the one after the first item. */
  private readonly crowdedOut = signal(0);

  /** Accessible label for the breadcrumb nav, falling back to the active locale. */
  readonly resolvedAriaLabel = computed(
    () => this.ariaLabel() ?? this.i18n.messages().breadcrumbs.label,
  );

  private readonly indexed = computed<IndexedBreadcrumb[]>(() =>
    this.items().map((item, index) => ({ item, index })),
  );

  private readonly menuCount = computed(() => {
    const count = this.items().length;
    const max = this.maxItems();
    const overMax = max ? count - Math.max(2, max) : 0;
    const crowdedOut = this.overflow() === 'menu' ? this.crowdedOut() : 0;
    return Math.max(0, Math.min(count - 2, Math.max(overMax, crowdedOut)));
  });

  /** Items in the trail, each carrying its index into the full list. */
  protected readonly crumbs = computed(() => {
    const all = this.indexed();
    const inMenu = this.menuCount();
    return inMenu > 0 ? [all[0], ...all.slice(inMenu + 1)] : all;
  });

  /** Items moved into the menu, in trail order. */
  protected readonly menuCrumbs = computed(() =>
    this.indexed().slice(1, 1 + this.menuCount()),
  );

  constructor() {
    // Re-measures whenever the container or a level changes width, so levels
    // return to the trail as room opens up
    afterRenderEffect(onCleanup => {
      const sizer = this.sizerEl()?.nativeElement;
      const expand = this.sizerExpandEl()?.nativeElement;
      const levels = this.sizerItemEls();
      if (!sizer || !expand || typeof ResizeObserver === 'undefined') {
        return;
      }
      const observer = new ResizeObserver(() => this.fit());
      observer.observe(sizer);
      observer.observe(expand);
      for (const level of levels) {
        observer.observe(level.nativeElement);
      }
      onCleanup(() => observer.disconnect());
      // Measured in this render, ahead of the observer's first report, so the
      // trail never paints wider than its container
      untracked(() => this.fit());
    });

    // The panel stays invisible until the popover has measured itself, and an
    // invisible item cannot take focus
    afterRenderEffect(() => {
      if (this.menuFocusPending() && this.popover()?.isPositioned()) {
        untracked(() => {
          this.menuFocusPending.set(false);
          this.menuItems()[0]?.focus();
        });
      }
    });

    effect(() => {
      if (this.menuCrumbs().length === 0) {
        untracked(() => this.closeMenu());
      }
    });
  }

  isLast(index: number): boolean {
    return index === this.items().length - 1;
  }

  handleClick(item: BreadcrumbItem, index: number, event: MouseEvent): void {
    if (item.disabled || this.isLast(index)) {
      event.preventDefault();
      return;
    }
    this.clicked.emit({ item, index, event });
  }

  protected toggleMenu(): void {
    if (this.menuOpen() && this.menuPinned) {
      this.closeMenu();
    } else {
      this.openMenu(true);
    }
  }

  protected handleExpandKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.openMenu(true);
    } else if (event.key === 'Escape' && this.menuOpen()) {
      event.preventDefault();
      this.closeMenu();
    }
  }

  protected handleExpandEnter(): void {
    if (!this.menuOpen()) {
      this.openMenu(false);
    }
  }

  // Bound on both the button and the panel, so the pointer crossing from one to
  // the other keeps a hover-opened menu open
  protected handleHoverLeave(event: MouseEvent): void {
    if (this.menuPinned) {
      return;
    }
    const next = event.relatedTarget;
    const within =
      next instanceof Node &&
      (this.expandEl()?.nativeElement.contains(next) ||
        this.menuEl()?.nativeElement.contains(next));
    if (!within) {
      this.closeMenu();
    }
  }

  protected handleMenuClick(crumb: IndexedBreadcrumb, event: MouseEvent): void {
    this.clicked.emit({ item: crumb.item, index: crumb.index, event });
    this.closeMenu(true);
  }

  protected handleMenuKeydown(event: KeyboardEvent): void {
    const items = this.menuItems();
    const current = items.findIndex(item => item === document.activeElement);
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        items[current < items.length - 1 ? current + 1 : 0]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        items[current > 0 ? current - 1 : items.length - 1]?.focus();
        break;
      case 'Home':
        event.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        event.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case 'Escape':
        event.preventDefault();
        this.closeMenu(true);
        break;
      case 'Tab':
        // Focus goes back to the button first, so Tab moves on from the trail
        // and not from the portaled panel
        this.closeMenu(true);
        break;
    }
  }

  protected closeMenu(restoreFocus = false): void {
    if (!this.menuOpen()) {
      return;
    }
    this.menuOpen.set(false);
    this.menuPinned = false;
    this.menuFocusPending.set(false);
    if (restoreFocus) {
      this.expandEl()?.nativeElement.focus();
    }
  }

  private openMenu(pinned: boolean): void {
    this.menuPinned = pinned;
    this.menuOpen.set(true);
    this.menuFocusPending.set(pinned);
  }

  private menuItems(): HTMLElement[] {
    const menu = this.menuEl()?.nativeElement;
    return menu
      ? Array.from(
          menu.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled])'),
        )
      : [];
  }

  /**
   * Works out how many levels the container has no room for. The widths come
   * from the sizer, which lays out the whole trail whatever is collapsed, so
   * the answer never depends on what is currently in the menu.
   */
  private fit(): void {
    const sizer = this.sizerEl()?.nativeElement;
    const expand = this.sizerExpandEl()?.nativeElement;
    if (!sizer || !expand) {
      return;
    }
    const widths = this.sizerItemEls().map(
      level => level.nativeElement.getBoundingClientRect().width,
    );
    const gap = parseFloat(getComputedStyle(sizer).columnGap) || 0;
    const available = sizer.getBoundingClientRect().width;
    let needed = widths.reduce((sum, width) => sum + width + gap, -gap);
    let crowdedOut = 0;
    // Half a pixel of slack: fractional widths can sum to just past a container
    // they fit in
    while (crowdedOut < widths.length - 2 && needed > available + 0.5) {
      crowdedOut++;
      needed -= widths[crowdedOut] + gap;
      if (crowdedOut === 1) {
        needed += expand.getBoundingClientRect().width + gap;
      }
    }
    this.crowdedOut.set(crowdedOut);
  }
}
