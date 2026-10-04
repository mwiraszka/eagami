import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-puzzle',
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
      <path
        d="M13.7 2.7L15.39 4.39A1 1 0 0 0 17.07 3.92A2.5 2.5 0 1 1 20.08 6.93A1 1 0 0 0 19.61 8.61L21.3 10.3A2.41 2.41 0 0 1 21.3 13.7L19.61 15.39A1 1 0 0 0 20.08 17.07A2.5 2.5 0 1 1 17.07 20.08A1 1 0 0 0 15.39 19.61L13.7 21.3A2.41 2.41 0 0 1 10.3 21.3L9.31 20.32A1 1 0 0 1 9.79 18.64A2.5 2.5 0 1 0 6.77 15.63A1 1 0 0 1 5.1 16.1L2.7 13.7A2.41 2.41 0 0 1 2.7 10.3L5.1 7.9A1 1 0 0 1 6.77 8.37A2.5 2.5 0 1 0 9.79 5.36A1 1 0 0 1 9.31 3.68L10.3 2.7A2.41 2.41 0 0 1 13.7 2.7z" />
    </svg>
  `,
})
export class PuzzleIconComponent extends IconComponentBase {
  static readonly slug = 'puzzle';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'puzzle',
    'extension',
    'plugin',
    'integration',
    'add-on',
    'module',
    'casse-tête',
    'module complémentaire',
    'rompecabezas',
    'complemento',
    'παζλ',
    'πρόσθετο',
    'układanka',
    'wtyczka',
  ];
}
