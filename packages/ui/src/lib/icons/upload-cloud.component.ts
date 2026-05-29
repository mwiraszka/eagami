import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-upload-cloud',
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
      <polyline points="16 16 12 12 8 16" />
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
      <polyline points="16 16 12 12 8 16" />
    </svg>
  `,
})
export class UploadCloudIconComponent extends IconComponentBase {
  static readonly slug = 'upload-cloud';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'upload-cloud',
    'upload',
    'cloud',
    'send',
    'sync',
    'backup',
    'téléverser',
    'nuage',
    'subir',
    'nube',
    'μεταφόρτωση',
    'σύννεφο',
    'prześlij',
    'chmura',
  ];
}
