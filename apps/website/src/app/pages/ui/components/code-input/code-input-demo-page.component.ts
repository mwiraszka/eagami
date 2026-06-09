import { CodeInputComponent, type CodeInputSize } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface CodeInputKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  placeholder: string;
  length: number;
  size: CodeInputSize;
  allowAllChars: boolean;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
}

const SLUG = 'code-input';

@Component({
  selector: 'web-code-input-demo-page',
  templateUrl: './code-input-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CodeInputComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class CodeInputDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['code-input'], UI_API[SLUG]);
  protected readonly state = signal<CodeInputKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS['code-input']) as CodeInputKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-code-input> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as CodeInputKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS['code-input']) as CodeInputKnobState,
    );
  }
}
