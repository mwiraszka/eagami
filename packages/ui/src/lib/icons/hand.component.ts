import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-hand',
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
      <path d="M8 15V5.5a1.5 1.5 0 0 1 3 0v6" />
      <path d="M11 5.5v-2a1.5 1.5 0 0 1 3 0v8" />
      <path d="M14 4.5a1.5 1.5 0 0 1 3 0v7" />
      <path
        d="M17 7a1.5 1.5 0 0 1 3 0v8a6.5 6.5 0 0 1-6.5 6.5H12c-1.9 0-3.4-.7-4.6-2l-3.3-4.1a1.5 1.5 0 0 1 2.3-1.9L8 15" />
    </svg>
  `,
})
export class HandIconComponent extends IconComponentBase {
  static readonly slug = 'hand';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'hand',
    'pan',
    'grab',
    'move',
    'drag',
    'stop',
    'main',
    'déplacer',
    'mano',
    'desplazar',
    'χέρι',
    'μετακίνηση',
    'dłoń',
    'przesuń',
  ];
}
