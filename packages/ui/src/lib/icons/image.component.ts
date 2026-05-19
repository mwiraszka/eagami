import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-image',
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
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        ry="2" />
      <circle
        cx="8.5"
        cy="8.5"
        r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  `,
})
export class ImageIconComponent extends IconComponentBase {
  static readonly slug = 'image';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'image',
    'picture',
    'photo',
    'gallery',
    'visual',
    'photo',
    'imagen',
    'foto',
    'εικόνα',
    'φωτογραφία',
    'obraz',
    'zdjęcie',
  ];
}
