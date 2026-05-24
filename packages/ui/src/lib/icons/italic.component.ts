import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-italic',
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
        x1="19"
        y1="4"
        x2="10"
        y2="4" />
      <line
        x1="14"
        y1="20"
        x2="5"
        y2="20" />
      <line
        x1="15"
        y1="4"
        x2="9"
        y2="20" />
    </svg>
  `,
})
export class ItalicIconComponent extends IconComponentBase {
  static readonly slug = 'italic';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'italic',
    'text',
    'format',
    'slant',
    'style',
    'italique',
    'cursiva',
    'πλάγια',
    'kursywa',
  ];
}
