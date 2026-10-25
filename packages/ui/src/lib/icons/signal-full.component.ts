import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-signal-full',
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
      <path d="M4.5 19.5v-3" />
      <path d="M9.5 19.5v-7" />
      <path d="M14.5 19.5v-11" />
      <path d="M19.5 19.5v-15" />
    </svg>
  `,
})
export class SignalFullIconComponent extends IconComponentBase {
  static readonly slug = 'signal-full';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'signal-full',
    'full signal',
    'excellent',
    'strength',
    'signal',
    'cellular',
    'reception',
    'network',
    'mobile',
    'bars',
    'réseau',
    'réception',
    'señal',
    'cobertura',
    'σήμα',
    'λήψη',
    'sygnał',
    'zasięg',
  ];
}
