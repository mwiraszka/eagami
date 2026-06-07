import { SliderComponent, type SliderSize } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface SliderKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  size: SliderSize;
  min: number;
  max: number;
  step: number;
  showValue: boolean;
  showMinMaxLabels: boolean;
  groupThousands: boolean;
  disabled: boolean;
  required: boolean;
  hasError: boolean;
}

const SLUG = 'slider';

@Component({
  selector: 'web-slider-demo-page',
  templateUrl: './slider-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SliderComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class SliderDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.slider, UI_API[SLUG]);
  protected readonly state = signal<SliderKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.slider) as SliderKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-slider> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as SliderKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.slider) as SliderKnobState,
    );
  }
}
