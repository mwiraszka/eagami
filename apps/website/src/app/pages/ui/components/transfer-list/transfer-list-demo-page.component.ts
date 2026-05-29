import { TransferListComponent, type TransferListItem } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-transfer-list-demo-page',
  templateUrl: './transfer-list-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TransferListComponent, UiComponentDemoLayoutComponent],
})
export class TransferListDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly roles = computed<TransferListItem[]>(() => {
    const m = this.messages().ui.component.demos.transferList;
    return [
      { id: 'admin', label: m.roleAdmin },
      { id: 'editor', label: m.roleEditor },
      { id: 'viewer', label: m.roleViewer },
      { id: 'guest', label: m.roleGuest },
      { id: 'billing', label: m.roleBilling },
      { id: 'owner', label: m.roleOwner, disabled: true },
    ];
  });
}
