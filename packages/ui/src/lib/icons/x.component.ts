import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-x',
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
      <line
        x1="18"
        y1="6"
        x2="6"
        y2="18" />
      <line
        x1="6"
        y1="6"
        x2="18"
        y2="18" />
    </svg>
  `,
})
export class XIconComponent extends IconComponentBase {
  static readonly slug = 'x';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'x',
    'close',
    'cancel',
    'cross',
    'remove',
    'exit',
    'fermer',
    'cerrar',
    'κλείσιμο',
    'άκυρο',
    'zamknij',
    'anuluj',
  ];
}
