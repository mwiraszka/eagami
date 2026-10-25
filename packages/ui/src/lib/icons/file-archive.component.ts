import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-file-archive',
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
      <path d="M13 2v7h7" />
      <path d="M9 4.5v1" />
      <path d="M9 8.5v1" />
      <path d="M7 15.5a2 2 0 0 1 4 0V18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" />
    </svg>
  `,
})
export class FileArchiveIconComponent extends IconComponentBase {
  static readonly slug = 'file-archive';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'file-archive',
    'archive',
    'zip',
    'compressed',
    'rar',
    'document',
    'fichier zip',
    'compressé',
    'archivo comprimido',
    'comprimido',
    'συμπιεσμένο αρχείο',
    'αρχειοθέτηση',
    'archiwum',
    'plik skompresowany',
  ];
}
