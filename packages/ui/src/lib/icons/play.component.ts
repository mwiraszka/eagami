import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-play',
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
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  `,
})
export class PlayIconComponent extends IconComponentBase {
  static readonly slug = 'play';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'play',
    'start',
    'media',
    'player',
    'video',
    'lecture',
    'reproducir',
    'iniciar',
    'αναπαραγωγή',
    'παίξε',
    'odtwórz',
    'graj',
    'music',
    'audio',
  ];
}
