import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-image-plus',
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
      <path d="M13 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8" />
      <circle
        cx="8.5"
        cy="8.5"
        r="1.5" />
      <path d="m21 15-5-5L5 21" />
      <path d="M18.5 2.5v6" />
      <path d="M15.5 5.5h6" />
    </svg>
  `,
})
export class ImagePlusIconComponent extends IconComponentBase {
  static readonly slug = 'image-plus';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'image-plus',
    'add image',
    'add photo',
    'upload picture',
    'gallery',
    'ajouter une image',
    'añadir imagen',
    'προσθήκη εικόνας',
    'dodaj obraz',
  ];
}
