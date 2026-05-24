import { RadioComponent, RadioGroupComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-radio-demo-page',
  templateUrl: './radio-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RadioComponent, RadioGroupComponent, UiComponentDemoLayoutComponent],
})
export class RadioDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly radioValue = signal('');
}
