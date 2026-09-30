import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-pipette',
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
      <path d="M10 9l-3 3-.5 3.5 3.5-.5 3-3" />
      <path
        d="m16 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z" />
      <path
        d="M6.5 18.5c-.8 1-1.6 1.9-1.6 2.8a1.6 1.6 0 0 0 3.2 0c0-.9-.8-1.8-1.6-2.8z" />
    </svg>
  `,
})
export class PipetteIconComponent extends IconComponentBase {
  static readonly slug = 'pipette';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'pipette',
    'eyedropper',
    'color picker',
    'sample',
    'dropper',
    'pick color',
    'compte-gouttes',
    'sélecteur de couleur',
    'cuentagotas',
    'selector de color',
    'σταγονόμετρο',
    'επιλογή χρώματος',
    'pipeta',
    'próbnik koloru',
  ];
}
