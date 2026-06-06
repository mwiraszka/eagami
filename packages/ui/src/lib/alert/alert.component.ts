import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type Type,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { AlertCircleIconComponent } from '../icons/alert-circle.component';
import { CheckIconComponent } from '../icons/check.component';
import { InfoIconComponent } from '../icons/info.component';
import { XIconComponent } from '../icons/x.component';

/** Semantic colour scheme of an alert. Drives icon and palette. */
export type AlertVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

/** Scales the alert's text, icon, and gap together. */
export type AlertSize = 'sm' | 'md' | 'lg';

/**
 * Inline banner for surfacing semantic messages such as success confirmations,
 * warnings, or errors. Optionally dismissible, with a two-way `visible`
 * binding and an automatically chosen ARIA role based on severity.
 */
@Component({
  selector: 'ea-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AlertCircleIconComponent,
    CheckIconComponent,
    InfoIconComponent,
    XIconComponent,
    NgClass,
    NgComponentOutlet,
  ],
})
export class AlertComponent {
  protected readonly i18n = inject(EagamiI18nService);

  readonly variant = input<AlertVariant>('default');
  readonly size = input<AlertSize>('md');
  readonly dismissible = input<boolean>(false);
  readonly visible = model<boolean>(true);

  /** Overrides the variant's default status icon with any icon component. */
  readonly icon = input<Type<unknown> | undefined>(undefined);

  /** Fires when the user dismisses the alert via its close button. */
  readonly dismissed = output<void>();

  readonly alertClasses = computed(() => ({
    [`ea-alert--${this.variant()}`]: true,
    [`ea-alert--${this.size()}`]: true,
  }));

  readonly role = computed(() => {
    const v = this.variant();
    return v === 'error' || v === 'warning' ? 'alert' : 'status';
  });

  /** Hides the alert and emits `dismissed`. */
  dismiss(): void {
    this.visible.set(false);
    this.dismissed.emit();
  }
}
