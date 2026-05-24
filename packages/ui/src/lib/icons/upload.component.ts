import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-upload',
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line
        x1="12"
        y1="3"
        x2="12"
        y2="15" />
    </svg>
  `,
})
export class UploadIconComponent extends IconComponentBase {
  static readonly slug = 'upload';
  static readonly category: IconCategory = 'feather';
  static override readonly defaultStrokeWidth = 1.5;
  static readonly tags: ReadonlyArray<string> = [
    'upload',
    'send',
    'arrow',
    'share',
    'submit',
    'téléverser',
    'envoyer',
    'subir',
    'cargar',
    'μεταφόρτωση',
    'ανέβασμα',
    'prześlij',
    'wgraj',
  ];
}
