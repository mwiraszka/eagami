import { TextareaComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-textarea-demo-page',
  templateUrl: './textarea-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextareaComponent, UiComponentDemoLayoutComponent],
})
export class TextareaDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly textareaValue = signal('');
}
