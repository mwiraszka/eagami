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
      <path d="m7.5 5-3.5 3.5 3.5 3.5" />
      <path d="M4 8.5h16" />
      <path d="m16.5 12 3.5 3.5-3.5 3.5" />
      <path d="M20 15.5H4" />
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
