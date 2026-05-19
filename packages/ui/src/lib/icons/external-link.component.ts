import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-external-link',
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
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line
        x1="10"
        y1="14"
        x2="21"
        y2="3" />
    </svg>
  `,
})
export class ExternalLinkIconComponent extends IconComponentBase {
  static readonly slug = 'external-link';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'external-link',
    'external',
    'link',
    'open',
    'new',
    'tab',
    'lien',
    'externe',
    'enlace',
    'externo',
    'εξωτερικός',
    'σύνδεσμος',
    'zewnętrzny',
    'link',
  ];
}
