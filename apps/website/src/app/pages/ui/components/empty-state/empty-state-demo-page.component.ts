import {
  ButtonComponent,
  EmptyStateComponent,
  FileIconComponent,
  SearchIconComponent,
  ToastService,
} from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-empty-state-demo-page',
  templateUrl: './empty-state-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    EmptyStateComponent,
    FileIconComponent,
    SearchIconComponent,
    UiComponentDemoLayoutComponent,
  ],
})
export class EmptyStateDemoPageComponent {
  private readonly toast = inject(ToastService);
  protected readonly messages = inject(WebI18nService).messages;

  protected onAction(label: string): void {
    this.toast.success(
      this.messages().ui.component.demos.commandPalette.executedToast(label),
    );
  }
}
