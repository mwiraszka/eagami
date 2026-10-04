import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-qr-code',
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
        x="3"
        y="3"
        width="5"
        height="5"
        rx="1" />
      <rect
        x="16"
        y="3"
        width="5"
        height="5"
        rx="1" />
      <rect
        x="3"
        y="16"
        width="5"
        height="5"
        rx="1" />
      <path d="M12 3h.01" />
      <path d="M12 7.5V12H7.5" />
      <path d="M3 12h.01" />
      <path d="M16.5 12H21" />
      <path d="M12 16.5V21" />
      <path d="M16.5 16.5h.01" />
      <path d="M21 16.5V21h-4.5" />
    </svg>
  `,
})
export class QrCodeIconComponent extends IconComponentBase {
  static readonly slug = 'qr-code';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'qr-code',
    'qr',
    'code',
    'scan',
    'barcode',
    'código',
    'κωδικός',
    'kod',
  ];
}
