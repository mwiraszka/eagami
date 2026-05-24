import { ButtonComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-button-demo-page',
  templateUrl: './button-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, UiComponentDemoLayoutComponent],
})
export class ButtonDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly isLoading = signal(false);

  protected triggerLoading(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 3000);
  }
}
