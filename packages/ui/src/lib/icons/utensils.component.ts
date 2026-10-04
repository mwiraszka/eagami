import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-utensils',
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
      <path d="M4 2v6a3 3 0 0 0 6 0V2" />
      <path d="M7 2v20" />
      <path d="M19 2c-2.5 1.5-4 4.5-4 8.5V13h4" />
      <path d="M19 2v20" />
    </svg>
  `,
})
export class UtensilsIconComponent extends IconComponentBase {
  static readonly slug = 'utensils';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'utensils',
    'restaurant',
    'food',
    'dining',
    'meal',
    'cutlery',
    'couverts',
    'repas',
    'restaurante',
    'cubiertos',
    'εστιατόριο',
    'μαχαιροπίρουνα',
    'restauracja',
    'sztućce',
  ];
}
