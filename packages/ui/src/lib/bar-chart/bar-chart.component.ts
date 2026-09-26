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

/** Direction the bars extend from the baseline. */
export type BarChartOrientation = 'vertical' | 'horizontal';

/**
 * Entrance animation, replayed whenever the data changes. `grow` extends every
 * bar out of the baseline together, `cascade` grows them one category after
 * another, and `fade` fades the bars in.
 */
export type BarChartAnimation = 'grow' | 'cascade' | 'fade' | 'none';

type RoundedSide = 'top' | 'bottom' | 'left' | 'right' | null;

interface PlotBar {
  series: number;
  index: number;
  value: number;
  color: string;
  path: string;
  delay: number;
}

interface PlotValueLabel {
  key: string;
  x: number;
  y: number;
  text: string;
  anchor: 'start' | 'middle' | 'end';
}

interface ActiveBar {
  series: number;
  index: number;
}

const BAR_GAP = 2;
const BAR_RADIUS = 4;

// A rectangle with its data end rounded and its baseline end square
function barPath(x: number, y: number, w: number, h: number, side: RoundedSide): string {
  const r = side
    ? Math.max(
        0,
        side === 'top' || side === 'bottom'
          ? Math.min(BAR_RADIUS, w / 2, h)
          : Math.min(BAR_RADIUS, h / 2, w),
      )
    : 0;
  const arc = (tx: number, ty: number) => `A${r},${r} 0 0 1 ${tx},${ty}`;
  switch (r > 0 ? side : null) {
    case 'top':
      return `M${x},${y + h}V${y + r}${arc(x + r, y)}H${x + w - r}${arc(x + w, y + r)}V${y + h}Z`;
    case 'bottom':
      return `M${x},${y}H${x + w}V${y + h - r}${arc(x + w - r, y + h)}H${x + r}${arc(x, y + h - r)}Z`;
    case 'right':
      return `M${x},${y}H${x + w - r}${arc(x + w, y + r)}V${y + h - r}${arc(x + w - r, y + h)}H${x}Z`;
    case 'left':
      return `M${x + w},${y}V${y + h}H${x + r}${arc(x, y + h - r)}V${y + r}${arc(x + r, y)}Z`;
    default:
      return `M${x},${y}H${x + w}V${y + h}H${x}Z`;
  }
}

function truncate(text: string, maxWidth: number, fontPx: number): string {
  if (estimateTextWidth(text, fontPx) <= maxWidth) {
    return text;
  }
  const chars = Math.max(1, Math.floor(maxWidth / (fontPx * 0.6)) - 1);
  return `${text.slice(0, chars)}…`;
}

/**
 * Compares values across labels as vertical columns or horizontal bars, with
 * several series grouped side by side or stacked. Hovering or arrowing through
 * the chart reveals each label's values in a tooltip, and a visually hidden
 * table carries the full data for screen readers.
 */
@Component({
  selector: 'ea-bar-chart',
  imports: [NgClass, TooltipDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BarChartComponent {
  protected readonly i18n = inject(EagamiI18nService);

  /** Category labels along the category axis, one per value. */
  readonly labels = input<string[]>([]);
  /** The series to plot. */
  readonly series = input<ChartSeries[]>([]);
  /** Direction the bars extend from the baseline. */
  readonly orientation = input<BarChartOrientation>('vertical');
  /** Stacks the series of each label into one bar instead of grouping them side by side. */
  readonly stacked = input<boolean>(false);
  /** Draws gridlines at each value-axis tick. */
  readonly showGrid = input<boolean>(true);
  /** Shows a legend beneath the chart when it plots more than one series. */
  readonly showLegend = input<boolean>(true);
  /** Prints each bar's value at its end, or each stack's total when stacked. */
  readonly showValues = input<boolean>(false);
  /** Height of the plot in pixels; the width fills the container. */
  readonly height = input<number>(240);
  /** Visual size; scales the axis, legend, and tooltip text and the bar thickness cap. */
  readonly size = input<ChartSize>('md');
  /** Entrance animation, replayed whenever the data changes. */
  readonly animation = input<BarChartAnimation>('grow');
  /** Length of the entrance animation in milliseconds. */
  readonly animationDuration = input<number>(600);
  /** Formats values on the axis, tooltip, and data table; locale-grouped by default. */
  readonly formatValue = input<((value: number) => string) | null>(null);
  /** Accessible name for the chart; defaults to a localized "Bar chart". */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  /** Fires when a bar is clicked, or chosen with Enter or Space. */
  readonly pointClick = output<ChartPointEvent>();
  /** Fires when the highlighted bar changes by pointer or keyboard, with `null` once cleared. */
  readonly activePointChange = output<ChartPointEvent | null>();

  private readonly viewport = injectChartViewport(this.size);
  private readonly format = injectChartFormatter(this.formatValue);
  protected readonly active = signal<ActiveBar | null>(null);

  protected readonly label = computed(
    () => this.ariaLabel() || this.i18n.messages().chart.barChart,
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
    this.orientation();
    this.stacked();
    this.animation();
    this.animationDuration();
    return [{}];
  });

  protected readonly hostClasses = computed(() => ({
    [`ea-bar-chart--${this.size()}`]: true,
    [`ea-bar-chart--${this.orientation()}`]: true,
    [`ea-bar-chart--animate-${this.animation()}`]: true,
  }));

  protected readonly layout = computed(() => {
    const vertical = this.orientation() === 'vertical';
    const stacked = this.stacked();
    const count = Math.max(1, this.count());
    const series = this.series();
    const width = this.viewport.width();
    const height = this.height();
    const fontPx = this.viewport.fontSize();
    const axisPx = fontPx * 0.75;
    const format = this.format();
    const valueAt = (s: number, i: number) => {
      const value = series[s]?.data[i];
      return value == null || !isFinite(value) ? null : value;
    };

    let lo = 0;
    let hi = 0;
    for (let i = 0; i < count; i++) {
      let up = 0;
      let down = 0;
      series.forEach((_, s) => {
        const value = valueAt(s, i) ?? 0;
        if (stacked) {
          up += Math.max(0, value);
          down += Math.min(0, value);
        } else {
          up = Math.max(up, value);
          down = Math.min(down, value);
        }
      });
      hi = Math.max(hi, up);
      lo = Math.min(lo, down);
    }

    const labelTexts = Array.from({ length: count }, (_, i) => this.labels()[i] ?? '');
    const valueRoom = this.showValues() ? axisPx * 1.5 : 0;
    const provisionalTicks = niceScale(lo, hi).ticks.map(format);
    const widestTick = Math.max(
      0,
      ...provisionalTicks.map(t => estimateTextWidth(t, axisPx)),
    );

    let left: number;
    let right: number;
    let top: number;
    let bottom: number;
    let categoryText: string[];
    if (vertical) {
      left = widestTick + axisPx;
      right = axisPx / 2;
      top = axisPx + valueRoom;
      bottom = axisPx * 2.5;
      categoryText = labelTexts;
    } else {
      const maxLabel = width * 0.3;
      categoryText = labelTexts.map(t => truncate(t, maxLabel, axisPx));
      left = Math.max(0, ...categoryText.map(t => estimateTextWidth(t, axisPx))) + axisPx;
      right =
        Math.max(widestTick / 2, this.showValues() ? widestTick + axisPx : 0) +
        axisPx / 2;
      top = axisPx / 2;
      bottom = axisPx * 2.5;
    }
    const plotWidth = Math.max(1, width - left - right);
    const plotHeight = Math.max(1, height - top - bottom);
    const valueLength = vertical ? plotHeight : plotWidth;
    const scale = niceScale(
      lo,
      hi,
      Math.max(
        2,
        Math.floor(valueLength / (vertical ? axisPx * 3 : widestTick + axisPx * 2)),
      ),
    );
    const { min, max } = scale;
    // Pixel position along the value axis
    const valuePos = (v: number) => {
      const t = (clamp(v, min, max) - min) / (max - min || 1);
      return vertical ? top + (1 - t) * plotHeight : left + t * plotWidth;
    };
    const baseline = valuePos(clamp(0, min, max));

    const categoryLength = vertical ? plotWidth : plotHeight;
    const categoryStart = vertical ? left : top;
    const band = categoryLength / count;
    const thicknessCap = fontPx * 1.5;
    const seriesCount = Math.max(1, series.length);
    const thickness = stacked
      ? Math.min(band * 0.6, thicknessCap)
      : Math.max(
          1,
          Math.min(
            (band * 0.75 - BAR_GAP * (seriesCount - 1)) / seriesCount,
            thicknessCap,
          ),
        );
    const groupWidth = stacked
      ? thickness
      : seriesCount * thickness + (seriesCount - 1) * BAR_GAP;
    const duration = this.animationDuration();
    const cascadeStep = count > 1 ? (duration * 0.5) / (count - 1) : 0;

    const bars: PlotBar[] = [];
    const valueLabels: PlotValueLabel[] = [];
    const toRect = (cat0: number, v0: number, v1: number, side: RoundedSide) => {
      const [a, b] = [Math.min(v0, v1), Math.max(v0, v1)];
      return vertical
        ? barPath(cat0, a, thickness, b - a, side)
        : barPath(a, cat0, b - a, thickness, side);
    };
    const labelFor = (cat0: number, tip: number, value: number, negative: boolean) => {
      const offset = axisPx * 0.5;
      const text = format(value);
      return vertical
        ? {
            x: cat0 + thickness / 2,
            y: negative ? tip + offset + axisPx : tip - offset,
            text,
            anchor: 'middle' as const,
          }
        : {
            x: negative ? tip - offset : tip + offset,
            y: cat0 + thickness / 2,
            text,
            anchor: negative ? ('end' as const) : ('start' as const),
          };
    };

    for (let index = 0; index < count; index++) {
      const bandStart = categoryStart + index * band + (band - groupWidth) / 2;
      const delay = index * cascadeStep;
      if (stacked) {
        const segments = series
          .map((_, s) => ({ s, value: valueAt(s, index) }))
          .filter((seg): seg is { s: number; value: number } => !!seg.value);
        for (const direction of [1, -1]) {
          const run = segments.filter(seg => Math.sign(seg.value) === direction);
          let sum = 0;
          run.forEach((seg, i) => {
            const from = valuePos(sum);
            sum += seg.value;
            const to = valuePos(sum);
            // Pull each later segment back from the one below it to leave a surface gap
            const towardTip = Math.sign(to - from);
            const start = i === 0 ? from : from + towardTip * BAR_GAP;
            const last = i === run.length - 1;
            const side: RoundedSide = last
              ? vertical
                ? direction > 0
                  ? 'top'
                  : 'bottom'
                : direction > 0
                  ? 'right'
                  : 'left'
              : null;
            if (Math.abs(to - start) > 0) {
              bars.push({
                series: seg.s,
                index,
                value: seg.value,
                color: chartColor(seg.s, series[seg.s].color),
                path: toRect(bandStart, start, to, side),
                delay,
              });
            }
          });
          if (this.showValues() && run.length) {
            valueLabels.push({
              key: `${index}-${direction}`,
              ...labelFor(bandStart, valuePos(sum), sum, direction < 0),
            });
          }
        }
      } else {
        series.forEach((s, seriesIndex) => {
          const value = valueAt(seriesIndex, index);
          if (value == null) {
            return;
          }
          const cat0 = bandStart + seriesIndex * (thickness + BAR_GAP);
          const tip = valuePos(value);
          const negative = value < 0;
          const side: RoundedSide = vertical
            ? negative
              ? 'bottom'
              : 'top'
            : negative
              ? 'left'
              : 'right';
          if (tip !== baseline) {
            bars.push({
              series: seriesIndex,
              index,
              value,
              color: chartColor(seriesIndex, s.color),
              path: toRect(cat0, baseline, tip, side),
              delay,
            });
          }
          if (this.showValues()) {
            valueLabels.push({
              key: `${index}-${seriesIndex}`,
              ...labelFor(cat0, tip, value, negative),
            });
          }
        });
      }
    }

    const ticks = scale.ticks.map(value => ({
      value,
      text: format(value),
      pos: valuePos(value),
    }));
    const widestCategory = Math.max(
      0,
      ...categoryText.map(t => estimateTextWidth(t, axisPx)),
    );
    const labelStep = vertical
      ? Math.max(1, Math.ceil((widestCategory + axisPx) / band))
      : 1;
    const categories = categoryText
      .map((text, index) => ({ text, index, pos: categoryStart + (index + 0.5) * band }))
      .filter(c => c.index % labelStep === 0);

    return {
      vertical,
      width,
      height,
      top,
      left,
      plotWidth,
      plotHeight,
      baseline,
      band,
      categoryStart,
      groupWidth,
      thickness,
      axisPx,
      ticks,
      categories,
      bars,
      valueLabels,
      valuePos,
    };
  });

  protected readonly tooltip = computed(() => {
    const active = this.active();
    if (!active) {
      return null;
    }
    const layout = this.layout();
    const center = layout.categoryStart + (active.index + 0.5) * layout.band;
    const tipValue = this.stacked()
      ? this.stackEnd(active.series, active.index)
      : (this.valueAt(active.series, active.index) ?? 0);
    const tip = layout.valuePos(tipValue);
    const x = layout.vertical ? center : tip;
    const y = layout.vertical ? Math.min(tip, layout.baseline) : center;
    const rows = this.series().map((s, i) => ({
      name: s.name,
      color: chartColor(i, s.color),
      value: this.tableValue(s.data[active.index]),
      active: i === active.series,
    }));
    return {
      x,
      y,
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

  protected isDimmed(bar: PlotBar): boolean {
    const active = this.active();
    return !!active && (active.series !== bar.series || active.index !== bar.index);
  }

  protected tableValue(value: number | null | undefined): string {
    return value == null || !isFinite(value) ? '–' : this.format()(value);
  }

  protected onPointerMove(event: PointerEvent): void {
    const target = event.currentTarget as SVGSVGElement;
    const rect = target.getBoundingClientRect();
    const layout = this.layout();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    const along = layout.vertical ? px : py;
    const across = layout.vertical ? py : px;
    const index = Math.floor((along - layout.categoryStart) / layout.band);
    if (index < 0 || index >= this.count()) {
      this.setActive(null);
      return;
    }
    const candidates = this.series()
      .map((_, s) => s)
      .filter(s => this.valueAt(s, index) != null);
    if (!candidates.length) {
      this.setActive(null);
      return;
    }
    let series: number;
    if (this.stacked()) {
      // The segment under the pointer, else the one at the end of the stack
      const hit = candidates.find(s => {
        const end = layout.valuePos(this.stackEnd(s, index));
        const start = layout.valuePos(
          this.stackEnd(s, index) - (this.valueAt(s, index) ?? 0),
        );
        return across >= Math.min(start, end) && across <= Math.max(start, end);
      });
      series = hit ?? candidates[candidates.length - 1];
    } else {
      const bandStart =
        layout.categoryStart +
        index * layout.band +
        (layout.band - layout.groupWidth) / 2;
      const slot = Math.floor((along - bandStart) / (layout.thickness + BAR_GAP));
      series = candidates.reduce((best, s) =>
        Math.abs(s - slot) < Math.abs(best - slot) ? s : best,
      );
    }
    this.setActive({ series, index });
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
      this.setActive(this.firstIn(0, 1));
    }
  }

  protected onBlur(): void {
    this.setActive(null);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const vertical = this.orientation() === 'vertical';
    // The first arrow press lands on the first bar rather than stepping past it
    if (!this.active() && event.key.startsWith('Arrow')) {
      event.preventDefault();
      this.setActive(this.firstIn(0, 1));
      return;
    }
    const active = this.active() ?? this.firstIn(0, 1);
    if (!active) {
      return;
    }
    const nextCategory = vertical ? 'ArrowRight' : 'ArrowDown';
    const prevCategory = vertical ? 'ArrowLeft' : 'ArrowUp';
    const nextSeries = vertical ? 'ArrowUp' : 'ArrowRight';
    const prevSeries = vertical ? 'ArrowDown' : 'ArrowLeft';
    let next: ActiveBar | null = active;
    switch (event.key) {
      case nextCategory:
        next = this.firstIn(active.index + 1, 1, active.series) ?? active;
        break;
      case prevCategory:
        next = this.firstIn(active.index - 1, -1, active.series) ?? active;
        break;
      case 'Home':
        next = this.firstIn(0, 1, active.series) ?? active;
        break;
      case 'End':
        next = this.firstIn(this.count() - 1, -1, active.series) ?? active;
        break;
      case nextSeries:
      case prevSeries: {
        const step = event.key === nextSeries ? 1 : -1;
        const seriesCount = this.series().length;
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
    this.setActive(next);
  }

  private valueAt(series: number, index: number): number | null {
    const value = this.series()[series]?.data[index];
    return value == null || !isFinite(value) ? null : value;
  }

  // Running total of a stack up to and including `series`, on its own side of zero
  private stackEnd(series: number, index: number): number {
    const own = this.valueAt(series, index) ?? 0;
    let sum = 0;
    for (let s = 0; s <= series; s++) {
      const value = this.valueAt(s, index) ?? 0;
      if (Math.sign(value) === Math.sign(own)) {
        sum += value;
      }
    }
    return sum;
  }

  // First category from `index` in `step` direction holding a value, preferring `series`
  private firstIn(index: number, step: 1 | -1, series?: number): ActiveBar | null {
    for (let i = index; i >= 0 && i < this.count(); i += step) {
      if (series !== undefined && this.valueAt(series, i) != null) {
        return { series, index: i };
      }
      const any = this.series().findIndex((_, s) => this.valueAt(s, i) != null);
      if (any !== -1) {
        return { series: any, index: i };
      }
    }
    return null;
  }

  private eventFor(active: ActiveBar | null): ChartPointEvent | null {
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

  private setActive(next: ActiveBar | null): void {
    const current = this.active();
    if (current?.series === next?.series && current?.index === next?.index) {
      return;
    }
    this.active.set(next);
    this.activePointChange.emit(this.eventFor(next));
  }
}
