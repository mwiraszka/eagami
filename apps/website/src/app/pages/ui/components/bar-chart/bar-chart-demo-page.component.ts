import {
  type BarChartAnimation,
  BarChartComponent,
  type BarChartOrientation,
  type ChartSeries,
  type ChartSize,
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

interface BarChartKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive the checked bindings.
  [key: string]: KnobValue;
  orientation: BarChartOrientation;
  size: ChartSize;
  animation: BarChartAnimation;
  animationDuration: number;
  height: number;
  stacked: boolean;
  showValues: boolean;
  showGrid: boolean;
  showLegend: boolean;
}

const SLUG = 'bar-chart';

@Component({
  selector: 'web-bar-chart-demo-page',
  templateUrl: './bar-chart-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BarChartComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class BarChartDemoPageComponent {
  private readonly messages = inject(WebI18nService).messages;
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['bar-chart'], UI_API[SLUG]);
  protected readonly state = signal<BarChartKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS['bar-chart']) as BarChartKnobState,
  );

  protected readonly extraAttributes = ['[labels]="labels"', '[series]="series"'];

  protected readonly labels = computed(() => [
    ...this.messages().ui.component.demos.barChart.quarters,
  ]);

  protected readonly series = computed<ChartSeries[]>(() => {
    const m = this.messages().ui.component.demos.barChart;
    return [
      { name: m.hardware, data: [42, 58, 51, 67] },
      { name: m.software, data: [28, 35, 47, 52] },
      { name: m.services, data: [15, 19, 22, 30] },
    ];
  });

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as BarChartKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS['bar-chart']) as BarChartKnobState,
    );
  }
}
