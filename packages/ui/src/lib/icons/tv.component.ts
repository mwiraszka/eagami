import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-tv',
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
      <rect
        x="2"
        y="7"
        width="20"
        height="15"
        rx="2"
        ry="2" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  `,
})
export class TvIconComponent extends IconComponentBase {
  static readonly slug = 'tv';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'tv',
    'television',
    'screen',
    'display',
    'monitor',
    'télévision',
    'televisión',
    'τηλεόραση',
    'οθόνη',
    'telewizor',
    'telewizja',
  ];
}
