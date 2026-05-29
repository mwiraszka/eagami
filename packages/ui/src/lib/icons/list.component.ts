import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-list',
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
        x1="8"
        y1="6"
        x2="21"
        y2="6" />
      <line
        x1="8"
        y1="12"
        x2="21"
        y2="12" />
      <line
        x1="8"
        y1="18"
        x2="21"
        y2="18" />
      <line
        x1="3"
        y1="6"
        x2="3.01"
        y2="6" />
      <line
        x1="3"
        y1="12"
        x2="3.01"
        y2="12" />
      <line
        x1="3"
        y1="18"
        x2="3.01"
        y2="18" />
    </svg>
  `,
})
export class ListIconComponent extends IconComponentBase {
  static readonly slug = 'list';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'list',
    'menu',
    'items',
    'bullets',
    'todo',
    'liste',
    'lista',
    'menú',
    'λίστα',
    'κατάλογος',
    'lista',
    'spis',
  ];
}
