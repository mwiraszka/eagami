import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-bookmark-plus',
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
      <path d="M12 6.5v6" />
      <path d="M9 9.5h6" />
    </svg>
  `,
})
export class BookmarkPlusIconComponent extends IconComponentBase {
  static readonly slug = 'bookmark-plus';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'bookmark-plus',
    'bookmark',
    'save',
    'add',
    'favorite',
    'signet',
    'marcador',
    'σελιδοδείκτης',
    'zakładka',
  ];
}
