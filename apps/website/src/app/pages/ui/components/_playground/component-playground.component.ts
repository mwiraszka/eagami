import {
  ButtonComponent,
  CardComponent,
  ColorPickerComponent,
  DropdownComponent,
  InputComponent,
  SegmentedComponent,
  type SelectOption,
  SwitchComponent,
} from '@eagami/ui';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';

import { CodeSnippetComponent } from '@app/components/code-snippet/code-snippet.component';
import { UI_COMPONENTS } from '@app/data/ui-components';
import { WebI18nService } from '@app/i18n/web-i18n.service';

import { ApiReferenceComponent } from './api-reference.component';
import {
  type KnobState,
  type KnobValue,
  type PlaygroundKnob,
  humanizeKnobName,
  isKnobEnabled,
} from './knob';
import { generateSnippet } from './snippet';

export interface KnobChange {
  name: string;
  value: KnobValue;
}

/**
 * Generic, component-agnostic playground chrome: renders one control per knob,
 * a live code snippet for the current configuration, and a reset action. The
 * live component instance itself is projected in by the host page so its
 * bindings stay strongly typed; this shell only drives the knob state.
 */
@Component({
  selector: 'web-component-playground',
  templateUrl: './component-playground.component.html',
  styleUrl: './component-playground.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ApiReferenceComponent,
    ButtonComponent,
    CardComponent,
    CodeSnippetComponent,
    ColorPickerComponent,
    DropdownComponent,
    InputComponent,
    SegmentedComponent,
    SwitchComponent,
  ],
})
export class ComponentPlaygroundComponent {
  protected readonly messages = inject(WebI18nService).messages;

  readonly slug = input.required<string>();
  readonly knobs = input.required<PlaygroundKnob[]>();
  readonly state = input.required<KnobState>();

  readonly knobChange = output<KnobChange>();
  readonly resetClicked = output<void>();

  private readonly meta = computed(() => UI_COMPONENTS.find(c => c.slug === this.slug()));

  protected readonly snippet = computed(() =>
    generateSnippet(
      this.meta()?.selector ?? '',
      this.meta()?.kind === 'directive',
      this.knobs(),
      this.state(),
    ),
  );

  private readonly optionsByKnob = computed(() => {
    const map = new Map<string, SelectOption[]>();
    for (const knob of this.knobs()) {
      if (knob.options.length) {
        map.set(
          knob.name,
          knob.options.map(option => ({ value: option, label: option })),
        );
      }
    }
    return map;
  });

  protected knobLabel(name: string): string {
    const labels = this.messages().ui.component.playground.knobLabels[this.slug()];
    return labels?.[name] ?? humanizeKnobName(name);
  }

  protected optionsFor(name: string): SelectOption[] {
    return this.optionsByKnob().get(name) ?? [];
  }

  protected stringValue(name: string): string {
    const value = this.state()[name];
    return typeof value === 'string' ? value : String(value ?? '');
  }

  protected boolValue(name: string): boolean {
    return this.state()[name] === true;
  }

  protected isEnabled(knob: PlaygroundKnob): boolean {
    return isKnobEnabled(knob, this.state());
  }

  protected emit(name: string, value: KnobValue): void {
    this.knobChange.emit({ name, value });
  }
}
