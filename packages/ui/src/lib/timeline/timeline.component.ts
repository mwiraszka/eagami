import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { type EaSize } from '../sizes';

/** Direction the timeline flows. */
export type TimelineOrientation = 'vertical' | 'horizontal';

/**
 * Placement of each item's content relative to the line. `alternate` zig-zags
 * items to either side of a centered line and applies to vertical timelines only.
 */
export type TimelineAlign = 'start' | 'alternate';

/** Semantic color of a timeline item's node. */
export type TimelineItemColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error';

/** Visual size of the timeline. */
export type TimelineSize = EaSize;

/** Single event rendered in an `<ea-timeline>`. */
export interface TimelineItem {
  /** Title line for the event. */
  heading?: string;
  /** Muted meta line, typically a timestamp. */
  time?: string;
  /** Body text describing the event. */
  description?: string;
  /** Node color; ignored when `current` is set. */
  color?: TimelineItemColor;
  /** Marks the current point in time; the node wears the secondary brand and a halo. */
  current?: boolean;
}

/**
 * Vertical or horizontal sequence of events, each a colored node on a connecting
 * line with an optional heading, timestamp, and description. A single item flagged
 * `current` is highlighted with the secondary brand color to mark "you are here".
 */
@Component({
  selector: 'ea-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NgClass],
})
export class TimelineComponent {
  /** The events to render, in order. */
  readonly items = input<TimelineItem[]>([]);
  /** Direction the timeline flows. */
  readonly orientation = input<TimelineOrientation>('vertical');
  /** Content placement relative to the line; `alternate` applies to vertical timelines only. */
  readonly align = input<TimelineAlign>('start');
  /** Visual size; scales nodes, gaps, and text from a single knob. */
  readonly size = input<TimelineSize>('md');

  protected readonly hostClasses = computed(() => ({
    [`ea-timeline--${this.orientation()}`]: true,
    [`ea-timeline--${this.size()}`]: true,
    'ea-timeline--alternate':
      this.orientation() === 'vertical' && this.align() === 'alternate',
  }));

  // Node modifier: the current marker always wins the secondary brand; otherwise
  // the item's semantic color (default when unset).
  protected itemModifier(item: TimelineItem): string {
    return `ea-timeline__item--${item.current ? 'current' : (item.color ?? 'default')}`;
  }
}
