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
        y="5"
        width="20"
        height="14"
        rx="2" />
      <rect
        x="6"
        y="8.5"
        width="12"
        height="5"
        rx="2.5" />
      <path d="M9 11h.01" />
      <path d="M15 11h.01" />
      <path d="m7 19 1-3h8l1 3" />
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
