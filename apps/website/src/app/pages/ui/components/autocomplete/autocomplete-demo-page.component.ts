import {
  AutocompleteComponent,
  type AutocompleteSize,
  ButtonComponent,
  InputComponent,
  PlusIconComponent,
  type SelectOption,
  type SelectOptions,
  TooltipDirective,
  TrashIconComponent,
} from '@eagami/ui';
import { LABEL_ICON_SLUGS, PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { iconComponentForSlug, iconKnob } from '../_playground/icon-knob';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';
import { demoOptionGroups, optionsAttribute } from '../_playground/option-groups';

interface OptionModel {
  id: number;
  label: string;
}

interface AutocompleteKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  labelIcon: string;
  placeholder: string;
  size: AutocompleteSize;
  minLength: number;
  maxResults: number;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  groupedOptions: boolean;
  firstGroup: string;
  firstGroupLabel: string;
  secondGroup: string;
  secondGroupLabel: string;
  triggerError: boolean;
}

const SLUG = 'autocomplete';

const DEFAULT_OPTIONS: readonly string[] = [
  'Golden Retriever',
  'German Shepherd',
  'Beagle',
  'Poodle',
  'Boxer',
  'Dachshund',
];

function slugify(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

@Component({
  selector: 'web-autocomplete-demo-page',
  templateUrl: './autocomplete-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    AutocompleteComponent,
    ButtonComponent,
    InputComponent,
    PlusIconComponent,
    TooltipDirective,
    TrashIconComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class AutocompleteDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = [
    ...buildKnobs(PLAYGROUND_KNOBS.autocomplete, UI_API[SLUG]),
    iconKnob([...LABEL_ICON_SLUGS], { name: 'labelIcon' }),
  ];
  protected readonly state = signal<AutocompleteKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.autocomplete) as AutocompleteKnobState,
  );

  private nextId = 1;
  protected readonly optionItems = signal<OptionModel[]>(this.seedOptions());

  private readonly breeds = computed<SelectOption[]>(() =>
    this.optionItems()
      .filter(item => item.label.trim() !== '')
      .map(item => ({
        value: slugify(item.label) || `option-${item.id}`,
        label: item.label,
      })),
  );

  protected readonly options = computed<SelectOptions>(() => {
    const state = this.state();
    return state.groupedOptions ? demoOptionGroups(this.breeds(), state) : this.breeds();
  });

  /** Snippet `[options]` binding for the playground's generated code, mirroring the live list. */
  protected readonly extraAttributes = computed(() => [optionsAttribute(this.options())]);

  protected readonly control = new FormControl(null, {
    validators: () => (this.state().triggerError ? { required: true } : null),
  });

  constructor() {
    // The demo-only `triggerError` knob forces a validation error for as long
    // as it stays on, so the localized message persists no matter what value is
    // entered or which other controls change.
    effect(() => {
      if (this.state().disabled) {
        this.control.disable({ emitEvent: false });
      } else {
        this.control.enable({ emitEvent: false });
      }
      this.control.updateValueAndValidity({ emitEvent: false });
      if (this.state().triggerError) {
        this.control.markAsTouched();
      } else {
        this.control.markAsUntouched();
      }
    });
  }

  protected readonly labelIconComponent = computed(() =>
    iconComponentForSlug(this.state().labelIcon),
  );

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(
      current => ({ ...current, [name]: value }) as AutocompleteKnobState,
    );
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(
        this.knobs,
        PLAYGROUND_KNOBS.autocomplete,
      ) as AutocompleteKnobState,
    );
    this.nextId = 1;
    this.optionItems.set(this.seedOptions());
  }

  protected addOption(): void {
    this.optionItems.update(items => [
      ...items,
      { id: this.nextId++, label: 'New breed' },
    ]);
  }

  protected removeOption(id: number): void {
    this.optionItems.update(items => items.filter(item => item.id !== id));
  }

  protected updateOption(id: number, label: string): void {
    this.optionItems.update(items =>
      items.map(item => (item.id === id ? { ...item, label } : item)),
    );
  }

  private seedOptions(): OptionModel[] {
    return DEFAULT_OPTIONS.map(label => ({ id: this.nextId++, label }));
  }
}
