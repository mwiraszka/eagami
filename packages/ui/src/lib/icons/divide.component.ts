import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-divide',
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
        cy="6"
        r="2" />
      <line
        x1="5"
        y1="12"
        x2="19"
        y2="12" />
      <circle
        cx="12"
        cy="18"
        r="2" />
    </svg>
  `,
})
export class DivideIconComponent extends IconComponentBase {
  static readonly slug = 'divide';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'divide',
    'division',
    'math',
    'split',
    'diviser',
    'mathématiques',
    'dividir',
    'matemáticas',
    'διαίρεση',
    'μαθηματικά',
    'dzielenie',
    'matematyka',
  ];
}
