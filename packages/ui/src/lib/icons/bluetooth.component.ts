import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-bluetooth',
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
      <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
    </svg>
  `,
})
export class BluetoothIconComponent extends IconComponentBase {
  static readonly slug = 'bluetooth';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'bluetooth',
    'wireless',
    'connection',
    'connect',
    'sans-fil',
    'inalámbrico',
    'ασύρματο',
    'σύνδεση',
    'bezprzewodowy',
  ];
}
