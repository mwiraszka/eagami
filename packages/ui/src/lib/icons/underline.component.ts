import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-underline',
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
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
      <line
        x1="4"
        y1="21"
        x2="20"
        y2="21" />
    </svg>
  `,
})
export class UnderlineIconComponent extends IconComponentBase {
  static readonly slug = 'underline';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'underline',
    'text',
    'format',
    'style',
    'souligné',
    'subrayado',
    'υπογράμμιση',
    'podkreślenie',
  ];
}
