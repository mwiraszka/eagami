import { TextareaComponent, type TextareaResize, type TextareaSize } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface TextareaKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  placeholder: string;
  size: TextareaSize;
  resize: TextareaResize;
  rows: number;
  maxlength: number;
  maxHeight: number;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
}

const SLUG = 'textarea';

@Component({
  selector: 'web-textarea-demo-page',
  templateUrl: './textarea-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TextareaComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class TextareaDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.textarea, UI_API[SLUG]);
  protected readonly state = signal<TextareaKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.textarea) as TextareaKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-textarea> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as TextareaKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.textarea) as TextareaKnobState,
    );
  }
}
