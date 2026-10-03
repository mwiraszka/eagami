import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-clipboard-list',
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
      <path
        d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect
        x="8"
        y="2"
        width="8"
        height="4"
        rx="1" />
      <path d="M8 11h8" />
      <path d="M8 14.5h8" />
      <path d="M8 18h4" />
    </svg>
  `,
})
export class ClipboardListIconComponent extends IconComponentBase {
  static readonly slug = 'clipboard-list';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'clipboard-list',
    'clipboard',
    'list',
    'tasks',
    'notes',
    'presse-papiers',
    'portapapeles',
    'πρόχειρο',
    'schowek',
  ];
}
