import {
  AccordionComponent,
  AccordionItemComponent,
  type DataTableColumn,
  DataTableComponent,
} from '@eagami/ui';

import {
  ChangeDetectionStrategy,
  Component,
  type TemplateRef,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';

type CellTemplate = TemplateRef<{ $implicit: Record<string, unknown>; value: unknown }>;

/**
 * Renders a component's inputs, outputs, and public methods from the compodoc
 * extracted API data, keyed by slug. Each group is an accordion whose body is an
 * ea-data-table with a sticky header. Descriptions fall back to the generated
 * (English) text when no localized override exists.
 */
@Component({
  selector: 'web-api-reference',
  templateUrl: './api-reference.component.html',
  styleUrl: './api-reference.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AccordionComponent, AccordionItemComponent, DataTableComponent],
})
export class ApiReferenceComponent {
  protected readonly messages = inject(WebI18nService).messages;

  readonly slug = input.required<string>();

  protected readonly api = computed(() => UI_API[this.slug()]);

  private readonly nameCell = viewChild<CellTemplate>('nameCell');
  private readonly codeCell = viewChild<CellTemplate>('codeCell');
  private readonly descCell = viewChild<CellTemplate>('descCell');

  protected readonly inputColumns = computed<DataTableColumn[]>(() => {
    const t = this.messages().ui.component.playground;
    return [
      { key: 'name', label: t.colName, cellTemplate: this.nameCell() },
      { key: 'type', label: t.colType, cellTemplate: this.codeCell() },
      { key: 'default', label: t.colDefault, cellTemplate: this.codeCell() },
      { key: 'description', label: t.colDescription, cellTemplate: this.descCell() },
    ];
  });

  protected readonly outputColumns = computed<DataTableColumn[]>(() => {
    const t = this.messages().ui.component.playground;
    return [
      { key: 'name', label: t.colName, cellTemplate: this.nameCell() },
      { key: 'type', label: t.colType, cellTemplate: this.codeCell() },
      { key: 'description', label: t.colDescription, cellTemplate: this.descCell() },
    ];
  });

  protected readonly methodColumns = computed<DataTableColumn[]>(() => {
    const t = this.messages().ui.component.playground;
    return [
      { key: 'signature', label: t.colName, cellTemplate: this.codeCell() },
      { key: 'description', label: t.colDescription, cellTemplate: this.descCell() },
    ];
  });

  protected describe(name: unknown): string {
    const key = String(name);
    const playground = this.messages().ui.component.playground;
    const described = playground.descriptions[this.slug()]?.[key];
    if (described) {
      return described;
    }
    // Every form control exposes the same errorMessages input, so it shares one
    // description rather than repeating it in every component's dictionary.
    return key === 'errorMessages' ? playground.errorMessagesDescription : '';
  }
}
