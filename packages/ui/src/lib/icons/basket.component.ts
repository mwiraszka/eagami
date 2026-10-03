import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-basket',
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
      <path d="M3 10h18l-2 10H5z" />
      <path d="M7.5 10a4.5 4.5 0 0 1 9 0" />
      <path d="M8.5 13.5v3" />
      <path d="M12 13.5v3" />
      <path d="M15.5 13.5v3" />
    </svg>
  `,
})
export class BasketIconComponent extends IconComponentBase {
  static readonly slug = 'basket';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'basket',
    'shopping',
    'cart',
    'groceries',
    'store',
    'checkout',
    'panier',
    'courses',
    'cesta',
    'compra',
    'καλάθι',
    'αγορές',
    'koszyk',
    'zakupy',
  ];
}
