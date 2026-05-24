import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-check-square',
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
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  `,
})
export class CheckSquareIconComponent extends IconComponentBase {
  static readonly slug = 'check-square';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'check-square',
    'check',
    'square',
    'tick',
    'confirm',
    'done',
    'checkbox',
    'coche',
    'valider',
    'marca',
    'confirmar',
    'τσεκ',
    'επιβεβαίωση',
    'zaznacz',
    'potwierdź',
  ];
}
