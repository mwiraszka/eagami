import {
  AvatarComponent,
  AvatarEditorComponent,
  AvatarEditorCropEvent,
  ToastService,
} from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-avatar-editor-demo-page',
  templateUrl: './avatar-editor-demo-page.component.html',
  styleUrl: './avatar-editor-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent, AvatarEditorComponent, UiComponentDemoLayoutComponent],
})
export class AvatarEditorDemoPageComponent {
  private readonly toastService = inject(ToastService);

  protected readonly messages = inject(WebI18nService).messages;

  protected readonly croppedAvatarUrl = signal('');

  protected onAvatarCropped(event: AvatarEditorCropEvent): void {
    this.croppedAvatarUrl.set(event.dataUrl);
    this.toastService.success(
      this.messages().ui.component.demos.avatarEditorActions.avatarUpdatedToast,
    );
  }
}
