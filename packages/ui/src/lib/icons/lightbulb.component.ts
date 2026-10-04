import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-lightbulb',
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
        d="M9 17v-1.2c0-1-.5-1.8-1.6-2.7a6.5 6.5 0 1 1 9.2 0c-1.1.9-1.6 1.7-1.6 2.7V17z" />
      <path d="M9.5 20.5h5" />
    </svg>
  `,
})
export class LightbulbIconComponent extends IconComponentBase {
  static readonly slug = 'lightbulb';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'lightbulb',
    'bulb',
    'idea',
    'light',
    'inspiration',
    'tip',
    'ampoule',
    'idée',
    'bombilla',
    'λάμπα',
    'ιδέα',
    'żarówka',
    'pomysł',
  ];
}
