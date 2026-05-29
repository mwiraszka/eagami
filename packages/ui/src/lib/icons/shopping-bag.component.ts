import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-shopping-bag',
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
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line
        x1="3"
        y1="6"
        x2="21"
        y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  `,
})
export class ShoppingBagIconComponent extends IconComponentBase {
  static readonly slug = 'shopping-bag';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'shopping-bag',
    'shopping',
    'bag',
    'store',
    'purchase',
    'buy',
    'sac',
    'achats',
    'bolsa',
    'compras',
    'τσάντα',
    'αγορές',
    'torba',
    'zakupy',
  ];
}
