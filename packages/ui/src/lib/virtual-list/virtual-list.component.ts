import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  computed,
  contentChild,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

/**
 * Context object passed to each `<ng-template #item>` projection inside an
 * `<ea-virtual-list>`. Mirrors `let-item="$implicit"` + `let-index="index"`.
 */
export interface VirtualListItemContext<T> {
  $implicit: T;
  index: number;
}

/**
 * `<ea-virtual-list>` is a low-level windowed-rendering primitive: it only
 * mounts the items currently in the visible viewport (plus a small overscan)
 * so that lists of tens of thousands of rows scroll smoothly.
 *
 * Fixed-height items only. Variable-height virtualization would need either
 * a measurement pass per row or a height estimator; both add complexity that
 * we don't ship in v1.
 *
 * Usage:
 * ```html
 * <ea-virtual-list
 *   [items]="rows"
 *   [itemHeight]="40"
 *   [viewportHeight]="400">
 *   <ng-template #item let-row let-i="index">
 *     <div class="row">{{ i }}: {{ row.label }}</div>
 *   </ng-template>
 * </ea-virtual-list>
 * ```
 *
 * The component intentionally stays role-agnostic — the consumer wraps the
 * projected item with whatever ARIA the use case calls for (`role="listitem"`,
 * `role="option"`, `role="row"`, etc.) and applies `aria-setsize` /
 * `aria-posinset` using the projected `index` if needed.
 */
@Component({
  selector: 'ea-virtual-list',
  templateUrl: './virtual-list.component.html',
  styleUrl: './virtual-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
})
export class VirtualListComponent<T = unknown> {
  readonly items = input.required<readonly T[]>();

  /** Pixel height of each item. Must be > 0. */
  readonly itemHeight = input.required<number>();

  /** Pixel height of the scrolling viewport. Must be > 0. */
  readonly viewportHeight = input.required<number>();

  /**
   * Extra rows rendered above and below the visible window. A small buffer
   * (3-5) hides the edge of the window during fast scrolls; larger values
   * trade memory for smoothness.
   */
  readonly overscan = input<number>(3);

  /** Index of the first row currently visible at the top of the viewport. */
  readonly scrollIndexChange = output<number>();

  /** Template applied to each rendered item — projected via `<ng-template #item>`. */
  protected readonly itemTemplate =
    contentChild.required<TemplateRef<VirtualListItemContext<T>>>('item');

  protected readonly viewportEl = viewChild<ElementRef<HTMLElement>>('viewport');

  private readonly scrollTop = signal<number>(0);

  protected readonly totalHeight = computed(
    () => this.items().length * this.itemHeight(),
  );

  protected readonly viewportStyle = computed(() => ({
    height: `${this.viewportHeight()}px`,
  }));

  protected readonly spacerStyle = computed(() => ({
    height: `${this.totalHeight()}px`,
  }));

  protected readonly visibleRange = computed(() => {
    const height = this.itemHeight();
    const total = this.items().length;
    if (height <= 0 || total === 0) return { start: 0, end: 0 };

    const buffer = Math.max(0, this.overscan());
    const firstVisible = Math.floor(this.scrollTop() / height);
    const lastVisible = Math.ceil((this.scrollTop() + this.viewportHeight()) / height);
    return {
      start: Math.max(0, firstVisible - buffer),
      end: Math.min(total, lastVisible + buffer),
    };
  });

  protected readonly visibleItems = computed(() => {
    const { start, end } = this.visibleRange();
    const items = this.items();
    const out: Array<{ index: number; item: T }> = [];
    for (let i = start; i < end; i++) {
      out.push({ index: i, item: items[i] });
    }
    return out;
  });

  protected itemStyle(index: number): Record<string, string> {
    return {
      position: 'absolute',
      top: `${index * this.itemHeight()}px`,
      left: '0',
      right: '0',
      height: `${this.itemHeight()}px`,
    };
  }

  protected onScroll(event: Event): void {
    const top = (event.target as HTMLElement).scrollTop;
    this.scrollTop.set(top);
    const firstVisible = Math.floor(top / this.itemHeight());
    this.scrollIndexChange.emit(firstVisible);
  }

  /**
   * Programmatically scroll the viewport so that the row at `index` is the
   * top-most visible row. Out-of-range values are clamped to the list bounds.
   */
  scrollToIndex(index: number): void {
    const el = this.viewportEl()?.nativeElement;
    if (!el) return;
    const clamped = Math.max(0, Math.min(this.items().length - 1, index));
    el.scrollTop = clamped * this.itemHeight();
  }
}
