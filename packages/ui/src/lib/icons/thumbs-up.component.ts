import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-thumbs-up',
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
      <path
        d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  `,
})
export class ThumbsUpIconComponent extends IconComponentBase {
  static readonly slug = 'thumbs-up';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'thumbs-up',
    'thumbs',
    'up',
    'like',
    'yes',
    'approve',
    'positive',
    'pouce',
    'haut',
    'pulgar',
    'arriba',
    'me gusta',
    'αντίχειρας',
    'πάνω',
    'kciuk',
    'góra',
  ];
}
