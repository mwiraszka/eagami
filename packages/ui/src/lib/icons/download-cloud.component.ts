import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-download-cloud',
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
      <polyline points="8 17 12 21 16 17" />
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="21" />
      <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
    </svg>
  `,
})
export class DownloadCloudIconComponent extends IconComponentBase {
  static readonly slug = 'download-cloud';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'download-cloud',
    'download',
    'cloud',
    'save',
    'sync',
    'télécharger',
    'nuage',
    'descargar',
    'nube',
    'λήψη',
    'σύννεφο',
    'pobierz',
    'chmura',
  ];
}
