import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-heading',
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
      <path d="M7 5v14" />
      <path d="M17 5v14" />
      <path d="M7 12h10" />
    </svg>
  `,
})
export class HeadingIconComponent extends IconComponentBase {
  static readonly slug = 'heading';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'heading',
    'title',
    'header',
    'h1',
    'text',
    'formatting',
    'titre',
    'en-tête',
    'encabezado',
    'título',
    'επικεφαλίδα',
    'τίτλος',
    'nagłówek',
    'tytuł',
  ];
}
