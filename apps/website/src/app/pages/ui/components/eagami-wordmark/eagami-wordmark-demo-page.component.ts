import {
  EagamiWordmarkComponent,
  type EagamiWordmarkLayout,
  type EagamiWordmarkVariant,
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

interface EagamiWordmarkKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  variant: EagamiWordmarkVariant;
  layout: EagamiWordmarkLayout;
  size: number;
}

const SLUG = 'eagami-wordmark';

@Component({
  selector: 'web-eagami-wordmark-demo-page',
  templateUrl: './eagami-wordmark-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    EagamiWordmarkComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class EagamiWordmarkDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(
    PLAYGROUND_KNOBS['eagami-wordmark'],
    UI_API[SLUG],
  );
  protected readonly state = signal<EagamiWordmarkKnobState>(
    initialKnobState(
      this.knobs,
      PLAYGROUND_KNOBS['eagami-wordmark'],
    ) as EagamiWordmarkKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-eagami-wordmark> bindings checked.
    this.state.update(
      current => ({ ...current, [name]: value }) as EagamiWordmarkKnobState,
    );
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(
        this.knobs,
        PLAYGROUND_KNOBS['eagami-wordmark'],
      ) as EagamiWordmarkKnobState,
    );
  }
}
