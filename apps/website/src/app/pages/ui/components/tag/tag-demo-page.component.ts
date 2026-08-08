import { TagComponent, type TagSize, type TagTooltip, type TagVariant } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';
import { textKnob } from '../_playground/text-knob';

interface TagKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  text: string;
  variant: TagVariant;
  size: TagSize;
  maxWidth: number;
  tooltip: TagTooltip;
  removable: boolean;
  disabled: boolean;
  removeLabel: string;
}

const SLUG = 'tag';

@Component({
  selector: 'web-tag-demo-page',
  templateUrl: './tag-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TagComponent, UiComponentDemoLayoutComponent, ComponentPlaygroundComponent],
})
export class TagDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = [
    textKnob('Eagami'),
    ...buildKnobs(PLAYGROUND_KNOBS.tag, UI_API[SLUG]),
  ];
  protected readonly state = signal<TagKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.tag) as TagKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-tag> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as TagKnobState);
  }

  protected reset(): void {
    this.state.set(initialKnobState(this.knobs, PLAYGROUND_KNOBS.tag) as TagKnobState);
  }
}
