import {
  TimePickerComponent,
  type TimePickerFormat,
  type TimePickerSize,
} from '@eagami/ui';
import { LABEL_ICON_SLUGS, PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

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
import { iconComponentForSlug, iconKnob } from '../_playground/icon-knob';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface TimePickerKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  labelIcon: string;
  placeholder: string;
  size: TimePickerSize;
  format: TimePickerFormat;
  includeSeconds: boolean;
  minuteStep: number;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  triggerError: boolean;
}

const SLUG = 'time-picker';

@Component({
  selector: 'web-time-picker-demo-page',
  templateUrl: './time-picker-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    TimePickerComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class TimePickerDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = [
    ...buildKnobs(PLAYGROUND_KNOBS[SLUG], UI_API[SLUG]),
    iconKnob([...LABEL_ICON_SLUGS], { name: 'labelIcon' }),
  ];
  protected readonly state = signal<TimePickerKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as TimePickerKnobState,
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

  protected readonly labelIconComponent = computed(() =>
    iconComponentForSlug(this.state().labelIcon),
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
