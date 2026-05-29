import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-coffee',
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
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" />
      <line
        x1="6"
        y1="1"
        x2="6"
        y2="4" />
      <line
        x1="10"
        y1="1"
        x2="10"
        y2="4" />
      <line
        x1="14"
        y1="1"
        x2="14"
        y2="4" />
    </svg>
  `,
})
export class CoffeeIconComponent extends IconComponentBase {
  static readonly slug = 'coffee';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'coffee',
    'drink',
    'cup',
    'cafe',
    'mug',
    'café',
    'taza',
    'καφές',
    'κούπα',
    'kawa',
    'kubek',
  ];
}
