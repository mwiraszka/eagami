import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-archive',
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
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect
        x="1"
        y="3"
        width="22"
        height="5" />
      <line
        x1="10"
        y1="12"
        x2="14"
        y2="12" />
    </svg>
  `,
})
export class ArchiveIconComponent extends IconComponentBase {
  static readonly slug = 'archive';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'archive',
    'storage',
    'box',
    'save',
    'backup',
    'archiver',
    'archivar',
    'almacenar',
    'αρχείο',
    'αρχειοθέτηση',
    'archiwum',
    'archiwizuj',
  ];
}
