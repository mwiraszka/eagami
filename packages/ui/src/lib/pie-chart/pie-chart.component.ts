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
  type ChartSize,
  chartColor,
  injectChartFormatter,
  injectChartViewport,
} from '../chart/chart';
import { formatGroupedNumber } from '../i18n/format-number';
import { EagamiI18nService } from '../i18n/i18n.service';
import { TooltipDirective } from '../tooltip/tooltip.directive';

/** A solid pie, or a ring with an empty center. */
export type PieChartVariant = 'pie' | 'donut';

/**
 * Entrance animation, replayed whenever the data changes. `sweep` reveals the
 * slices clockwise from twelve o'clock, `grow` scales the chart out from its
 * center, and `fade` fades it in.
 */
export type PieChartAnimation = 'sweep' | 'grow' | 'fade' | 'none';

/** One slice of an `<ea-pie-chart>`. */
export interface PieChartSlice {
  /** Name shown in the legend, tooltip, and data table. */
  label: string;
  /** Size of the slice; negative values count as zero. */
  value: number;
  /** Any CSS color; defaults to the next slot of the `--color-chart-*` palette. */
  color?: string;
}

/** Payload describing a single slice of a pie chart. */
export interface PieChartSliceEvent {
  index: number;
  label: string;
  value: number;
  /** Share of the total, from 0 to 100. */
  percent: number;
}

interface PlotSlice {
  index: number;
  path: string;
  color: string;
  midAngle: number;
  start: number;
  end: number;
}

const ACTIVE_OFFSET = 6;
const DONUT_RATIO = 0.6;

function polar(cx: number, cy: number, r: number, angle: number): [number, number] {
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

function slicePath(
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  start: number,
  end: number,
): string {
  // A lone slice spanning the whole circle has no distinct endpoints to arc
  // between, so it is drawn as two half circles instead
  if (end - start >= Math.PI * 2 - 1e-6) {
    const ring = (r: number, sweep: 0 | 1) =>
      `M${cx + r},${cy}A${r},${r} 0 1 ${sweep} ${cx - r},${cy}A${r},${r} 0 1 ${sweep} ${cx + r},${cy}Z`;
    return inner > 0 ? `${ring(outer, 1)}${ring(inner, 0)}` : ring(outer, 1);
  }
  const large = end - start > Math.PI ? 1 : 0;
  const [ox0, oy0] = polar(cx, cy, outer, start);
  const [ox1, oy1] = polar(cx, cy, outer, end);
  if (inner <= 0) {
    return `M${cx},${cy}L${ox0},${oy0}A${outer},${outer} 0 ${large} 1 ${ox1},${oy1}Z`;
  }
  const [ix0, iy0] = polar(cx, cy, inner, start);
  const [ix1, iy1] = polar(cx, cy, inner, end);
  return `M${ox0},${oy0}A${outer},${outer} 0 ${large} 1 ${ox1},${oy1}L${ix1},${iy1}A${inner},${inner} 0 ${large} 0 ${ix0},${iy0}Z`;
}

/**
 * Shows how parts make up a whole as slices of a pie or donut, with a legend
 * of labels and shares. Hovering or arrowing through the slices reveals each
 * one's value in a tooltip, and a visually hidden table carries the full data
 * for screen readers.
 */
@Component({
  selector: 'ea-pie-chart',
  imports: [NgClass, TooltipDirective],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PieChartComponent {
  protected readonly i18n = inject(EagamiI18nService);

  /** The slices to draw, clockwise from twelve o'clock. */
  readonly data = input<PieChartSlice[]>([]);
  /** A solid pie, or a ring with an empty center. */
  readonly variant = input<PieChartVariant>('pie');
  /** Shows a legend of every slice beside the chart. */
  readonly showLegend = input<boolean>(true);
  /** Adds each slice's share of the total to its legend entry. */
  readonly showPercentages = input<boolean>(true);
  /** Largest diameter of the chart in pixels; it shrinks to fit a narrower container. */
  readonly height = input<number>(240);
  /** Visual size; scales the legend and tooltip text. */
  readonly size = input<ChartSize>('md');
  /** Entrance animation, replayed whenever the data changes. */
  readonly animation = input<PieChartAnimation>('sweep');
  /** Length of the entrance animation in milliseconds. */
  readonly animationDuration = input<number>(600);
  /** Formats values in the tooltip and data table; locale-grouped by default. */
  readonly formatValue = input<((value: number) => string) | null>(null);
  /** Accessible name for the chart; defaults to a localized "Pie chart". */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  /** Fires when a slice is clicked, or chosen with Enter or Space. */
  readonly sliceClick = output<PieChartSliceEvent>();
  /** Fires when the highlighted slice changes by pointer or keyboard, with `null` once cleared. */
  readonly activeSliceChange = output<PieChartSliceEvent | null>();

  private readonly viewport = injectChartViewport(this.size);
  private readonly format = injectChartFormatter(this.formatValue);
  protected readonly active = signal<number | null>(null);

  protected readonly label = computed(
    () => this.ariaLabel() || this.i18n.messages().chart.pieChart,
  );

  protected readonly total = computed(() =>
    this.data().reduce((sum, slice) => sum + this.sliceValue(slice), 0),
  );

  protected readonly hasData = computed(() => this.total() > 0);

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
    [`ea-pie-chart--${this.size()}`]: true,
    [`ea-pie-chart--${this.variant()}`]: true,
    [`ea-pie-chart--animate-${this.animation()}`]: true,
  }));

  protected readonly layout = computed(() => {
    const diameter = Math.max(1, Math.min(this.viewport.width(), this.height()));
    const cx = diameter / 2;
    const cy = diameter / 2;
    const outer = Math.max(1, diameter / 2 - ACTIVE_OFFSET);
    const inner = this.variant() === 'donut' ? outer * DONUT_RATIO : 0;
    const total = this.total();
    const slices: PlotSlice[] = [];
    let angle = -Math.PI / 2;
    this.data().forEach((slice, index) => {
      const value = this.sliceValue(slice);
      if (value <= 0 || total <= 0) {
        return;
      }
      const sweep = (value / total) * Math.PI * 2;
      slices.push({
        index,
        path: slicePath(cx, cy, outer, inner, angle, angle + sweep),
        color: chartColor(index, slice.color),
        midAngle: angle + sweep / 2,
        start: angle,
        end: angle + sweep,
      });
      angle += sweep;
    });
    return { diameter, cx, cy, outer, inner, slices };
  });

  protected readonly legend = computed(() =>
    this.data().map((slice, index) => ({
      label: slice.label,
      color: chartColor(index, slice.color),
      percent: this.formatPercent(this.percentOf(index)),
    })),
  );

  protected readonly tooltip = computed(() => {
    const index = this.active();
    const layout = this.layout();
    const slice = layout.slices.find(s => s.index === index);
    if (index === null || !slice) {
      return null;
    }
    const reach =
      layout.inner > 0 ? (layout.outer + layout.inner) / 2 : layout.outer * 0.6;
    const [x, y] = polar(layout.cx, layout.cy, reach, slice.midAngle);
    return {
      x,
      y,
      title: this.data()[index].label,
      color: slice.color,
      detail: `${this.format()(this.sliceValue(this.data()[index]))} (${this.formatPercent(this.percentOf(index))})`,
      key: index,
    };
  });

  // One anchor per highlighted slice, so each new slice opens a fresh bubble beside it
  protected readonly tooltips = computed(() => {
    const tip = this.tooltip();
    return tip ? [tip] : [];
  });

  protected readonly announcement = computed(() => {
    const event = this.eventFor(this.active());
    return event
      ? this.i18n
          .messages()
          .chart.slice(
            event.label,
            this.format()(event.value),
            this.formatPercent(event.percent),
          )
      : '';
  });

  protected tableValue(slice: PieChartSlice): string {
    return this.format()(this.sliceValue(slice));
  }

  protected tablePercent(index: number): string {
    return this.formatPercent(this.percentOf(index));
  }

  protected isDimmed(index: number): boolean {
    const active = this.active();
    return active !== null && active !== index;
  }

  protected offset(slice: PlotSlice): string | null {
    if (this.active() !== slice.index || this.layout().slices.length < 2) {
      return null;
    }
    const [dx, dy] = polar(0, 0, ACTIVE_OFFSET, slice.midAngle);
    return `translate(${dx}px, ${dy}px)`;
  }

  protected onPointerMove(event: PointerEvent): void {
    const target = event.currentTarget as SVGSVGElement;
    const rect = target.getBoundingClientRect();
    const layout = this.layout();
    const dx = event.clientX - rect.left - layout.cx;
    const dy = event.clientY - rect.top - layout.cy;
    const distance = Math.hypot(dx, dy);
    if (distance < layout.inner || distance > layout.outer + ACTIVE_OFFSET) {
      this.setActive(null);
      return;
    }
    let angle = Math.atan2(dy, dx);
    if (angle < -Math.PI / 2) {
      angle += Math.PI * 2;
    }
    const slice = layout.slices.find(s => angle >= s.start && angle < s.end);
    this.setActive(slice ? slice.index : null);
  }

  protected onPointerLeave(): void {
    this.setActive(null);
  }

  protected onClick(): void {
    const event = this.eventFor(this.active());
    if (event) {
      this.sliceClick.emit(event);
    }
  }

  protected onFocus(): void {
    if (this.active() === null) {
      this.setActive(this.layout().slices[0]?.index ?? null);
    }
  }

  protected onBlur(): void {
    this.setActive(null);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const slices = this.layout().slices;
    if (!slices.length) {
      return;
    }
    // The first arrow press lands on the first slice rather than stepping past it
    if (this.active() === null && event.key.startsWith('Arrow')) {
      event.preventDefault();
      this.setActive(slices[0].index);
      return;
    }
    const position = Math.max(
      0,
      slices.findIndex(s => s.index === this.active()),
    );
    let next: number | null = slices[position].index;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = slices[(position + 1) % slices.length].index;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = slices[(position - 1 + slices.length) % slices.length].index;
        break;
      case 'Home':
        next = slices[0].index;
        break;
      case 'End':
        next = slices[slices.length - 1].index;
        break;
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

  private sliceValue(slice: PieChartSlice): number {
    return isFinite(slice.value) ? Math.max(0, slice.value) : 0;
  }

  private percentOf(index: number): number {
    const total = this.total();
    const slice = this.data()[index];
    return total > 0 && slice ? (this.sliceValue(slice) / total) * 100 : 0;
  }

  private formatPercent(percent: number): string {
    const number = formatGroupedNumber(
      percent,
      this.i18n.locale(),
      this.i18n.messages().numberFormat,
      { maximumFractionDigits: 1 },
    );
    return `${number}%`;
  }

  private eventFor(index: number | null): PieChartSliceEvent | null {
    const slice = index === null ? undefined : this.data()[index];
    if (index === null || !slice) {
      return null;
    }
    return {
      index,
      label: slice.label,
      value: this.sliceValue(slice),
      percent: this.percentOf(index),
    };
  }

  private setActive(next: number | null): void {
    if (this.active() === next) {
      return;
    }
    this.active.set(next);
    this.activeSliceChange.emit(this.eventFor(next));
  }
}
