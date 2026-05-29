import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-bottle',
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
      <path d="M10 2h4v4l2 3v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9l2-3z" />
      <line
        x1="9"
        y1="14"
        x2="15"
        y2="14" />
    </svg>
  `,
})
export class BottleIconComponent extends IconComponentBase {
  static readonly slug = 'bottle';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'bottle',
    'drink',
    'water',
    'beverage',
    'container',
    'bouteille',
    'botella',
    'agua',
    'μπουκάλι',
    'νερό',
    'butelka',
    'woda',
  ];
}
