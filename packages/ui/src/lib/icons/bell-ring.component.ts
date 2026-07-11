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
      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
      <path d="M22 8c0-2.3-.8-4.3-2-6" />
      <path
        d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
      <path d="M4 2C2.8 3.7 2 5.7 2 8" />
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
