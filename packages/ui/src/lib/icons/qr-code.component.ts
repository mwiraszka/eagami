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
        width="5"
        height="5"
        x="3"
        y="3"
        rx="1" />
      <rect
        width="5"
        height="5"
        x="16"
        y="3"
        rx="1" />
      <rect
        width="5"
        height="5"
        x="3"
        y="16"
        rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
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
