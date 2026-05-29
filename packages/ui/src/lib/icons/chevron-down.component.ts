import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-chevron-down',
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
      <polyline points="6 9 12 15 18 9" />
    </svg>
  `,
})
export class ChevronDownIconComponent extends IconComponentBase {
  static readonly slug = 'chevron-down';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'chevron-down',
    'chevron',
    'down',
    'arrow',
    'expand',
    'dropdown',
    'bas',
    'abajo',
    'κάτω',
    'dół',
  ];
}
