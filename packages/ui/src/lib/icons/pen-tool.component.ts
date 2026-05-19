import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-pen-tool',
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
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle
        cx="11"
        cy="11"
        r="2" />
    </svg>
  `,
})
export class PenToolIconComponent extends IconComponentBase {
  static readonly slug = 'pen-tool';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'pen-tool',
    'pen',
    'tool',
    'vector',
    'draw',
    'bezier',
    'design',
    'stylo',
    'dessiner',
    'pluma',
    'dibujar',
    'στυλό',
    'σχέδιο',
    'pióro',
    'rysować',
  ];
}
