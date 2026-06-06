import { RadioComponent, RadioGroupComponent, type RadioSize } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface RadioKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  size: RadioSize;
  disabled: boolean;
}

const SLUG = 'radio';

@Component({
  selector: 'web-radio-demo-page',
  templateUrl: './radio-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RadioComponent,
    RadioGroupComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class RadioDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.radio, UI_API[SLUG]);
  protected readonly state = signal<RadioKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.radio) as RadioKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-radio> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as RadioKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.radio) as RadioKnobState,
    );
  }
}
