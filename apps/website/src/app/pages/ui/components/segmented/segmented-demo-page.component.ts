import { SegmentedComponent, type SegmentedSize, type SelectOption } from '@eagami/ui';
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

interface SegmentedKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  size: SegmentedSize;
  fullWidth: boolean;
  disabled: boolean;
  required: boolean;
}

const SLUG = 'segmented';

@Component({
  selector: 'web-segmented-demo-page',
  templateUrl: './segmented-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as SegmentedKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as SegmentedKnobState,
    );
  }
}
