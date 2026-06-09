import {
  TimePickerComponent,
  type TimePickerFormat,
  type TimePickerSize,
} from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface TimePickerKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  placeholder: string;
  size: TimePickerSize;
  format: TimePickerFormat;
  includeSeconds: boolean;
  minuteStep: number;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
}

const SLUG = 'time-picker';

@Component({
  selector: 'web-time-picker-demo-page',
  templateUrl: './time-picker-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TimePickerComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class TimePickerDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS[SLUG], UI_API[SLUG]);
  protected readonly state = signal<TimePickerKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as TimePickerKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as TimePickerKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as TimePickerKnobState,
    );
  }
}
