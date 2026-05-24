import {
  DataTableColumn,
  DataTableComponent,
  PaginatorComponent,
  PaginatorState,
} from '@eagami/ui';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-data-table-demo-page',
  templateUrl: './data-table-demo-page.component.html',
  styleUrl: './data-table-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataTableComponent, PaginatorComponent, UiComponentDemoLayoutComponent],
})
export class DataTableDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly tablePage = signal(1);
  protected readonly tablePageSize = signal(5);

  protected readonly tableColumns = computed<DataTableColumn[]>(() => {
    const cols = this.messages().ui.component.demos.dataTable;
    return [
      {
        key: 'id',
        label: cols.tableColumnId,
        sortable: true,
        width: '60px',
        align: 'center',
      },
      { key: 'firstName', label: cols.tableColumnFirstName, sortable: true },
      { key: 'lastName', label: cols.tableColumnLastName, sortable: true },
      { key: 'admin', label: cols.tableColumnAdmin, sortable: true, align: 'center' },
      {
        key: 'posts',
        label: cols.tableColumnPosts,
        sortable: true,
        align: 'right',
        format: v => (v as number).toLocaleString('en-US'),
      },
    ];
  });

  protected readonly tableData = [
    { id: 1, firstName: 'Alice', lastName: 'Johnson', admin: '', posts: 847 },
    { id: 2, firstName: 'René', lastName: 'Dupont', admin: '✓', posts: 12 },
    { id: 3, firstName: 'Charlie', lastName: 'García', admin: '', posts: 503 },
    { id: 4, firstName: 'Diana', lastName: 'Müller', admin: '', posts: 1291 },
    { id: 5, firstName: 'Zoë', lastName: 'Davis', admin: '', posts: 68 },
    { id: 6, firstName: 'Frank', lastName: 'Østergaard', admin: '✓', posts: 245 },
    { id: 7, firstName: 'Chloé', lastName: 'Lefèvre', admin: '', posts: 1034 },
    { id: 8, firstName: 'Søren', lastName: 'Berg', admin: '', posts: 4 },
    { id: 9, firstName: 'Ivy', lastName: 'Chen', admin: '', posts: 392 },
    { id: 10, firstName: 'André', lastName: 'Turner', admin: '✓', posts: 1150 },
    { id: 11, firstName: 'Karen', lastName: 'Hernández', admin: '', posts: 76 },
    { id: 12, firstName: 'Léo', lastName: 'Martinez', admin: '', posts: 619 },
  ];

  protected get pagedTableData() {
    const start = (this.tablePage() - 1) * this.tablePageSize();
    return this.tableData.slice(start, start + this.tablePageSize());
  }

  protected onTablePageChange(event: PaginatorState): void {
    this.tablePage.set(event.page);
    this.tablePageSize.set(event.pageSize);
  }
}
