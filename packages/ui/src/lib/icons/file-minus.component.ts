import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-file-minus',
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
        x1="9"
        y1="15"
        x2="15"
        y2="15" />
    </svg>
  `,
})
export class FileMinusIconComponent extends IconComponentBase {
  static readonly slug = 'file-minus';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'file-minus',
    'file',
    'minus',
    'remove',
    'delete',
    'document',
    'fichier',
    'archivo',
    'eliminar',
    'αρχείο',
    'αφαίρεση',
    'plik',
    'usuń',
  ];
}
