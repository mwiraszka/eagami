import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

/**
 * @deprecated Will be removed in v2.0.0. The `pencil` icon depicts the same
 * mark as Feather's canonical `edit-2` (with a marginally different cap
 * curvature) and is being retired as redundant. Switch to `<ea-icon-edit-2>`
 * / `Edit2IconComponent`.
 */
@Component({
  selector: 'ea-icon-pencil',
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
      <path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  `,
})
export class PencilIconComponent extends IconComponentBase {
  static readonly slug = 'pencil';
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
