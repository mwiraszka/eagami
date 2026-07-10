import {
  ButtonComponent,
  CheckboxComponent,
  InputComponent,
  PlusIconComponent,
  type TimelineAlign,
  TimelineComponent,
  type TimelineItemColor,
  type TimelineOrientation,
  type TimelineSize,
  TooltipDirective,
  TrashIconComponent,
} from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface TimelineItemModel {
  id: number;
  heading: string;
  time: string;
  description: string;
  color: TimelineItemColor;
  current: boolean;
}

interface TimelineKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive the checked bindings.
  [key: string]: KnobValue;
  orientation: TimelineOrientation;
  align: TimelineAlign;
  size: TimelineSize;
}

const SLUG = 'timeline';

const DEFAULT_ITEMS: readonly Omit<TimelineItemModel, 'id'>[] = [
  {
    heading: 'Order placed',
    time: '09:24',
    description: 'Payment confirmed and receipt sent.',
    color: 'success',
    current: false,
  },
  {
    heading: 'Packed',
    time: '11:02',
    description: 'Items picked and boxed at the warehouse.',
    color: 'default',
    current: false,
  },
  {
    heading: 'Out for delivery',
    time: '14:47',
    description: 'The courier is on the way.',
    color: 'default',
    current: true,
  },
  {
    heading: 'Delivered',
    time: '',
    description: 'Estimated by end of day.',
    color: 'default',
    current: false,
  },
];

@Component({
  selector: 'web-timeline-demo-page',
  templateUrl: './timeline-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    CheckboxComponent,
    InputComponent,
    PlusIconComponent,
    TimelineComponent,
    TooltipDirective,
    TrashIconComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class TimelineDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['timeline'], UI_API[SLUG]);
  protected readonly state = signal<TimelineKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS['timeline']) as TimelineKnobState,
  );

  protected readonly extraAttributes = ['[items]="items"'];

  private nextId = 1;
  protected readonly items = signal<TimelineItemModel[]>(this.seedItems());

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as TimelineKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS['timeline']) as TimelineKnobState,
    );
    this.nextId = 1;
    this.items.set(this.seedItems());
  }

  protected addItem(): void {
    this.items.update(items => [
      ...items,
      {
        id: this.nextId++,
        heading: 'New event',
        time: '',
        description: 'New description',
        color: 'default',
        current: false,
      },
    ]);
  }

  protected removeItem(id: number): void {
    this.items.update(items => items.filter(item => item.id !== id));
  }

  protected updateItem(id: number, patch: Partial<TimelineItemModel>): void {
    this.items.update(items =>
      items.map(item => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  // Only one item can mark the current point in time, so setting it clears the rest
  protected setCurrent(id: number, current: boolean): void {
    this.items.update(items =>
      items.map(item => ({ ...item, current: current && item.id === id })),
    );
  }

  private seedItems(): TimelineItemModel[] {
    return DEFAULT_ITEMS.map(item => ({ ...item, id: this.nextId++ }));
  }
}
