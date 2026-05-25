import { FileUploaderComponent, PaperclipIconComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-file-uploader-demo-page',
  templateUrl: './file-uploader-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FileUploaderComponent,
    PaperclipIconComponent,
    UiComponentDemoLayoutComponent,
  ],
})
export class FileUploaderDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly fileUploaderValue = signal<readonly File[]>([]);
}
