import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-tags',
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
        d="M17.8 11.7l-6.1 6.1a1.7 1.7 0 0 1-2.4 0L2 10.5V2h8.5l7.3 7.3a1.7 1.7 0 0 1 0 2.4z" />
      <path d="M6.5 6.5h.01" />
      <path d="M14.5 2l7.3 7.3a1.7 1.7 0 0 1 0 2.4L14 19.5" />
    </svg>
  `,
})
export class TagsIconComponent extends IconComponentBase {
  static readonly slug = 'tags';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'tags',
    'labels',
    'categories',
    'keywords',
    'tagging',
    'price',
    'étiquettes',
    'catégories',
    'etiquetas',
    'categorías',
    'ετικέτες',
    'κατηγορίες',
    'etykiety',
    'kategorie',
  ];
}
