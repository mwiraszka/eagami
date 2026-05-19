import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-link-2',
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
      <path
        d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3" />
      <line
        x1="8"
        y1="12"
        x2="16"
        y2="12" />
    </svg>
  `,
})
export class Link2IconComponent extends IconComponentBase {
  static readonly slug = 'link-2';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'link-2',
    'link',
    '2',
    'chain',
    'url',
    'connect',
    'hyperlink',
    'lien',
    'enlace',
    'σύνδεσμος',
    'link',
    'połączenie',
  ];
}
