import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-candle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path d="M12 2c2 2 2 4 0 6-2-2-2-4 0-6z" />
      <path d="M8 10h8v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" />
    </svg>
  `,
})
export class CandleIconComponent extends IconComponentBase {
  static readonly slug = 'candle';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'candle',
    'light',
    'flame',
    'wax',
    'bougie',
    'flamme',
    'vela',
    'llama',
    'κερί',
    'φλόγα',
    'świeca',
    'płomień',
  ];
}
