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

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';

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
  protected readonly messages = inject(WebI18nService).messages;
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
        heading: this.messages().ui.component.demos.timeline.newEvent,
        time: '',
        description: this.messages().ui.component.demos.timeline.newEventDescription,
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
    const m = this.messages().ui.component.demos.timeline;
    return [
      {
        heading: m.orderPlaced,
        time: '09:24',
        description: m.orderPlacedDescription,
        color: 'success' as const,
        current: false,
      },
      {
        heading: m.packed,
        time: '11:02',
        description: m.packedDescription,
        color: 'default' as const,
        current: false,
      },
      {
        heading: m.outForDelivery,
        time: '14:47',
        description: m.outForDeliveryDescription,
        color: 'default' as const,
        current: true,
      },
      {
        heading: m.delivered,
        time: '',
        description: m.deliveredDescription,
        color: 'default' as const,
        current: false,
      },
    ].map(item => ({ ...item, id: this.nextId++ }));
  }
}
