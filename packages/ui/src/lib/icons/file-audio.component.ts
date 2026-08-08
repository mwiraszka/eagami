import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-file-audio',
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
      <line
        x1="8.5"
        y1="14.8"
        x2="8.5"
        y2="17.8" />
      <line
        x1="12"
        y1="12.8"
        x2="12"
        y2="19.3" />
      <line
        x1="15.5"
        y1="14.3"
        x2="15.5"
        y2="18.3" />
    </svg>
  `,
})
export class FileAudioIconComponent extends IconComponentBase {
  static readonly slug = 'file-audio';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'file audio',
    'sound file',
    'music file',
    'mp3',
    'wav',
    'fichier audio',
    'archivo de audio',
    'αρχείο ήχου',
    'plik audio',
  ];
}
