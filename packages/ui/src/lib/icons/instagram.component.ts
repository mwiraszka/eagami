import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-instagram',
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
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line
        x1="17.5"
        y1="6.5"
        x2="17.51"
        y2="6.5" />
    </svg>
  `,
})
export class InstagramIconComponent extends IconComponentBase {
  static readonly slug = 'instagram';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'instagram',
    'social',
    'network',
    'meta',
    'photo',
    'camera',
    'story',
    'reels',
  ];
}
