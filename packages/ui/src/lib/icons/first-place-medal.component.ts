import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-first-place-medal',
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
      <path d="M10.5 12l2-2v8" />
    </svg>
  `,
})
export class FirstPlaceMedalIconComponent extends IconComponentBase {
  static readonly slug = 'first-place-medal';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'medal',
    'first place',
    'gold',
    'winner',
    'champion',
    'rank',
    'podium',
    'award',
    'médaille',
    'première place',
    'medalla',
    'oro',
    'primer lugar',
    'μετάλλιο',
    'χρυσό',
    'πρώτη θέση',
    'złoto',
    'pierwsze miejsce',
  ];
}
