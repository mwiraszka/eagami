import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-plug',
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
      <path d="M9 2v5" />
      <path d="M15 2v5" />
      <path d="M6 7h12v4a6 6 0 0 1-12 0z" />
      <path d="M12 17v5" />
    </svg>
  `,
})
export class PlugIconComponent extends IconComponentBase {
  static readonly slug = 'plug';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'plug',
    'power',
    'outlet',
    'connect',
    'electricity',
    'prise',
    'brancher',
    'enchufe',
    'conectar',
    'πρίζα',
    'wtyczka',
    'zasilanie',
  ];
}
