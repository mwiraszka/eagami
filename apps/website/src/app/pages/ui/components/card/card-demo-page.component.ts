import { ButtonComponent, CardComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-card-demo-page',
  templateUrl: './card-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, CardComponent, UiComponentDemoLayoutComponent],
})
export class CardDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
}
