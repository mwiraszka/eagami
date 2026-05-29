import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-arrow-up',
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
      <line
        x1="12"
        y1="19"
        x2="12"
        y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  `,
})
export class ArrowUpIconComponent extends IconComponentBase {
  static readonly slug = 'arrow-up';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'arrow-up',
    'arrow',
    'up',
    'north',
    'ascend',
    'flèche',
    'haut',
    'flecha',
    'arriba',
    'βέλος',
    'πάνω',
    'strzałka',
    'góra',
  ];
}
