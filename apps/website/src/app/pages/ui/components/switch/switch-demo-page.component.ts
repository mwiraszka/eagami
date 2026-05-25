import { SwitchComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-switch-demo-page',
  templateUrl: './switch-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SwitchComponent, UiComponentDemoLayoutComponent],
})
export class SwitchDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly switchValue = signal(false);
}
