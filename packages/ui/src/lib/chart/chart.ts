import {
  DestroyRef,
  ElementRef,
  type Signal,
  afterNextRender,
  afterRenderEffect,
  computed,
  inject,
  signal,
} from '@angular/core';

import { formatGroupedNumber } from '../i18n/format-number';
import { EagamiI18nService } from '../i18n/i18n.service';
import { type EaSize } from '../sizes';

/** Visual size of a chart; scales its axis, legend, and tooltip text. */
export type ChartSize = EaSize;

/** One named run of values plotted by a line or bar chart. */
export interface ChartSeries {
  /** Name shown in the legend, tooltip, and data table. */
  name: string;
  /** One value per label; `null` leaves a gap. */
  data: (number | null)[];
  /** Any CSS color; defaults to the next slot of the `--color-chart-*` palette. */
  color?: string;
}

/** Payload describing a single plotted value of a line or bar chart. */
export interface ChartPointEvent {
  seriesIndex: number;
  seriesName: string;
  /** Position of the value within its series (and of its label within `labels`). */
  index: number;
  label: string;
  value: number;
}

/** A dashed rule across a line or bar chart's plot at a value, such as a target or an average. */
export interface ChartReferenceLine {
  value: number;
  /** Text printed at the line's end and read out with the chart's data. */
  label?: string;
  /** Any CSS color; defaults to the strong border color. */
  color?: string;
}

/** How a line bends between points. */
export type ChartCurve = 'linear' | 'smooth' | 'step';

/** Number of categorical colors in the `--color-chart-*` palette. */
export const CHART_COLOR_COUNT = 8;

/** Resolves a series' color, falling back to its slot of the chart palette. */
export function chartColor(index: number, override?: string): string {
  return override || `var(--color-chart-${(index % CHART_COLOR_COUNT) + 1})`;
}

/** A value axis extended to round numbers, with the ticks drawn along it. */
export interface NiceScale {
  min: number;
  max: number;
  ticks: number[];
}

function niceStep(span: number, maxTicks: number): number {
  const raw = span / Math.max(1, maxTicks);
  const magnitude = Math.pow(10, Math.floor(Math.log10(raw)));
  const fraction = raw / magnitude;
  const nice =
    fraction <= 1
      ? 1
      : fraction <= 2
        ? 2
        : fraction <= 2.5
          ? 2.5
          : fraction <= 5
            ? 5
            : 10;
  return nice * magnitude;
}

/**
 * Extends `[min, max]` outward to round tick values, about `maxTicks` of them, or more
 * where a gap would otherwise exceed `maxStep`.
 */
export function niceScale(
  min: number,
  max: number,
  maxTicks = 5,
  maxStep = Infinity,
): NiceScale {
  if (!isFinite(min) || !isFinite(max)) {
    return { min: 0, max: 1, ticks: [0, 1] };
  }
  if (min === max) {
    const pad = min === 0 ? 1 : Math.abs(min) * 0.5;
    min -= min === 0 ? 0 : pad;
    max += pad;
  }
  const step = Math.min(niceStep(max - min, maxTicks), maxStep > 0 ? maxStep : Infinity);
  const niceMin = Math.floor(min / step) * step;
  const niceMax = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  // Rounded to the step's precision so accumulated float error never prints 0.30000000000000004
  const precision = Math.max(0, -Math.floor(Math.log10(step)) + 1);
  for (let tick = niceMin; tick <= niceMax + step / 2; tick += step) {
    ticks.push(Number(tick.toFixed(precision)));
  }
  return { min: niceMin, max: niceMax, ticks };
}

/** A plotted point in pixels. */
export interface CurvePoint {
  x: number;
  y: number;
}

function linearPath(points: CurvePoint[]): string {
  return points.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join('');
}

// Steps at the midpoint between neighbours, so each value owns the span around it
function stepPath(points: CurvePoint[]): string {
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const mid = (points[i - 1].x + points[i].x) / 2;
    d += `H${mid}V${points[i].y}H${points[i].x}`;
  }
  return d;
}

// Points sharing an x position have no slope between them, so the curve runs
// smoothly up to each such pair and joins it with a straight segment
function smoothPath(points: CurvePoint[]): string {
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
function monotonePath(points: CurvePoint[]): string {
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

/** SVG path data tracing a run of points with each curve. */
export const CHART_CURVES: Record<ChartCurve, (points: CurvePoint[]) => string> = {
  linear: linearPath,
  smooth: smoothPath,
  step: stepPath,
};

/** Reference lines with a finite value, the only ones a chart can place. */
export function plottableReferenceLines(
  lines: readonly ChartReferenceLine[],
): ChartReferenceLine[] {
  return lines.filter(line => isFinite(line.value));
}

/** Rough rendered width of `text` in px, for reserving axis room without a layout pass. */
export function estimateTextWidth(text: string, fontPx: number): number {
  return text.length * fontPx * 0.6;
}

/** Live size of a chart's host, re-measured on resize and whenever `remeasureOn` changes. */
export interface ChartViewport {
  width: Signal<number>;
  fontSize: Signal<number>;
}

/**
 * Measures the host's width and font-size so the chart can lay out its SVG in
 * real pixels, keeping text and stroke widths crisp at every width.
 */
export function injectChartViewport(remeasureOn: Signal<unknown>): ChartViewport {
  const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  const destroyRef = inject(DestroyRef);
  const width = signal(480);
  const fontSize = signal(16);

  const measure = () => {
    if (host.clientWidth > 0) {
      width.set(host.clientWidth);
    }
    const font = parseFloat(getComputedStyle(host).fontSize);
    if (font > 0) {
      fontSize.set(font);
    }
  };

  afterNextRender(() => {
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(measure);
      observer.observe(host);
      destroyRef.onDestroy(() => observer.disconnect());
    }
  });
  afterRenderEffect(() => {
    remeasureOn();
    measure();
  });

  return { width: width.asReadonly(), fontSize: fontSize.asReadonly() };
}

/** Localized value formatter honouring a consumer's own `formatValue`. */
export function injectChartFormatter(
  formatValue: Signal<((value: number) => string) | null>,
): Signal<(value: number) => string> {
  const i18n = inject(EagamiI18nService);
  return computed(() => {
    const custom = formatValue();
    if (custom) {
      return custom;
    }
    const locale = i18n.locale();
    const format = i18n.messages().numberFormat;
    return (value: number) =>
      formatGroupedNumber(value, locale, format, { maximumFractionDigits: 2 });
  });
}

/** Keeps a value inside `[min, max]`. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * How category or x-axis labels are set: level, at 45 degrees, at 90 degrees, or
 * `auto`, which stays level while the labels fit and turns them 45 then 90 degrees
 * as they crowd.
 */
export type ChartLabelOrientation = 'horizontal' | 'diagonal' | 'vertical' | 'auto';

export const CHART_LABEL_ANGLES: Record<
  Exclude<ChartLabelOrientation, 'auto'>,
  number
> = {
  horizontal: 0,
  diagonal: 45,
  vertical: 90,
};

// Pixels a tick mark adds beyond its share of the axis font, and the space between
// the tick and its label
export const TICK_EXTRA_PX = 2;
export const TICK_LABEL_GAP_PX = 2;

// In axis font sizes: the room under the lowest mark of an axis that stops short of
// zero, and the height of its break above the baseline, within that room
export const BREAK_CLEARANCE = 6;
export const BREAK_HEIGHT = 2.5;

/** Length of a tick mark below the axis. */
export function tickLength(axisPx: number): number {
  return axisPx * 0.4 + TICK_EXTRA_PX;
}

/** Room along the axis a label needs: its width when level, a line's height when turned. */
export function labelRoom(text: string, angle: number, axisPx: number): number {
  if (angle === 0) {
    return estimateTextWidth(text, axisPx) + axisPx;
  }
  return (axisPx * 1.15) / Math.sin((angle * Math.PI) / 180);
}

/** Space below the plot for the axis labels, turned to `angle` degrees, and their ticks. */
export function labelBand(
  widest: number,
  angle: number,
  axisPx: number,
  height: number,
): number {
  if (!angle) {
    return axisPx * 2.5 + TICK_EXTRA_PX + TICK_LABEL_GAP_PX;
  }
  const radians = (angle * Math.PI) / 180;
  // A turned label drops by its length along the turn, up to half the chart
  return Math.min(
    height / 2,
    axisPx * 0.8 +
      TICK_EXTRA_PX +
      TICK_LABEL_GAP_PX +
      widest * Math.sin(radians) +
      axisPx * Math.cos(radians) +
      axisPx * 0.5,
  );
}

/** Baseline of the axis labels below an axis at `axisY`. */
export function labelLine(axisY: number, angle: number, axisPx: number): number {
  return angle
    ? axisY + tickLength(axisPx) + TICK_LABEL_GAP_PX + axisPx * 0.4
    : axisY + axisPx * 1.5 + TICK_EXTRA_PX + TICK_LABEL_GAP_PX;
}

export interface AxisBreak {
  axis: string;
  slashes: string;
  gap: { x: number; y: number; width: number; height: number };
}

/** A y-axis line up the plot's left edge, cut where two parallel slashes cross it. */
export function axisBreak(
  x: number,
  top: number,
  bottom: number,
  y: number,
  axisPx: number,
): AxisBreak {
  const half = axisPx * 0.8;
  const gap = axisPx * 0.35;
  return {
    axis: `M${x},${top}L${x},${y - gap}M${x},${y + gap}L${x},${bottom}`,
    gap: { x: x - half, y: y - gap, width: 2 * half, height: 2 * gap },
    slashes: [-gap, gap]
      .map(
        offset =>
          `M${x - half},${y + offset + half / 2}L${x + half},${y + offset - half / 2}`,
      )
      .join(''),
  };
}
