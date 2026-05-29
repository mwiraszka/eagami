import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-tag',
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
      <path
        d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line
        x1="7"
        y1="7"
        x2="7.01"
        y2="7" />
    </svg>
  `,
})
export class TagIconComponent extends IconComponentBase {
  static readonly slug = 'tag';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'tag',
    'label',
    'price',
    'category',
    'sticker',
    'étiquette',
    'etiqueta',
    'ετικέτα',
    'κατηγορία',
    'etykieta',
    'metka',
  ];
}
