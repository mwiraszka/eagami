import {
  AccordionComponent,
  type AccordionHeadingLevel,
  AccordionItemComponent,
  type AccordionSize,
  ButtonComponent,
  CheckboxComponent,
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
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface AccordionItemModel {
  id: number;
  heading: string;
  content: string;
  disabled: boolean;
}

interface AccordionKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit field below still drives the checked binding.
  [key: string]: KnobValue;
  size: AccordionSize;
  multi: boolean;
  headingLevel: AccordionHeadingLevel;
}

const SLUG = 'accordion';

@Component({
  selector: 'web-accordion-demo-page',
  templateUrl: './accordion-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    ButtonComponent,
    CheckboxComponent,
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
  protected readonly state = signal<AccordionKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.accordion) as AccordionKnobState,
  );

  private nextId = 1;
  protected readonly items = signal<AccordionItemModel[]>(this.seedItems());

  /** Snippet children for the playground's generated code, mirroring the live items. */
  protected readonly childMarkup = computed(() =>
    this.items()
      .map(item => {
        const attrs = [`value="item-${item.id}"`, `label="${item.heading}"`];
        if (item.disabled) {
          attrs.push('[disabled]="true"');
        }
        const attrBlock = attrs
          .map((attr, index) => (index === attrs.length - 1 ? `  ${attr}>` : `  ${attr}`))
          .join('\n');
        return `<ea-accordion-item\n${attrBlock}\n  ${item.content}\n</ea-accordion-item>`;
      })
      .join('\n'),
  );

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as AccordionKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.accordion) as AccordionKnobState,
    );
    this.nextId = 1;
    this.items.set(this.seedItems());
  }

  protected addItem(): void {
    this.items.update(items => [
      ...items,
      {
        id: this.nextId++,
        heading: this.messages().ui.component.demos.accordion.newSectionHeading,
        content: this.messages().ui.component.demos.accordion.newSectionContent,
        disabled: false,
      },
    ]);
  }

  protected removeItem(id: number): void {
    this.items.update(items => items.filter(item => item.id !== id));
  }

  protected updateItem(id: number, patch: Partial<AccordionItemModel>): void {
    this.items.update(items =>
      items.map(item => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  private seedItems(): AccordionItemModel[] {
    const m = this.messages().ui.component.demos.accordion;
    return [
      { heading: m.whatLabel, content: m.whatBody },
      { heading: m.installLabel, content: m.installBody },
      { heading: m.themeLabel, content: m.themeBody },
    ].map(item => ({ ...item, disabled: false, id: this.nextId++ }));
  }
}
