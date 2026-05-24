import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-bar-chart',
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
      <line
        x1="12"
        y1="20"
        x2="12"
        y2="10" />
      <line
        x1="18"
        y1="20"
        x2="18"
        y2="4" />
      <line
        x1="6"
        y1="20"
        x2="6"
        y2="16" />
    </svg>
  `,
})
export class BarChartIconComponent extends IconComponentBase {
  static readonly slug = 'bar-chart';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'bar-chart',
    'bar',
    'chart',
    'graph',
    'statistics',
    'analytics',
    'graphique',
    'gráfico',
    'estadísticas',
    'γράφημα',
    'στατιστικά',
    'wykres',
    'statystyki',
  ];
}
