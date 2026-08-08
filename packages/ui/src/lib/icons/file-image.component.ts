import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-file-image',
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
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
      <circle
        cx="15.5"
        cy="14"
        r="1" />
      <polyline points="6.5 19 10 15 17.5 19" />
    </svg>
  `,
})
export class FileImageIconComponent extends IconComponentBase {
  static readonly slug = 'file-image';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'file image',
    'photo file',
    'picture file',
    'jpg',
    'png',
    'fichier image',
    'archivo de imagen',
    'αρχείο εικόνας',
    'plik obrazu',
  ];
}
