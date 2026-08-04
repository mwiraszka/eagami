import { ToastService } from '@eagami/ui';

import { Injectable, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

/**
 * Copies text to the clipboard and reports the outcome with the shared
 * success/error toasts; callers may override either message.
 */
@Injectable({ providedIn: 'root' })
export class ClipboardService {
  private readonly toastService = inject(ToastService);
  private readonly i18n = inject(WebI18nService);

  copy(text: string, messages: { success?: string; error?: string } = {}): void {
    const m = this.i18n.messages().common.codeSnippet;
    void navigator.clipboard
      .writeText(text)
      .then(() => this.toastService.success(messages.success ?? m.copySuccess))
      .catch(() => this.toastService.error(messages.error ?? m.copyError));
  }
}
