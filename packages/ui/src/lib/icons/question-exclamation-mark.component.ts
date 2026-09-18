import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-question-exclamation-mark',
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
      <path d="M4.5 8.5a2.5 2.5 0 1 1 3.7 2.2c-.9.6-1.2 1.2-1.2 2.5" />
      <path d="M7 17.5h.01" />
      <path d="M17 6v7.5" />
      <path d="M17 17.5h.01" />
    </svg>
  `,
})
export class QuestionExclamationMarkIconComponent extends IconComponentBase {
  static readonly slug = 'question-exclamation-mark';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'question exclamation mark',
    'interrobang',
    'dubious',
    'surprise',
    'chess',
    'point d’interrogation et d’exclamation',
    'signos de interrogación y exclamación',
    'ερωτηματικό και θαυμαστικό',
  ];
}
