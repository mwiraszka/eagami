import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-clapperboard',
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
      <rect
        x="3"
        y="8"
        width="18"
        height="13"
        rx="2" />
      <path d="M3 8V5.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2V8" />
      <line
        x1="7.5"
        y1="3.5"
        x2="5.5"
        y2="8" />
      <line
        x1="12.5"
        y1="3.5"
        x2="10.5"
        y2="8" />
      <line
        x1="17.5"
        y1="3.5"
        x2="15.5"
        y2="8" />
    </svg>
  `,
})
export class ClapperboardIconComponent extends IconComponentBase {
  static readonly slug = 'clapperboard';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'clapperboard',
    'slate',
    'film',
    'shoot',
    'production',
    'clap',
    'claqueta',
    'κλακέτα',
    'klaps filmowy',
  ];
}
