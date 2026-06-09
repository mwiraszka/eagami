import { ButtonComponent, ToastService, type ToastVariant } from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';
import {
  ComponentPlaygroundComponent,
  type KnobChange,
} from '../_playground/component-playground.component';
import { type KnobState, buildKnobs, initialKnobState } from '../_playground/knob';

const SLUG = 'toast';

@Component({
  selector: 'web-toast-demo-page',
  templateUrl: './toast-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    UiComponentDemoLayoutComponent,
    ComponentPlaygroundComponent,
  ],
})
export class ToastDemoPageComponent {
  private readonly toastService = inject(ToastService);
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.toast, UI_API[SLUG]);
  protected readonly state = signal<KnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.toast),
  );

  protected showToast(variant: ToastVariant): void {
    this.toastService.show(this.messages().ui.component.demos.toast.message(variant), {
      variant,
    });
  }

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }));
  }

  protected reset(): void {
    this.state.set(initialKnobState(this.knobs, PLAYGROUND_KNOBS.toast));
  }
}
