import { CheckboxComponent, type CheckboxSize } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

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
  count: string;
  size: CheckboxSize;
  disabled: boolean;
  required: boolean;
  indeterminate: boolean;
}

const SLUG = 'checkbox';

@Component({
  selector: 'web-checkbox-demo-page',
  templateUrl: './checkbox-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
