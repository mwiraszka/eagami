import { RatingComponent, type RatingSize, StarIconComponent } from '@eagami/ui';
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
}

const SLUG = 'rating';

@Component({
  selector: 'web-rating-demo-page',
  templateUrl: './rating-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RatingComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class RatingDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = [
    ...buildKnobs(PLAYGROUND_KNOBS.rating, UI_API[SLUG]),
    iconKnob(
      [
        'star',
        'heart',
        'bell',
        'bookmark',
        'award',
        'flag',
        'smile',
        'zap',
        'sun',
        'moon',
        'gift',
      ],
      { name: 'iconClass', default: 'star', includeNone: false },
    ),
  ];
  protected readonly state = signal<RatingKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.rating) as RatingKnobState,
  );
  protected readonly iconComponent = computed(
    () => iconComponentForSlug(this.state().iconClass) ?? StarIconComponent,
  );

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
