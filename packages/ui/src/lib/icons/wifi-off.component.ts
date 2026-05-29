import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-wifi-off',
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
        x1="1"
        y1="1"
        x2="23"
        y2="23" />
      <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
      <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
      <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line
        x1="12"
        y1="20"
        x2="12.01"
        y2="20" />
    </svg>
  `,
})
export class WifiOffIconComponent extends IconComponentBase {
  static readonly slug = 'wifi-off';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'wifi-off',
    'wifi',
    'off',
    'wireless',
    'disabled',
    'offline',
    'sans-fil',
    'inalámbrico',
    'ασύρματο',
    'εκτός',
    'bezprzewodowy',
    'wyłączone',
  ];
}
