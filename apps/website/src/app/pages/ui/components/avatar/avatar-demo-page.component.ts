import { AvatarComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-avatar-demo-page',
  templateUrl: './avatar-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent, UiComponentDemoLayoutComponent],
})
export class AvatarDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
}
