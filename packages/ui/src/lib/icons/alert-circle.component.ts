import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-alert-circle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path
        d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 4a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0V5zm.75 6.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>
  `,
})
export class AlertCircleIconComponent extends IconComponentBase {
  static readonly slug = 'alert-circle';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'alert-circle',
    'alert',
    'circle',
    'warning',
    'caution',
    'notification',
    'alerte',
    'avertissement',
    'alerta',
    'aviso',
    'ειδοποίηση',
    'προσοχή',
    'alarm',
    'ostrzeżenie',
  ];
}
