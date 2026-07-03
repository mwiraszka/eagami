import { FormFieldComponent } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { UI_API } from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface FormFieldKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  hint: string;
  required: boolean;
  triggerError: boolean;
}

const SLUG = 'form-field';

@Component({
  selector: 'web-form-field-demo-page',
  templateUrl: './form-field-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class FormFieldDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS[SLUG], UI_API[SLUG]);
  protected readonly state = signal<FormFieldKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as FormFieldKnobState,
  );
  protected readonly childMarkup = '<input type="email" />';

  protected readonly control = new FormControl('', {
    validators: () => (this.state().triggerError ? { required: true } : null),
  });

  constructor() {
    // The demo-only `triggerError` knob forces a validation error for as long
    // as it stays on, so the localized message persists no matter what value is
    // entered or which other controls change.
    effect(() => {
      this.control.updateValueAndValidity({ emitEvent: false });
      if (this.state().triggerError) {
        this.control.markAsTouched();
      } else {
        this.control.markAsUntouched();
      }
    });
  }

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-form-field> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as FormFieldKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as FormFieldKnobState,
    );
  }
}
