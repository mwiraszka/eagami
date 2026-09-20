import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-third-place-medal',
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
      <path d="M10 12a2 2 0 1 1 2 2a2 2 0 1 1-2 2" />
    </svg>
  `,
})
export class ThirdPlaceMedalIconComponent extends IconComponentBase {
  static readonly slug = 'third-place-medal';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'medal',
    'third place',
    'bronze',
    'rank',
    'podium',
    'award',
    'médaille',
    'troisième place',
    'medalla',
    'bronce',
    'tercer lugar',
    'μετάλλιο',
    'χάλκινο',
    'τρίτη θέση',
    'brąz',
    'trzecie miejsce',
  ];
}
