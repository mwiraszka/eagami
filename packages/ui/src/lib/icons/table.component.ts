import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path
        d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
    </svg>
  `,
})
export class TableIconComponent extends IconComponentBase {
  static readonly slug = 'table';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'table',
    'grid',
    'data',
    'spreadsheet',
    'rows',
    'columns',
    'tableau',
    'grille',
    'tabla',
    'cuadrícula',
    'πίνακας',
    'πλέγμα',
    'tabela',
    'siatka',
  ];
}
