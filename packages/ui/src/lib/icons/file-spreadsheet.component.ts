import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-file-spreadsheet',
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
        d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <path d="M8 13h2" />
      <path d="M14 13h2" />
      <path d="M8 17h2" />
      <path d="M14 17h2" />
    </svg>
  `,
})
export class FileSpreadsheetIconComponent extends IconComponentBase {
  static readonly slug = 'file-spreadsheet';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'file-spreadsheet',
    'spreadsheet',
    'sheet',
    'csv',
    'xlsx',
    'table',
    'document',
    'tableur',
    'feuille de calcul',
    'hoja de cálculo',
    'planilla',
    'υπολογιστικό φύλλο',
    'πίνακας',
    'arkusz kalkulacyjny',
    'tabela',
  ];
}
