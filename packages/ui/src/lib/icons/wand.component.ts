import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-wand',
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
      <path d="m3 21 9-9" />
      <path d="M15 9h.01" />
      <path d="M15 2.5v2" />
      <path d="M15 13.5v2" />
      <path d="M8.5 9h2" />
      <path d="M19.5 9h2" />
      <path d="m10.97 4.97 1.2 1.2" />
      <path d="m19.03 4.97-1.2 1.2" />
      <path d="m17.83 11.83 1.2 1.2" />
    </svg>
  `,
})
export class WandIconComponent extends IconComponentBase {
  static readonly slug = 'wand';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'wand',
    'magic',
    'wizard',
    'spell',
    'baguette',
    'varita',
    'magia',
    'ραβδί',
    'różdżka',
  ];
}
