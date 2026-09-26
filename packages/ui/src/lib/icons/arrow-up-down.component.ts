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
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
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
