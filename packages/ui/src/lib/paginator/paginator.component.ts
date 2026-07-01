import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';

import { ButtonComponent } from '../button/button.component';
import { EagamiI18nService } from '../i18n/i18n.service';
import { ChevronLeftIconComponent } from '../icons/chevron-left.component';
import { ChevronRightIconComponent } from '../icons/chevron-right.component';
import { type EaSize } from '../sizes';

/** Horizontal alignment of paginator controls within their container. */
export type PaginatorAlign = 'left' | 'center' | 'right';

/** Visual size of the paginator. */
export type PaginatorSize = EaSize;

/** Snapshot of the paginator's page and page size. */
export interface PaginatorState {
  page: number;
  pageSize: number;
}

/**
 * Page navigation control with previous/next buttons, numbered page jumps,
 * an optional page-size selector, and a range label. Exposes `page` and
 * `pageSize` as two-way `model()` bindings and emits a single `changed`
 * event whenever either changes.
 */
@Component({
  selector: 'ea-paginator',
  imports: [
    NgClass,
    ButtonComponent,
    ChevronLeftIconComponent,
    ChevronRightIconComponent,
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PaginatorComponent {
  protected readonly i18n = inject(EagamiI18nService);

  readonly totalItems = input.required<number>();
  readonly pageSizeOptions = input<number[]>([10, 25, 50, 100]);
  readonly showPageSizeSelector = input<boolean>(true);
  readonly showRangeLabel = input<boolean>(true);
  readonly align = input<PaginatorAlign>('right');
  readonly size = input<PaginatorSize>('md');
  /** Group thousands with commas in the range and page numbers. */
  readonly groupThousands = input<boolean>(true);
  readonly disabled = input<boolean>(false);

  readonly page = model<number>(1);
  readonly pageSize = model<number>(10);

  /** Fires when the user changes either the current page or the page size. */
  readonly changed = output<PaginatorState>();

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.totalItems() / this.pageSize())),
  );

  readonly rangeStart = computed(() =>
    this.totalItems() === 0 ? 0 : (this.page() - 1) * this.pageSize() + 1,
  );

  readonly rangeEnd = computed(() =>
    Math.min(this.page() * this.pageSize(), this.totalItems()),
  );

  readonly canGoPrev = computed(() => this.page() > 1);

  readonly canGoNext = computed(() => this.page() < this.totalPages());

  /** Formats a number for display, grouping thousands per the active locale when enabled. */
  protected formatNumber(value: number): string {
    return this.groupThousands() ? value.toLocaleString(this.i18n.locale()) : `${value}`;
  }

  readonly visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.page();
    const pages: (number | 'ellipsis')[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (current > 3) {
      pages.push('ellipsis');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push('ellipsis');
    }

    pages.push(total);
    return pages;
  });

  /** Navigates to the given page, clamped into the valid range. */
  goToPage(page: number): void {
    if (this.disabled()) {
      return;
    }
    const clamped = Math.max(1, Math.min(page, this.totalPages()));
    if (clamped === this.page()) {
      return;
    }
    this.page.set(clamped);
    this.changed.emit({ page: clamped, pageSize: this.pageSize() });
  }

  /** Navigates to the previous page if one exists. */
  prevPage(): void {
    if (this.canGoPrev()) {
      this.goToPage(this.page() - 1);
    }
  }

  /** Navigates to the next page if one exists. */
  nextPage(): void {
    if (this.canGoNext()) {
      this.goToPage(this.page() + 1);
    }
  }

  onPageSizeChange(event: Event): void {
    if (this.disabled()) {
      return;
    }
    const newSize = Number((event.target as HTMLSelectElement).value);
    this.pageSize.set(newSize);
    this.page.set(1);
    this.changed.emit({ page: 1, pageSize: newSize });
  }
}
