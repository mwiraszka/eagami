import {
  StepComponent,
  StepperComponent,
  type StepperOrientation,
  type StepperSize,
} from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface StepperKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  linear: boolean;
  orientation: StepperOrientation;
  size: StepperSize;
}

const SLUG = 'stepper';

interface StepItem {
  label: string;
  content: string;
}

@Component({
  selector: 'web-stepper-demo-page',
  templateUrl: './stepper-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    StepComponent,
    StepperComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class StepperDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.stepper, UI_API[SLUG]);
  protected readonly state = signal<StepperKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.stepper) as StepperKnobState,
  );

  protected readonly steps = computed<readonly StepItem[]>(() => {
    const m = this.messages().ui.component.demos.stepper;
    return [
      { label: m.accountLabel, content: m.accountContent },
      { label: m.profileLabel, content: m.profileContent },
      { label: m.reviewLabel, content: m.reviewContent },
    ];
  });

  protected readonly childMarkup = computed(() =>
    this.steps()
      .map(step => {
        const attrBlock = `  label="${step.label}">`;
        return `<ea-step\n${attrBlock}\n  ${step.content}\n</ea-step>`;
      })
      .join('\n'),
  );

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as StepperKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.stepper) as StepperKnobState,
    );
  }
}
