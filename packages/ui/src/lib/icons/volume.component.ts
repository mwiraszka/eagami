import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-volume',
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
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    </svg>
  `,
})
export class VolumeIconComponent extends IconComponentBase {
  static readonly slug = 'volume';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'volume',
    'sound',
    'audio',
    'speaker',
    'mute',
    'son',
    'sonido',
    'altavoz',
    'ένταση',
    'ήχος',
    'głośność',
    'dźwięk',
    'music',
  ];
}
