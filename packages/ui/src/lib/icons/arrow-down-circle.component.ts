import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-arrow-down-circle',
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
      <polyline points="8 12 12 16 16 12" />
      <line
        x1="12"
        y1="8"
        x2="12"
        y2="16" />
    </svg>
  `,
})
export class ArrowDownCircleIconComponent extends IconComponentBase {
  static readonly slug = 'arrow-down-circle';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'arrow-down-circle',
    'arrow',
    'down',
    'circle',
    'south',
    'descend',
    'flèche',
    'bas',
    'flecha',
    'abajo',
    'βέλος',
    'κάτω',
    'strzałka',
    'dół',
  ];
}
