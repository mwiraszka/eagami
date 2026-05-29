import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-battery',
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
        y="6"
        width="18"
        height="12"
        rx="2"
        ry="2" />
      <line
        x1="23"
        y1="13"
        x2="23"
        y2="11" />
    </svg>
  `,
})
export class BatteryIconComponent extends IconComponentBase {
  static readonly slug = 'battery';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'battery',
    'power',
    'energy',
    'charge',
    'batterie',
    'batería',
    'energía',
    'μπαταρία',
    'ενέργεια',
    'bateria',
    'energia',
  ];
}
