import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import {
  CHART_CURVES,
  type ChartCurve,
  type CurvePoint,
  chartColor,
  clamp,
  injectChartFormatter,
  injectChartViewport,
} from '../chart/chart';
import { EagamiI18nService } from '../i18n/i18n.service';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import { uniqueId } from '../unique-id';

/** How a sparkline draws its values. */
export type SparklineVariant = 'line' | 'area' | 'bar';

/**
 * Values a sparkline singles out: `last` the latest one, `extremes` the
 * highest and lowest as well, and `all` every value. A line or area marks them
 * with a dot; bars dim every other bar.
 */
export type SparklineMarkers = 'none' | 'last' | 'extremes' | 'all';

/**
 * Entrance animation, replayed whenever the data changes. `draw` traces the
 * line or grows the bars, and `fade` fades the sparkline in.
 */
export type SparklineAnimation = 'draw' | 'fade' | 'none';

interface PlotBar {
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

// Where a value sits: a line's point, or the tip of its bar
interface PlotPosition {
  index: number;
  x: number;
  y: number;
}

const MARKER_RADIUS = 3.5;
const ACTIVE_RADIUS = 4.5;
const MARKER_RING = 2;
// Room kept around a line so its markers and their rings never clip at the edges
const INSET = MARKER_RADIUS + MARKER_RING;
const BAR_GAP = 0.3;
// A value that is not zero always shows at least this tall
const MIN_BAR_PX = 1;

/**
 * A small, axis-free trend of one run of values, as a line, an area, or bars,
 * sized to sit in a stat tile, a table cell, or a line of text. It is a single
 * image to assistive technology, named by `aria-label` and described by its
 * first, last, lowest, and highest values.
 */
@Component({
  selector: 'ea-sparkline',
  imports: [NgClass, TooltipDirective],
  templateUrl: './sparkline.component.html',
  styleUrl: './sparkline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SparklineComponent {
  protected readonly i18n = inject(EagamiI18nService);

  /** The values to plot, oldest first; `null` leaves a gap. */
  readonly data = input<(number | null)[]>([]);
  /** Draws the values as a line, a line over a filled area, or bars. */
  readonly variant = input<SparklineVariant>('line');
  /** How a line or area bends between values. */
  readonly curve = input<ChartCurve>('linear');
  /** Values singled out with a dot, or on bars by dimming the rest. */
  readonly markers = input<SparklineMarkers>('last');
  /** Any CSS color; defaults to the first color of the chart palette. */
  readonly color = input<string | undefined>(undefined);
  /**
   * Starts the scale of a line or area at zero, so its height shows the true
   * size of each value rather than a close-up of how they vary. Bars always
   * start at zero.
   */
  readonly startAtZero = input<boolean>(false);
  /** Shows the value under the pointer in a tooltip, on hover or while a finger slides along. */
  readonly showTooltip = input<boolean>(false);
  /** Height in pixels; the width fills the container. */
  readonly height = input<number>(32);
  /** Entrance animation, replayed whenever the data changes. */
  readonly animation = input<SparklineAnimation>('draw');
  /** Length of the entrance animation in milliseconds. */
  readonly animationDuration = input<number>(600);
  /** Formats the values in the tooltip and those read out to assistive technology; locale-grouped by default. */
  readonly formatValue = input<((value: number) => string) | null>(null);
  /** Accessible name for the sparkline; defaults to a localized "Trend". */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  private readonly viewport = injectChartViewport(this.height);
  private readonly format = injectChartFormatter(this.formatValue);
  protected readonly summaryId = uniqueId('ea-sparkline-summary');
  protected readonly active = signal<number | null>(null);

  protected readonly label = computed(
    () => this.ariaLabel() || this.i18n.messages().chart.trend,
  );

  private readonly values = computed(() =>
    this.data().map(value => (value != null && isFinite(value) ? value : null)),
  );

  private readonly known = computed(() =>
    this.values().filter((value): value is number => value !== null),
  );

  protected readonly hasData = computed(() => this.known().length > 0);

  // A fresh object whenever the data or animation changes re-creates the plot,
  // which is what replays its entrance animation
  protected readonly renderPass = computed(() => {
    this.data();
    this.variant();
    this.animation();
    this.animationDuration();
    return [{}];
  });

  protected readonly hostClasses = computed(() => ({
    [`ea-sparkline--${this.variant()}`]: true,
    [`ea-sparkline--animate-${this.animation()}`]: true,
    'ea-sparkline--interactive': this.showTooltip(),
  }));

  protected readonly stroke = computed(() => chartColor(0, this.color()));

  // Indices singled out by `markers`: every value, or the latest, then the highest and lowest
  private readonly marked = computed(() => {
    const values = this.values();
    const known = this.known();
    const marked = new Set<number>();
    if (this.markers() === 'none' || !known.length) {
      return marked;
    }
    if (this.markers() === 'all') {
      values.forEach((value, index) => {
        if (value !== null) {
          marked.add(index);
        }
      });
      return marked;
    }
    let last = values.length - 1;
    while (values[last] === null) {
      last--;
    }
    marked.add(last);
    if (this.markers() === 'extremes') {
      marked.add(values.indexOf(Math.max(...known)));
      marked.add(values.indexOf(Math.min(...known)));
    }
    return marked;
  });

  protected readonly layout = computed(() => {
    const width = Math.max(1, this.viewport.width());
    const height = Math.max(1, this.height());
    const values = this.values();
    const known = this.known();
    const bars = this.variant() === 'bar';
    const inset = bars ? 0 : INSET;

    const fromZero = bars || this.startAtZero();
    const lo = Math.min(...known, ...(fromZero ? [0] : []));
    const hi = Math.max(...known, ...(fromZero ? [0] : []));
    const top = inset;
    const bottom = height - inset;
    // A flat run has no spread to show, so it sits halfway up
    const y = (value: number) =>
      hi === lo
        ? (top + bottom) / 2
        : top + (1 - (clamp(value, lo, hi) - lo) / (hi - lo)) * (bottom - top);

    const count = values.length;
    const marked = this.marked();
    const positions: PlotPosition[] = [];

    if (bars) {
      const band = width / Math.max(1, count);
      const barWidth = Math.max(1, band * (1 - BAR_GAP));
      const baseline = y(clamp(0, lo, hi));
      const plotted: PlotBar[] = [];
      values.forEach((value, index) => {
        if (value === null) {
          return;
        }
        const tip = y(value);
        const length = Math.max(value === 0 ? 0 : MIN_BAR_PX, Math.abs(tip - baseline));
        const up = tip < baseline || (tip === baseline && value > 0);
        const x = index * band + (band - barWidth) / 2;
        plotted.push({
          index,
          x,
          y: up ? baseline - length : baseline,
          width: barWidth,
          height: length,
        });
        positions.push({
          index,
          x: x + barWidth / 2,
          y: up ? baseline - length : baseline + length,
        });
      });
      return {
        width,
        height,
        baseline,
        bars: plotted,
        paths: [],
        areas: [],
        markers: [],
        positions,
      };
    }

    const x = (index: number) =>
      count > 1 ? inset + (index * (width - 2 * inset)) / (count - 1) : width / 2;
    const runs: CurvePoint[][] = [];
    let run: CurvePoint[] = [];
    values.forEach((value, index) => {
      if (value === null) {
        if (run.length) {
          runs.push(run);
        }
        run = [];
        return;
      }
      run.push({ x: x(index), y: y(value) });
      positions.push({ index, x: x(index), y: y(value) });
    });
    if (run.length) {
      runs.push(run);
    }
    const curve = CHART_CURVES[this.curve()];
    // A lone value between gaps has no line to draw, so it always shows as a dot
    const lone = runs.filter(r => r.length === 1).map(([point]) => point);
    const dots = [...marked].map(index => ({ x: x(index), y: y(values[index] ?? 0) }));
    return {
      width,
      height,
      baseline: bottom,
      bars: [],
      paths: runs.filter(r => r.length > 1).map(curve),
      areas:
        this.variant() === 'area'
          ? runs
              .filter(r => r.length > 1)
              .map(r => `${curve(r)}L${r[r.length - 1].x},${height}L${r[0].x},${height}Z`)
          : [],
      markers: [...lone, ...dots.filter(d => !lone.some(p => p.x === d.x))].map(
        point => ({ ...point, r: MARKER_RADIUS }),
      ),
      positions,
    };
  });

  protected readonly activePosition = computed(() => {
    const index = this.active();
    return this.showTooltip() && index !== null
      ? (this.layout().positions.find(p => p.index === index) ?? null)
      : null;
  });

  protected readonly activeRadius = ACTIVE_RADIUS;

  // One anchor per highlighted value, so each new value opens a fresh bubble beside it
  protected readonly tooltips = computed(() => {
    const position = this.activePosition();
    const value = position ? this.values()[position.index] : null;
    return position && value !== null
      ? [{ ...position, key: position.index, text: this.format()(value) }]
      : [];
  });

  protected isDimmed(bar: PlotBar): boolean {
    const active = this.activePosition();
    if (active) {
      return active.index !== bar.index;
    }
    const marked = this.marked();
    return marked.size > 0 && !marked.has(bar.index);
  }

  protected onPointer(event: PointerEvent): void {
    if (!this.showTooltip()) {
      return;
    }
    const target = event.currentTarget as SVGSVGElement;
    const px = event.clientX - target.getBoundingClientRect().left;
    let nearest: PlotPosition | null = null;
    for (const position of this.layout().positions) {
      if (!nearest || Math.abs(position.x - px) < Math.abs(nearest.x - px)) {
        nearest = position;
      }
    }
    this.active.set(nearest?.index ?? null);
  }

  // A touch or pen has no hover, so lifting it ends the reading
  protected onPointerUp(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') {
      this.clear();
    }
  }

  protected clear(): void {
    this.active.set(null);
  }

  protected readonly summary = computed(() => {
    const known = this.known();
    if (!known.length) {
      return this.i18n.messages().chart.noData;
    }
    const format = this.format();
    return this.i18n
      .messages()
      .chart.trendSummary(
        format(known[0]),
        format(known[known.length - 1]),
        format(Math.min(...known)),
        format(Math.max(...known)),
      );
  });
}
