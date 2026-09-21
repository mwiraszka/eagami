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
      <path d="M5 16v2" />
      <path d="M19 16v2" />
      <rect
        x="2"
        y="8"
        width="20"
        height="8"
        rx="2" />
      <path d="M18 12h.01" />
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
