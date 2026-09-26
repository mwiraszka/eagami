import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-grip-horizontal',
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
      <circle
        cx="12"
        cy="9"
        r="1" />
      <circle
        cx="19"
        cy="9"
        r="1" />
      <circle
        cx="5"
        cy="9"
        r="1" />
      <circle
        cx="12"
        cy="15"
        r="1" />
      <circle
        cx="19"
        cy="15"
        r="1" />
      <circle
        cx="5"
        cy="15"
        r="1" />
    </svg>
  `,
})
export class GripHorizontalIconComponent extends IconComponentBase {
  static readonly slug = 'grip-horizontal';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'grip-horizontal',
    'grip',
    'drag',
    'handle',
    'reorder',
    'sortable',
    'poignée',
    'glisser',
    'asa',
    'arrastrar',
    'λαβή',
    'σύρσιμο',
    'uchwyt',
    'przeciągnij',
  ];
}
