import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-file-text',
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line
        x1="16"
        y1="13"
        x2="8"
        y2="13" />
      <line
        x1="16"
        y1="17"
        x2="8"
        y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  `,
})
export class FileTextIconComponent extends IconComponentBase {
  static readonly slug = 'file-text';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'file-text',
    'file',
    'text',
    'document',
    'page',
    'fichier',
    'texte',
    'archivo',
    'texto',
    'αρχείο',
    'κείμενο',
    'plik',
    'tekst',
  ];
}
