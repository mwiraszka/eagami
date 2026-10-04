import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-leaf',
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
      <path d="M5 19C3 12 8 4 20 4c0 12-8 17-15 15z" />
      <path d="M3 21 13 11" />
    </svg>
  `,
})
export class LeafIconComponent extends IconComponentBase {
  static readonly slug = 'leaf';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'leaf',
    'nature',
    'eco',
    'plant',
    'organic',
    'feuille',
    'hoja',
    'φύλλο',
    'liść',
  ];
}
