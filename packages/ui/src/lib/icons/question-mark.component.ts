import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-question-mark',
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
      <path d="M8.5 8.5a3.5 3.5 0 1 1 5.2 3.1c-1.3.8-1.7 1.6-1.7 3.4" />
      <path d="M12 19.5h.01" />
    </svg>
  `,
})
export class QuestionMarkIconComponent extends IconComponentBase {
  static readonly slug = 'question-mark';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'question mark',
    'question',
    'query',
    'unknown',
    'mistake',
    'chess',
    'point d’interrogation',
    'signo de interrogación',
    'ερωτηματικό',
  ];
}
