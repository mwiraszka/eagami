import { InputComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-input-demo-page',
  templateUrl: './input-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputComponent, UiComponentDemoLayoutComponent],
})
export class InputDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly inputValue = signal('');
}
