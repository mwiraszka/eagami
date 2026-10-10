import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  type ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  linkedSignal,
  output,
  signal,
  viewChild,
} from '@angular/core';

import {
  BREAK_CLEARANCE,
  BREAK_HEIGHT,
  CHART_LABEL_ANGLES,
  type ChartLabelOrientation,
  type ChartPointEvent,
  type ChartSeries,
  type ChartSize,
  axisBreak,
  chartColor,
  clamp,
  estimateTextWidth,
  injectChartFormatter,
  injectChartViewport,
  labelBand,
  labelLine,
  labelRoom,
  niceScale,
  tickLength,
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

/** A labelled mark along the x-axis, placed on the same scale as `xValues`. */
export interface LineChartTick {
  value: number;
  label: string;
}

/** The stretch of the x scale a windowed line chart currently shows. */
export interface LineChartVisibleRange {
  start: number;
  end: number;
}

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

interface DataPoint {
  index: number;
  position: number;
  value: number;
}

interface XLabel {
  key: number;
  text: string;
  x: number;
}

// A label as drawn: level ones at the chart's edges are nudged inward off their tick
interface PlacedXLabel extends XLabel {
  textX: number;
}

interface XDomain {
  /** First and last positions on the x scale. */
  first: number;
  last: number;
  /** Positions at the plot's left and right edges. */
  start: number;
  end: number;
  /** Width of the visible window, set only when the data outgrows it. */
  span: number | null;
}

/** Room between a windowed plot's edges and the points pinned to them, for the active ring. */
const EDGE_INSET = 8;

/** Pointer travel in px before a press becomes a pan rather than a tap. */
const DRAG_THRESHOLD = 4;

/** Height in px of one line of a wheel event measured in lines. */
const WHEEL_LINE_PX = 16;

// How strongly a pinch or Ctrl + wheel scales a window, per pixel of wheel delta
const ZOOM_RATE = 0.01;

// Value a curve passes through at `position`, between two neighbouring points
function valueBetween(
  a: DataPoint,
  b: DataPoint,
  position: number,
  curve: LineChartCurve,
): number {
  if (curve === 'step') {
    return position < (a.position + b.position) / 2 ? a.value : b.value;
  }
  return (
    a.value + ((b.value - a.value) * (position - a.position)) / (b.position - a.position)
  );
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

// Points sharing an x position have no slope between them, so the curve runs
// smoothly up to each such pair and joins it with a straight segment
function smoothPath(points: PlotPoint[]): string {
  let d = '';
  let start = 0;
  for (let i = 1; i <= points.length; i++) {
    if (i === points.length || points[i].x === points[i - 1].x) {
      const run = monotonePath(points.slice(start, i));
      d += start === 0 ? run : `L${run.slice(1)}`;
      start = i;
    }
  }
  return d;
}

// Monotone cubic interpolation (Fritsch-Carlson): smooth, but never overshoots
// a data point, so a curve cannot suggest a value the data never reached
function monotonePath(points: PlotPoint[]): string {
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

let nextId = 0;

/**
 * Plots one or more series of values as lines, with optional points and area
 * fills. Points are spaced evenly by default, or placed along a numeric scale
 * by `xValues`, with the x-axis labelled per point or by `xTicks`. A
 * `visibleXSpan` window makes a long run of data pannable. Hovering, tapping,
 * or arrowing through the chart reveals each point's values in a tooltip, and
 * a visually hidden table carries the full data for screen readers.
 */
@Component({
  selector: 'ea-line-chart',
  imports: [NgClass, NgTemplateOutlet, TooltipDirective],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LineChartComponent {
  protected readonly i18n = inject(EagamiI18nService);

  /**
   * Each point's name, one per value, titling its tooltip and its row in the
   * data table. Also labels the x-axis, unless `xTicks` is set.
   */
  readonly labels = input<string[]>([]);
  /** The series to plot. */
  readonly series = input<ChartSeries[]>([]);
  /**
   * Position of each point along the x-axis, one per value in ascending
   * order, so points sit proportionally apart. Spaced evenly by index when
   * unset.
   */
  readonly xValues = input<readonly number[] | null>(null);
  /**
   * Marks drawn along the x-axis in place of the per-point labels, each at its
   * value on the x scale (`xValues`, or the index when unset). They need not
   * line up with any point, and the axis widens to take in any beyond the points.
   */
  readonly xTicks = input<readonly LineChartTick[] | null>(null);
  /**
   * Width of the x range shown at once, in the units of `xValues` (or of
   * indices when unset). When the data spans more, the chart opens on its
   * latest stretch and pans by trackpad, Shift + wheel, drag, or the arrow
   * keys, and a trackpad pinch or Ctrl + wheel widens or narrows the window,
   * fitting the y-axis to the points in view. `null` shows everything.
   */
  readonly visibleXSpan = input<number | null>(null);
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
  /** How the x-axis labels are set; `auto` turns them as they run out of room. */
  readonly xLabelOrientation = input<ChartLabelOrientation>('horizontal');
  /** Marks the foot of a y-axis that stops short of zero with a break symbol. */
  readonly showAxisBreak = input<boolean>(false);
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
  /** Fires with the newly visible x range whenever a windowed chart pans or zooms. */
  readonly visibleRangeChange = output<LineChartVisibleRange>();

  private readonly viewport = injectChartViewport(this.size);
  private readonly format = injectChartFormatter(this.formatValue);
  private readonly plotEl = viewChild<ElementRef<HTMLElement>>('plot');
  protected readonly active = signal<ActivePoint | null>(null);
  protected readonly clipId = `ea-line-chart-clip-${nextId++}`;
  protected readonly breakMaskId = `${this.clipId}-break`;

  // The right edge of a panned window; `null` pins it to the latest point, and new data re-pins it
  private readonly panEnd = linkedSignal<number | null>(() => {
    this.xValues();
    this.series();
    this.visibleXSpan();
    return null;
  });
  // Width of a windowed view, which a pinch widens or narrows from `visibleXSpan`
  private readonly zoomSpan = linkedSignal<number | null>(() => this.visibleXSpan());
  private gestureSpan: number | null = null;
  protected readonly panning = signal(false);
  private drag: { pointerId: number; x: number; end: number; moved: boolean } | null =
    null;
  private suppressClick = false;
  // Set while a tapped point is held open; detaches the listener that ends the hold
  private releaseTap: (() => void) | null = null;

  protected readonly label = computed(
    () => this.ariaLabel() || this.i18n.messages().chart.lineChart,
  );

  protected readonly count = computed(() =>
    Math.max(this.labels().length, ...this.series().map(s => s.data.length), 0),
  );

  protected readonly hasData = computed(() =>
    this.series().some(s => s.data.some(v => this.isValue(v))),
  );

  // Each index's place on the x scale; `NaN` where `xValues` leaves it unknown
  private readonly positions = computed(() => {
    const xValues = this.xValues();
    return Array.from({ length: this.count() }, (_, i) =>
      xValues ? (xValues[i] ?? NaN) : i,
    );
  });

  // Spans every point and every tick, so no tick falls outside the axis
  protected readonly domain = computed<XDomain>(() => {
    const points = this.positions().filter(p => isFinite(p));
    const known = [...points, ...(this.xTicks()?.map(t => t.value) ?? [])].filter(p =>
      isFinite(p),
    );
    let first = known.length ? Math.min(...known) : 0;
    let last = known.length ? Math.max(...known) : 0;
    const span = this.zoomSpan();
    // A lone point sits in the middle, the axis reaching as far each way as its furthest
    // tick, though never past the visible span
    if (points.length === 1) {
      const [point] = points;
      const reach = Math.min(
        Math.max(point - first, last - point),
        span != null && span > 0 ? span / 2 : Infinity,
      );
      first = point - reach;
      last = point + reach;
    }
    if (span == null || !(span > 0) || last - first <= span) {
      return { first, last, start: first, end: last, span: null };
    }
    const end = clamp(this.panEnd() ?? last, first + span, last);
    return { first, last, start: end - span, end, span };
  });

  protected readonly windowed = computed(() => this.domain().span != null);

  // A fresh object whenever the data or animation changes re-creates the plot,
  // which is what replays its entrance animation
  protected readonly renderPass = computed(() => {
    this.labels();
    this.series();
    this.xValues();
    this.animation();
    this.animationDuration();
    return [{}];
  });

  protected readonly hostClasses = computed(() => ({
    [`ea-line-chart--${this.size()}`]: true,
    [`ea-line-chart--animate-${this.animation()}`]: true,
    'ea-line-chart--pannable': this.windowed(),
    'ea-line-chart--panning': this.panning(),
  }));

  // Each series split into runs of consecutive plotted values, in data space
  private readonly runs = computed(() => {
    const positions = this.positions();
    return this.series().map(s => {
      const runs: DataPoint[][] = [];
      let run: DataPoint[] = [];
      positions.forEach((position, index) => {
        const value = s.data[index];
        if (!this.isValue(value) || !isFinite(position)) {
          if (run.length) {
            runs.push(run);
          }
          run = [];
          return;
        }
        run.push({ index, position, value });
      });
      if (run.length) {
        runs.push(run);
      }
      return runs;
    });
  });

  // Values the y-axis must fit: every value, or on a panned window, those in view
  // plus where each line crosses the window's edges
  private readonly visibleValues = computed(() => {
    const runs = this.runs().flat();
    const domain = this.domain();
    if (domain.span == null) {
      return runs.flatMap(run => run.map(p => p.value));
    }
    const curve = this.curve();
    const values: number[] = [];
    for (const run of runs) {
      run.forEach((point, i) => {
        if (point.position >= domain.start && point.position <= domain.end) {
          values.push(point.value);
        }
        const next = run[i + 1];
        for (const edge of next ? [domain.start, domain.end] : []) {
          if (point.position < edge && next.position > edge) {
            values.push(valueBetween(point, next, edge, curve));
          }
        }
      });
    }
    // A window with nothing in view keeps the scale of the whole series
    return values.length ? values : runs.flatMap(run => run.map(p => p.value));
  });

  protected readonly layout = computed(() => {
    const width = this.viewport.width();
    const height = this.height();
    const axisPx = this.viewport.fontSize() * 0.75;
    const orientation = this.xLabelOrientation();
    const fixedAngle = orientation === 'auto' ? 0 : CHART_LABEL_ANGLES[orientation];
    const plot = this.plotArea(width, height, axisPx, fixedAngle);
    // Auto turns the labels only once level ones would no longer fit, then lays out again
    const angle =
      orientation === 'auto'
        ? ([0, 45, 90].find(a => this.labelsFit(plot.candidates, a, axisPx)) ?? 90)
        : fixedAngle;
    const { plotHeight, min, max, level, tickTexts, left, plotWidth, x, xLabels } =
      angle === fixedAngle ? plot : this.plotArea(width, height, axisPx, angle);
    const top = axisPx;

    const y = (v: number) =>
      top + (1 - (clamp(v, min, max) - min) / (max - min || 1)) * plotHeight;
    const baselineY = y(clamp(0, min, max));
    const breakY =
      this.showAxisBreak() && min > 0 && !level
        ? top + plotHeight - axisPx * BREAK_HEIGHT
        : null;
    const axisY = top + plotHeight;

    const curve = CURVES[this.curve()];
    const series: PlotSeries[] = this.series().map((s, seriesIndex) => {
      const runs = this.runs()[seriesIndex].map(run =>
        run.map(p => ({ x: x(p.index), y: y(p.value), index: p.index, value: p.value })),
      );
      return {
        name: s.name,
        color: chartColor(seriesIndex, s.color),
        paths: runs.map(curve),
        areas: runs.map(
          seg =>
            `${curve(seg)}L${seg[seg.length - 1].x},${baselineY}L${seg[0].x},${baselineY}Z`,
        ),
        points: runs.flat(),
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
      windowed: this.domain().span != null,
      axisBreak: breakY == null ? null : axisBreak(left, top, axisY, breakY, axisPx),
      axisY,
      tickEndY: axisY + tickLength(axisPx),
      labelAngle: angle,
      // A turned label hangs from just below its tick; a level one sits a line beneath
      labelY: labelLine(axisY, angle, axisPx),
      tickX: left - axisPx / 2,
      // Nothing is labelled at or below a break, where the axis no longer holds its scale
      ticks: tickTexts
        .map(t => ({ ...t, y: y(t.value) }))
        .filter(t => breakY == null || t.y < breakY - axisPx),
      xLabels,
      series,
      x,
      y,
    };
  });

  // The plot's box, y scale and x labels for labels turned to `angle` degrees
  private plotArea(width: number, height: number, axisPx: number, angle: number) {
    const format = this.format();
    const domain = this.domain();
    const windowed = domain.span != null;
    const top = axisPx;
    const bottom = labelBand(this.widestXLabel(axisPx), angle, axisPx, height);
    const plotHeight = Math.max(1, height - top - bottom);
    const maxTicks = Math.max(2, Math.floor(plotHeight / (axisPx * 3)));

    const { min, max, ticks, unlabelled, level } = this.yScale(
      this.visibleValues(),
      plotHeight,
      axisPx,
      maxTicks,
    );
    const tickTexts = ticks.map(value => ({
      value,
      text: unlabelled ? '' : format(value),
    }));
    // A panned window sizes its gutter for the whole range's ticks too, so the plot never shifts
    const gutterTexts = [
      ...tickTexts.map(t => t.text),
      ...(windowed && !unlabelled
        ? this.yScale(
            this.runs().flatMap(runs => runs.flat().map(p => p.value)),
            plotHeight,
            axisPx,
            maxTicks,
          ).ticks.map(format)
        : []),
    ];
    const left =
      Math.max(0, ...gutterTexts.map(t => estimateTextWidth(t, axisPx))) + axisPx;

    const positions = this.positions();
    const xAxis = (right: number) => {
      const plotWidth = Math.max(1, width - left - right);
      const at = this.atPosition(domain, left, plotWidth);
      const x = (i: number) => at(positions[i]);
      return {
        plotWidth,
        x,
        xLabels: this.xLabels(domain, at, x, plotWidth, axisPx, angle),
        candidates: this.xLabelCandidates(domain, at, x),
      };
    };

    // Edge labels are nudged inward rather than given room of their own, so the plot
    // runs to within a small margin of the right edge
    const axis = xAxis(axisPx / 2);
    const xLabels: PlacedXLabel[] = axis.xLabels.map(label => {
      if (angle) {
        return { ...label, textX: label.x };
      }
      const half = estimateTextWidth(label.text, axisPx) / 2;
      return { ...label, textX: clamp(label.x, half, width - half) };
    });
    return { plotHeight, min, max, level, tickTexts, left, ...axis, xLabels };
  }

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
        value: this.tableValue(value),
        active: i === active.series,
      };
    });
    return {
      x,
      y: this.isValue(activeValue) ? layout.y(activeValue) : layout.top,
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

  constructor() {
    inject(DestroyRef).onDestroy(() => this.endTapHold());
  }

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
    return this.isValue(value) ? this.format()(value) : '–';
  }

  protected onPointerDown(event: PointerEvent): void {
    this.suppressClick = false;
    this.endTapHold();
    const domain = this.domain();
    if (domain.span != null && event.button === 0) {
      this.drag = {
        pointerId: event.pointerId,
        x: event.clientX,
        end: domain.end,
        moved: false,
      };
    }
    this.onPointerMove(event);
  }

  protected onPointerMove(event: PointerEvent): void {
    // A pointer that hovers reports its own pointerleave, so it needs no hold
    if (event.buttons === 0) {
      this.endTapHold();
    }
    // A press released outside the chart never reported its pointerup
    if (this.drag && event.buttons === 0) {
      this.endDrag();
    }
    const drag = this.drag;
    if (drag && drag.pointerId === event.pointerId) {
      const dx = event.clientX - drag.x;
      if (drag.moved || Math.abs(dx) >= DRAG_THRESHOLD) {
        if (!drag.moved) {
          drag.moved = true;
          this.panning.set(true);
          this.setActive(null);
          (event.currentTarget as Element).setPointerCapture?.(event.pointerId);
        }
        this.panTo(drag.end - dx * this.unitsPerPx());
        return;
      }
    }
    const target = event.currentTarget as SVGSVGElement;
    const rect = target.getBoundingClientRect();
    const index = this.indexAt(event.clientX - rect.left);
    const py = event.clientY - rect.top;
    const layout = this.layout();
    let series = -1;
    let nearest = Infinity;
    this.series().forEach((_, i) => {
      const value = this.valueAt(i, index);
      if (value == null) {
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

  protected onPointerUp(event: PointerEvent): void {
    let panned = false;
    if (this.drag?.pointerId === event.pointerId) {
      panned = this.drag.moved;
      this.suppressClick = panned;
      this.endDrag();
    }
    // A pointer without hover fires pointerleave as soon as it lifts, so a tap
    // holds its point open instead
    if (!panned && (event.pointerType === 'touch' || event.pointerType === 'pen')) {
      this.holdTap();
    }
  }

  // The browser took the press over, most often to scroll the page
  protected onPointerCancel(event: PointerEvent): void {
    if (this.drag?.pointerId === event.pointerId) {
      this.endDrag();
    }
    this.setActive(null);
  }

  protected onPointerLeave(): void {
    if (!this.drag?.moved && !this.releaseTap) {
      this.setActive(null);
    }
  }

  // Trackpads report horizontal swipes as deltaX; a mouse wheel pans only with Shift
  protected onWheel(event: WheelEvent): void {
    // Chromium and Firefox report a trackpad pinch as a wheel with Ctrl held
    if (event.ctrlKey && event.deltaY && this.visibleXSpan() != null) {
      event.preventDefault();
      const { start, end } = this.domain();
      this.zoomTo((end - start) * Math.exp(event.deltaY * ZOOM_RATE), {
        clientX: event.clientX,
        currentTarget: event.currentTarget,
      });
      return;
    }
    const domain = this.domain();
    if (domain.span == null) {
      return;
    }
    const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    const delta = horizontal ? event.deltaX : event.shiftKey ? event.deltaY : 0;
    if (!delta) {
      return;
    }
    event.preventDefault();
    const unit =
      event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? WHEEL_LINE_PX
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? this.layout().plotWidth
          : 1;
    this.setActive(null);
    this.panTo(domain.end + delta * unit * this.unitsPerPx());
  }

  protected onClick(): void {
    if (this.suppressClick) {
      this.suppressClick = false;
      return;
    }
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
    const target = next ?? (event.key === 'Escape' ? null : active);
    if (target) {
      this.reveal(target.index);
    }
    this.setActive(target);
  }

  private isValue(value: number | null | undefined): value is number {
    return value != null && isFinite(value);
  }

  private yScale(
    values: number[],
    plotHeight: number,
    axisPx: number,
    maxTicks: number,
  ): {
    min: number;
    max: number;
    ticks: number[];
    unlabelled?: boolean;
    level?: boolean;
  } {
    const yMin = this.yMin();
    const yMax = this.yMax();
    // With nothing plotted and no bounds there is no scale to label, so the grid keeps
    // its usual spacing with no numbers beside it
    if (!values.length && (yMin === undefined || yMax === undefined)) {
      return { min: 0, max: 1, ticks: niceScale(0, 1, maxTicks).ticks, unlabelled: true };
    }
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);
    let lo = yMin ?? dataMin;
    let hi = yMax ?? dataMax;
    // An area fill keeps its zero baseline, so a lowest value of zero may rest on it
    const zeroFloor = this.showArea() && yMin === undefined && !(dataMin < 0);
    if (zeroFloor) {
      lo = Math.min(lo, 0);
    }
    if (lo > hi) {
      [lo, hi] = [hi, lo];
    }
    // A single value has no spread to show, so the axis is fitted evenly around it and
    // needs no break, whatever it starts from
    if (
      dataMin === dataMax &&
      yMin === undefined &&
      yMax === undefined &&
      !zeroFloor &&
      !this.windowed()
    ) {
      const pad = dataMin === 0 ? 1 : Math.abs(dataMin) / 2;
      const scale = niceScale(dataMin - pad, dataMin + pad, maxTicks);
      const reach = Math.max(dataMin - scale.min, scale.max - dataMin);
      const min = dataMin - reach;
      const max = dataMin + reach;
      return {
        min,
        max,
        ticks: scale.ticks.filter(t => t >= min && t <= max),
        level: true,
      };
    }
    // Room kept between the outermost points and the plot's top and bottom edges
    const clearance = axisPx;
    // An axis that stops short of zero keeps a wider gap under its lowest point, so
    // the baseline beneath it never reads as zero
    const breakClearance = axisPx * BREAK_CLEARANCE;
    const derivedFloor = yMin === undefined && !zeroFloor && dataMin > 0;

    // A panned window fits its bounds to the points in view without rounding, so
    // the axis glides as it pans instead of jumping between round numbers
    if (this.windowed() && isFinite(lo) && isFinite(hi)) {
      const spread = hi - lo || Math.abs(hi) || 1;
      const pad = (clearance * spread) / Math.max(1, plotHeight - 2 * clearance);
      const breakPad =
        (breakClearance * spread) / Math.max(1, plotHeight - clearance - breakClearance);
      const min =
        yMin ?? (zeroFloor ? lo : derivedFloor ? Math.max(0, lo - breakPad) : lo - pad);
      const max = yMax ?? hi + pad;
      const ticks = niceScale(min, max, maxTicks).ticks.filter(t => t >= min && t <= max);
      return { min, max, ticks };
    }

    const scale = niceScale(lo, hi, maxTicks);
    const step = scale.ticks[1] - scale.ticks[0];
    const ticks = [...scale.ticks];
    let min = yMin ?? scale.min;
    let max = yMax ?? scale.max;
    if (min > max) {
      [min, max] = [max, min];
    }
    // A value on or just inside a derived bound extends the scale one step past it
    const px = (value: number) => (value / (max - min || 1)) * plotHeight;
    const lowTight = () =>
      yMin === undefined &&
      !zeroFloor &&
      px(dataMin - min) < (derivedFloor && min > 0 ? breakClearance : clearance);
    const highTight = yMax === undefined && px(max - dataMax) < clearance;
    // Each step down widens the gap, and zero ends it, since the axis is then whole
    for (let steps = 0; steps < 6 && lowTight() && !(derivedFloor && min <= 0); steps++) {
      min = Number((min - step).toPrecision(12));
      ticks.unshift(min);
    }
    if (highTight) {
      max = Number((max + step).toPrecision(12));
      ticks.push(max);
    }
    return { min, max, ticks: ticks.filter(t => t >= min && t <= max) };
  }

  // A windowed plot insets its edges, so points pinned to them show whole
  private atPosition(
    domain: XDomain,
    left: number,
    plotWidth: number,
  ): (position: number) => number {
    const inset = domain.span != null ? EDGE_INSET : 0;
    const inner = Math.max(1, plotWidth - 2 * inset);
    const extent = domain.end - domain.start;
    const scale = inner / extent;
    return (position: number) =>
      extent > 0
        ? left + inset + (position - domain.start) * scale
        : left + plotWidth / 2;
  }

  // Every x label in view, before any are thinned out to fit
  private xLabelCandidates(
    domain: XDomain,
    at: (position: number) => number,
    x: (i: number) => number,
  ): XLabel[] {
    const inView = (position: number) =>
      position >= domain.start && position <= domain.end;
    const ticks = this.xTicks();
    if (ticks) {
      return ticks
        .filter(t => inView(t.value))
        .map(t => ({ key: t.value, text: t.label, x: at(t.value) }));
    }
    const positions = this.positions();
    return positions
      .map((position, index) => ({
        key: index,
        text: this.labels()[index] ?? '',
        x: x(index),
      }))
      .filter(l => inView(positions[l.key]));
  }

  private labelsFit(labels: XLabel[], angle: number, axisPx: number): boolean {
    return labels.every(
      (label, i) =>
        i === 0 ||
        label.x - labels[i - 1].x >=
          (labelRoom(label.text, angle, axisPx) +
            labelRoom(labels[i - 1].text, angle, axisPx)) /
            2,
    );
  }

  private xLabels(
    domain: XDomain,
    at: (position: number) => number,
    x: (i: number) => number,
    plotWidth: number,
    axisPx: number,
    angle: number,
  ): XLabel[] {
    const candidates = this.xLabelCandidates(domain, at, x);
    // Ticks of the caller's own choosing are all kept
    if (this.xTicks()) {
      return candidates;
    }
    const texts = this.positions().map((_, i) => this.labels()[i] ?? '');
    // Evenly spaced labels thin to every nth, so the survivors stay evenly spaced
    if (!this.xValues()) {
      const count = texts.length;
      const extent = domain.end - domain.start;
      const spacing =
        count > 1
          ? (plotWidth - (domain.span != null ? 2 * EDGE_INSET : 0)) / extent
          : plotWidth;
      const room = Math.max(0, ...texts.map(t => labelRoom(t, angle, axisPx)));
      const step = Math.max(1, Math.ceil(room / spacing));
      return candidates.filter(l => l.key % step === 0);
    }
    // Irregularly placed labels keep each one that clears the last one kept
    const labels: XLabel[] = [];
    let edge = -Infinity;
    for (const label of candidates) {
      const half = labelRoom(label.text, angle, axisPx) / 2;
      if (label.x - half >= edge) {
        labels.push(label);
        edge = label.x + half;
      }
    }
    return labels;
  }

  private widestXLabel(axisPx: number): number {
    const texts = this.xTicks()?.map(t => t.label) ?? this.labels();
    return Math.max(0, ...texts.map(t => estimateTextWidth(t, axisPx)));
  }

  // Safari reports a trackpad pinch as gesture events, scaled from where the pinch began
  protected onGestureStart(event: Event): void {
    if (this.visibleXSpan() == null) {
      return;
    }
    event.preventDefault();
    const { start, end } = this.domain();
    this.gestureSpan = end - start;
  }

  protected onGestureChange(event: Event): void {
    if (this.gestureSpan == null || !('scale' in event) || !('clientX' in event)) {
      return;
    }
    const { scale, clientX } = event;
    if (typeof scale !== 'number' || typeof clientX !== 'number' || !(scale > 0)) {
      return;
    }
    event.preventDefault();
    this.zoomTo(this.gestureSpan / scale, {
      clientX,
      currentTarget: event.currentTarget,
    });
  }

  protected onGestureEnd(): void {
    this.gestureSpan = null;
  }

  // Rescales the window to `span`, keeping the x position under the pointer in place
  private zoomTo(
    span: number,
    { clientX, currentTarget }: { clientX: number; currentTarget: EventTarget | null },
  ): void {
    const domain = this.domain();
    const full = domain.last - domain.first;
    const floor = this.minSpan();
    if (!(full > 0) || floor === Infinity || !(currentTarget instanceof Element)) {
      return;
    }
    const next = clamp(span, Math.min(floor, full), full);
    const shown = domain.end - domain.start;
    const inset = domain.span != null ? EDGE_INSET : 0;
    const { left, plotWidth } = this.layout();
    const offset = clientX - currentTarget.getBoundingClientRect().left - left - inset;
    const ratio = clamp(offset / Math.max(1, plotWidth - 2 * inset), 0, 1);
    const anchor = domain.start + ratio * shown;
    const end = clamp(anchor + (1 - ratio) * next, domain.first + next, domain.last);
    this.setActive(null);
    this.zoomSpan.set(next);
    this.panEnd.set(end);
    this.visibleRangeChange.emit({ start: end - next, end });
  }

  // A window never narrows past two gaps between neighbouring points, and with fewer
  // than two points there is nothing to zoom in on
  private minSpan(): number {
    const known = this.positions()
      .filter(p => isFinite(p))
      .sort((a, b) => a - b);
    const gaps = known
      .slice(1)
      .map((p, i) => p - known[i])
      .filter(gap => gap > 0);
    return gaps.length ? Math.min(...gaps) * 2 : Infinity;
  }

  private unitsPerPx(): number {
    const span = this.domain().span ?? 0;
    return span / Math.max(1, this.layout().plotWidth - 2 * EDGE_INSET);
  }

  private panTo(end: number): void {
    const domain = this.domain();
    if (domain.span == null) {
      return;
    }
    const next = clamp(end, domain.first + domain.span, domain.last);
    if (next === domain.end) {
      return;
    }
    this.panEnd.set(next);
    this.visibleRangeChange.emit({ start: next - domain.span, end: next });
  }

  private endDrag(): void {
    this.drag = null;
    this.panning.set(false);
  }

  // Holds the tapped point until the next press, on the plot or off it, or until
  // the highlight clears
  private holdTap(): void {
    const plot = this.plotEl()?.nativeElement;
    if (this.releaseTap || !plot || !this.active()) {
      return;
    }
    const doc = plot.ownerDocument;
    const onPress = (event: Event): void => {
      if (!(event.target instanceof Node) || !plot.contains(event.target)) {
        this.setActive(null);
      }
    };
    doc.addEventListener('pointerdown', onPress, true);
    this.releaseTap = () => doc.removeEventListener('pointerdown', onPress, true);
  }

  private endTapHold(): void {
    this.releaseTap?.();
    this.releaseTap = null;
  }

  // Pans a window just far enough to bring the point at `index` into view
  private reveal(index: number): void {
    const domain = this.domain();
    const position = this.positions()[index];
    if (domain.span == null) {
      return;
    }
    if (position < domain.start) {
      this.panTo(position + domain.span);
    } else if (position > domain.end) {
      this.panTo(position);
    }
  }

  // Nearest index to a pointer at `px`: by rounding when evenly spaced, else the
  // closest plotted point in view
  private indexAt(px: number): number {
    const layout = this.layout();
    const count = this.count();
    const domain = this.domain();
    if (!this.xValues()) {
      if (count < 2) {
        return 0;
      }
      const inset = domain.span != null ? EDGE_INSET : 0;
      const inner = Math.max(1, layout.plotWidth - 2 * inset);
      const index = Math.round(
        domain.start + ((px - layout.left - inset) / inner) * (domain.end - domain.start),
      );
      return clamp(index, Math.ceil(domain.start), Math.floor(domain.end));
    }
    const positions = this.positions();
    let best = -1;
    let nearest = Infinity;
    for (let index = 0; index < count; index++) {
      const position = positions[index];
      if (
        position < domain.start ||
        position > domain.end ||
        !this.series().some((_, s) => this.valueAt(s, index) != null)
      ) {
        continue;
      }
      const distance = Math.abs(layout.x(index) - px);
      if (distance < nearest) {
        nearest = distance;
        best = index;
      }
    }
    return best;
  }

  private valueAt(series: number, index: number): number | null {
    const value = this.series()[series]?.data[index];
    return this.isValue(value) && isFinite(this.positions()[index]) ? value : null;
  }

  // Earliest plotted value in any series (in view, on a panned window), so a chart
  // whose first series is empty still takes focus
  private firstPoint(): ActivePoint | null {
    const domain = this.domain();
    for (let index = 0; index < this.count(); index++) {
      if (this.positions()[index] < domain.start) {
        continue;
      }
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
    if (!next) {
      this.endTapHold();
    }
    const current = this.active();
    if (current?.series === next?.series && current?.index === next?.index) {
      return;
    }
    this.active.set(next);
    this.activePointChange.emit(this.eventFor(next));
  }
}
