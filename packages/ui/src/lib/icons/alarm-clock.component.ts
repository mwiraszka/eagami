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
        r="8" />
      <path d="M12 9v4l2 2" />
      <path d="M5 3 2 6" />
      <path d="m22 6-3-3" />
      <path d="M6.38 18.7 4 21" />
      <path d="M17.64 18.67 20 21" />
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
