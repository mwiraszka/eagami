import {
  ProgressBarComponent,
  type ProgressBarSize,
  type ProgressBarVariant,
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

interface ProgressBarKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  value: number;
  max: number;
  variant: ProgressBarVariant;
  size: ProgressBarSize;
  showValue: boolean;
  indeterminate: boolean;
}

const SLUG = 'progress-bar';

@Component({
  selector: 'web-progress-bar-demo-page',
  templateUrl: './progress-bar-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProgressBarComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class ProgressBarDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['progress-bar'], UI_API[SLUG]);
  protected readonly state = signal<ProgressBarKnobState>(
    initialKnobState(
      this.knobs,
      PLAYGROUND_KNOBS['progress-bar'],
    ) as ProgressBarKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-progress-bar> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as ProgressBarKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(
        this.knobs,
        PLAYGROUND_KNOBS['progress-bar'],
      ) as ProgressBarKnobState,
    );
  }
}
