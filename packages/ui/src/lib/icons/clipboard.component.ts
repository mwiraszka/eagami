import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-clipboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path
        d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect
        x="8"
        y="2"
        width="8"
        height="4"
        rx="1"
        ry="1" />
    </svg>
  `,
})
export class ClipboardIconComponent extends IconComponentBase {
  static readonly slug = 'clipboard';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'clipboard',
    'copy',
    'paste',
    'notes',
    'list',
    'presse-papiers',
    'portapapeles',
    'πρόχειρο',
    'schowek',
    'notatki',
  ];
}
