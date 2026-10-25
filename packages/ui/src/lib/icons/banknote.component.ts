import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-banknote',
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
        x="2"
        y="6.5"
        width="20"
        height="11"
        rx="1.5" />
      <circle
        cx="12"
        cy="12"
        r="2.5" />
      <path d="M5.5 10.5v3" />
      <path d="M18.5 10.5v3" />
    </svg>
  `,
})
export class BanknoteIconComponent extends IconComponentBase {
  static readonly slug = 'banknote';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'banknote',
    'cash',
    'money',
    'bill',
    'currency',
    'payment',
    'billet',
    'argent',
    'billete',
    'dinero',
    'χαρτονόμισμα',
    'χρήματα',
    'banknot',
    'pieniądze',
  ];
}
