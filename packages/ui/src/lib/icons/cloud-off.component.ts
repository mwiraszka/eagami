import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-cloud-off',
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
        d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3" />
      <line
        x1="1"
        y1="1"
        x2="23"
        y2="23" />
    </svg>
  `,
})
export class CloudOffIconComponent extends IconComponentBase {
  static readonly slug = 'cloud-off';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'cloud-off',
    'cloud',
    'off',
    'offline',
    'disconnected',
    'disabled',
    'nuage',
    'déconnecté',
    'nube',
    'desconectado',
    'σύννεφο',
    'εκτός σύνδεσης',
    'chmura',
    'wyłączony',
  ];
}
