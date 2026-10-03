import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-shirt',
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
      <path d="M9 4a3 3 0 0 0 6 0l6.5 2.5-2 4.5-2.5-1v10H7V10l-2.5 1-2-4.5z" />
    </svg>
  `,
})
export class ShirtIconComponent extends IconComponentBase {
  static readonly slug = 'shirt';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'shirt',
    'clothing',
    't-shirt',
    'apparel',
    'fashion',
    'clothes',
    'chemise',
    'vêtements',
    'camisa',
    'ropa',
    'μπλούζα',
    'ρούχα',
    'koszulka',
    'ubrania',
  ];
}
