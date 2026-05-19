import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-x-square',
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
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        ry="2" />
      <line
        x1="9"
        y1="9"
        x2="15"
        y2="15" />
      <line
        x1="15"
        y1="9"
        x2="9"
        y2="15" />
    </svg>
  `,
})
export class XSquareIconComponent extends IconComponentBase {
  static readonly slug = 'x-square';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'x-square',
    'x',
    'square',
    'close',
    'cancel',
    'remove',
    'fermer',
    'cerrar',
    'cancelar',
    'κλείσιμο',
    'άκυρο',
    'zamknij',
    'anuluj',
  ];
}
