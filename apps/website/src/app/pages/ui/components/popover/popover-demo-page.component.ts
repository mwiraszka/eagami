import {
  ContextMenuTriggerDirective,
  type PopoverAnchorPoint,
  PopoverComponent,
  type PopoverOpenRequest,
  type PopoverPlacement,
  type PopoverRole,
  type PopoverScrollBehavior,
} from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';
import { type DemoOpensOn, OPENS_ON_KNOB } from '../_playground/opens-on-knob';

interface PopoverKnobState {
  [key: string]: KnobValue;
  opensOn: DemoOpensOn;
  placement: PopoverPlacement;
  role: PopoverRole;
  scrollBehavior: PopoverScrollBehavior;
  offset: number;
  flip: boolean;
  clamp: boolean;
  matchAnchorWidth: boolean;
  closeOnEscape: boolean;
  closeOnOutsideClick: boolean;
}

const SLUG = 'popover';

const SNIPPET_CHILDREN = '<div>Popover content</div>';

@Component({
  selector: 'web-popover-demo-page',
  templateUrl: './popover-demo-page.component.html',
  styleUrl: './popover-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ContextMenuTriggerDirective,
    PopoverComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class PopoverDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly open = signal(false);
  // Where a right-click asked the popover to open
  protected readonly point = signal<PopoverAnchorPoint | null>(null);
  protected readonly trigger = viewChild<ElementRef<HTMLElement>>('trigger');
  protected readonly childMarkup = SNIPPET_CHILDREN;

  protected readonly knobs = [
    OPENS_ON_KNOB,
    ...buildKnobs(PLAYGROUND_KNOBS.popover, UI_API[SLUG]),
  ];
  protected readonly state = signal<PopoverKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.popover) as PopoverKnobState,
  );

  protected readonly onRightClick = computed(
    () => this.state().opensOn === 'right-click',
  );

  protected readonly extraAttributes = computed(() =>
    this.onRightClick()
      ? [
          '#popover',
          '[anchor]="area"',
          '[open]="open"',
          '[anchorPoint]="point"',
          '[contextMenu]="true"',
          '(openRequested)="open = true; point = $event.point"',
          '(closeRequested)="open = false"',
        ]
      : ['[anchor]="trigger"', '[open]="open"', '(closeRequested)="open = false"'],
  );
  protected readonly extraSnippet = computed(() =>
    this.onRightClick()
      ? '<div #area [eaContextMenuTrigger]="popover">Right-click here</div>'
      : '<button #trigger (click)="open = !open">Open popover</button>',
  );

  protected readonly popoverBasicOpen = signal(false);
  protected readonly popoverPlacementOpen = signal<PopoverPlacement | null>(null);

  protected toggle(): void {
    this.open.set(!this.open());
  }

  protected openAt(request: PopoverOpenRequest): void {
    this.point.set(request.point);
    this.open.set(true);
  }

  protected close(): void {
    this.open.set(false);
    this.point.set(null);
  }

  protected onKnob({ name, value }: KnobChange): void {
    if (name === 'opensOn') {
      this.close();
    }
    this.state.update(current => ({ ...current, [name]: value }) as PopoverKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.popover) as PopoverKnobState,
    );
  }
}
