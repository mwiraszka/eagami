import {
  type ChartSeries,
  type ChartSize,
  type LineChartAnimation,
  LineChartComponent,
  type LineChartCurve,
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

interface LineChartKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive the checked bindings.
  [key: string]: KnobValue;
  curve: LineChartCurve;
  size: ChartSize;
  animation: LineChartAnimation;
  animationDuration: number;
  height: number;
  showArea: boolean;
  showPoints: boolean;
  showGrid: boolean;
  showLegend: boolean;
}

const SLUG = 'line-chart';

@Component({
  selector: 'web-line-chart-demo-page',
  templateUrl: './line-chart-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LineChartComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class LineChartDemoPageComponent {
  private readonly messages = inject(WebI18nService).messages;
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['line-chart'], UI_API[SLUG]);
  protected readonly state = signal<LineChartKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS['line-chart']) as LineChartKnobState,
  );

  protected readonly extraAttributes = ['[labels]="labels"', '[series]="series"'];

  protected readonly labels = computed(() => [
    ...this.messages().ui.component.demos.lineChart.months,
  ]);

  protected readonly series = computed<ChartSeries[]>(() => {
    const m = this.messages().ui.component.demos.lineChart;
    return [
      { name: m.visitors, data: [1200, 1850, 1640, 2310, 2780, 2520, 3140, 3480] },
      { name: m.signUps, data: [320, 410, 520, 480, 690, 740, 810, 960] },
    ];
  });

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as LineChartKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS['line-chart']) as LineChartKnobState,
    );
  }
}
