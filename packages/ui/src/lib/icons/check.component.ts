import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-check',
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  `,
})
export class CheckIconComponent extends IconComponentBase {
  static readonly slug = 'check';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'check',
    'tick',
    'confirm',
    'done',
    'ok',
    'yes',
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
