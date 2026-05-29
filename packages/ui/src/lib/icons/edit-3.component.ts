import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-edit-3',
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
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  `,
})
export class Edit3IconComponent extends IconComponentBase {
  static readonly slug = 'edit-3';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'edit-3',
    'edit',
    '3',
    'pencil',
    'modify',
    'write',
    'éditer',
    'crayon',
    'editar',
    'lápiz',
    'επεξεργασία',
    'μολύβι',
    'edytuj',
    'ołówek',
  ];
}
