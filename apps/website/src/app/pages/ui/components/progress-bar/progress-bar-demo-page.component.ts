import { ProgressBarComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-progress-bar-demo-page',
  templateUrl: './progress-bar-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressBarComponent, UiComponentDemoLayoutComponent],
})
export class ProgressBarDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
}
