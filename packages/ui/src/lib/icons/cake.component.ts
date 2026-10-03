import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-cake',
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
        x="4"
        y="10"
        width="16"
        height="11"
        rx="2" />
      <path d="M4 14.5c2 0 2 1.5 4 1.5s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
      <path d="M12 10V8.5" />
      <path d="M12 2c.9 1.1 1.3 1.7 1.3 2.3a1.3 1.3 0 0 1-2.6 0c0-.6.4-1.2 1.3-2.3z" />
    </svg>
  `,
})
export class CakeIconComponent extends IconComponentBase {
  static readonly slug = 'cake';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'cake',
    'birthday',
    'dessert',
    'celebration',
    'party',
    'anniversary',
    'gâteau',
    'anniversaire',
    'pastel',
    'cumpleaños',
    'τούρτα',
    'γενέθλια',
    'tort',
    'urodziny',
  ];
}
