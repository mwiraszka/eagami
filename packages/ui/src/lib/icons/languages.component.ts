import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-languages',
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
      <path d="M4 7h9" />
      <path d="M8.5 4.5V7" />
      <path d="M11.5 7c-.5 3-2.5 5.5-6 7" />
      <path d="M6.5 10c.8 1.7 2.5 3.2 5 4" />
      <path d="m12 20 4-9 4 9" />
      <path d="M13.5 17h5" />
    </svg>
  `,
})
export class LanguagesIconComponent extends IconComponentBase {
  static readonly slug = 'languages';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'languages',
    'language',
    'translate',
    'translation',
    'locale',
    'langues',
    'idiomas',
    'γλώσσες',
    'języki',
  ];
}
