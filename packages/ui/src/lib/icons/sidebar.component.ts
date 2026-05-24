import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-sidebar',
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
        y="3"
        width="18"
        height="18"
        rx="2"
        ry="2" />
      <line
        x1="9"
        y1="3"
        x2="9"
        y2="21" />
    </svg>
  `,
})
export class SidebarIconComponent extends IconComponentBase {
  static readonly slug = 'sidebar';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'sidebar',
    'panel',
    'navigation',
    'layout',
    'menu',
    'barre latérale',
    'panneau',
    'barra lateral',
    'panel',
    'πλευρική μπάρα',
    'panel boczny',
  ];
}
