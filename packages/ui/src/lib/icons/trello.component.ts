import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-trello',
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
        y="3"
        width="18"
        height="18"
        rx="2"
        ry="2" />
      <rect
        x="7"
        y="7"
        width="3"
        height="9" />
      <rect
        x="14"
        y="7"
        width="3"
        height="5" />
    </svg>
  `,
})
export class TrelloIconComponent extends IconComponentBase {
  static readonly slug = 'trello';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'trello',
    'board',
    'kanban',
    'project',
    'task',
    'productivity',
    'atlassian',
    'cards',
  ];
}
