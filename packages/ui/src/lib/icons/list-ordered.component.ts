import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-list-ordered',
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
      <path d="M10.5 6H21" />
      <path d="M10.5 12H21" />
      <path d="M10.5 18H21" />
      <path d="M3.5 4h1v4" />
      <path d="M3 17.5a1.5 1.5 0 0 1 3 0c0 .9-1.2 1.5-3 2.8h3" />
    </svg>
  `,
})
export class ListOrderedIconComponent extends IconComponentBase {
  static readonly slug = 'list-ordered';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'list-ordered',
    'list',
    'numbered',
    'ordered',
    'format',
    'liste',
    'numérotée',
    'lista',
    'numerada',
    'λίστα',
    'αριθμημένη',
    'numerowana',
  ];
}
