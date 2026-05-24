import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-folder-plus',
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
      <path
        d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <line
        x1="12"
        y1="11"
        x2="12"
        y2="17" />
      <line
        x1="9"
        y1="14"
        x2="15"
        y2="14" />
    </svg>
  `,
})
export class FolderPlusIconComponent extends IconComponentBase {
  static readonly slug = 'folder-plus';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'folder-plus',
    'folder',
    'plus',
    'add',
    'new',
    'create',
    'directory',
    'dossier',
    'nouveau',
    'carpeta',
    'nuevo',
    'φάκελος',
    'νέο',
    'nowy',
  ];
}
