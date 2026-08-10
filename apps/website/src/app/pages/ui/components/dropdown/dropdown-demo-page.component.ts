import {
  DropdownComponent,
  type DropdownSize,
  type SelectOption,
  type SelectOptions,
} from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { UI_API } from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';
import { demoOptionGroups, optionsAttribute } from '../_playground/option-groups';

interface DropdownKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  placeholder: string;
  size: DropdownSize;
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

const SLUG = 'dropdown';

@Component({
  selector: 'web-dropdown-demo-page',
  templateUrl: './dropdown-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    DropdownComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class DropdownDemoPageComponent {
  private readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS[SLUG], UI_API[SLUG]);
  protected readonly state = signal<DropdownKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as DropdownKnobState,
  );

  private readonly fruits = computed<SelectOption[]>(() =>
    this.messages().ui.component.sharedOptions.fruitOptions.map(o => ({ ...o })),
  );

  protected readonly options = computed<SelectOptions>(() => {
    const state = this.state();
    return state.groupedOptions ? demoOptionGroups(this.fruits(), state) : this.fruits();
  });

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

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as DropdownKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as DropdownKnobState,
    );
  }
}
