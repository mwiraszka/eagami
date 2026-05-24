import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-heptagon',
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
      <polygon
        points="12 2 19.82 5.77 21.75 14.22 16.34 21.01 7.66 21.01 2.25 14.22 4.18 5.77" />
    </svg>
  `,
})
export class HeptagonIconComponent extends IconComponentBase {
  static readonly slug = 'heptagon';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'heptagon',
    'seven-sided',
    'polygon',
    'shape',
    'heptagone',
    'heptágono',
    'επτάγωνο',
    'siedmiokąt',
  ];
}
