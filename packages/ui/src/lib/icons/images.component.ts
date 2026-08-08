import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-images',
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
      <path d="M8 3h11a2 2 0 0 1 2 2v11" />
      <rect
        x="3"
        y="7"
        width="14"
        height="14"
        rx="1.56" />
      <circle
        cx="7.28"
        cy="11.28"
        r="1.17" />
      <polyline points="17.0 16.33 13.11 12.44 4.56 21.0" />
    </svg>
  `,
})
export class ImagesIconComponent extends IconComponentBase {
  static readonly slug = 'images';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'images',
    'gallery',
    'photos',
    'album',
    'library',
    'galerie',
    'galería',
    'συλλογή εικόνων',
    'galeria',
  ];
}
