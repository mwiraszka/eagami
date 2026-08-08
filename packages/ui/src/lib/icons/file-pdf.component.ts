import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-file-pdf',
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
      <path d="M6 19.2v-5.4h1.7a1.35 1.35 0 0 1 0 2.7H6" />
      <path d="M10.6 19.2v-5.4h1a2.7 2.7 0 0 1 0 5.4z" />
      <path d="M15.6 19.2v-5.4h2.2" />
      <path d="M15.6 16.6h1.7" />
    </svg>
  `,
})
export class FilePdfIconComponent extends IconComponentBase {
  static readonly slug = 'file-pdf';
  static readonly category: IconCategory = 'eagami';
  // Letterforms need a lighter stroke to stay legible inside the file body
  static override readonly defaultStrokeWidth = 1.5;
  static readonly tags: ReadonlyArray<string> = [
    'file pdf',
    'document',
    'acrobat',
    'portable document',
    'fichier pdf',
    'archivo pdf',
    'αρχείο pdf',
    'plik pdf',
  ];
}
