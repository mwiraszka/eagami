import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-pizza',
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
      <path d="M12 21.5 2.5 7a17 17 0 0 1 19 0z" />
      <path d="M4.4 9.9a14 14 0 0 1 15.2 0" />
      <circle
        cx="9.5"
        cy="11.5"
        r="0.75" />
      <circle
        cx="14.5"
        cy="11.5"
        r="0.75" />
      <circle
        cx="12"
        cy="15.5"
        r="0.75" />
    </svg>
  `,
})
export class PizzaIconComponent extends IconComponentBase {
  static readonly slug = 'pizza';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'pizza',
    'food',
    'slice',
    'takeout',
    'restaurant',
    'meal',
    'pizzeria',
    'repas',
    'pizzería',
    'comida',
    'πίτσα',
    'φαγητό',
    'jedzenie',
    'posiłek',
  ];
}
