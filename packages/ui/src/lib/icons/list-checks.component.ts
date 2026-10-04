import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-list-checks',
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
      <path d="m3 6.5 1.5 1.5 3-3.5" />
      <path d="m3 12.5 1.5 1.5 3-3.5" />
      <path d="m3 18.5 1.5 1.5 3-3.5" />
      <path d="M11 6h10" />
      <path d="M11 12h10" />
      <path d="M11 18h10" />
    </svg>
  `,
})
export class ListChecksIconComponent extends IconComponentBase {
  static readonly slug = 'list-checks';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'list-checks',
    'checklist',
    'tasks',
    'todo',
    'done',
    'liste',
    'lista',
    'λίστα',
    'lista',
  ];
}
