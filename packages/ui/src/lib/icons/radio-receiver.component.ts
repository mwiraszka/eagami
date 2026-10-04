import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-radio-receiver',
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
      <rect
        x="2"
        y="9"
        width="20"
        height="11"
        rx="2" />
      <path d="M6 9 16 3" />
      <circle
        cx="15.5"
        cy="14.5"
        r="2.5" />
      <path d="M6 13h4" />
      <path d="M6 16h4" />
    </svg>
  `,
})
export class RadioReceiverIconComponent extends IconComponentBase {
  static readonly slug = 'radio-receiver';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'radio-receiver',
    'radio',
    'receiver',
    'tuner',
    'stereo',
    'récepteur',
    'receptor',
    'δέκτης',
    'odbiornik',
    'audio',
  ];
}
