import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-ruler',
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
      <rect
        x="3"
        y="7"
        width="18"
        height="10"
        rx="1.5" />
      <path d="M6 7v3" />
      <path d="M9 7v5" />
      <path d="M12 7v3" />
      <path d="M15 7v5" />
      <path d="M18 7v3" />
    </svg>
  `,
})
export class RulerIconComponent extends IconComponentBase {
  static readonly slug = 'ruler';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'ruler',
    'measure',
    'length',
    'dimensions',
    'size',
    'units',
    'règle',
    'mesure',
    'regla',
    'medida',
    'χάρακας',
    'μέτρηση',
    'linijka',
    'pomiar',
  ];
}
