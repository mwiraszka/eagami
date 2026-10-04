import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-flame',
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
        d="M12 2c1 3.5 6 6.5 6 12a6 6 0 0 1-12 0c0-2.5 1.2-4.2 2.5-5.5.3 1.6 1 2.6 2 3 .2-3-.3-6 1.5-9.5z" />
    </svg>
  `,
})
export class FlameIconComponent extends IconComponentBase {
  static readonly slug = 'flame';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'flame',
    'fire',
    'hot',
    'burn',
    'heat',
    'flamme',
    'llama',
    'φλόγα',
    'płomień',
  ];
}
