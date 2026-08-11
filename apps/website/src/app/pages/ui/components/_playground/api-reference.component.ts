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

import {
  type ApiMethod,
  type ApiProp,
  type ComponentApi,
  type ServiceApi,
  UI_API,
} from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';

type CellTemplate = TemplateRef<{ $implicit: Record<string, unknown>; value: unknown }>;

interface ApiSection {
  slug: string;
  selectorLabel: string;
  inputs: ApiProp[];
  outputs: ApiProp[];
  methods: ApiMethod[];
  service: ServiceApi | null;
}

// Primary demo slug -> the public sub-components documented alongside it, so a
// composite component's page covers every part (e.g. the radio page shows both
// <ea-radio> and <ea-radio-group>). Slugs not listed here render on their own.
// `check-demo-parity` parses this map, so keep it a plain literal.
const RELATED_SLUGS: Readonly<Record<string, readonly string[]>> = {
  radio: ['radio-group'],
  accordion: ['accordion-item'],
  'form-field': ['field-label', 'field-messages'],
  menu: ['menu-item', 'menu-trigger'],
  tabs: ['tab'],
  stepper: ['step'],
};

/**
 * Renders a component's inputs, outputs, and public methods from the compodoc
 * extracted API data, keyed by slug. Each group is an accordion whose body is an
 * ea-data-table with a sticky header. Composite components also list their public
 * sub-components. Descriptions fall back to the generated (English) text when no
 * localized override exists.
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

  protected readonly sections = computed<ApiSection[]>(() => {
    const primary = this.slug();
    const slugs = [primary, ...(RELATED_SLUGS[primary] ?? [])];
    return slugs
      .map(s => (UI_API[s] ? this.toSection(s, UI_API[s]) : null))
      .filter((s): s is ApiSection => s !== null);
  });

  protected readonly multiComponent = computed(() => this.sections().length > 1);

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

  private toSection(slug: string, api: ComponentApi): ApiSection {
    return {
      slug,
      selectorLabel: api.selector.startsWith('[') ? api.selector : `<${api.selector} />`,
      inputs: api.inputs.map(p => ({ ...p, description: this.describe(slug, p.name) })),
      outputs: api.outputs.map(p => ({ ...p, description: this.describe(slug, p.name) })),
      methods: api.methods.map(m => ({
        ...m,
        description: this.describe(slug, m.name),
      })),
      service: api.service
        ? {
            ...api.service,
            methods: api.service.methods.map(m => ({
              ...m,
              description: this.describe(slug, m.name),
            })),
          }
        : null,
    };
  }

  private describe(slug: string, name: unknown): string {
    const key = String(name);
    const playground = this.messages().ui.component.playground;
    const described = playground.descriptions[slug]?.[key];
    if (described) {
      return described;
    }
    // errorMessages and ariaLabel appear on many components with identical
    // meaning, so each shares one description rather than repeating it per slug
    if (key === 'errorMessages') {
      return playground.errorMessagesDescription;
    }
    return key === 'ariaLabel' ? playground.ariaLabelDescription : '';
  }
}
