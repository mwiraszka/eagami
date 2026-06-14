import { SegmentedComponent, type SegmentedSize, type SelectOption } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
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

interface SegmentedKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  size: SegmentedSize;
  fullWidth: boolean;
  disabled: boolean;
  required: boolean;
  triggerError: boolean;
}

const SLUG = 'segmented';

@Component({
  selector: 'web-segmented-demo-page',
  templateUrl: './segmented-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    SegmentedComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class SegmentedDemoPageComponent {
  private readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS[SLUG], UI_API[SLUG]);
  protected readonly state = signal<SegmentedKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as SegmentedKnobState,
  );

  protected readonly options = computed<SelectOption[]>(() =>
    this.messages().ui.component.sharedOptions.viewOptions.map(o => ({ ...o })),
  );

  protected readonly extraAttributes = computed(() => {
    const literal = this.options()
      .map(option => `{ value: '${option.value}', label: '${option.label}' }`)
      .join(', ');
    return [`[options]="[${literal}]"`];
  });

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
    this.state.update(current => ({ ...current, [name]: value }) as SegmentedKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as SegmentedKnobState,
    );
  }
}
