import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-calendar-days',
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
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <path d="M8.5 14.25h.01" />
      <path d="M12 14.25h.01" />
      <path d="M15.5 14.25h.01" />
      <path d="M8.5 17.75h.01" />
      <path d="M12 17.75h.01" />
      <path d="M15.5 17.75h.01" />
    </svg>
  `,
})
export class CalendarDaysIconComponent extends IconComponentBase {
  static readonly slug = 'calendar-days';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'calendar-days',
    'calendar',
    'date',
    'schedule',
    'month',
    'calendrier',
    'calendario',
    'ημερολόγιο',
    'kalendarz',
  ];
}
