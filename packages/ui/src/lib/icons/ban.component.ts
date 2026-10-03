import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-ban',
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
        cx="12"
        cy="12"
        r="10" />
      <path d="m4.93 4.93 14.14 14.14" />
    </svg>
  `,
})
export class BanIconComponent extends IconComponentBase {
  static readonly slug = 'ban';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'ban',
    'block',
    'forbidden',
    'prohibited',
    'disabled',
    'cancel',
    'interdit',
    'bloquer',
    'prohibido',
    'bloquear',
    'απαγόρευση',
    'αποκλεισμός',
    'zakaz',
    'zablokuj',
  ];
}
