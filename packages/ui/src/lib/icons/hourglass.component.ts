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
      <path d="M6 2h12" />
      <path d="M6 22h12" />
      <path d="M7 2v4l5 6 5-6V2" />
      <path d="M7 22v-4l5-6 5 6v4" />
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
