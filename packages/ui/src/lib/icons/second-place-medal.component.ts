import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-second-place-medal',
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
      <polyline points="7.5 6.21 6.5 1 17.5 1 16.5 6.21" />
      <circle
        cx="12"
        cy="14"
        r="9" />
      <path d="M14 18h-4c0-2 4-4 4-6s-2-3-4-2" />
    </svg>
  `,
})
export class SecondPlaceMedalIconComponent extends IconComponentBase {
  static readonly slug = 'second-place-medal';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'medal',
    'second place',
    'silver',
    'runner-up',
    'rank',
    'podium',
    'award',
    'médaille',
    'argent',
    'deuxième place',
    'medalla',
    'plata',
    'segundo lugar',
    'μετάλλιο',
    'ασημένιο',
    'δεύτερη θέση',
    'srebro',
    'drugie miejsce',
  ];
}
