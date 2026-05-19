import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-thermometer',
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
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  `,
})
export class ThermometerIconComponent extends IconComponentBase {
  static readonly slug = 'thermometer';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'thermometer',
    'temperature',
    'weather',
    'hot',
    'cold',
    'thermomètre',
    'température',
    'termómetro',
    'temperatura',
    'θερμόμετρο',
    'θερμοκρασία',
    'termometr',
    'temperatura',
  ];
}
