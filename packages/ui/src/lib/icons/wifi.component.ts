import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-wifi',
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
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line
        x1="12"
        y1="20"
        x2="12.01"
        y2="20" />
    </svg>
  `,
})
export class WifiIconComponent extends IconComponentBase {
  static readonly slug = 'wifi';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'wifi',
    'wireless',
    'internet',
    'signal',
    'network',
    'sans-fil',
    'inalámbrico',
    'señal',
    'ασύρματο',
    'σήμα',
    'bezprzewodowy',
    'sygnał',
  ];
}
