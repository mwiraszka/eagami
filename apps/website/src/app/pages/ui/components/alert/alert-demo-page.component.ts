import { AlertComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-alert-demo-page',
  templateUrl: './alert-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AlertComponent, UiComponentDemoLayoutComponent],
})
export class AlertDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
}
