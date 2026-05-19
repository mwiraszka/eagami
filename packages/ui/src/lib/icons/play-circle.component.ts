import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-play-circle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <circle
        cx="12"
        cy="12"
        r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  `,
})
export class PlayCircleIconComponent extends IconComponentBase {
  static readonly slug = 'play-circle';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'play-circle',
    'play',
    'circle',
    'start',
    'media',
    'video',
    'lecture',
    'reproducir',
    'αναπαραγωγή',
    'odtwórz',
    'music',
    'audio',
  ];
}
