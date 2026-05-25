import { ButtonComponent, DialogComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-dialog-demo-page',
  templateUrl: './dialog-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, DialogComponent, UiComponentDemoLayoutComponent],
})
export class DialogDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly dialogOpen = signal(false);
}
