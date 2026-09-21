import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-cassette-tape',
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
        y="4"
        width="20"
        height="16"
        rx="2" />
      <circle
        cx="8"
        cy="10"
        r="2" />
      <path d="M8 12h8" />
      <circle
        cx="16"
        cy="10"
        r="2" />
      <path d="m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3" />
    </svg>
  `,
})
export class CassetteTapeIconComponent extends IconComponentBase {
  static readonly slug = 'cassette-tape';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'cassette-tape',
    'cassette',
    'tape',
    'retro',
    'mixtape',
    'recording',
    'cassette audio',
    'casete',
    'κασέτα',
    'kaseta',
    'music',
    'audio',
  ];
}
