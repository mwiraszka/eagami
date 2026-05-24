import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-more-horizontal',
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
      <circle
        cx="12"
        cy="12"
        r="1" />
      <circle
        cx="19"
        cy="12"
        r="1" />
      <circle
        cx="5"
        cy="12"
        r="1" />
    </svg>
  `,
})
export class MoreHorizontalIconComponent extends IconComponentBase {
  static readonly slug = 'more-horizontal';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'more-horizontal',
    'more',
    'horizontal',
    'ellipsis',
    'menu',
    'dots',
    'options',
    'plus',
    'más',
    'περισσότερα',
    'więcej',
  ];
}
