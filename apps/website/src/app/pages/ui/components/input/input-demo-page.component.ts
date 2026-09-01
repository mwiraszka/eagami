import { InputComponent, type InputSize, type InputType } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

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
import {
  iconComponentForSlug,
  iconKnob,
  labelIconFor,
  labelIconKnob,
} from '../_playground/icon-knob';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface InputKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  labelIcon: string;
  placeholder: string;
  size: InputSize;
  type: InputType;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  autofocus: boolean;
  showPasswordToggle: boolean;
  clearable: boolean;
  keepIcon: boolean;
  autocomplete: string;
  icon: string;
  triggerError: boolean;
}

const SLUG = 'input';

@Component({
  selector: 'web-input-demo-page',
  templateUrl: './input-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class InputDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = [
    ...buildKnobs(PLAYGROUND_KNOBS.input, UI_API[SLUG]),
    iconKnob(['search', 'filter', 'mail', 'user', 'lock', 'calendar']),
    labelIconKnob(),
  ];
  protected readonly state = signal<InputKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.input) as InputKnobState,
  );
  protected readonly iconComponent = computed(() =>
    iconComponentForSlug(this.state().icon),
  );

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

  protected readonly labelIconComponent = labelIconFor(this.state);

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-input> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as InputKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.input) as InputKnobState,
    );
  }
}
