import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-bell-ring',
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
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      <path d="M4 3a10 10 0 0 0-2 4.5" />
      <path d="M20 3a10 10 0 0 1 2 4.5" />
    </svg>
  `,
})
export class BellRingIconComponent extends IconComponentBase {
  static readonly slug = 'bell-ring';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'bell-ring',
    'bell',
    'notification',
    'alert',
    'alarm',
    'cloche',
    'campana',
    'καμπάνα',
    'dzwonek',
  ];
}
