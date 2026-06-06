import {
  CardComponent,
  type CardHeaderAlign,
  type CardPadding,
  type CardVariant,
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

interface CardKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  variant: CardVariant;
  padding: CardPadding;
  headerAlign: CardHeaderAlign;
  fullWidth: boolean;
  headerDivider: boolean;
}

const SLUG = 'card';

@Component({
  selector: 'web-card-demo-page',
  templateUrl: './card-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, UiComponentDemoLayoutComponent, ComponentPlaygroundComponent],
})
export class CardDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.card, UI_API[SLUG]);
  protected readonly state = signal<CardKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.card) as CardKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-card> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as CardKnobState);
  }

  protected reset(): void {
    this.state.set(initialKnobState(this.knobs, PLAYGROUND_KNOBS.card) as CardKnobState);
  }
}
