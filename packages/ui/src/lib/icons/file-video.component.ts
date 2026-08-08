import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-file-video',
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
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
      <polygon points="9.8 13.5 15.3 16.5 9.8 19.5" />
    </svg>
  `,
})
export class FileVideoIconComponent extends IconComponentBase {
  static readonly slug = 'file-video';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'file video',
    'movie file',
    'clip',
    'mp4',
    'mov',
    'fichier vidéo',
    'archivo de vídeo',
    'αρχείο βίντεο',
    'plik wideo',
  ];
}
