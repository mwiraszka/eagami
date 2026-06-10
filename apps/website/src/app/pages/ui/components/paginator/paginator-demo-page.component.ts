import { type PaginatorAlign, PaginatorComponent, type PaginatorSize } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface PaginatorKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  totalItems: number;
  align: PaginatorAlign;
  size: PaginatorSize;
  showPageSizeSelector: boolean;
  showRangeLabel: boolean;
  groupThousands: boolean;
  disabled: boolean;
}

const SLUG = 'paginator';

@Component({
  selector: 'web-paginator-demo-page',
  templateUrl: './paginator-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PaginatorComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class PaginatorDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.paginator, UI_API[SLUG]);
  protected readonly state = signal<PaginatorKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.paginator) as PaginatorKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-paginator> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as PaginatorKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.paginator) as PaginatorKnobState,
    );
  }
}
