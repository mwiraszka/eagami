import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-calendar-plus',
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
      <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <path d="M18 15v6" />
      <path d="M15 18h6" />
    </svg>
  `,
})
export class CalendarPlusIconComponent extends IconComponentBase {
  static readonly slug = 'calendar-plus';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'calendar-plus',
    'calendar',
    'add',
    'event',
    'schedule',
    'new',
    'calendrier',
    'ajouter',
    'calendario',
    'añadir',
    'ημερολόγιο',
    'προσθήκη',
    'kalendarz',
    'dodaj',
  ];
}
