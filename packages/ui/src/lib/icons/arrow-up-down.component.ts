import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-arrow-up-down',
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
      <path d="m5 7.5 3.5-3.5 3.5 3.5" />
      <path d="M8.5 4v16" />
      <path d="m19 16.5-3.5 3.5-3.5-3.5" />
      <path d="M15.5 20V4" />
    </svg>
  `,
})
export class ArrowUpDownIconComponent extends IconComponentBase {
  static readonly slug = 'arrow-up-down';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'arrow-up-down',
    'arrow',
    'sort',
    'swap',
    'vertical',
    'reorder',
    'flèche',
    'trier',
    'flecha',
    'ordenar',
    'βέλος',
    'ταξινόμηση',
    'strzałka',
    'sortuj',
  ];
}
