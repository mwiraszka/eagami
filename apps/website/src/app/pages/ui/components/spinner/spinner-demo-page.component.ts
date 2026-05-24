import { SpinnerComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-spinner-demo-page',
  templateUrl: './spinner-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SpinnerComponent, UiComponentDemoLayoutComponent],
})
export class SpinnerDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
}
