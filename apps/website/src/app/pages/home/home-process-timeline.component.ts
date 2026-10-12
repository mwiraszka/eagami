import {
  CodeIconComponent,
  GlobeIconComponent,
  PenToolIconComponent,
  RefreshCwIconComponent,
  RocketIconComponent,
} from '@eagami/ui';

import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  type Type,
  computed,
  inject,
  viewChild,
} from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

const STEP_ICONS: ReadonlyArray<Type<unknown>> = [
  GlobeIconComponent,
  PenToolIconComponent,
  CodeIconComponent,
  RocketIconComponent,
  RefreshCwIconComponent,
];

type CurveSegment = readonly [number, number, number, number, number, number];

export const TIMELINE_WIDTH = 1000;
export const TIMELINE_HEIGHT = 200;

/* Node centres sit mid-way across each fifth of the band, alternating high and
   low; the home page thread is drawn through them along these segments */
export const TIMELINE_NODE_PATH: {
  start: readonly [number, number];
  segments: ReadonlyArray<CurveSegment>;
  end: readonly [number, number];
} = {
  start: [100, 60],
  segments: [
    [180, 60, 220, 140, 300, 140],
    [380, 140, 420, 60, 500, 60],
    [580, 60, 620, 140, 700, 140],
    [780, 140, 820, 60, 900, 60],
  ],
  end: [900, 60],
};

const LAUNCH_STEP = 3;
const CARE_STEP = 4;

@Component({
  selector: 'web-home-process-timeline',
  templateUrl: './home-process-timeline.component.html',
  styleUrl: './home-process-timeline.component.scss',
  imports: [NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeProcessTimelineComponent {
  private readonly i18n = inject(WebI18nService);

  /** The band the nodes sit on, which the home page thread runs through */
  readonly band = viewChild.required<ElementRef<HTMLElement>>('band');

  protected readonly process = computed(() => this.i18n.messages().home.process);

  protected readonly steps = computed(() =>
    this.process().steps.map((step, index) => ({
      ...step,
      icon: STEP_ICONS[index],
      launch: index === LAUNCH_STEP,
      care: index === CARE_STEP,
    })),
  );
}
