import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import {
  type ChartPointEvent,
  type ChartSeries,
  type ChartSize,
  chartColor,
  clamp,
  estimateTextWidth,
  injectChartFormatter,
  injectChartViewport,
  niceScale,
} from '../chart/chart';
import { EagamiI18nService } from '../i18n/i18n.service';
import { TooltipDirective } from '../tooltip/tooltip.directive';

/** How the line bends between points. */
export type LineChartCurve = 'linear' | 'smooth' | 'step';

/**
 * Entrance animation, replayed whenever the data changes. `draw` traces each
 * line along its length, `reveal` wipes every line in together from left to
 * right, `fade` fades the plot in, and `rise` grows it up from the baseline.
 */
export type LineChartAnimation = 'draw' | 'reveal' | 'fade' | 'rise' | 'none';

interface PlotPoint {
  x: number;
  y: number;
  index: number;
  value: number;
}

interface PlotSeries {
  name: string;
  color: string;
  paths: string[];
  areas: string[];
  points: PlotPoint[];
}

interface ActivePoint {
  series: number;
  index: number;
}

function linearPath(points: PlotPoint[]): string {
  return points.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join('');
}

// Steps at the midpoint between neighbours, so each value owns the span around it
function stepPath(points: PlotPoint[]): string {
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const mid = (points[i - 1].x + points[i].x) / 2;
    d += `H${mid}V${points[i].y}H${points[i].x}`;
  }
  return d;
}

// Monotone cubic interpolation (Fritsch-Carlson): smooth, but never overshoots
// a data point, so a curve cannot suggest a value the data never reached
function smoothPath(points: PlotPoint[]): string {
  const n = points.length;
  if (n < 3) {
    return linearPath(points);
  }
  const slopes: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    slopes.push((points[i + 1].y - points[i].y) / (points[i + 1].x - points[i].x));
  }
  const tangents = [slopes[0]];
  for (let i = 1; i < n - 1; i++) {
    tangents.push(slopes[i - 1] * slopes[i] <= 0 ? 0 : (slopes[i - 1] + slopes[i]) / 2);
  }
  tangents.push(slopes[n - 2]);
  for (let i = 0; i < n - 1; i++) {
    if (slopes[i] === 0) {
      tangents[i] = 0;
      tangents[i + 1] = 0;
      continue;
    }
    const a = tangents[i] / slopes[i];
    const b = tangents[i + 1] / slopes[i];
    const s = a * a + b * b;
    if (s > 9) {
      const k = 3 / Math.sqrt(s);
      tangents[i] = k * a * slopes[i];
      tangents[i + 1] = k * b * slopes[i];
    }
  }
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < n - 1; i++) {
    const p = points[i];
    const q = points[i + 1];
    const third = (q.x - p.x) / 3;
    d += `C${p.x + third},${p.y + tangents[i] * third},${q.x - third},${q.y - tangents[i + 1] * third},${q.x},${q.y}`;
  }
  return d;
}

const CURVES: Record<LineChartCurve, (points: PlotPoint[]) => string> = {
  linear: linearPath,
  smooth: smoothPath,
  step: stepPath,
};

/**
 * Plots one or more series of values across shared labels as lines, with
 * optional points and area fills. Hovering or arrowing through the chart
 * reveals each label's values in a tooltip, and a visually hidden table
 * carries the full data for screen readers.
 */
@Component({
  selector: 'ea-line-chart',
  imports: [NgClass, TooltipDirective],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LineChartComponent {
  protected readonly i18n = inject(EagamiI18nService);

  /** Category labels along the x-axis, one per value. */
  readonly labels = input<string[]>([]);
  /** The series to plot. */
  readonly series = input<ChartSeries[]>([]);
  /** How the line bends between points. */
  readonly curve = input<LineChartCurve>('linear');
  /** Fills the area beneath each line with a light wash of its color. */
  readonly showArea = input<boolean>(false);
  /** Marks every value with a point. */
  readonly showPoints = input<boolean>(true);
  /** Draws horizontal gridlines at each y-axis tick. */
  readonly showGrid = input<boolean>(true);
  /** Shows a legend beneath the chart when it plots more than one series. */
  readonly showLegend = input<boolean>(true);
  /** Lower bound of the y-axis; derived from the data when unset. */
  readonly yMin = input<number | undefined>(undefined);
  /** Upper bound of the y-axis; derived from the data when unset. */
  readonly yMax = input<number | undefined>(undefined);
  /** Height of the plot in pixels; the width fills the container. */
  readonly height = input<number>(240);
  /** Visual size; scales the axis, legend, and tooltip text. */
  readonly size = input<ChartSize>('md');
  /** Entrance animation, replayed whenever the data changes. */
  readonly animation = input<LineChartAnimation>('draw');
  /** Length of the entrance animation in milliseconds. */
  readonly animationDuration = input<number>(600);
  /** Formats values on the axis, tooltip, and data table; locale-grouped by default. */
  readonly formatValue = input<((value: number) => string) | null>(null);
  /** Accessible name for the chart; defaults to a localized "Line chart". */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  /** Fires when a point is clicked, or chosen with Enter or Space. */
  readonly pointClick = output<ChartPointEvent>();
  /** Fires when the highlighted point changes by pointer or keyboard, with `null` once cleared. */
  readonly activePointChange = output<ChartPointEvent | null>();

  private readonly viewport = injectChartViewport(this.size);
  private readonly format = injectChartFormatter(this.formatValue);
  protected readonly active = signal<ActivePoint | null>(null);

  protected readonly label = computed(
    () => this.ariaLabel() || this.i18n.messages().chart.lineChart,
  );

  protected readonly count = computed(() =>
    Math.max(this.labels().length, ...this.series().map(s => s.data.length), 0),
  );

  protected readonly hasData = computed(() =>
    this.series().some(s => s.data.some(v => v != null && isFinite(v))),
  );

  // A fresh object whenever the data or animation changes re-creates the plot,
  // which is what replays its entrance animation
  protected readonly renderPass = computed(() => {
    this.labels();
    this.series();
    this.animation();
    this.animationDuration();
    return [{}];
  });

  protected readonly hostClasses = computed(() => ({
    [`ea-line-chart--${this.size()}`]: true,
    [`ea-line-chart--animate-${this.animation()}`]: true,
  }));

  protected readonly layout = computed(() => {
    const count = this.count();
    const width = this.viewport.width();
    const height = this.height();
    const axisPx = this.viewport.fontSize() * 0.75;
    const format = this.format();
    const values = this.series().flatMap(s =>
      s.data.filter((v): v is number => v != null && isFinite(v)),
    );
    const top = axisPx;
    const bottom = axisPx * 2.5;
    const plotHeight = Math.max(1, height - top - bottom);

    let lo = this.yMin() ?? Math.min(...values);
    let hi = this.yMax() ?? Math.max(...values);
    if (this.showArea() && this.yMin() === undefined) {
      lo = Math.min(lo, 0);
    }
    if (lo > hi) {
      [lo, hi] = [hi, lo];
    }
    const scale = niceScale(lo, hi, Math.max(2, Math.floor(plotHeight / (axisPx * 3))));
    let min = this.yMin() ?? scale.min;
    let max = this.yMax() ?? scale.max;
    if (min > max) {
      [min, max] = [max, min];
    }
    const ticks = scale.ticks
      .filter(t => t >= min && t <= max)
      .map(value => ({ value, text: format(value) }));

    const labelTexts = Array.from({ length: count }, (_, i) => this.labels()[i] ?? '');
    const widestLabel = Math.max(0, ...labelTexts.map(t => estimateTextWidth(t, axisPx)));
    const left =
      Math.max(0, ...ticks.map(t => estimateTextWidth(t.text, axisPx))) + axisPx;
    const right = Math.min(widestLabel / 2, width * 0.1) + axisPx / 2;
    const plotWidth = Math.max(1, width - left - right);
    const spacing = count > 1 ? plotWidth / (count - 1) : plotWidth;
    const x = (i: number) => (count > 1 ? left + i * spacing : left + plotWidth / 2);
    const y = (v: number) =>
      top + (1 - (clamp(v, min, max) - min) / (max - min || 1)) * plotHeight;
    const baselineY = y(clamp(0, min, max));

    const labelStep = Math.max(1, Math.ceil((widestLabel + axisPx) / spacing));
    const xLabels = labelTexts
      .map((text, index) => ({ text, index, x: x(index) }))
      .filter(l => l.index % labelStep === 0);

    const curve = CURVES[this.curve()];
    const series: PlotSeries[] = this.series().map((s, seriesIndex) => {
      const segments: PlotPoint[][] = [];
      let run: PlotPoint[] = [];
      for (let index = 0; index < count; index++) {
        const value = s.data[index];
        if (value == null || !isFinite(value)) {
          if (run.length) {
            segments.push(run);
          }
          run = [];
          continue;
        }
        run.push({ x: x(index), y: y(value), index, value });
      }
      if (run.length) {
        segments.push(run);
      }
      return {
        name: s.name,
        color: chartColor(seriesIndex, s.color),
        paths: segments.map(curve),
        areas: segments.map(
          seg =>
            `${curve(seg)}L${seg[seg.length - 1].x},${baselineY}L${seg[0].x},${baselineY}Z`,
        ),
        points: segments.flat(),
      };
    });

    return {
      width,
      height,
      top,
      left,
      plotWidth,
      plotHeight,
      baselineY,
      labelY: top + plotHeight + axisPx * 1.5,
      tickX: left - axisPx / 2,
      ticks: ticks.map(t => ({ ...t, y: y(t.value) })),
      xLabels,
      series,
      x,
      y,
    };
  });

  protected readonly tooltip = computed(() => {
    const active = this.active();
    if (!active) {
      return null;
    }
    const layout = this.layout();
    const x = layout.x(active.index);
    const activeValue = this.series()[active.series]?.data[active.index];
    const rows = this.series().map((s, i) => {
      const value = s.data[active.index];
      return {
        name: s.name,
        color: chartColor(i, s.color),
        value: value == null || !isFinite(value) ? '–' : this.format()(value),
        active: i === active.series,
      };
    });
    return {
      x,
      y:
        activeValue != null && isFinite(activeValue) ? layout.y(activeValue) : layout.top,
      title: this.labels()[active.index] ?? '',
      rows,
      key: `${active.series}-${active.index}`,
    };
  });

  // One anchor per highlighted point, so each new point opens a fresh bubble beside it
  protected readonly tooltips = computed(() => {
    const tip = this.tooltip();
    return tip ? [tip] : [];
  });

  protected readonly announcement = computed(() => {
    const event = this.eventFor(this.active());
    return event
      ? this.i18n
          .messages()
          .chart.point(event.seriesName, event.label, this.format()(event.value))
      : '';
  });

  protected readonly showsLegend = computed(
    () => this.showLegend() && this.series().length > 1,
  );

  protected seriesColor(index: number): string {
    return chartColor(index, this.series()[index]?.color);
  }

  protected isDimmed(index: number): boolean {
    const active = this.active();
    return !!active && active.series !== index && this.series().length > 1;
  }

  protected isActivePoint(seriesIndex: number, index: number): boolean {
    const active = this.active();
    return !!active && active.series === seriesIndex && active.index === index;
  }

  protected tableValue(value: number | null | undefined): string {
    return value == null || !isFinite(value) ? '–' : this.format()(value);
  }

  protected onPointerMove(event: PointerEvent): void {
    const target = event.currentTarget as SVGSVGElement;
    const rect = target.getBoundingClientRect();
    const layout = this.layout();
    const count = this.count();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    const index =
      count > 1
        ? clamp(
            Math.round(((px - layout.left) / layout.plotWidth) * (count - 1)),
            0,
            count - 1,
          )
        : 0;
    let series = -1;
    let nearest = Infinity;
    this.series().forEach((s, i) => {
      const value = s.data[index];
      if (value == null || !isFinite(value)) {
        return;
      }
      const distance = Math.abs(layout.y(value) - py);
      if (distance < nearest) {
        nearest = distance;
        series = i;
      }
    });
    this.setActive(series === -1 ? null : { series, index });
  }

  protected onPointerLeave(): void {
    this.setActive(null);
  }

  protected onClick(): void {
    const event = this.eventFor(this.active());
    if (event) {
      this.pointClick.emit(event);
    }
  }

  protected onFocus(): void {
    if (!this.active()) {
      this.setActive(this.firstPoint());
    }
  }

  protected onBlur(): void {
    this.setActive(null);
  }

  protected onKeydown(event: KeyboardEvent): void {
    // The first arrow press lands on the first point rather than stepping past it
    if (!this.active() && event.key.startsWith('Arrow')) {
      event.preventDefault();
      this.setActive(this.firstPoint());
      return;
    }
    const active = this.active() ?? this.firstPoint();
    if (!active) {
      return;
    }
    const count = this.count();
    const seriesCount = this.series().length;
    let next: ActivePoint | null = active;
    switch (event.key) {
      case 'ArrowRight':
        next = this.nearestValid(active.series, active.index + 1, 1);
        break;
      case 'ArrowLeft':
        next = this.nearestValid(active.series, active.index - 1, -1);
        break;
      case 'Home':
        next = this.nearestValid(active.series, 0, 1);
        break;
      case 'End':
        next = this.nearestValid(active.series, count - 1, -1);
        break;
      case 'ArrowUp':
      case 'ArrowDown': {
        const step = event.key === 'ArrowDown' ? 1 : -1;
        for (let hop = 1; hop < seriesCount; hop++) {
          const series = (active.series + step * hop + seriesCount) % seriesCount;
          if (this.valueAt(series, active.index) != null) {
            next = { series, index: active.index };
            break;
          }
        }
        break;
      }
      case 'Enter':
      case ' ':
        this.onClick();
        break;
      case 'Escape':
        next = null;
        break;
      default:
        return;
    }
    event.preventDefault();
    this.setActive(next ?? (event.key === 'Escape' ? null : active));
  }

  private valueAt(series: number, index: number): number | null {
    const value = this.series()[series]?.data[index];
    return value == null || !isFinite(value) ? null : value;
  }

  // Earliest plotted value in any series, so a chart whose first series is empty still takes focus
  private firstPoint(): ActivePoint | null {
    for (let index = 0; index < this.count(); index++) {
      const series = this.series().findIndex((_, s) => this.valueAt(s, index) != null);
      if (series !== -1) {
        return { series, index };
      }
    }
    return null;
  }

  // Walks from `index` in `step` direction to the first plotted value of `series`
  private nearestValid(series: number, index: number, step: 1 | -1): ActivePoint | null {
    for (let i = index; i >= 0 && i < this.count(); i += step) {
      if (this.valueAt(series, i) != null) {
        return { series, index: i };
      }
    }
    return null;
  }

  private eventFor(active: ActivePoint | null): ChartPointEvent | null {
    if (!active) {
      return null;
    }
    const value = this.valueAt(active.series, active.index);
    if (value == null) {
      return null;
    }
    return {
      seriesIndex: active.series,
      seriesName: this.series()[active.series].name,
      index: active.index,
      label: this.labels()[active.index] ?? '',
      value,
    };
  }

  private setActive(next: ActivePoint | null): void {
    const current = this.active();
    if (current?.series === next?.series && current?.index === next?.index) {
      return;
    }
    this.active.set(next);
    this.activePointChange.emit(this.eventFor(next));
  }
}
