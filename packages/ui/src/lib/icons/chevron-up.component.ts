import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-chevron-up',
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
      <polyline points="18 15 12 9 6 15" />
    </svg>
  `,
})
export class ChevronUpIconComponent extends IconComponentBase {
  static readonly slug = 'chevron-up';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'chevron-up',
    'chevron',
    'up',
    'arrow',
    'collapse',
    'haut',
    'arriba',
    'πάνω',
    'góra',
  ];
}
