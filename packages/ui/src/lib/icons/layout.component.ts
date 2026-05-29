import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-layout',
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
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        ry="2" />
      <line
        x1="3"
        y1="9"
        x2="21"
        y2="9" />
      <line
        x1="9"
        y1="21"
        x2="9"
        y2="9" />
    </svg>
  `,
})
export class LayoutIconComponent extends IconComponentBase {
  static readonly slug = 'layout';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'layout',
    'grid',
    'design',
    'structure',
    'template',
    'mise en page',
    'diseño',
    'plantilla',
    'διάταξη',
    'σχέδιο',
    'układ',
    'szablon',
  ];
}
