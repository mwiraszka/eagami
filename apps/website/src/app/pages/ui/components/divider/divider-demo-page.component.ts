import { DividerComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-divider-demo-page',
  templateUrl: './divider-demo-page.component.html',
  styleUrl: './divider-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DividerComponent, UiComponentDemoLayoutComponent],
})
export class DividerDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
}
