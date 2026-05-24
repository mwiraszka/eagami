import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-trending-down',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  `,
})
export class TrendingDownIconComponent extends IconComponentBase {
  static readonly slug = 'trending-down';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'trending-down',
    'trending',
    'down',
    'decrease',
    'graph',
    'arrow',
    'statistics',
    'tendance',
    'baisse',
    'tendencia',
    'bajada',
    'τάση',
    'κάτω',
    'trend',
    'spadek',
  ];
}
