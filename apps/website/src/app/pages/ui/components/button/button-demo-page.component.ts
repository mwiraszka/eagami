import {
  ButtonComponent,
  type ButtonSize,
  type ButtonType,
  type ButtonVariant,
} from '@eagami/ui';
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

interface ButtonKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  variant: ButtonVariant;
  size: ButtonSize;
  type: ButtonType;
  disabled: boolean;
  loading: boolean;
  fullWidth: boolean;
  icon: string;
}

const SLUG = 'button';

@Component({
  selector: 'web-button-demo-page',
  templateUrl: './button-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class ButtonDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = [
    ...buildKnobs(PLAYGROUND_KNOBS.button, UI_API[SLUG]),
    iconKnob([
      'check',
      'search',
      'filter',
      'mail',
      'user',
      'lock',
      'calendar',
      'bell',
      'home',
      'star',
    ]),
  ];
  protected readonly state = signal<ButtonKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.button) as ButtonKnobState,
  );
  protected readonly iconComponent = computed(() =>
    iconComponentForSlug(this.state().icon),
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-button> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as ButtonKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.button) as ButtonKnobState,
    );
  }
}
