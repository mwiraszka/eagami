import { CheckboxComponent, type CheckboxSize } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface CheckboxKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  count: string | number;
  size: CheckboxSize;
  disabled: boolean;
  required: boolean;
  indeterminate: boolean;
  truncate: boolean;
  triggerError: boolean;
}

const SLUG = 'checkbox';

@Component({
  selector: 'web-checkbox-demo-page',
  templateUrl: './checkbox-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    CheckboxComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class CheckboxDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.checkbox, UI_API[SLUG]);
  protected readonly state = signal<CheckboxKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.checkbox) as CheckboxKnobState,
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

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-checkbox> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as CheckboxKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.checkbox) as CheckboxKnobState,
    );
  }
}
