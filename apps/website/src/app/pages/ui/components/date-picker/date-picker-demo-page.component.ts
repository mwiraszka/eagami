import {
  DatePickerComponent,
  type DatePickerFormat,
  type DatePickerSize,
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

interface DatePickerKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  placeholder: string;
  size: DatePickerSize;
  format: DatePickerFormat;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
}

const SLUG = 'date-picker';

@Component({
  selector: 'web-date-picker-demo-page',
  templateUrl: './date-picker-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePickerComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class DatePickerDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['date-picker'], UI_API[SLUG]);
  protected readonly state = signal<DatePickerKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS['date-picker']) as DatePickerKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as DatePickerKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(
        this.knobs,
        PLAYGROUND_KNOBS['date-picker'],
      ) as DatePickerKnobState,
    );
  }
}
