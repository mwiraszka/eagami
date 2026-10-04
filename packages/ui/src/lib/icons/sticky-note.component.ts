import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-sticky-note',
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
      <path d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9z" />
      <path d="M15 3v6h6" />
    </svg>
  `,
})
export class StickyNoteIconComponent extends IconComponentBase {
  static readonly slug = 'sticky-note';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'sticky-note',
    'note',
    'memo',
    'reminder',
    'post-it',
    'annotation',
    'note adhésive',
    'mémo',
    'nota adhesiva',
    'recordatorio',
    'αυτοκόλλητη σημείωση',
    'υπενθύμιση',
    'karteczka',
    'notatka',
  ];
}
