import {
  ColorPickerComponent,
  type ColorPickerFormat,
  type ColorPickerSize,
} from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface ColorPickerKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  placeholder: string;
  size: ColorPickerSize;
  format: ColorPickerFormat;
  showAlpha: boolean;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
}

const SLUG = 'color-picker';

@Component({
  selector: 'web-color-picker-demo-page',
  templateUrl: './color-picker-demo-page.component.html',
  styleUrl: './color-picker-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ColorPickerComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class ColorPickerDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS['color-picker'], UI_API[SLUG]);
  protected readonly state = signal<ColorPickerKnobState>(
    initialKnobState(
      this.knobs,
      PLAYGROUND_KNOBS['color-picker'],
    ) as ColorPickerKnobState,
  );

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-color-picker> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as ColorPickerKnobState);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(
        this.knobs,
        PLAYGROUND_KNOBS['color-picker'],
      ) as ColorPickerKnobState,
    );
  }
}
