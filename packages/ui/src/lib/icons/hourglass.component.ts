import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-hourglass',
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
      <path d="M5 22h14" />
      <path d="M5 2h14" />
      <path
        d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
      <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
    </svg>
  `,
})
export class HourglassIconComponent extends IconComponentBase {
  static readonly slug = 'hourglass';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'hourglass',
    'time',
    'wait',
    'pending',
    'loading',
    'timer',
    'sablier',
    'attente',
    'reloj de arena',
    'espera',
    'κλεψύδρα',
    'αναμονή',
    'klepsydra',
    'oczekiwanie',
  ];
}
