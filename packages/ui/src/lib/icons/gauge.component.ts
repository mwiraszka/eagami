import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-gauge',
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
      <path d="M4.21 18a9 9 0 1 1 15.58 0" />
      <path d="m12 13.5 3.5-4.5" />
    </svg>
  `,
})
export class GaugeIconComponent extends IconComponentBase {
  static readonly slug = 'gauge';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'gauge',
    'speedometer',
    'dashboard',
    'meter',
    'performance',
    'jauge',
    'medidor',
    'μετρητής',
    'wskaźnik',
  ];
}
