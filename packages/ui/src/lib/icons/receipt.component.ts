import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-receipt',
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
      <path d="M5 3h14v18l-2.33-2-2.33 2L12 19l-2.33 2-2.34-2L5 21z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
    </svg>
  `,
})
export class ReceiptIconComponent extends IconComponentBase {
  static readonly slug = 'receipt';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'receipt',
    'invoice',
    'bill',
    'payment',
    'reçu',
    'recibo',
    'απόδειξη',
    'paragon',
  ];
}
