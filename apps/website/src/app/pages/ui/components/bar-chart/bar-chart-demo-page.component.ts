import {
  type BarChartAnimation,
  BarChartComponent,
  type BarChartOrientation,
  ButtonComponent,
  type ChartLabelOrientation,
  type ChartSeries,
  type ChartSize,
  InputComponent,
  PlusIconComponent,
  TooltipDirective,
  TrashIconComponent,
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
  showAxisBreak: boolean;
  xLabelOrientation: ChartLabelOrientation;
}

const SLUG = 'bar-chart';

interface DemoCategory {
  id: number;
  label: string;
  values: number[];
}

// One row of values per quarter, in the order of the series below
const SEED_VALUES = [
  [42, 28, 15],
  [58, 35, 19],
  [51, 47, 22],
  [67, 52, 30],
];

@Component({
  selector: 'web-bar-chart-demo-page',
  templateUrl: './bar-chart-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BarChartComponent,
    ButtonComponent,
    InputComponent,
    PlusIconComponent,
    TooltipDirective,
    TrashIconComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class BarChartDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['bar-chart'], UI_API[SLUG]);
  protected readonly state = signal<BarChartKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS['bar-chart']) as BarChartKnobState,
  );

  protected readonly extraAttributes = ['[labels]="labels"', '[series]="series"'];

  private nextId = 1;
  protected readonly categories = signal<DemoCategory[]>(this.seedCategories());

  protected readonly seriesNames = computed(() => {
    const m = this.messages().ui.component.demos.barChart;
    return [m.hardware, m.software, m.services];
  });

  protected readonly labels = computed(() => this.categories().map(c => c.label));

  protected readonly series = computed<ChartSeries[]>(() =>
    this.seriesNames().map((name, s) => ({
      name,
      data: this.categories().map(c => c.values[s]),
    })),
  );

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as BarChartKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS['bar-chart']) as BarChartKnobState,
    );
    this.nextId = 1;
    this.categories.set(this.seedCategories());
  }

  // Blank or partly typed numbers keep the last valid value until the input reads as one
  protected toNumber(text: string, fallback: number): number {
    const value = Number(text);
    return text.trim() !== '' && Number.isFinite(value) ? value : fallback;
  }

  protected updateLabel(id: number, label: string): void {
    this.categories.update(categories =>
      categories.map(c => (c.id === id ? { ...c, label } : c)),
    );
  }

  protected updateValue(id: number, seriesIndex: number, text: string): void {
    this.categories.update(categories =>
      categories.map(c =>
        c.id === id
          ? {
              ...c,
              values: c.values.map((v, s) =>
                s === seriesIndex ? this.toNumber(text, v) : v,
              ),
            }
          : c,
      ),
    );
  }

  protected addCategory(): void {
    const last = this.categories().at(-1);
    this.categories.update(categories => [
      ...categories,
      {
        id: this.nextId++,
        label: `${this.messages().ui.component.demos.barChart.category} ${categories.length + 1}`,
        values: last ? [...last.values] : this.seriesNames().map(() => 50),
      },
    ]);
  }

  protected removeCategory(id: number): void {
    this.categories.update(categories => categories.filter(c => c.id !== id));
  }

  private seedCategories(): DemoCategory[] {
    const quarters = this.messages().ui.component.demos.barChart.quarters;
    return SEED_VALUES.map((values, i) => ({
      id: this.nextId++,
      label: quarters[i],
      values: [...values],
    }));
  }
}
