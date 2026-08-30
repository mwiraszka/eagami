import { NumberInputComponent, type NumberInputSize } from '@eagami/ui';
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

interface NumberInputKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  labelIcon: string;
  placeholder: string;
  size: NumberInputSize;
  // A number knob emits '' when cleared; the template coerces that to undefined
  min: number | '';
  max: number | '';
  step: number;
  maxDigits: number | '';
  allowNegative: boolean;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  triggerError: boolean;
}

const SLUG = 'number-input';

@Component({
  selector: 'web-number-input-demo-page',
  templateUrl: './number-input-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NumberInputComponent,
    ReactiveFormsModule,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class NumberInputDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = [
    ...buildKnobs(PLAYGROUND_KNOBS['number-input'], UI_API[SLUG]),
    iconKnob([...LABEL_ICON_SLUGS], { name: 'labelIcon' }),
  ];
  protected readonly state = signal<NumberInputKnobState>(
    initialKnobState(
      this.knobs,
      PLAYGROUND_KNOBS['number-input'],
    ) as NumberInputKnobState,
  );

  protected readonly control = new FormControl<number | null>(null, {
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

  // A cleared number knob emits ''; map it to undefined for the bound input so
  // an empty Min/Max reads as unbounded.
  // The reserved footprint is sized in `ch` and `em`, which resolve against the
  // host's own font-size rather than the tier's, so mirror the tier here. The
  // `size` values map one-to-one onto the font-size tokens.
  protected readonly tierFontSize = computed(
    () => `var(--font-size-${this.state().size})`,
  );

  protected asBound(value: number | ''): number | undefined {
    return value === '' ? undefined : value;
  }

  protected readonly labelIconComponent = computed(() =>
    iconComponentForSlug(this.state().labelIcon),
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-number-input> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as NumberInputKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(
        this.knobs,
        PLAYGROUND_KNOBS['number-input'],
      ) as NumberInputKnobState,
    );
  }
}
