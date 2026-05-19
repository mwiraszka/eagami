import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-rectangle-horizontal',
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
      <rect
        x="2"
        y="6"
        width="20"
        height="12"
        rx="2"
        ry="2" />
    </svg>
  `,
})
export class RectangleHorizontalIconComponent extends IconComponentBase {
  static readonly slug = 'rectangle-horizontal';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'rectangle-horizontal',
    'rectangle',
    'horizontal',
    'landscape',
    'shape',
    'paysage',
    'horizontal',
    'apaisado',
    'οριζόντιο',
    'ορθογώνιο',
    'prostokąt',
    'poziomy',
  ];
}
