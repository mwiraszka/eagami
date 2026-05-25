import { PaginatorComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-paginator-demo-page',
  templateUrl: './paginator-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PaginatorComponent, UiComponentDemoLayoutComponent],
})
export class PaginatorDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
}
