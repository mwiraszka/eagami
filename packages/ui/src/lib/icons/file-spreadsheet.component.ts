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
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M13 2v7h7" />
      <path d="M8 13h2.5" />
      <path d="M13.5 13h2.5" />
      <path d="M8 17h2.5" />
      <path d="M13.5 17h2.5" />
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
