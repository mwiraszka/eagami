import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-maximize',
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
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  `,
})
export class MaximizeIconComponent extends IconComponentBase {
  static readonly slug = 'maximize';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'maximize',
    'expand',
    'fullscreen',
    'enlarge',
    'agrandir',
    'plein écran',
    'maximizar',
    'pantalla completa',
    'μεγιστοποίηση',
    'πλήρης οθόνη',
    'maksymalizuj',
    'pełny ekran',
  ];
}
