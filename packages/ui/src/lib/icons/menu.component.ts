import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-menu',
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
      <line
        x1="3"
        y1="6"
        x2="21"
        y2="6" />
      <line
        x1="3"
        y1="12"
        x2="21"
        y2="12" />
      <line
        x1="3"
        y1="18"
        x2="21"
        y2="18" />
    </svg>
  `,
})
export class MenuIconComponent extends IconComponentBase {
  static readonly slug = 'menu';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'menu',
    'hamburger',
    'list',
    'navigation',
    'bars',
    'menú',
    'lista',
    'μενού',
    'navigacja',
    'lista',
  ];
}
