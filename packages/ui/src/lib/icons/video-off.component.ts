import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-video-off',
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
      <path
        d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" />
      <line
        x1="1"
        y1="1"
        x2="23"
        y2="23" />
    </svg>
  `,
})
export class VideoOffIconComponent extends IconComponentBase {
  static readonly slug = 'video-off';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'video-off',
    'video',
    'off',
    'camera',
    'disabled',
    'mute',
    'vidéo',
    'vídeo',
    'cámara',
    'βίντεο',
    'κάμερα',
    'wideo',
    'wyłączone',
  ];
}
