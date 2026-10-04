import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-rocket',
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
      <path d="M20.5 3.5c-5.5 0-10.5 3-12.5 8.5l4 4c5.5-2 8.5-7 8.5-12.5z" />
      <circle
        cx="15"
        cy="9"
        r="1.75" />
      <path d="M10.2 8.5H6l-3 3.5h5" />
      <path d="M15.5 13.8V18L12 21v-5" />
      <path d="M3 21c.3-2 1-3.8 2.2-5a2.4 2.4 0 0 1 3.3 3.3C7.3 20.3 5 20.7 3 21z" />
    </svg>
  `,
})
export class RocketIconComponent extends IconComponentBase {
  static readonly slug = 'rocket';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'rocket',
    'launch',
    'startup',
    'space',
    'boost',
    'fusée',
    'cohete',
    'πύραυλος',
    'rakieta',
  ];
}
