import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-hash',
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
        x1="4"
        y1="9"
        x2="20"
        y2="9" />
      <line
        x1="4"
        y1="15"
        x2="20"
        y2="15" />
      <line
        x1="10"
        y1="3"
        x2="8"
        y2="21" />
      <line
        x1="16"
        y1="3"
        x2="14"
        y2="21" />
    </svg>
  `,
})
export class HashIconComponent extends IconComponentBase {
  static readonly slug = 'hash';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'hash',
    'hashtag',
    'pound',
    'number',
    'tag',
    'dièse',
    'numeral',
    'almohadilla',
    'δίεση',
    'κατακερματισμός',
    'krzyżyk',
    'hasztag',
  ];
}
