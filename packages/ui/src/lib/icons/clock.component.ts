import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-clock',
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
      <circle
        cx="12"
        cy="12"
        r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  `,
})
export class ClockIconComponent extends IconComponentBase {
  static readonly slug = 'clock';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'clock',
    'time',
    'watch',
    'hour',
    'horloge',
    'temps',
    'reloj',
    'tiempo',
    'ρολόι',
    'ώρα',
    'zegar',
    'czas',
  ];
}
