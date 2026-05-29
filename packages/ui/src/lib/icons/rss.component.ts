import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-rss',
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
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle
        cx="5"
        cy="19"
        r="1" />
    </svg>
  `,
})
export class RssIconComponent extends IconComponentBase {
  static readonly slug = 'rss';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'rss',
    'feed',
    'subscribe',
    'news',
    'syndication',
    'flux',
    'noticias',
    'τροφοδοσία',
    'kanał',
    'subskrybuj',
  ];
}
