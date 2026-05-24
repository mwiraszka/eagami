import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-trash-2',
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
      <polyline points="3 6 5 6 21 6" />
      <path
        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line
        x1="10"
        y1="11"
        x2="10"
        y2="17" />
      <line
        x1="14"
        y1="11"
        x2="14"
        y2="17" />
    </svg>
  `,
})
export class Trash2IconComponent extends IconComponentBase {
  static readonly slug = 'trash-2';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'trash-2',
    'trash',
    '2',
    'delete',
    'remove',
    'bin',
    'garbage',
    'poubelle',
    'basura',
    'eliminar',
    'κάδος',
    'διαγραφή',
    'kosz',
    'usuń',
  ];
}
