import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-x-octagon',
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
      <polygon
        points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line
        x1="15"
        y1="9"
        x2="9"
        y2="15" />
      <line
        x1="9"
        y1="9"
        x2="15"
        y2="15" />
    </svg>
  `,
})
export class XOctagonIconComponent extends IconComponentBase {
  static readonly slug = 'x-octagon';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'x-octagon',
    'x',
    'octagon',
    'close',
    'stop',
    'cancel',
    'error',
    'fermer',
    'detener',
    'κλείσιμο',
    'στοπ',
    'zatrzymaj',
    'błąd',
  ];
}
