import { CodeInputComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-code-input-demo-page',
  templateUrl: './code-input-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeInputComponent, UiComponentDemoLayoutComponent],
})
export class CodeInputDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly codeInputValue = signal('');
}
