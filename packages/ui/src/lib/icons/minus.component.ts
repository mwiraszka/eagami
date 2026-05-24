import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-minus',
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
        x1="5"
        y1="12"
        x2="19"
        y2="12" />
    </svg>
  `,
})
export class MinusIconComponent extends IconComponentBase {
  static readonly slug = 'minus';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'minus',
    'subtract',
    'remove',
    'less',
    'negative',
    'moins',
    'menos',
    'restar',
    'μείον',
    'αφαίρεση',
    'minus',
    'odejmij',
  ];
}
