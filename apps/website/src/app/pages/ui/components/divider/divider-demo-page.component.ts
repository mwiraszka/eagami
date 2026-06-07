import { DividerComponent, type DividerOrientation } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface DividerKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  orientation: DividerOrientation;
  thick: boolean;
}

const SLUG = 'divider';

@Component({
  selector: 'web-divider-demo-page',
  templateUrl: './divider-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DividerComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class DividerDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.divider, UI_API[SLUG]);
  protected readonly state = signal<DividerKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.divider) as DividerKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-divider> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as DividerKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.divider) as DividerKnobState,
    );
  }
}
