import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-navigation-2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <polygon points="12 2 19 21 12 17 5 21 12 2" />
    </svg>
  `,
})
export class Navigation2IconComponent extends IconComponentBase {
  static readonly slug = 'navigation-2';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'navigation-2',
    'navigation',
    '2',
    'compass',
    'direction',
    'gps',
    'arrow',
    'navegación',
    'πλοήγηση',
    'nawigacja',
  ];
}
