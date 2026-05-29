import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-hexagon',
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
      <polygon points="12 2 20.66 7 20.66 17 12 22 3.34 17 3.34 7" />
    </svg>
  `,
})
export class HexagonIconComponent extends IconComponentBase {
  static readonly slug = 'hexagon';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'hexagon',
    'six-sided',
    'polygon',
    'shape',
    'hexagone',
    'hexágono',
    'εξάγωνο',
    'sześciokąt',
  ];
}
