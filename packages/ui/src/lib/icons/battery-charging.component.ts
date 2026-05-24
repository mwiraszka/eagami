import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-battery-charging',
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
      <path
        d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19" />
      <line
        x1="23"
        y1="13"
        x2="23"
        y2="11" />
      <polyline points="11 6 7 12 13 12 9 18" />
    </svg>
  `,
})
export class BatteryChargingIconComponent extends IconComponentBase {
  static readonly slug = 'battery-charging';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'battery-charging',
    'battery',
    'charging',
    'power',
    'energy',
    'charge',
    'batterie',
    'charge',
    'batería',
    'cargando',
    'μπαταρία',
    'φόρτιση',
    'bateria',
    'ładowanie',
  ];
}
