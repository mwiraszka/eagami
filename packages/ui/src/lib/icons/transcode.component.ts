import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-transcode',
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
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
      <line
        x1="7.5"
        y1="17"
        x2="14.5"
        y2="17" />
      <polyline points="12.2 14.7 15 17 12.2 19.3" />
    </svg>
  `,
})
export class TranscodeIconComponent extends IconComponentBase {
  static readonly slug = 'transcode';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'transcode',
    'convert',
    'encode',
    're-encode',
    'format change',
    'transcodage',
    'transcodificar',
    'μετακωδικοποίηση',
    'transkodowanie',
  ];
}
