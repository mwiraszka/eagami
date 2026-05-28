import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
  model,
  output,
} from '@angular/core';

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

  readonly columns = input.required<DataTableColumn<T>[]>();
  readonly data = input.required<T[]>();
  readonly trackBy = input<keyof T | undefined>(undefined);
  readonly density = input<DataTableDensity>('comfortable');
  readonly stickyHeader = input<boolean>(false);
  readonly striped = input<boolean>(false);
  readonly hoverable = input<boolean>(true);
  readonly bordered = input<boolean>(false);
  readonly noDataText = input<string | undefined>(undefined);

  readonly sort = model<DataTableSortState>({ column: '', direction: null });

  /** Fires whenever the sort column or direction changes via header click. */
  readonly sorted = output<DataTableSortState>();

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
  }));

  readonly sortedData = computed(() => {
    const items = this.data();
    const { column, direction } = this.sort();
    if (!column || !direction) return items;

    return [...items].sort((a, b) => {
      const valA = (a as Record<string, unknown>)[column];
      const valB = (b as Record<string, unknown>)[column];

      if (valA == null && valB == null) return 0;
      if (valA == null) return direction === 'asc' ? -1 : 1;
      if (valB == null) return direction === 'asc' ? 1 : -1;

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
    if (!col.sortable) return;

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
}
