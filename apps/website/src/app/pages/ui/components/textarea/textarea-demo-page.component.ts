import { TextareaComponent, type TextareaResize, type TextareaSize } from '@eagami/ui';
import { LABEL_ICON_SLUGS, PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { iconComponentForSlug, iconKnob } from '../_playground/icon-knob';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface TextareaKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  labelIcon: string;
  placeholder: string;
  size: TextareaSize;
  resize: TextareaResize;
  maxlength: number;
  minHeight: number;
  maxHeight: number;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  triggerError: boolean;
}

const SLUG = 'textarea';

@Component({
  selector: 'web-textarea-demo-page',
  templateUrl: './textarea-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    TextareaComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class TextareaDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = [
    ...buildKnobs(PLAYGROUND_KNOBS.textarea, UI_API[SLUG]),
    iconKnob([...LABEL_ICON_SLUGS], { name: 'labelIcon' }),
  ];
  protected readonly state = signal<TextareaKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.textarea) as TextareaKnobState,
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

  protected readonly labelIconComponent = computed(() =>
    iconComponentForSlug(this.state().labelIcon),
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
