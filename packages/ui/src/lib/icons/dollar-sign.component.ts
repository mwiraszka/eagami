import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-dollar-sign',
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
      <line
        x1="12"
        y1="1"
        x2="12"
        y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  `,
})
export class DollarSignIconComponent extends IconComponentBase {
  static readonly slug = 'dollar-sign';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'dollar-sign',
    'dollar',
    'sign',
    'money',
    'currency',
    'usd',
    'price',
    'argent',
    'devise',
    'dinero',
    'moneda',
    'δολάριο',
    'χρήμα',
    'dolar',
    'pieniądze',
  ];
}
