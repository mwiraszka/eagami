import {
  ButtonComponent,
  type ToastPosition,
  ToastService,
  type ToastVariant,
} from '@eagami/ui';
import { PLAYGROUND_KNOBS } from '@eagami/ui-knobs';

import {
  ChangeDetectionStrategy,
  Component,
  type OnDestroy,
  inject,
  signal,
} from '@angular/core';

import { UI_API } from '@app/data/ui-api.generated';
import { WebI18nService } from '@app/i18n/web-i18n.service';
import { ToastOutletService } from '@app/services/toast-outlet.service';

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
export class ToastDemoPageComponent implements OnDestroy {
  private readonly toastService = inject(ToastService);
  private readonly toastOutlet = inject(ToastOutletService);
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly slug = SLUG;
  protected readonly knobs = buildKnobs(PLAYGROUND_KNOBS.toast, UI_API[SLUG]);
  protected readonly state = signal<KnobState>(
    initialKnobState(this.knobs, PLAYGROUND_KNOBS.toast),
  );

  // The single docs-section outlet lives in the shell; mirror the knobs onto it
  // so the playground can move and declutter the stack without a second outlet.
  constructor() {
    this.syncOutlet();
  }

  ngOnDestroy(): void {
    this.toastOutlet.reset();
  }

  protected showToast(variant: ToastVariant): void {
    this.toastService.show(this.messages().ui.component.demos.toast.message(variant), {
      variant,
    });
  }

  protected onKnob({ name, value }: KnobChange): void {
    this.state.update(current => ({ ...current, [name]: value }));
    this.syncOutlet();
  }

  protected reset(): void {
    this.state.set(initialKnobState(this.knobs, PLAYGROUND_KNOBS.toast));
    this.syncOutlet();
  }

  private syncOutlet(): void {
    const current = this.state();
    this.toastOutlet.position.set(current['position'] as ToastPosition);
    this.toastOutlet.clearable.set(current['clearable'] as boolean);
  }
}
