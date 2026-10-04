import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-line-chart',
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
      <path d="M3 3v18h18" />
      <path d="m7 15 4-5 3 3 5-6" />
    </svg>
  `,
})
export class LineChartIconComponent extends IconComponentBase {
  static readonly slug = 'line-chart';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'line-chart',
    'chart',
    'graph',
    'trend',
    'analytics',
    'statistics',
    'graphique linéaire',
    'statistiques',
    'gráfico de líneas',
    'estadísticas',
    'γραμμικό γράφημα',
    'στατιστικά',
    'wykres liniowy',
    'statystyki',
  ];
}
