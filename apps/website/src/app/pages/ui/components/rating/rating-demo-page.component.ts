import {
  HalfCircleIconComponent,
  HalfHeartIconComponent,
  LeftHalfStarIconComponent,
  RatingComponent,
  type RatingSize,
  StarIconComponent,
} from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import {
  ChangeDetectionStrategy,
  Component,
  type Type,
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

interface RatingKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  size: RatingSize;
  min: number;
  max: number;
  allowHalf: boolean;
  readonly: boolean;
  disabled: boolean;
  required: boolean;
  clearable: boolean;
  iconClass: string;
  triggerError: boolean;
}

const SLUG = 'rating';

@Component({
  selector: 'web-rating-demo-page',
  templateUrl: './rating-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    RatingComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class RatingDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = [
    ...buildKnobs(PLAYGROUND_KNOBS.rating, UI_API[SLUG]),
    iconKnob(['star', 'heart', 'circle'], {
      name: 'iconClass',
      default: 'star',
      includeNone: false,
    }),
  ];
  protected readonly state = signal<RatingKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.rating) as RatingKnobState,
  );
  protected readonly iconComponent = computed(
    () => iconComponentForSlug(this.state().iconClass) ?? StarIconComponent,
  );
  // The default half-icon is a half-star, so pair heart and circle with their own
  // half shapes; otherwise a half rating would show a stray half-star beside them.
  protected readonly halfIconComponent = computed<Type<unknown>>(() => {
    switch (this.state().iconClass) {
      case 'heart':
        return HalfHeartIconComponent;
      case 'circle':
        return HalfCircleIconComponent;
      default:
        return LeftHalfStarIconComponent;
    }
  });

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
    // statically typed state that keeps the live <ea-rating> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as RatingKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.rating) as RatingKnobState,
    );
  }
}
