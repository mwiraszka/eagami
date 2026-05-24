import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-droplet',
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
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  `,
})
export class DropletIconComponent extends IconComponentBase {
  static readonly slug = 'droplet';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'droplet',
    'water',
    'drop',
    'liquid',
    'rain',
    'goutte',
    'eau',
    'gota',
    'agua',
    'σταγόνα',
    'νερό',
    'kropla',
    'woda',
  ];
}
