import { CodeInputComponent, type CodeInputSize } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
  triggerError: boolean;
}

const SLUG = 'code-input';

@Component({
  selector: 'web-code-input-demo-page',
  templateUrl: './code-input-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
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

  protected readonly control = new FormControl(null, {
    validators: () => (this.state().triggerError ? { required: true } : null),
  });

  constructor() {
    // The demo-only `triggerError` knob forces a validation error for as long
    // as it stays on, so the localized message persists no matter what value is
    // entered or which other controls change.
    effect(() => {
      if (this.state().disabled) {
        this.control.disable({ emitEvent: false });
      } else {
        this.control.enable({ emitEvent: false });
      }
      this.control.updateValueAndValidity({ emitEvent: false });
      if (this.state().triggerError) {
        this.control.markAsTouched();
      } else {
        this.control.markAsUntouched();
      }
    });
  }

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => {
      // The control panel is keyed by string; one cast bridges it back to the
      // statically typed state that keeps the live <ea-code-input> bindings checked.
      const next = { ...current, [name]: value } as CodeInputKnobState;
      // Only the first `length` placeholder characters reach a cell, so cap the
      // input there to make that limit obvious.
      if (next.placeholder.length > next.length) {
        next.placeholder = next.placeholder.slice(0, next.length);
      }
      return next;
    });
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS['code-input']) as CodeInputKnobState,
    );
  }
}
