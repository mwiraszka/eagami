import { BadgeComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-badge-demo-page',
  templateUrl: './badge-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent, UiComponentDemoLayoutComponent],
})
export class BadgeDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
}
