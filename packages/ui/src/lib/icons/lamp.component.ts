import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-lamp',
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
      <path d="M8 2h8l3 10H5z" />
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="22" />
      <line
        x1="7"
        y1="22"
        x2="17"
        y2="22" />
    </svg>
  `,
})
export class LampIconComponent extends IconComponentBase {
  static readonly slug = 'lamp';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'lamp',
    'light',
    'bulb',
    'lighting',
    'lampe',
    'lumière',
    'lámpara',
    'luz',
    'λάμπα',
    'φως',
    'lampa',
    'światło',
  ];
}
