import { ToggleChipComponent, type ToggleChipSize } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { iconComponentForSlug, iconKnob } from '../_playground/icon-knob';
import {
  type KnobValue,
  buildKnobs,
  initialKnobState,
  injectKnobDefaults,
} from '../_playground/knob';

interface ToggleChipKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  size: ToggleChipSize;
  icon: string;
  selected: boolean;
  disabled: boolean;
}

const SLUG = 'toggle-chip';

@Component({
  selector: 'web-toggle-chip-demo-page',
  templateUrl: './toggle-chip-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ComponentPlaygroundComponent,
    ToggleChipComponent,
    UiComponentDemoLayoutComponent,
  ],
})
export class ToggleChipDemoPageComponent {
  protected readonly slug = SLUG;
  private readonly knobDefaults = injectKnobDefaults(SLUG);
  protected readonly knobs = [
    ...buildKnobs(PLAYGROUND_KNOBS[SLUG], UI_API[SLUG]),
    iconKnob(
      [
        'moon',
        'sun',
        'star',
        'heart',
        'calendar-days',
        'map-pin',
        'filter',
        'tag',
        'bell',
        'globe',
      ],
      { default: 'moon' },
    ),
  ];
  protected readonly state = signal<ToggleChipKnobState>(
    initialKnobState(
      this.knobs,
      PLAYGROUND_KNOBS[SLUG],
      this.knobDefaults,
    ) as ToggleChipKnobState,
  );
  protected readonly iconComponent = computed(() =>
    iconComponentForSlug(this.state().icon),
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-toggle-chip> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as ToggleChipKnobState);
  }

  /* Keeps the selected knob in step when the chip itself is clicked */
  protected onSelected(selected: boolean): void {
    this.state.update(current => ({ ...current, selected }));
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(
        this.knobs,
        PLAYGROUND_KNOBS[SLUG],
        this.knobDefaults,
      ) as ToggleChipKnobState,
    );
  }
}
