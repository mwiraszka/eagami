import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-video',
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
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect
        x="1"
        y="5"
        width="15"
        height="14"
        rx="2"
        ry="2" />
    </svg>
  `,
})
export class VideoIconComponent extends IconComponentBase {
  static readonly slug = 'video';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'video',
    'camera',
    'film',
    'movie',
    'record',
    'vidéo',
    'caméra',
    'vídeo',
    'cámara',
    'βίντεο',
    'κάμερα',
    'wideo',
    'kamera',
  ];
}
