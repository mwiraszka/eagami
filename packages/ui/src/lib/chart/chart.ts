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

/** Extends `[min, max]` outward to round tick values, about `maxTicks` of them. */
export function niceScale(min: number, max: number, maxTicks = 5): NiceScale {
  if (!isFinite(min) || !isFinite(max)) {
    return { min: 0, max: 1, ticks: [0, 1] };
  }
  if (min === max) {
    const pad = min === 0 ? 1 : Math.abs(min) * 0.5;
    min -= min === 0 ? 0 : pad;
    max += pad;
  }
  const step = niceStep(max - min, maxTicks);
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

/** Rough rendered width of `text` in px, for reserving axis room without a layout pass. */
export function estimateTextWidth(text: string, fontPx: number): number {
  return text.length * fontPx * 0.6;
}

/** Live size of a chart's host, re-measured on resize and whenever `size` changes. */
export interface ChartViewport {
  width: Signal<number>;
  fontSize: Signal<number>;
}

/**
 * Measures the host's width and font-size so the chart can lay out its SVG in
 * real pixels, keeping text and stroke widths crisp at every width.
 */
export function injectChartViewport(size: Signal<ChartSize>): ChartViewport {
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
    size();
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
