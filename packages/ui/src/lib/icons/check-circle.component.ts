import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-check-circle',
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  `,
})
export class CheckCircleIconComponent extends IconComponentBase {
  static readonly slug = 'check-circle';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'check-circle',
    'check',
    'circle',
    'tick',
    'confirm',
    'done',
    'success',
    'validé',
    'coche',
    'confirmar',
    'éxito',
    'επιτυχία',
    'επιβεβαίωση',
    'sukces',
    'potwierdzono',
  ];
}
