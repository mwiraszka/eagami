import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-minus-square',
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
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        ry="2" />
      <line
        x1="8"
        y1="12"
        x2="16"
        y2="12" />
    </svg>
  `,
})
export class MinusSquareIconComponent extends IconComponentBase {
  static readonly slug = 'minus-square';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'minus-square',
    'minus',
    'square',
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
