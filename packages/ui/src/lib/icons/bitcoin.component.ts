import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-bitcoin',
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
      <path d="M8.24 4.36L14.3 5.87A3.25 3.25 0 0 1 12.73 12.18L8.6 11.15" />
      <path d="M8.6 11.15L13.7 12.42A3.25 3.25 0 0 1 12.13 18.73L5.09 16.98" />
      <path d="M10.66 2.91L6.55 19.4" />
      <path d="M14.06 3.75L13.57 5.69" />
      <path d="M10.43 18.31L9.94 20.25" />
    </svg>
  `,
})
export class BitcoinIconComponent extends IconComponentBase {
  static readonly slug = 'bitcoin';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'bitcoin',
    'crypto',
    'cryptocurrency',
    'btc',
    'currency',
    'κρυπτονόμισμα',
    'kryptowaluta',
  ];
}
