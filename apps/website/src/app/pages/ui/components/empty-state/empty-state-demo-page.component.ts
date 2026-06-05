import {
  EmptyStateComponent,
  type EmptyStateHeadingLevel,
  type EmptyStateSize,
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

interface EmptyStateKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  title: string;
  description: string;
  size: EmptyStateSize;
  headingLevel: EmptyStateHeadingLevel;
}

const SLUG = 'empty-state';

@Component({
  selector: 'web-empty-state-demo-page',
  templateUrl: './empty-state-demo-page.component.html',
  styleUrl: './empty-state-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    EmptyStateComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class EmptyStateDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['empty-state'], UI_API[SLUG]);
  protected readonly state = signal<EmptyStateKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS['empty-state']) as EmptyStateKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-empty-state> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as EmptyStateKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(
        this.knobs,
        PLAYGROUND_KNOBS['empty-state'],
      ) as EmptyStateKnobState,
    );
  }
}
