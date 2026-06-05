import { AvatarComponent, type AvatarShape, type AvatarSize } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface AvatarKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  src: string;
  initials: string;
  alt: string;
  size: AvatarSize;
  shape: AvatarShape;
}

const SLUG = 'avatar';

@Component({
  selector: 'web-avatar-demo-page',
  templateUrl: './avatar-demo-page.component.html',
  styleUrl: './avatar-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AvatarComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class AvatarDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.avatar, UI_API[SLUG]);
  protected readonly state = signal<AvatarKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.avatar) as AvatarKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-avatar> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as AvatarKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.avatar) as AvatarKnobState,
    );
  }
}
