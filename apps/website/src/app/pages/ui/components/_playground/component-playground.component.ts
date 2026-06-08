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
  /** Markup for component-shaped configuration the snippet should reflect as children, e.g. accordion items. */
  readonly childMarkup = input<string>('');
  /** Extra tag attributes the snippet should reflect, e.g. a built `[options]` binding. */
  readonly extraAttributes = input<readonly string[]>([]);

  readonly knobChange = output<KnobChange>();
  readonly resetClicked = output<void>();

  private readonly meta = computed(() => UI_COMPONENTS.find(c => c.slug === this.slug()));

  protected readonly snippet = computed(() =>
    generateSnippet(
      this.meta()?.selector ?? '',
      this.meta()?.kind === 'directive',
      this.knobs(),
      this.state(),
      { childMarkup: this.childMarkup(), extraAttributes: this.extraAttributes() },
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

  // The number input emits raw strings; bindings to numeric component inputs
  // would otherwise concatenate instead of add. An empty field stays "unset".
  protected emitNumber(name: string, value: string): void {
    const trimmed = value.trim();
    const parsed = Number(trimmed);
    this.emit(name, trimmed === '' || Number.isNaN(parsed) ? '' : parsed);
  }

  // Number knobs commit on blur, not per keystroke, so the preview never renders
  // an out-of-bounds intermediate value; the field clamps to min/max on blur.
  protected commitNumber(name: string, event: FocusEvent): void {
    this.emitNumber(name, (event.target as HTMLInputElement).value);
  }

  // Enter blurs the field, routing through the same clamp-then-commit path.
  protected commitOnEnter(event: Event): void {
    (event.target as HTMLInputElement).blur();
  }

  protected rangeHint(knob: PlaygroundKnob): string {
    const { min, max } = knob;
    const labels = this.messages().ui.component.playground.rangeHint;
    const format = (value: number): string => value.toLocaleString('en-US');
    if (min != null && max != null) {
      return `${format(min)} ${labels.between} ${format(max)}`;
    }
    if (min != null) {
      return `${labels.min} ${format(min)}`;
    }
    if (max != null) {
      return `${labels.max} ${format(max)}`;
    }
    return '';
  }
}
