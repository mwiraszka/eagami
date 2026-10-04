import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-kanban',
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
        x="2"
        y="3"
        width="5"
        height="18"
        rx="1.5" />
      <rect
        x="9.5"
        y="3"
        width="5"
        height="11"
        rx="1.5" />
      <rect
        x="17"
        y="3"
        width="5"
        height="15"
        rx="1.5" />
    </svg>
  `,
})
export class KanbanIconComponent extends IconComponentBase {
  static readonly slug = 'kanban';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'kanban',
    'board',
    'columns',
    'tasks',
    'project',
    'workflow',
    'tableau',
    'tâches',
    'tablero',
    'tareas',
    'πίνακας',
    'εργασίες',
    'tablica',
    'zadania',
  ];
}
