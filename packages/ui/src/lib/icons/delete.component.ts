import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-delete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
      <line
        x1="18"
        y1="9"
        x2="12"
        y2="15" />
      <line
        x1="12"
        y1="9"
        x2="18"
        y2="15" />
    </svg>
  `,
})
export class DeleteIconComponent extends IconComponentBase {
  static readonly slug = 'delete';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'delete',
    'remove',
    'erase',
    'backspace',
    'clear',
    'supprimer',
    'effacer',
    'eliminar',
    'borrar',
    'διαγραφή',
    'usuń',
    'kasuj',
  ];
}
