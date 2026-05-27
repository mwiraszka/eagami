import { HeartIconComponent, RatingComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-rating-demo-page',
  templateUrl: './rating-demo-page.component.html',
  styleUrl: './rating-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RatingComponent, UiComponentDemoLayoutComponent],
})
export class RatingDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  protected readonly ratingValue = signal(3);
  /** Exposed for the rating's `[iconClass]` custom-icon demo binding. */
  protected readonly HeartIconComponent = HeartIconComponent;
}
