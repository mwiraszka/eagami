import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-navigation',
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
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  `,
})
export class NavigationIconComponent extends IconComponentBase {
  static readonly slug = 'navigation';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'navigation',
    'compass',
    'direction',
    'gps',
    'arrow',
    'navegación',
    'πλοήγηση',
    'nawigacja',
  ];
}
