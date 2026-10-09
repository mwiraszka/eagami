import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  type TemplateRef,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';

import {
  contextMenuPoint,
  isContextMenuShortcut,
} from '../context-menu/context-menu-request';
import { isRtl } from '../direction';
import { EagamiI18nService } from '../i18n/i18n.service';
import { ArrowDownIconComponent } from '../icons/arrow-down.component';
import { ArrowUpIconComponent } from '../icons/arrow-up.component';
import { ChevronsUpDownIconComponent } from '../icons/chevrons-up-down.component';
import { type PopoverAnchorPoint } from '../popover/popover-positioning';
import { type EaSize } from '../sizes';
import { SkeletonComponent } from '../skeleton/skeleton.component';

/** Vertical density preset for table rows and header cells. */
export type DataTableDensity = 'compact' | 'comfortable' | 'spacious';

/** Visual size of the table's text, paddings, and icons. */
export type DataTableSize = EaSize;

/** How column widths are worked out: from the cells' content, or from the columns' `width`s alone. */
export type DataTableLayout = 'auto' | 'fixed';

/** Sort direction; `null` means no sort is applied. */
export type DataTableSortDirection = 'asc' | 'desc' | null;

function isModifiedClick(event: MouseEvent): boolean {
  return (
    event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey
  );
}

/** Column definition for the data table, including optional cell/header templates. */
export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  format?: (value: unknown) => string;
  cellTemplate?: TemplateRef<{ $implicit: T; value: unknown }>;
  headerTemplate?: TemplateRef<{ $implicit: DataTableColumn<T> }>;
  /** Shown in this column's cells while the table is `loading`, in place of a skeleton bar. */
  placeholderTemplate?: TemplateRef<{ $implicit: DataTableColumn<T>; index: number }>;
}

/** A body row's context-menu request, as `rowContextMenu` emits it. */
export interface DataTableRowContextMenuEvent<T = Record<string, unknown>> {
  /** The row's data. */
  readonly row: T;
  /** The row's `<tr>`, for anchoring a menu or popover to the row. */
  readonly rowElement: HTMLElement;
  /** Where to open a menu: the pointer, or below the focused row or cell for a keyboard request. */
  readonly point: PopoverAnchorPoint;
  /** The originating event; call `preventDefault()` on it to suppress the browser's own menu. */
  readonly event: MouseEvent | KeyboardEvent;
}

/** Current sort state: which column is sorted and in which direction. */
export interface DataTableSortState {
  column: string;
  direction: DataTableSortDirection;
}

/**
 * Table for tabular data with sortable columns, sticky headers, and density
 * presets. Supports striping, borders, hoverable rows, and custom cell or
 * header templates via `ng-template`. Sort state is exposed as a two-way
 * `model()` binding.
 */
@Component({
  selector: 'ea-data-table',
  imports: [
    ArrowDownIconComponent,
    ArrowUpIconComponent,
    ChevronsUpDownIconComponent,
    NgClass,
    NgTemplateOutlet,
    SkeletonComponent,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DataTableComponent<T = Record<string, unknown>> {
  private readonly i18n = inject(EagamiI18nService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  // Roving-tabindex active cell for grid navigation. Row 0 is the header row;
  // body rows are 1..N. Only meaningful while `navigable` is true.
  private readonly activeCell = signal<{ row: number; col: number }>({ row: 0, col: 0 });

  // Rows skipped per PageUp/PageDown within the grid body
  private static readonly PAGE_JUMP = 10;

  // Set by a Shift+F10 nobody claimed, so the `contextmenu` event the browser follows
  // it with is not reported a second time; cleared by the key's release or a pointer press
  private keyboardRequestPending = false;

  readonly columns = input.required<DataTableColumn<T>[]>();
  readonly data = input.required<T[]>();
  /**
   * Rows holding each column's widest content. They are laid out but never shown,
   * so column widths come from them rather than from whichever rows are in `data`,
   * and stay put across pages and while data loads. Moot with `stickyHeader`, whose
   * columns share the width equally unless given a `width`.
   */
  readonly sizingRows = input<T[]>([]);
  /** Accessible name for the table, announced when it takes focus as a grid. */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  /** Visible caption rendered above the table; also names it for assistive technology. */
  readonly caption = input<string | undefined>(undefined);
  readonly trackBy = input<keyof T | undefined>(undefined);
  readonly density = input<DataTableDensity>('comfortable');
  /** Visual size of the table; density paddings and icons scale with it. */
  readonly size = input<DataTableSize>('md');
  readonly stickyHeader = input<boolean>(false);
  readonly striped = input<boolean>(false);
  readonly hoverable = input<boolean>(true);
  readonly bordered = input<boolean>(false);
  /** Keeps every cell on one line, so a narrow viewport scrolls the table sideways instead of wrapping its text. */
  readonly nowrap = input<boolean>(false);
  /**
   * How column widths are worked out. `auto` sizes columns by their content. `fixed`
   * holds every column at its `width` whatever its cells hold, at any viewport width,
   * scrolling the table sideways when they don't fit and sharing what is left among
   * columns without one, so the table keeps its shape while loading and as data changes.
   * Content wider than its column overflows it, so cells in a fixed layout should fit
   * or truncate. Moot with `stickyHeader`, whose rows always lay out this way.
   */
  readonly layout = input<DataTableLayout>('auto');
  readonly noDataText = input<string | undefined>(undefined);
  /** Enables grid keyboard navigation: `role="grid"`, roving tabindex, and arrow-key cell movement. */
  readonly navigable = input<boolean>(false);
  /** Marks body rows as clickable: shows a pointer cursor and emits `rowActivate` on click or Enter/Space. Independent of `hoverable` and `navigable`. */
  readonly clickable = input<boolean>(false);
  /**
   * Gives a row its link target, or `null` for none. Every cell of the row then holds
   * a real link, so the browser shows the target on hover and a modified click opens
   * it elsewhere, while a plain click still emits `rowActivate` for the app to route.
   * A row given `null` is inert: no link, hover highlight, focus or activation.
   */
  readonly rowHref = input<((row: T) => string | null) | undefined>(undefined);
  /**
   * Shows placeholder rows in place of the data while it loads, and marks the table
   * busy for assistive technology. A placeholder row stands as tall as a row of text,
   * and `sizingRows` keep the columns at their loaded widths.
   */
  readonly loading = input<boolean>(false);
  /** How many placeholder rows to show while `loading`. */
  readonly loadingRowCount = input<number>(5);

  readonly sort = model<DataTableSortState>({ column: '', direction: null });

  /** Fires whenever the sort column or direction changes via header click. */
  readonly sorted = output<DataTableSortState>();

  /** Fires with the row's data when a body row is activated by click or Enter/Space while `clickable` is set. */
  readonly rowActivate = output<T>();

  /**
   * Fires when a body row's context menu is requested: by right-click or long press,
   * or by Shift+F10 or the context-menu key with focus in the row. Call
   * `event.preventDefault()` when opening a menu of your own.
   */
  readonly rowContextMenu = output<DataTableRowContextMenuEvent<T>>();

  readonly noDataTemplate = contentChild<TemplateRef<unknown>>('noData');

  /** Empty-state text, falling back to the active locale's translation. */
  readonly resolvedNoDataText = computed(
    () => this.noDataText() ?? this.i18n.messages().dataTable.noData,
  );

  readonly placeholderRows = computed(() =>
    Array.from({ length: Math.max(0, Math.floor(this.loadingRowCount())) }, (_, i) => i),
  );

  // Placeholder rows hold nothing to navigate to, so a loading grid is its header alone
  private readonly bodyRowCount = computed(() =>
    this.loading() ? 0 : this.sortedData().length,
  );

  readonly hostClasses = computed(() => ({
    [`ea-data-table--${this.density()}`]: true,
    [`ea-data-table--${this.size()}`]: true,
    'ea-data-table--sticky': this.stickyHeader(),
    'ea-data-table--striped': this.striped(),
    'ea-data-table--hoverable': this.hoverable(),
    'ea-data-table--bordered': this.bordered(),
    'ea-data-table--nowrap': this.nowrap(),
    'ea-data-table--fixed': this.layout() === 'fixed',
    'ea-data-table--navigable': this.navigable(),
    'ea-data-table--clickable': this.clickable(),
    'ea-data-table--linked': !!this.rowHref(),
  }));

  constructor() {
    // Keep the active cell in range as columns or row count change (sort, paging,
    // data swaps) so a stale index can't strand focus outside the grid.
    effect(() => {
      const rows = this.bodyRowCount();
      const cols = this.columns().length;
      const { row, col } = untracked(this.activeCell);
      const nextRow = Math.min(row, rows);
      const nextCol = Math.min(col, Math.max(0, cols - 1));
      if (nextRow !== row || nextCol !== col) {
        this.activeCell.set({ row: nextRow, col: nextCol });
      }
    });
  }

  readonly sortedData = computed(() => {
    const items = this.data();
    const { column, direction } = this.sort();
    if (!column || !direction) {
      return items;
    }

    return [...items].sort((a, b) => {
      const valA = (a as Record<string, unknown>)[column];
      const valB = (b as Record<string, unknown>)[column];

      if (valA == null && valB == null) {
        return 0;
      }
      if (valA == null) {
        return direction === 'asc' ? -1 : 1;
      }
      if (valB == null) {
        return direction === 'asc' ? 1 : -1;
      }

      let comparison: number;
      if (typeof valA === 'number' && typeof valB === 'number') {
        comparison = valA - valB;
      } else if (typeof valA === 'string' && typeof valB === 'string') {
        comparison = valA.localeCompare(valB);
      } else {
        comparison = String(valA).localeCompare(String(valB));
      }

      return direction === 'asc' ? comparison : -comparison;
    });
  });

  getCellValue(row: T, key: string): unknown {
    return (row as Record<string, unknown>)[key];
  }

  onHeaderClick(col: DataTableColumn<T>): void {
    if (!col.sortable) {
      return;
    }

    const current = this.sort();
    let direction: DataTableSortDirection;

    if (current.column === col.key) {
      direction =
        current.direction === 'asc'
          ? 'desc'
          : current.direction === 'desc'
            ? null
            : 'asc';
    } else {
      direction = 'asc';
    }

    const next: DataTableSortState = { column: direction ? col.key : '', direction };
    this.sort.set(next);
    this.sorted.emit(next);
  }

  trackByFn(_index: number, item: T): unknown {
    const key = this.trackBy();
    return key ? (item as Record<string, unknown>)[key as string] : _index;
  }

  // Roving tabindex for a header cell in grid mode; outside grid mode the
  // sortable header's inner sort button is the natural tab stop
  headerTabindex(colIndex: number): number | null {
    if (!this.navigable()) {
      return null;
    }
    const active = this.activeCell();
    return active.row === 0 && active.col === colIndex ? 0 : -1;
  }

  // Grid-mode cell activation; ignores keydowns bubbling up from the sort
  // button, whose native Enter/Space activation already fires its click handler
  onHeaderKeydown(event: Event, col: DataTableColumn<T>): void {
    if (event.target !== event.currentTarget) {
      return;
    }
    event.preventDefault();
    this.onHeaderClick(col);
  }

  // Roving tabindex for a body cell; never focusable outside grid mode
  bodyCellTabindex(row: number, colIndex: number): number | null {
    if (!this.navigable()) {
      return null;
    }
    const active = this.activeCell();
    return active.row === row && active.col === colIndex ? 0 : -1;
  }

  // A row that `rowHref` gives no target leads nowhere, so it is left inert
  isInert(row: T): boolean {
    const href = this.rowHref();
    return !!href && href(row) === null;
  }

  // Body rows are keyboard-focusable for activation only in clickable mode, and
  // only when grid navigation (which owns cell-level focus) is off.
  rowTabindex(row: T): number | null {
    return this.clickable() && !this.navigable() && !this.isInert(row) ? 0 : null;
  }

  // Suppresses the default of Enter/Space and of a row link's plain click, which
  // the app routes itself. A modified click on a row link is the browser's to open
  // elsewhere. In navigable mode the keydown bubbles up from the focused cell.
  onRowActivate(row: T, event?: Event): void {
    if (!this.clickable() || this.isInert(row)) {
      return;
    }
    if (event instanceof MouseEvent && isModifiedClick(event)) {
      return;
    }
    event?.preventDefault();
    this.rowActivate.emit(row);
  }

  // Reports a row's context-menu request. A `contextmenu` event trailing a Shift+F10
  // that was already reported unclaimed is the browser's own follow-up, not a new request
  onRowContextMenu(
    row: T,
    rowElement: HTMLElement,
    event: MouseEvent | KeyboardEvent,
  ): void {
    if (event instanceof KeyboardEvent) {
      if (!isContextMenuShortcut(event)) {
        return;
      }
    } else if (this.keyboardRequestPending) {
      this.keyboardRequestPending = false;
      return;
    }
    this.rowContextMenu.emit({
      row,
      rowElement,
      point: contextMenuPoint(event, rowElement),
      event,
    });
    if (event instanceof KeyboardEvent && !event.defaultPrevented) {
      this.keyboardRequestPending = true;
    }
  }

  // Ends the window in which a browser follows an unclaimed Shift+F10 with `contextmenu`
  clearKeyboardRequest(): void {
    this.keyboardRequestPending = false;
  }

  // Syncs roving focus when a cell is focused by mouse or keyboard tab
  onCellFocus(row: number, col: number): void {
    if (!this.navigable()) {
      return;
    }
    const active = this.activeCell();
    if (active.row !== row || active.col !== col) {
      this.activeCell.set({ row, col });
    }
  }

  onGridKeydown(event: KeyboardEvent): void {
    if (!this.navigable()) {
      return;
    }
    const cols = this.columns().length;
    const rows = this.bodyRowCount();
    if (cols === 0) {
      return;
    }

    const { row, col } = this.activeCell();
    let nextRow = row;
    let nextCol = col;
    const rtl = isRtl(event.currentTarget as Element);

    switch (event.key) {
      case 'ArrowRight':
        nextCol = rtl ? Math.max(0, col - 1) : Math.min(cols - 1, col + 1);
        break;
      case 'ArrowLeft':
        nextCol = rtl ? Math.min(cols - 1, col + 1) : Math.max(0, col - 1);
        break;
      case 'ArrowDown':
        nextRow = Math.min(rows, row + 1);
        break;
      case 'ArrowUp':
        nextRow = Math.max(0, row - 1);
        break;
      case 'Home':
        nextCol = 0;
        if (event.ctrlKey) {
          nextRow = 0;
        }
        break;
      case 'End':
        nextCol = cols - 1;
        if (event.ctrlKey) {
          nextRow = rows;
        }
        break;
      case 'PageDown':
        nextRow = Math.min(rows, row + DataTableComponent.PAGE_JUMP);
        break;
      case 'PageUp':
        nextRow = Math.max(0, row - DataTableComponent.PAGE_JUMP);
        break;
      default:
        return;
    }

    event.preventDefault();
    if (nextRow !== row || nextCol !== col) {
      this.focusCell(nextRow, nextCol);
    }
  }

  private focusCell(row: number, col: number): void {
    this.activeCell.set({ row, col });
    this.host.nativeElement
      .querySelector<HTMLElement>(`[data-ea-cell="${row}-${col}"]`)
      ?.focus();
  }
}
