import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-store',
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
      <path d="m2 9 3.5-6h13L22 9" />
      <path
        d="M2 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />
      <path d="M4.5 12.5V21h15v-8.5" />
      <path d="M10 21v-5h4v5" />
    </svg>
  `,
})
export class StoreIconComponent extends IconComponentBase {
  static readonly slug = 'store';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'store',
    'shop',
    'retail',
    'storefront',
    'marketplace',
    'business',
    'magasin',
    'boutique',
    'tienda',
    'comercio',
    'κατάστημα',
    'μαγαζί',
    'sklep',
    'handel',
  ];
}
