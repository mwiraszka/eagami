import {
  MultiSelectComponent,
  type MultiSelectSize,
  type SelectOption,
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

interface MultiSelectKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  placeholder: string;
  size: MultiSelectSize;
  searchable: boolean;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  maxVisibleChips: number;
}

const SLUG = 'multi-select';

@Component({
  selector: 'web-multi-select-demo-page',
  templateUrl: './multi-select-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MultiSelectComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class MultiSelectDemoPageComponent {
  private readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS[SLUG], UI_API[SLUG]);
  protected readonly state = signal<MultiSelectKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as MultiSelectKnobState,
  );

  protected readonly options = computed<SelectOption[]>(() =>
    this.messages().ui.component.sharedOptions.fruitOptions.map(o => ({ ...o })),
  );

  protected readonly extraAttributes = computed(() => {
    const literal = this.options()
      .map(option => `{ value: '${option.value}', label: '${option.label}' }`)
      .join(', ');
    return [`[options]="[${literal}]"`];
  });

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }) as MultiSelectKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS[SLUG]) as MultiSelectKnobState,
    );
  }
}
