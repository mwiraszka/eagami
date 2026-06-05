import { InputComponent, type InputSize, type InputType } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { iconComponentForSlug, iconKnob } from '../_playground/icon-knob';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface InputKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  placeholder: string;
  size: InputSize;
  type: InputType;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  autofocus: boolean;
  showPasswordToggle: boolean;
  clearable: boolean;
  autocomplete: string;
  icon: string;
}

const SLUG = 'input';

@Component({
  selector: 'web-input-demo-page',
  templateUrl: './input-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputComponent, UiComponentDemoLayoutComponent, ComponentPlaygroundComponent],
})
export class InputDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = [
    ...buildKnobs(PLAYGROUND_KNOBS.input, UI_API[SLUG]),
    iconKnob(['search', 'filter', 'mail', 'user', 'lock', 'calendar']),
  ];
  protected readonly state = signal<InputKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.input) as InputKnobState,
  );
  protected readonly iconComponent = computed(() =>
    iconComponentForSlug(this.state().icon),
  );

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
