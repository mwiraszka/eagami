import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-credit-card',
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
      <rect
        x="1"
        y="4"
        width="22"
        height="16"
        rx="2"
        ry="2" />
      <line
        x1="1"
        y1="10"
        x2="23"
        y2="10" />
    </svg>
  `,
})
export class CreditCardIconComponent extends IconComponentBase {
  static readonly slug = 'credit-card';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'credit-card',
    'credit',
    'card',
    'payment',
    'money',
    'bank',
    'carte',
    'paiement',
    'tarjeta',
    'pago',
    'κάρτα',
    'πληρωμή',
    'karta',
    'płatność',
  ];
}
