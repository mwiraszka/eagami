import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-bookmark-check',
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
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      <path d="m9.5 9.5 2 2 3.5-4" />
    </svg>
  `,
})
export class BookmarkCheckIconComponent extends IconComponentBase {
  static readonly slug = 'bookmark-check';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'bookmark-check',
    'bookmark',
    'check',
    'saved',
    'favorite',
    'signet',
    'marcador',
    'σελιδοδείκτης',
    'zakładka',
  ];
}
