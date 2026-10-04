import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-braces',
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
      <path d="M8 4c-2 0-3 1-3 3v2c0 1.7-1 3-2.5 3C4 12 5 13.3 5 15v2c0 2 1 3 3 3" />
      <path d="M16 4c2 0 3 1 3 3v2c0 1.7 1 3 2.5 3-1.5 0-2.5 1.3-2.5 3v2c0 2-1 3-3 3" />
    </svg>
  `,
})
export class BracesIconComponent extends IconComponentBase {
  static readonly slug = 'braces';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'braces',
    'curly brackets',
    'code',
    'json',
    'object',
    'developer',
    'accolades',
    'objet',
    'llaves',
    'objeto',
    'άγκιστρα',
    'αντικείμενο',
    'nawiasy klamrowe',
    'obiekt',
  ];
}
