import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-calendar-clock',
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
      <path d="M16 14v2.2l1.6 1" />
      <path d="M16 2v3" />
      <path d="M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338" />
      <path d="M3 9h5.859" />
      <path d="M8 2v3" />
      <circle
        cx="16"
        cy="16"
        r="6" />
    </svg>
  `,
})
export class CalendarClockIconComponent extends IconComponentBase {
  static readonly slug = 'calendar-clock';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'calendar-clock',
    'schedule',
    'appointment',
    'deadline',
    'event',
    'time',
    'planifier',
    'rendez-vous',
    'programar',
    'cita',
    'προγραμματισμός',
    'ραντεβού',
    'harmonogram',
    'termin',
  ];
}
