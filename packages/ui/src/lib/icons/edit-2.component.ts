import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-edit-2',
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
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  `,
})
export class Edit2IconComponent extends IconComponentBase {
  static readonly slug = 'edit-2';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'edit-2',
    'edit',
    '2',
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
