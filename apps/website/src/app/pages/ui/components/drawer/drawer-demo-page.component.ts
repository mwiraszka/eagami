import { ButtonComponent, DrawerComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-drawer-demo-page',
  templateUrl: './drawer-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, DrawerComponent, UiComponentDemoLayoutComponent],
})
export class DrawerDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly drawerOpenRight = signal(false);
  protected readonly drawerOpenLeft = signal(false);
  protected readonly drawerOpenTop = signal(false);
  protected readonly drawerOpenBottom = signal(false);
}
