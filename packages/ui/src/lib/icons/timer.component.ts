import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-timer',
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
        cy="13.5"
        r="7.5" />
      <path d="M10 2h4" />
      <path d="M12 2v4" />
      <path d="m18.5 5 1.5 1.5" />
      <path d="M12 9.5v4" />
    </svg>
  `,
})
export class TimerIconComponent extends IconComponentBase {
  static readonly slug = 'timer';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'timer',
    'stopwatch',
    'countdown',
    'time',
    'minuteur',
    'chronomètre',
    'temporizador',
    'cronómetro',
    'χρονόμετρο',
    'minutnik',
    'stoper',
  ];
}
