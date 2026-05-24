import { StepComponent, StepperComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-stepper-demo-page',
  templateUrl: './stepper-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StepComponent, StepperComponent, UiComponentDemoLayoutComponent],
})
export class StepperDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
}
