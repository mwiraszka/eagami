import {
  ButtonComponent,
  type ChartLabelOrientation,
  type ChartSeries,
  type ChartSize,
  InputComponent,
  type LineChartAnimation,
  LineChartComponent,
  type LineChartCurve,
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
  showAxisBreak: boolean;
  xLabelOrientation: ChartLabelOrientation;
  visibleXSpan: number;
}

const SLUG = 'line-chart';

interface DemoPoint {
  id: number;
  x: number;
  value: number;
  title: string;
}

interface DemoTick {
  id: number;
  value: number;
  label: string;
}

// Daily visitors on irregular days, placed by day of the year against a tick at the
// start of each month
const YEAR = 2025;
const SEED_POINTS: Omit<DemoPoint, 'id' | 'title'>[] = [
  { x: 5, value: 540 },
  { x: 28, value: 685 },
  { x: 50, value: 610 },
  { x: 75, value: 820 },
  { x: 98, value: 910 },
];
const SEED_TICK_DAYS = [0, 31, 59, 90];
const DAYS_BETWEEN_POINTS = 7;
const DAYS_BETWEEN_TICKS = 30;

function dateOfDay(day: number): Date {
  return new Date(YEAR, 0, 1 + day);
}

@Component({
  selector: 'web-line-chart-demo-page',
  templateUrl: './line-chart-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    InputComponent,
    LineChartComponent,
    PlusIconComponent,
    TooltipDirective,
    TrashIconComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class LineChartDemoPageComponent {
  private readonly i18n = inject(WebI18nService);
  protected readonly messages = this.i18n.messages;
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['line-chart'], UI_API[SLUG]);
  protected readonly state = signal<LineChartKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS['line-chart']) as LineChartKnobState,
  );

  protected readonly extraAttributes = [
    '[labels]="labels"',
    '[series]="series"',
    '[xValues]="xValues"',
    '[xTicks]="xTicks"',
  ];

  private nextId = 1;
  protected readonly points = signal<DemoPoint[]>(this.seedPoints());
  protected readonly ticks = signal<DemoTick[]>(this.seedTicks());

  // Points are plotted in order of their x position, whatever order they were entered in
  private readonly sortedPoints = computed(() =>
    [...this.points()].sort((a, b) => a.x - b.x),
  );

  protected readonly labels = computed(() =>
    this.sortedPoints().map(point => point.title),
  );

  protected readonly series = computed<ChartSeries[]>(() => [
    {
      name: this.messages().ui.component.demos.lineChart.visitors,
      data: this.sortedPoints().map(point => point.value),
    },
  ]);

  protected readonly xValues = computed(() => this.sortedPoints().map(point => point.x));
  protected readonly xTicks = computed(() =>
    this.ticks().map(({ value, label }) => ({ value, label })),
  );

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as LineChartKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS['line-chart']) as LineChartKnobState,
    );
    this.nextId = 1;
    this.points.set(this.seedPoints());
    this.ticks.set(this.seedTicks());
  }

  // Blank or partly typed numbers keep the last valid value until the input reads as one
  protected toNumber(text: string, fallback: number): number {
    const value = Number(text);
    return text.trim() !== '' && Number.isFinite(value) ? value : fallback;
  }

  protected updatePoint(id: number, patch: Partial<DemoPoint>): void {
    this.points.update(points =>
      points.map(point => (point.id === id ? { ...point, ...patch } : point)),
    );
  }

  protected addPoint(): void {
    const last = this.sortedPoints().at(-1);
    const x = (last?.x ?? 0) + DAYS_BETWEEN_POINTS;
    this.points.update(points => [
      ...points,
      { id: this.nextId++, x, value: last?.value ?? 300, title: this.dayTitle(x) },
    ]);
  }

  protected removePoint(id: number): void {
    this.points.update(points => points.filter(point => point.id !== id));
  }

  protected updateTick(id: number, patch: Partial<DemoTick>): void {
    this.ticks.update(ticks =>
      ticks.map(tick => (tick.id === id ? { ...tick, ...patch } : tick)),
    );
  }

  protected addTick(): void {
    const last = this.ticks().at(-1);
    const value = (last?.value ?? 0) + DAYS_BETWEEN_TICKS;
    this.ticks.update(ticks => [
      ...ticks,
      { id: this.nextId++, value, label: this.monthLabel(value) },
    ]);
  }

  protected removeTick(id: number): void {
    this.ticks.update(ticks => ticks.filter(tick => tick.id !== id));
  }

  private seedPoints(): DemoPoint[] {
    return SEED_POINTS.map(point => ({
      ...point,
      id: this.nextId++,
      title: this.dayTitle(point.x),
    }));
  }

  private seedTicks(): DemoTick[] {
    return SEED_TICK_DAYS.map(value => ({
      id: this.nextId++,
      value,
      label: this.monthLabel(value),
    }));
  }

  private dayTitle(day: number): string {
    return dateOfDay(day).toLocaleDateString(this.i18n.locale(), {
      month: 'short',
      day: 'numeric',
    });
  }

  private monthLabel(day: number): string {
    return dateOfDay(day).toLocaleDateString(this.i18n.locale(), { month: 'short' });
  }
}
