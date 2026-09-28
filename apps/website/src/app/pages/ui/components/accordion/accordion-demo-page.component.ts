import {
  AccordionComponent,
  type AccordionHeadingLevel,
  AccordionItemComponent,
  type AccordionSize,
  BadgeComponent,
  ButtonComponent,
  CheckboxComponent,
  DropdownComponent,
  InputComponent,
  PlusIconComponent,
  TooltipDirective,
  TrashIconComponent,
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
import { ICON_NONE, iconComponentForSlug } from '../_playground/icon-knob';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';
import { iconComponentName } from '../_playground/snippet';

interface AccordionItemModel {
  id: number;
  heading: string;
  content: string;
  disabled: boolean;
  icon: string;
  badge: string;
}

interface AccordionKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit field below still drives the checked binding.
  [key: string]: KnobValue;
  size: AccordionSize;
  multi: boolean;
  headingLevel: AccordionHeadingLevel;
  highlightExpanded: boolean;
}

const SLUG = 'accordion';

const ITEM_ICONS = [ICON_NONE, 'info', 'settings', 'star', 'book', 'package', 'palette'];

@Component({
  selector: 'web-accordion-demo-page',
  templateUrl: './accordion-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    BadgeComponent,
    ButtonComponent,
    CheckboxComponent,
    DropdownComponent,
    InputComponent,
    PlusIconComponent,
    TooltipDirective,
    TrashIconComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class AccordionDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.accordion, UI_API[SLUG]);
  protected readonly iconOptions = ITEM_ICONS.map(slug => ({ value: slug, label: slug }));
  protected readonly iconFor = iconComponentForSlug;
  protected readonly state = signal<AccordionKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.accordion) as AccordionKnobState,
  );

  private nextId = 1;
  protected readonly items = signal<AccordionItemModel[]>(this.seedItems());
  protected readonly expanded = signal<readonly string[]>(this.seedExpanded());

  /** Snippet children for the playground's generated code, mirroring the live items. */
  protected readonly childMarkup = computed(() =>
    this.items()
      .map(item => {
        const attrs = [`value="${this.valueFor(item.id)}"`];
        if (!item.badge) {
          attrs.push(`label="${item.heading}"`);
        }
        if (item.icon !== ICON_NONE) {
          attrs.push(`[icon]="${iconComponentName(item.icon)}"`);
        }
        if (item.disabled) {
          attrs.push('[disabled]="true"');
        }
        const attrBlock = attrs
          .map((attr, index) => (index === attrs.length - 1 ? `  ${attr}>` : `  ${attr}`))
          .join('\n');
        const label = item.badge
          ? [
              '  <span slot="label">',
              `    ${item.heading}`,
              '    <ea-badge',
              '      variant="info"',
              '      size="sm">',
              `      ${item.badge}`,
              '    </ea-badge>',
              '  </span>',
              '',
            ].join('\n')
          : '';
        return `<ea-accordion-item\n${attrBlock}\n${label}  ${item.content}\n</ea-accordion-item>`;
      })
      .join('\n'),
  );

  /** The live expansion as a snippet binding, so the code opens the same items. */
  protected readonly extraAttributes = computed(() => {
    const expanded = this.expanded();
    return expanded.length
      ? [`[expandedValues]="[${expanded.map(value => `'${value}'`).join(', ')}]"`]
      : [];
  });

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as AccordionKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.accordion) as AccordionKnobState,
    );
    this.nextId = 1;
    this.items.set(this.seedItems());
    this.expanded.set(this.seedExpanded());
  }

  protected valueFor(id: number): string {
    return `item-${id}`;
  }

  protected isExpanded(id: number): boolean {
    return this.expanded().includes(this.valueFor(id));
  }

  // Without multi, opening one item closes the rest, as a header click would
  protected setExpanded(id: number, open: boolean): void {
    const value = this.valueFor(id);
    this.expanded.update(current => {
      const others = current.filter(v => v !== value);
      if (!open) {
        return others;
      }
      return this.state().multi ? [...others, value] : [value];
    });
  }

  protected addItem(): void {
    this.items.update(items => [
      ...items,
      {
        id: this.nextId++,
        heading: this.messages().ui.component.demos.accordion.newSectionHeading,
        content: this.messages().ui.component.demos.accordion.newSectionContent,
        disabled: false,
        icon: ICON_NONE,
        badge: '',
      },
    ]);
  }

  protected removeItem(id: number): void {
    this.items.update(items => items.filter(item => item.id !== id));
    this.setExpanded(id, false);
  }

  protected updateItem(id: number, patch: Partial<AccordionItemModel>): void {
    this.items.update(items =>
      items.map(item => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  private seedItems(): AccordionItemModel[] {
    const m = this.messages().ui.component.demos.accordion;
    return [
      { heading: m.whatLabel, content: m.whatBody, icon: 'info', badge: '' },
      { heading: m.installLabel, content: m.installBody, icon: 'package', badge: '' },
      { heading: m.themeLabel, content: m.themeBody, icon: 'palette', badge: m.newBadge },
    ].map(item => ({ ...item, disabled: false, id: this.nextId++ }));
  }

  private seedExpanded(): readonly string[] {
    return [this.valueFor(this.items()[0].id)];
  }
}
