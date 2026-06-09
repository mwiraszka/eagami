import {
  PopoverComponent,
  type PopoverPlacement,
  type PopoverRole,
  type PopoverScrollBehavior,
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

interface PopoverKnobState {
  [key: string]: KnobValue;
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
    PopoverComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class PopoverDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly open = signal(false);
  protected readonly childMarkup = SNIPPET_CHILDREN;
  protected readonly extraAttributes = ['[anchor]="anchorEl"', '[open]="open"'];

  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.popover, UI_API[SLUG]);
  protected readonly state = signal<PopoverKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.popover) as PopoverKnobState,
  );

  protected readonly popoverBasicOpen = signal(false);
  protected readonly popoverPlacementOpen = signal<PopoverPlacement | null>(null);

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as PopoverKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.popover) as PopoverKnobState,
    );
  }
}
