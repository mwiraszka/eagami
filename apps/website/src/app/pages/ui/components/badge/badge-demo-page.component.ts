import {
  BadgeComponent,
  type BadgeShape,
  type BadgeSize,
  type BadgeVariant,
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

interface BadgeKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  variant: BadgeVariant;
  size: BadgeSize;
  shape: BadgeShape;
}

const SLUG = 'badge';

@Component({
  selector: 'web-badge-demo-page',
  templateUrl: './badge-demo-page.component.html',
  styleUrl: './badge-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent, UiComponentDemoLayoutComponent, ComponentPlaygroundComponent],
})
export class BadgeDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.badge, UI_API[SLUG]);
  protected readonly state = signal<BadgeKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.badge) as BadgeKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-badge> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as BadgeKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.badge) as BadgeKnobState,
    );
  }
}
