import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-image-play',
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
      <path d="M21 10V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
      <circle
        cx="8.5"
        cy="8.5"
        r="1.5" />
      <path d="m3 17 4-4 3 3" />
      <path d="M14.5 13.5v8l6.5-4z" />
    </svg>
  `,
})
export class ImagePlayIconComponent extends IconComponentBase {
  static readonly slug = 'image-play';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'image-play',
    'image',
    'play',
    'gif',
    'animated',
    'motion',
    'image animée',
    'imagen animada',
    'κινούμενη εικόνα',
    'animowany obraz',
  ];
}
