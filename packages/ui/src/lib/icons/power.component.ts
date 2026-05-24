import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-power',
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
      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
      <line
        x1="12"
        y1="2"
        x2="12"
        y2="12" />
    </svg>
  `,
})
export class PowerIconComponent extends IconComponentBase {
  static readonly slug = 'power';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'power',
    'on',
    'off',
    'shutdown',
    'energy',
    'switch',
    'alimentation',
    'encender',
    'apagar',
    'τροφοδοσία',
    'ενέργεια',
    'zasilanie',
    'włącz',
  ];
}
