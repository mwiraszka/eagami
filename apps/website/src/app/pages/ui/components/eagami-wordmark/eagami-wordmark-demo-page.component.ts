import { EagamiWordmarkComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-eagami-wordmark-demo-page',
  templateUrl: './eagami-wordmark-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EagamiWordmarkComponent, UiComponentDemoLayoutComponent],
})
export class EagamiWordmarkDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
}
