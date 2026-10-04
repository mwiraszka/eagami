import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-euro',
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
      <path d="M17.6 6.34A6.5 8 0 1 0 17.6 17.66" />
      <path d="M4 10h10" />
      <path d="M4 14h10" />
    </svg>
  `,
})
export class EuroIconComponent extends IconComponentBase {
  static readonly slug = 'euro';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'euro',
    'currency',
    'money',
    'price',
    'payment',
    'devise',
    'argent',
    'moneda',
    'dinero',
    'ευρώ',
    'νόμισμα',
    'waluta',
    'pieniądze',
  ];
}
