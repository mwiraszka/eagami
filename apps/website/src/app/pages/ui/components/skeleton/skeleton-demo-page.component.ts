import { SkeletonComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-skeleton-demo-page',
  templateUrl: './skeleton-demo-page.component.html',
  styleUrl: './skeleton-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SkeletonComponent, UiComponentDemoLayoutComponent],
})
export class SkeletonDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;
}
