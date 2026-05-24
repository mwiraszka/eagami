import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-feather',
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
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      <line
        x1="16"
        y1="8"
        x2="2"
        y2="22" />
      <line
        x1="17.5"
        y1="15"
        x2="9"
        y2="15" />
    </svg>
  `,
})
export class FeatherIconComponent extends IconComponentBase {
  static readonly slug = 'feather';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'light',
    'write',
    'quill',
    'plume',
    'pluma',
    'φτερό',
    'πένα',
    'pióro',
    'lekki',
  ];
}
