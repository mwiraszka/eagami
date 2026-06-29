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

import { isRtl } from '../direction';
import { EagamiI18nService } from '../i18n/i18n.service';
import { ArrowDownIconComponent } from '../icons/arrow-down.component';
import { ArrowUpIconComponent } from '../icons/arrow-up.component';
import { ChevronsUpDownIconComponent } from '../icons/chevrons-up-down.component';

/** Vertical density preset for table rows and header cells. */
export type DataTableDensity = 'compact' | 'comfortable' | 'spacious';

/** Sort direction; `null` means no sort is applied. */
export type DataTableSortDirection = 'asc' | 'desc' | null;

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

  // Rows skipped per PageUp/PageDown within the grid body.
  private static readonly PAGE_JUMP = 10;

  readonly columns = input.required<DataTableColumn<T>[]>();
  readonly data = input.required<T[]>();
  readonly trackBy = input<keyof T | undefined>(undefined);
  readonly density = input<DataTableDensity>('comfortable');
  readonly stickyHeader = input<boolean>(false);
  readonly striped = input<boolean>(false);
  readonly hoverable = input<boolean>(true);
  readonly bordered = input<boolean>(false);
  readonly noDataText = input<string | undefined>(undefined);
  /** Enables grid keyboard navigation: `role="grid"`, roving tabindex, and arrow-key cell movement. */
  readonly navigable = input<boolean>(false);
  /** Marks body rows as clickable: shows a pointer cursor and emits `rowActivate` on click or Enter/Space. Independent of `hoverable` and `navigable`. */
  readonly clickable = input<boolean>(false);

  readonly sort = model<DataTableSortState>({ column: '', direction: null });

  /** Fires whenever the sort column or direction changes via header click. */
  readonly sorted = output<DataTableSortState>();

  /** Fires with the row's data when a body row is activated by click or Enter/Space while `clickable` is set. */
  readonly rowActivate = output<T>();

  readonly noDataTemplate = contentChild<TemplateRef<unknown>>('noData');

  /** Empty-state text, falling back to the active locale's translation. */
  readonly resolvedNoDataText = computed(
    () => this.noDataText() ?? this.i18n.messages().dataTable.noData,
  );

  readonly hostClasses = computed(() => ({
    [`ea-data-table--${this.density()}`]: true,
    'ea-data-table--sticky': this.stickyHeader(),
    'ea-data-table--striped': this.striped(),
    'ea-data-table--hoverable': this.hoverable(),
    'ea-data-table--bordered': this.bordered(),
    'ea-data-table--navigable': this.navigable(),
    'ea-data-table--clickable': this.clickable(),
  }));

  constructor() {
    // Keep the active cell in range as columns or row count change (sort, paging,
    // data swaps) so a stale index can't strand focus outside the grid.
    effect(() => {
      const rows = this.sortedData().length;
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

  // Roving tabindex for a header cell; sortable-only focus outside grid mode
  headerTabindex(col: DataTableColumn<T>, colIndex: number): number | null {
    if (this.navigable()) {
      const active = this.activeCell();
      return active.row === 0 && active.col === colIndex ? 0 : -1;
    }
    return col.sortable ? 0 : null;
  }

  // Roving tabindex for a body cell; never focusable outside grid mode
  bodyCellTabindex(row: number, colIndex: number): number | null {
    if (!this.navigable()) {
      return null;
    }
    const active = this.activeCell();
    return active.row === row && active.col === colIndex ? 0 : -1;
  }

  // Body rows are keyboard-focusable for activation only in clickable mode, and
  // only when grid navigation (which owns cell-level focus) is off.
  rowTabindex(): number | null {
    return this.clickable() && !this.navigable() ? 0 : null;
  }

  // Click passes no event; Enter/Space pass one so default scroll/re-trigger is
  // suppressed. In navigable mode the keydown bubbles up from the focused cell.
  onRowActivate(row: T, event?: Event): void {
    if (!this.clickable()) {
      return;
    }
    event?.preventDefault();
    this.rowActivate.emit(row);
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
    const rows = this.sortedData().length;
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
