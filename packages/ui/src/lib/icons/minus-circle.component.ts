import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-minus-circle',
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
      <line
        x1="8"
        y1="12"
        x2="16"
        y2="12" />
    </svg>
  `,
})
export class MinusCircleIconComponent extends IconComponentBase {
  static readonly slug = 'minus-circle';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'minus-circle',
    'minus',
    'circle',
    'remove',
    'subtract',
    'delete',
    'moins',
    'menos',
    'eliminar',
    'μείον',
    'αφαίρεση',
    'minus',
    'usuń',
  ];
}
