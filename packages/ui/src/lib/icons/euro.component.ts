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
      <path d="M4 10h12" />
      <path d="M4 14h9" />
      <path
        d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
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
