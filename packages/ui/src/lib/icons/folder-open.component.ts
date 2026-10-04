import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-folder-open',
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
      <path d="M4 20a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v2.5" />
      <path d="M4 20l3-8a2 2 0 0 1 1.9-1.5H22L19 20z" />
    </svg>
  `,
})
export class FolderOpenIconComponent extends IconComponentBase {
  static readonly slug = 'folder-open';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'folder-open',
    'folder',
    'directory',
    'open',
    'dossier',
    'carpeta',
    'φάκελος',
    'katalog',
  ];
}
