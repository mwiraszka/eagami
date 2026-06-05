import { SwitchComponent, type SwitchSize } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface SwitchKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  size: SwitchSize;
  disabled: boolean;
  required: boolean;
}

const SLUG = 'switch';

@Component({
  selector: 'web-switch-demo-page',
  templateUrl: './switch-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SwitchComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class SwitchDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.switch, UI_API[SLUG]);
  protected readonly state = signal<SwitchKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.switch) as SwitchKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-switch> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as SwitchKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.switch) as SwitchKnobState,
    );
  }
}
