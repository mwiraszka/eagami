import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-mic',
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
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line
        x1="12"
        y1="19"
        x2="12"
        y2="23" />
      <line
        x1="8"
        y1="23"
        x2="16"
        y2="23" />
    </svg>
  `,
})
export class MicIconComponent extends IconComponentBase {
  static readonly slug = 'mic';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'mic',
    'microphone',
    'audio',
    'record',
    'voice',
    'sound',
    'micro',
    'micrófono',
    'voz',
    'μικρόφωνο',
    'φωνή',
    'mikrofon',
    'głos',
    'music',
  ];
}
