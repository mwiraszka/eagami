import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-printer',
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
      <polyline points="6 9 6 2 18 2 18 9" />
      <path
        d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect
        x="6"
        y="14"
        width="12"
        height="8" />
    </svg>
  `,
})
export class PrinterIconComponent extends IconComponentBase {
  static readonly slug = 'printer';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'printer',
    'print',
    'document',
    'paper',
    'office',
    'imprimante',
    'imprimir',
    'impresora',
    'εκτυπωτής',
    'εκτύπωση',
    'drukarka',
    'drukuj',
  ];
}
