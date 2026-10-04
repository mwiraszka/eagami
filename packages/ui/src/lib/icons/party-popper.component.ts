import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-party-popper',
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
      <path d="M3 21 8 8l8 8z" />
      <path d="m5.5 14.5 4 4" />
      <path d="M13.5 2.5c1 1.2 1 2.3 0 3.5" />
      <path d="M21.5 10.5c-1.2-1-2.3-1-3.5 0" />
      <path d="m19 5-2 2" />
      <path d="M17.5 2.5h.01" />
      <path d="M21.5 6.5h.01" />
      <path d="M20 15h.01" />
    </svg>
  `,
})
export class PartyPopperIconComponent extends IconComponentBase {
  static readonly slug = 'party-popper';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'party-popper',
    'celebration',
    'party',
    'congratulations',
    'success',
    'confetti',
    'fête',
    'félicitations',
    'fiesta',
    'felicitaciones',
    'γιορτή',
    'συγχαρητήρια',
    'impreza',
    'gratulacje',
  ];
}
