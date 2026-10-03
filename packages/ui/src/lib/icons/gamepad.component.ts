import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-gamepad',
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
        d="M7.5 5h9a5.5 5.5 0 0 1 5.5 5.5V14a3 3 0 0 1-3 3c-1.2 0-1.9-.6-2.6-1.3l-.7-.7H8.3l-.7.7C6.9 16.4 6.2 17 5 17a3 3 0 0 1-3-3v-3.5A5.5 5.5 0 0 1 7.5 5z" />
      <path d="M5.75 10.5h3.5" />
      <path d="M7.5 8.75v3.5" />
      <path d="M15.5 11.75h.01" />
      <path d="M18 9.25h.01" />
    </svg>
  `,
})
export class GamepadIconComponent extends IconComponentBase {
  static readonly slug = 'gamepad';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'gamepad',
    'game',
    'controller',
    'gaming',
    'console',
    'play',
    'manette',
    'jeu',
    'mando',
    'juego',
    'χειριστήριο',
    'παιχνίδι',
    'kontroler',
    'gra',
  ];
}
