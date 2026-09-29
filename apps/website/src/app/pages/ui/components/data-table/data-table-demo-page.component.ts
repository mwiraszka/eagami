import {
  type DataTableColumn,
  DataTableComponent,
  type DataTableDensity,
  type DataTableRowContextMenuEvent,
  type DataTableSize,
  MenuComponent,
  MenuItemComponent,
  ToastService,
} from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface DataTableKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  caption: string;
  density: DataTableDensity;
  size: DataTableSize;
  striped: boolean;
  bordered: boolean;
  nowrap: boolean;
  hoverable: boolean;
  stickyHeader: boolean;
  navigable: boolean;
  clickable: boolean;
  loading: boolean;
  loadingRowCount: number;
}

const SLUG = 'data-table';

interface DemoRow {
  id: number;
  firstName: string;
  lastName: string;
  admin: string;
  posts: number;
}

@Component({
  selector: 'web-data-table-demo-page',
  templateUrl: './data-table-demo-page.component.html',
  styleUrl: './data-table-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DataTableComponent,
    MenuComponent,
    MenuItemComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class DataTableDemoPageComponent {
  private readonly toastService = inject(ToastService);
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['data-table'], UI_API[SLUG]);
  protected readonly state = signal<DataTableKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS['data-table']) as DataTableKnobState,
  );

  /** The required `columns`/`data` are sample bindings the snippet should reflect. */
  protected readonly extraAttributes = ['[columns]="columns"', '[data]="data"'];

  protected readonly tableColumns = computed<DataTableColumn<DemoRow>[]>(() => {
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

  protected readonly tableData: DemoRow[] = [
    { id: 1, firstName: 'Alice', lastName: 'Johnson', admin: '', posts: 847 },
    { id: 2, firstName: 'René', lastName: 'Dupont', admin: '✓', posts: 12 },
    { id: 3, firstName: 'Charlie', lastName: 'García', admin: '', posts: 503 },
    { id: 4, firstName: 'Diana', lastName: 'Müller', admin: '', posts: 1291 },
    { id: 5, firstName: 'Zoë', lastName: 'Davis', admin: '', posts: 68 },
    { id: 6, firstName: 'Frank', lastName: 'Østergaard', admin: '✓', posts: 245 },
    { id: 7, firstName: 'Chloé', lastName: 'Lefèvre', admin: '', posts: 1034 },
    { id: 8, firstName: 'Søren', lastName: 'Berg', admin: '', posts: 4 },
  ];

  // The row whose actions the menu is showing
  private readonly menuRow = signal<DemoRow | null>(null);

  protected openRowMenu(
    menu: MenuComponent,
    request: DataTableRowContextMenuEvent<DemoRow>,
  ): void {
    request.event.preventDefault();
    this.menuRow.set(request.row);
    menu.openAsContextMenu(request.rowElement, request.point);
  }

  protected chooseRowAction(action: string): void {
    const row = this.menuRow();
    if (row) {
      this.toastService.info(
        this.messages().ui.component.demos.dataTable.rowMenuToast(
          action,
          `${row.firstName} ${row.lastName}`,
        ),
      );
    }
  }

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as DataTableKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS['data-table']) as DataTableKnobState,
    );
  }
}
