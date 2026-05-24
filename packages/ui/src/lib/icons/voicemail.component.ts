import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-voicemail',
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
      <circle
        cx="5.5"
        cy="11.5"
        r="4.5" />
      <circle
        cx="18.5"
        cy="11.5"
        r="4.5" />
      <line
        x1="5.5"
        y1="16"
        x2="18.5"
        y2="16" />
    </svg>
  `,
})
export class VoicemailIconComponent extends IconComponentBase {
  static readonly slug = 'voicemail';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'voicemail',
    'message',
    'voice',
    'phone',
    'recording',
    'messagerie',
    'buzón',
    'voz',
    'τηλεφωνητής',
    'φωνή',
    'poczta',
    'głosowa',
    'music',
    'audio',
  ];
}
