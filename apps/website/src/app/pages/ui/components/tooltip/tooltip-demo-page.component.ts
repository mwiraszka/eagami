import {
  BadgeCheckIconComponent,
  BuildingIconComponent,
  MapPinIconComponent,
  TooltipDirective,
  type TooltipPosition,
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

interface TooltipKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  eaTooltip: string;
  tooltipPosition: TooltipPosition;
  maxWidth: number;
  dismissDelay: number;
  flip: boolean;
  whenClipped: boolean;
}

const SLUG = 'tooltip';
const DEMO_AVATAR_SRC = 'assets/demo-avatar.png';

@Component({
  selector: 'web-tooltip-demo-page',
  templateUrl: './tooltip-demo-page.component.html',
  styleUrl: './tooltip-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BadgeCheckIconComponent,
    BuildingIconComponent,
    MapPinIconComponent,
    TooltipDirective,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class TooltipDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly avatarSrc = DEMO_AVATAR_SRC;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.tooltip, UI_API[SLUG]);
  protected readonly state = signal<TooltipKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.tooltip) as TooltipKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as TooltipKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.tooltip) as TooltipKnobState,
    );
  }
}
