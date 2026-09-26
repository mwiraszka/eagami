import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-grip-vertical',
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
        cx="9"
        cy="12"
        r="1" />
      <circle
        cx="9"
        cy="5"
        r="1" />
      <circle
        cx="9"
        cy="19"
        r="1" />
      <circle
        cx="15"
        cy="12"
        r="1" />
      <circle
        cx="15"
        cy="5"
        r="1" />
      <circle
        cx="15"
        cy="19"
        r="1" />
    </svg>
  `,
})
export class GripVerticalIconComponent extends IconComponentBase {
  static readonly slug = 'grip-vertical';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'grip-vertical',
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
