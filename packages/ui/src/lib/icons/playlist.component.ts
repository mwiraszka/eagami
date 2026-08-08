import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-playlist',
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
      <line
        x1="3"
        y1="6"
        x2="15"
        y2="6" />
      <line
        x1="3"
        y1="11"
        x2="15"
        y2="11" />
      <line
        x1="3"
        y1="16"
        x2="10"
        y2="16" />
      <polygon points="14 14 20 17 14 20" />
    </svg>
  `,
})
export class PlaylistIconComponent extends IconComponentBase {
  static readonly slug = 'playlist';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'playlist',
    'queue',
    'tracks',
    'up next',
    'sequence',
    'liste de lecture',
    'lista de reproducción',
    'λίστα αναπαραγωγής',
    'playlista',
  ];
}
