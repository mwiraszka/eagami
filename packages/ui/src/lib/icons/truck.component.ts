import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-truck',
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
        x="1"
        y="3"
        width="15"
        height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle
        cx="5.5"
        cy="18.5"
        r="2.5" />
      <circle
        cx="18.5"
        cy="18.5"
        r="2.5" />
    </svg>
  `,
})
export class TruckIconComponent extends IconComponentBase {
  static readonly slug = 'truck';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'truck',
    'delivery',
    'shipping',
    'vehicle',
    'transport',
    'camion',
    'livraison',
    'camión',
    'envío',
    'φορτηγό',
    'παράδοση',
    'ciężarówka',
    'dostawa',
  ];
}
