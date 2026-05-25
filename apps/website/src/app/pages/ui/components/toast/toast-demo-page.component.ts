import { ButtonComponent, ToastService } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-toast-demo-page',
  templateUrl: './toast-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, UiComponentDemoLayoutComponent],
})
export class ToastDemoPageComponent {
  private readonly toastService = inject(ToastService);

  protected readonly messages = inject(WebI18nService).messages;

  protected showToast(
    variant: 'default' | 'success' | 'warning' | 'error' | 'info',
  ): void {
    this.toastService.show(this.messages().ui.component.demos.toast.message(variant), {
      variant,
    });
  }
}
