import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { uniqueId } from '../unique-id';
import { RadioGroupComponent } from './radio-group.component';

/**
 * Single radio option used inside an `ea-radio-group`. Inherits its size and
 * disabled state from the parent group and selecting it updates the group's
 * value.
 */
@Component({
  selector: 'ea-radio',
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class RadioComponent {
  private readonly group = inject(RadioGroupComponent);

  readonly value = input.required<string>();
  readonly label = input<string | undefined>(undefined);
  readonly disabled = input<boolean>(false);
  readonly id = input<string>(uniqueId('ea-radio-opt'));

  readonly isChecked = computed(() => this.group.value() === this.value());
  readonly isDisabled = computed(() => this.disabled() || this.group.isDisabled());
  readonly name = computed(() => this.group.name());
  readonly size = computed(() => this.group.size());

  readonly hostClasses = computed(() => ({
    [`ea-radio--${this.size()}`]: true,
    'ea-radio--disabled': this.isDisabled(),
    'ea-radio--checked': this.isChecked(),
  }));

  handleChange(): void {
    if (this.isDisabled()) {
      return;
    }
    this.group.select(this.value());
  }
}
