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
      <line
        x1="10"
        x2="14"
        y1="2"
        y2="2" />
      <line
        x1="12"
        x2="15"
        y1="14"
        y2="11" />
      <circle
        cx="12"
        cy="14"
        r="8" />
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
