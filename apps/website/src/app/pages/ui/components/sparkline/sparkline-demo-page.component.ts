import {
  type ChartCurve,
  InputComponent,
  type SparklineAnimation,
  SparklineComponent,
  type SparklineMarkers,
  type SparklineVariant,
} from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface SparklineKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive the checked bindings.
  [key: string]: KnobValue;
  variant: SparklineVariant;
  curve: ChartCurve;
  markers: SparklineMarkers;
  startAtZero: boolean;
  showTooltip: boolean;
  animation: SparklineAnimation;
  animationDuration: number;
  height: number;
  color: string;
}

const SLUG = 'sparkline';

const SEED_VALUES = '12, 18, 15, 22, 19, 27, 24, 31, 28, 35, 33, 41';

@Component({
  selector: 'web-sparkline-demo-page',
  templateUrl: './sparkline-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InputComponent,
    SparklineComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class SparklineDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS[SLUG], UI_API[SLUG]);
  protected readonly state = signal<SparklineKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as SparklineKnobState,
  );

  protected readonly valuesText = signal(SEED_VALUES);

  // A blank entry between commas leaves a gap, as does one that is not a number yet
  protected readonly data = computed(() =>
    this.valuesText()
      .split(',')
      .map(token => {
        const value = Number(token.trim());
        return token.trim() !== '' && Number.isFinite(value) ? value : null;
      }),
  );

  protected readonly extraAttributes = computed(() => [
    `[data]="[${this.data()
      .map(value => (value === null ? 'null' : String(value)))
      .join(', ')}]"`,
  ]);

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as SparklineKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as SparklineKnobState,
    );
    this.valuesText.set(SEED_VALUES);
  }
}
