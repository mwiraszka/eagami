import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-trending-up',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  `,
})
export class TrendingUpIconComponent extends IconComponentBase {
  static readonly slug = 'trending-up';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'trending-up',
    'trending',
    'up',
    'increase',
    'graph',
    'arrow',
    'statistics',
    'tendance',
    'hausse',
    'tendencia',
    'subida',
    'τάση',
    'πάνω',
    'trend',
    'wzrost',
  ];
}
