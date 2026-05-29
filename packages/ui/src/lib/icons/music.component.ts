import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-music',
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
      <path d="M9 18V5l12-2v13" />
      <circle
        cx="6"
        cy="18"
        r="3" />
      <circle
        cx="18"
        cy="16"
        r="3" />
    </svg>
  `,
})
export class MusicIconComponent extends IconComponentBase {
  static readonly slug = 'music';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'music',
    'note',
    'audio',
    'song',
    'sound',
    'musique',
    'música',
    'canción',
    'μουσική',
    'τραγούδι',
    'muzyka',
    'piosenka',
  ];
}
