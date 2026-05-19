import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-target',
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
      <circle
        cx="12"
        cy="12"
        r="10" />
      <circle
        cx="12"
        cy="12"
        r="6" />
      <circle
        cx="12"
        cy="12"
        r="2" />
    </svg>
  `,
})
export class TargetIconComponent extends IconComponentBase {
  static readonly slug = 'target';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'target',
    'aim',
    'goal',
    'focus',
    'bullseye',
    'cible',
    'objectif',
    'objetivo',
    'diana',
    'στόχος',
    'σκοπός',
    'cel',
    'tarcza',
  ];
}
