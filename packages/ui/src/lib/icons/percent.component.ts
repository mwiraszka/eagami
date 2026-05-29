import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-percent',
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
        x1="19"
        y1="5"
        x2="5"
        y2="19" />
      <circle
        cx="6.5"
        cy="6.5"
        r="2.5" />
      <circle
        cx="17.5"
        cy="17.5"
        r="2.5" />
    </svg>
  `,
})
export class PercentIconComponent extends IconComponentBase {
  static readonly slug = 'percent';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'percent',
    'percentage',
    'discount',
    'sale',
    'math',
    'pourcentage',
    'porcentaje',
    'descuento',
    'ποσοστό',
    'έκπτωση',
    'procent',
    'zniżka',
  ];
}
