import {
  ButtonComponent,
  Edit2IconComponent,
  MenuComponent,
  MenuItemComponent,
  MenuTriggerDirective,
  MoreHorizontalIconComponent,
  TrashIconComponent,
} from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-menu-demo-page',
  templateUrl: './menu-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    Edit2IconComponent,
    MenuComponent,
    MenuItemComponent,
    MenuTriggerDirective,
    MoreHorizontalIconComponent,
    TrashIconComponent,
    UiComponentDemoLayoutComponent,
  ],
})
export class MenuDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
}
