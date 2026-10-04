import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-keyboard',
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
        x="2"
        y="4"
        width="20"
        height="16"
        rx="2" />
      <path d="M6.75 8.5h.01" />
      <path d="M10.25 8.5h.01" />
      <path d="M13.75 8.5h.01" />
      <path d="M17.25 8.5h.01" />
      <path d="M8.5 12h.01" />
      <path d="M12 12h.01" />
      <path d="M15.5 12h.01" />
      <path d="M8.5 15.5h7" />
    </svg>
  `,
})
export class KeyboardIconComponent extends IconComponentBase {
  static readonly slug = 'keyboard';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'keyboard',
    'type',
    'typing',
    'input',
    'keys',
    'clavier',
    'teclado',
    'πληκτρολόγιο',
    'klawiatura',
  ];
}
