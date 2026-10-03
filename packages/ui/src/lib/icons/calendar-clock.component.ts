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
      <path d="M21 11V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <circle
        cx="17.5"
        cy="17.5"
        r="4.5" />
      <path d="M17.5 15v2.5l1.5 1" />
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
