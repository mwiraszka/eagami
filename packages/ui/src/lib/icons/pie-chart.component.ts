import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-pie-chart',
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
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  `,
})
export class PieChartIconComponent extends IconComponentBase {
  static readonly slug = 'pie-chart';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'pie-chart',
    'pie',
    'chart',
    'graph',
    'statistics',
    'analytics',
    'circulaire',
    'gráfico',
    'circular',
    'γράφημα',
    'πίτα',
    'wykres',
    'kołowy',
  ];
}
