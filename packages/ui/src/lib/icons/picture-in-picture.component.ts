import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-picture-in-picture',
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
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2" />
      <rect
        x="12"
        y="12"
        width="6"
        height="5"
        rx="1" />
    </svg>
  `,
})
export class PictureInPictureIconComponent extends IconComponentBase {
  static readonly slug = 'picture-in-picture';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'picture in picture',
    'pip',
    'floating player',
    'overlay',
    'mini player',
    'incrustation',
    'imagen en imagen',
    'εικόνα σε εικόνα',
    'obraz w obrazie',
  ];
}
