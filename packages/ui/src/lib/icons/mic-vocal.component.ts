import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-mic-vocal',
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
        cx="17"
        cy="7"
        r="4.5" />
      <path d="M12.5 7 5.5 15l3 3 8.5-6.5" />
      <path d="M7 16.5c-2 1.5-3.5 3-2 4s3.5-.5 6-.5 3.5 1.5 6 1" />
    </svg>
  `,
})
export class MicVocalIconComponent extends IconComponentBase {
  static readonly slug = 'mic-vocal';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'mic-vocal',
    'mic',
    'microphone',
    'vocal',
    'karaoke',
    'singer',
    'micro',
    'micrófono',
    'μικρόφωνο',
    'mikrofon',
    'music',
    'audio',
  ];
}
