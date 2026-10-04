import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-rows',
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
      <rect
        x="3"
        y="3"
        width="18"
        height="7"
        rx="2" />
      <rect
        x="3"
        y="14"
        width="18"
        height="7"
        rx="2" />
    </svg>
  `,
})
export class RowsIconComponent extends IconComponentBase {
  static readonly slug = 'rows';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'rows',
    'layout',
    'stack',
    'split',
    'panels',
    'list view',
    'rangées',
    'filas',
    'σειρές',
    'wiersze',
  ];
}
