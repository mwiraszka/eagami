import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-contrast',
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
      <circle
        cx="12"
        cy="12"
        r="10" />
      <path d="M12 18a6 6 0 0 0 0-12v12z" />
    </svg>
  `,
})
export class ContrastIconComponent extends IconComponentBase {
  static readonly slug = 'contrast';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'contrast',
    'adjust',
    'edit',
    'photo',
    'filter',
    'tone',
    'contraste',
    'ajuster',
    'ajustar',
    'αντίθεση',
    'ρύθμιση',
    'kontrast',
    'dostosuj',
  ];
}
