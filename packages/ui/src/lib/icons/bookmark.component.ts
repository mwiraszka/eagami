import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-bookmark',
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
    </svg>
  `,
})
export class BookmarkIconComponent extends IconComponentBase {
  static readonly slug = 'bookmark';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'bookmark',
    'save',
    'favorite',
    'mark',
    'tag',
    'marque-page',
    'favori',
    'marcador',
    'favorito',
    'σελιδοδείκτης',
    'αγαπημένο',
    'zakładka',
    'ulubione',
  ];
}
