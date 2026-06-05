import { RangeSliderComponent, type RangeSliderSize } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface RangeSliderKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  hint: string;
  errorMsg: string;
  min: number;
  max: number;
  step: number;
  size: RangeSliderSize;
  showValue: boolean;
  showMinMaxLabels: boolean;
  disabled: boolean;
  required: boolean;
}

const SLUG = 'range-slider';

@Component({
  selector: 'web-range-slider-demo-page',
  templateUrl: './range-slider-demo-page.component.html',
  styleUrl: './range-slider-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RangeSliderComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class RangeSliderDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['range-slider'], UI_API[SLUG]);
  protected readonly state = signal<RangeSliderKnobState>(
    initialKnobState(
      this.knobs,
      PLAYGROUND_KNOBS['range-slider'],
    ) as RangeSliderKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-range-slider> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as RangeSliderKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(
        this.knobs,
        PLAYGROUND_KNOBS['range-slider'],
      ) as RangeSliderKnobState,
    );
  }
}
