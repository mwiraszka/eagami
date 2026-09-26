import {
  type ChartSize,
  type PieChartAnimation,
  PieChartComponent,
  type PieChartSlice,
  type PieChartVariant,
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

interface PieChartKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive the checked bindings.
  [key: string]: KnobValue;
  variant: PieChartVariant;
  size: ChartSize;
  animation: PieChartAnimation;
  animationDuration: number;
  height: number;
  showLegend: boolean;
  showPercentages: boolean;
}

const SLUG = 'pie-chart';

@Component({
  selector: 'web-pie-chart-demo-page',
  templateUrl: './pie-chart-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PieChartComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class PieChartDemoPageComponent {
  private readonly messages = inject(WebI18nService).messages;
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['pie-chart'], UI_API[SLUG]);
  protected readonly state = signal<PieChartKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS['pie-chart']) as PieChartKnobState,
  );

  protected readonly extraAttributes = ['[data]="data"'];

  protected readonly data = computed<PieChartSlice[]>(() => {
    const m = this.messages().ui.component.demos.pieChart;
    return [
      { label: m.desktop, value: 5480 },
      { label: m.mobile, value: 3920 },
      { label: m.tablet, value: 1140 },
      { label: m.other, value: 460 },
    ];
  });

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as PieChartKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS['pie-chart']) as PieChartKnobState,
    );
  }
}
