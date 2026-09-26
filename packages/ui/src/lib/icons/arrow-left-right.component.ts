import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-arrow-left-right',
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
      <path d="M8 3 4 7l4 4" />
      <path d="M4 7h16" />
      <path d="m16 21 4-4-4-4" />
      <path d="M20 17H4" />
    </svg>
  `,
})
export class ArrowLeftRightIconComponent extends IconComponentBase {
  static readonly slug = 'arrow-left-right';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'arrow-left-right',
    'arrow',
    'swap',
    'exchange',
    'horizontal',
    'compare',
    'flèche',
    'échanger',
    'flecha',
    'intercambiar',
    'βέλος',
    'ανταλλαγή',
    'strzałka',
    'zamień',
  ];
}
