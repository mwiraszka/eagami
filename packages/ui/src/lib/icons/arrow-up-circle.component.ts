import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-arrow-up-circle',
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
      <circle
        cx="12"
        cy="12"
        r="10" />
      <polyline points="16 12 12 8 8 12" />
      <line
        x1="12"
        y1="16"
        x2="12"
        y2="8" />
    </svg>
  `,
})
export class ArrowUpCircleIconComponent extends IconComponentBase {
  static readonly slug = 'arrow-up-circle';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'arrow-up-circle',
    'arrow',
    'up',
    'circle',
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
