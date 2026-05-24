import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-rectangle-vertical',
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
      <rect
        x="6"
        y="2"
        width="12"
        height="20"
        rx="2"
        ry="2" />
    </svg>
  `,
})
export class RectangleVerticalIconComponent extends IconComponentBase {
  static readonly slug = 'rectangle-vertical';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'rectangle-vertical',
    'rectangle',
    'vertical',
    'portrait',
    'shape',
    'portrait',
    'vertical',
    'κατακόρυφο',
    'ορθογώνιο',
    'prostokąt',
    'pionowy',
  ];
}
