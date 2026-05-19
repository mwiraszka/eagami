import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-hard-drive',
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
      <line
        x1="22"
        y1="12"
        x2="2"
        y2="12" />
      <path
        d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <line
        x1="6"
        y1="16"
        x2="6.01"
        y2="16" />
      <line
        x1="10"
        y1="16"
        x2="10.01"
        y2="16" />
    </svg>
  `,
})
export class HardDriveIconComponent extends IconComponentBase {
  static readonly slug = 'hard-drive';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'hard-drive',
    'hard',
    'drive',
    'storage',
    'disk',
    'memory',
    'disque dur',
    'almacenamiento',
    'disco duro',
    'σκληρός δίσκος',
    'αποθήκευση',
    'dysk twardy',
    'pamięć',
  ];
}
