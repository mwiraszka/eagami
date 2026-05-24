import { CheckboxComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-checkbox-demo-page',
  templateUrl: './checkbox-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent, UiComponentDemoLayoutComponent],
})
export class CheckboxDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly checkboxValue = signal(false);
}
