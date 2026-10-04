import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-crown',
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
      <path d="m3 8 4.5 5L12 5l4.5 8L21 8l-2 10H5z" />
      <path d="M5 21.5h14" />
    </svg>
  `,
})
export class CrownIconComponent extends IconComponentBase {
  static readonly slug = 'crown';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'crown',
    'king',
    'premium',
    'royal',
    'vip',
    'couronne',
    'corona',
    'στέμμα',
    'korona',
  ];
}
