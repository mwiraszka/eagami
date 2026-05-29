import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-smartphone',
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
        x="5"
        y="2"
        width="14"
        height="20"
        rx="2"
        ry="2" />
      <line
        x1="12"
        y1="18"
        x2="12.01"
        y2="18" />
    </svg>
  `,
})
export class SmartphoneIconComponent extends IconComponentBase {
  static readonly slug = 'smartphone';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'smartphone',
    'phone',
    'mobile',
    'device',
    'cell',
    'téléphone',
    'móvil',
    'celular',
    'κινητό',
    'συσκευή',
    'smartfon',
    'komórka',
  ];
}
