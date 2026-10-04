import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-coins',
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
      <circle
        cx="9"
        cy="14.5"
        r="6" />
      <path d="M8.69 8.51a6 6 0 1 1 6.12 7.48" />
      <path d="M8.5 12.5h1v4" />
      <path d="M14 8h1v4" />
    </svg>
  `,
})
export class CoinsIconComponent extends IconComponentBase {
  static readonly slug = 'coins';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'coins',
    'money',
    'currency',
    'cash',
    'finance',
    'pièces',
    'monedas',
    'νομίσματα',
    'monety',
  ];
}
