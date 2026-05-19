import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-chevron-right',
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
      <polyline points="9 18 15 12 9 6" />
    </svg>
  `,
})
export class ChevronRightIconComponent extends IconComponentBase {
  static readonly slug = 'chevron-right';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'chevron-right',
    'chevron',
    'right',
    'arrow',
    'forward',
    'next',
    'droite',
    'derecha',
    'δεξιά',
    'prawo',
  ];
}
