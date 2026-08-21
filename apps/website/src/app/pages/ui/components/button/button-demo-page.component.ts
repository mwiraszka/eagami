import {
  ButtonComponent,
  type ButtonSize,
  type ButtonType,
  type ButtonVariant,
  ToastService,
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
import { ICON_NONE, iconComponentForSlug, iconKnob } from '../_playground/icon-knob';
import {
  type KnobValue,
  type PlaygroundKnob,
  buildKnobs,
  initialKnobState,
} from '../_playground/knob';

interface ButtonKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  label: string;
  variant: ButtonVariant;
  size: ButtonSize;
  type: ButtonType;
  disabled: boolean;
  loading: boolean;
  fullWidth: boolean;
  uppercase: boolean;
  icon: string;
}

const SLUG = 'button';

const LABEL_KNOB: PlaygroundKnob = {
  name: 'label',
  control: 'content',
  options: [],
  default: 'Press me',
};

// Auto-selected when the label is cleared while no icon is set, so the button is
// never left with neither text nor icon.
const FALLBACK_ICON = 'check';

@Component({
  selector: 'web-button-demo-page',
  templateUrl: './button-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class ButtonDemoPageComponent {
  private readonly toast = inject(ToastService);
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly knobs = [
    LABEL_KNOB,
    ...buildKnobs(PLAYGROUND_KNOBS.button, UI_API[SLUG]),
    iconKnob([
      'check',
      'search',
      'filter',
      'mail',
      'user',
      'lock',
      'calendar',
      'bell',
      'home',
      'star',
    ]),
  ];
  protected readonly state = signal<ButtonKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.button) as ButtonKnobState,
  );
  protected readonly iconComponent = computed(() =>
    iconComponentForSlug(this.state().icon),
  );

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => {
      // The control panel is keyed by string; one cast bridges it back to the
      // statically typed state that keeps the live <ea-button> bindings checked.
      const next = { ...current, [name]: value } as ButtonKnobState;
      if (!next.label.trim() && next.icon === ICON_NONE) {
        next.icon = FALLBACK_ICON;
      }
      return next;
    });
  }

  protected onButtonClick(): void {
    this.toast.success(this.messages().ui.component.demos.button.clickedToast);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.button) as ButtonKnobState,
    );
  }
}
