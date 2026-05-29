import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-server',
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
        x="2"
        y="2"
        width="20"
        height="8"
        rx="2"
        ry="2" />
      <rect
        x="2"
        y="14"
        width="20"
        height="8"
        rx="2"
        ry="2" />
      <line
        x1="6"
        y1="6"
        x2="6.01"
        y2="6" />
      <line
        x1="6"
        y1="18"
        x2="6.01"
        y2="18" />
    </svg>
  `,
})
export class ServerIconComponent extends IconComponentBase {
  static readonly slug = 'server';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'server',
    'database',
    'host',
    'hardware',
    'cloud',
    'serveur',
    'servidor',
    'διακομιστής',
    'εξυπηρετητής',
    'serwer',
    'host',
  ];
}
