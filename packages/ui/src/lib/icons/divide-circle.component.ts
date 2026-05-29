import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-divide-circle',
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
        x1="8"
        y1="12"
        x2="16"
        y2="12" />
      <line
        x1="12"
        y1="16"
        x2="12"
        y2="16" />
      <line
        x1="12"
        y1="8"
        x2="12"
        y2="8" />
      <circle
        cx="12"
        cy="12"
        r="10" />
    </svg>
  `,
})
export class DivideCircleIconComponent extends IconComponentBase {
  static readonly slug = 'divide-circle';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'divide-circle',
    'divide',
    'circle',
    'division',
    'math',
    'split',
    'diviser',
    'dividir',
    'matemáticas',
    'διαίρεση',
    'μαθηματικά',
    'dzielenie',
    'matematyka',
  ];
}
