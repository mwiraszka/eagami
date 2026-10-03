import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-alarm-clock',
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
        cy="13"
        r="7.5" />
      <path d="M12 9.5V13l2.5 1.5" />
      <path d="M2.5 6.5a4.5 4.5 0 0 1 4.5-4" />
      <path d="M21.5 6.5a4.5 4.5 0 0 0-4.5-4" />
      <path d="m6.5 19-1.5 2" />
      <path d="m17.5 19 1.5 2" />
    </svg>
  `,
})
export class AlarmClockIconComponent extends IconComponentBase {
  static readonly slug = 'alarm-clock';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'alarm-clock',
    'alarm',
    'clock',
    'wake',
    'reminder',
    'time',
    'réveil',
    'alarme',
    'despertador',
    'alarma',
    'ξυπνητήρι',
    'συναγερμός',
    'budzik',
    'alarm',
  ];
}
