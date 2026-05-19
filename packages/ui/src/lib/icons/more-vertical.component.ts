import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-more-vertical',
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
      <circle
        cx="12"
        cy="12"
        r="1" />
      <circle
        cx="12"
        cy="5"
        r="1" />
      <circle
        cx="12"
        cy="19"
        r="1" />
    </svg>
  `,
})
export class MoreVerticalIconComponent extends IconComponentBase {
  static readonly slug = 'more-vertical';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'more-vertical',
    'more',
    'vertical',
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
