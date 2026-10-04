import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-unlink',
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
        d="m17.21 11.03 2.82-2.82a3 3 0 0 0-4.24-4.24l-2.82 2.82a3 3 0 0 0 4.24 4.24z" />
      <path
        d="m6.79 12.97-2.82 2.82a3 3 0 0 0 4.24 4.24l2.82-2.82a3 3 0 0 0-4.24-4.24z" />
      <path d="m7 7 1.5 1.5" />
      <path d="m17 17-1.5-1.5" />
    </svg>
  `,
})
export class UnlinkIconComponent extends IconComponentBase {
  static readonly slug = 'unlink';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'unlink',
    'link',
    'detach',
    'disconnect',
    'remove',
    'dissocier',
    'lien',
    'desvincular',
    'enlace',
    'αποσύνδεση',
    'σύνδεσμος',
    'odłącz',
    'link',
  ];
}
