import { AlertComponent, type AlertSize, type AlertVariant } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { iconComponentForSlug, iconKnob } from '../_playground/icon-knob';
import { type KnobValue, buildKnobs, initialKnobState } from '../_playground/knob';

interface AlertKnobState {
  // Index signature lets this typed state satisfy the playground's generic
  // KnobState input; the explicit fields below still drive checked bindings.
  [key: string]: KnobValue;
  variant: AlertVariant;
  size: AlertSize;
  dismissible: boolean;
  icon: string;
}

const SLUG = 'alert';

@Component({
  selector: 'web-alert-demo-page',
  templateUrl: './alert-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AlertComponent, UiComponentDemoLayoutComponent, ComponentPlaygroundComponent],
})
export class AlertDemoPageComponent {
  protected readonly slug = SLUG;
  protected readonly knobs = [
    ...buildKnobs(PLAYGROUND_KNOBS.alert, UI_API[SLUG]),
    iconKnob(['info', 'check', 'alert-circle', 'bell', 'star', 'heart']),
  ];
  protected readonly state = signal<AlertKnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.alert) as AlertKnobState,
  );
  protected readonly iconComponent = computed(() =>
    iconComponentForSlug(this.state().icon),
  );
  protected readonly alertVisible = signal(true);

  protected onKnob({ name, value }: KnobChange): void {
    // The control panel is keyed by string; one cast bridges it back to the
    // statically typed state that keeps the live <ea-alert> bindings checked.
    this.state.update(current => ({ ...current, [name]: value }) as AlertKnobState);
  }

  protected onAlertDismissed(): void {
    this.alertVisible.set(false);
    // Restore the alert so the playground stays usable after a dismissal
    setTimeout(() => this.alertVisible.set(true), 2000);
  }

  protected reset(): void {
    this.state.set(
      initialKnobState(this.knobs, PLAYGROUND_KNOBS.alert) as AlertKnobState,
    );
    this.alertVisible.set(true);
  }
}
