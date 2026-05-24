import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-shuffle',
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
      <polyline points="16 3 21 3 21 8" />
      <line
        x1="4"
        y1="20"
        x2="21"
        y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line
        x1="15"
        y1="15"
        x2="21"
        y2="21" />
      <line
        x1="4"
        y1="4"
        x2="9"
        y2="9" />
    </svg>
  `,
})
export class ShuffleIconComponent extends IconComponentBase {
  static readonly slug = 'shuffle';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'shuffle',
    'random',
    'mix',
    'media',
    'aléatoire',
    'aleatorio',
    'mezclar',
    'τυχαία',
    'ανακάτεμα',
    'losowo',
    'tasuj',
    'music',
    'audio',
  ];
}
