import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

/**
 * Figma brand mark (Eagami brand-filled).
 *
 * @remarks
 * Up to v1.3 this design shipped as `FigmaIconComponent` at slug
 * `ea-icon-figma`. v1.4 reassigns the canonical slug to Feather's outline
 * and moves the brand-filled mark here. Set the `brand` input to render in
 * the official brand colour.
 */
@Component({
  selector: 'ea-icon-figma-2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path
        d="M8 24c2.21 0 4-1.79 4-4v-4H8c-2.21 0-4 1.79-4 4s1.79 4 4 4Z"
        fill="#0ACF83" />
      <path
        d="M4 12c0-2.21 1.79-4 4-4h4v8H8c-2.21 0-4-1.79-4-4Z"
        fill="#A259FF" />
      <path
        d="M4 4c0-2.21 1.79-4 4-4h4v8H8C5.79 8 4 6.21 4 4Z"
        fill="#F24E1E" />
      <path
        d="M12 0h4c2.21 0 4 1.79 4 4s-1.79 4-4 4h-4V0Z"
        fill="#FF7262" />
      <path
        d="M20 12c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4Z"
        fill="#1ABCFE" />
    </svg>
  `,
})
export class Figma2IconComponent extends IconComponentBase {
  static readonly slug = 'figma-2';
  static readonly category: IconCategory = 'eagami';
  static readonly isBrand = true;
  static readonly tags: ReadonlyArray<string> = [
    'figma-2',
    'figma',
    'design',
    'ui',
    'tool',
    'mark',
  ];
}
