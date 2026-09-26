import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-clipboard-paste',
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
      <path d="M11 14h10" />
      <path d="M16 4h2a2 2 0 0 1 2 2v1.344" />
      <path d="m17 18 4-4-4-4" />
      <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113" />
      <rect
        x="8"
        y="2"
        width="8"
        height="4"
        rx="1" />
    </svg>
  `,
})
export class ClipboardPasteIconComponent extends IconComponentBase {
  static readonly slug = 'clipboard-paste';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'clipboard-paste',
    'clipboard',
    'paste',
    'insert',
    'presse-papiers',
    'coller',
    'portapapeles',
    'pegar',
    'πρόχειρο',
    'επικόλληση',
    'schowek',
    'wklej',
  ];
}
