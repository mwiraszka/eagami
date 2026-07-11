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
      <path d="M12 7v6" />
      <path d="M15 10H9" />
      <path
        d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
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
