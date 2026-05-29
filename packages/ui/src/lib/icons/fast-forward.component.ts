import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-fast-forward',
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
      <polygon points="13 19 22 12 13 5 13 19" />
      <polygon points="2 19 11 12 2 5 2 19" />
    </svg>
  `,
})
export class FastForwardIconComponent extends IconComponentBase {
  static readonly slug = 'fast-forward';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'fast-forward',
    'fast',
    'forward',
    'play',
    'skip',
    'speed',
    'avance rapide',
    'rápido',
    'γρήγορη μετάβαση',
    'μπροστά',
    'przewiń',
    'do przodu',
    'music',
    'audio',
  ];
}
