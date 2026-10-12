import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';

import { CheckIconComponent } from '../icons/check.component';
import type { EaSize } from '../sizes';

export type ToggleChipSize = EaSize;

/**
 * Pill-shaped toggle button for filters and feature pickers. Projected content,
 * an optional leading icon and a label, names it, and a check marks it as on,
 * so its state never rests on colour alone.
 */
@Component({
  selector: 'ea-toggle-chip',
  imports: [CheckIconComponent],
  templateUrl: './toggle-chip.component.html',
  styleUrl: './toggle-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleChipComponent {
  /** Whether the chip is on, two-way bindable via [(selected)]. */
  readonly selected = model<boolean>(false);
  readonly size = input<ToggleChipSize>('md');
  /** Disables the chip and blocks toggling. */
  readonly disabled = input<boolean>(false);
  /** Accessible label for a chip whose projected content has no visible text. */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  /** Id of an element that describes what the chip turns on, announced with its name. */
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: 'aria-describedby',
  });

  /** Fires with the new state whenever the user toggles the chip. */
  readonly changed = output<boolean>();

  protected readonly classes = computed(() => ({
    [`ea-toggle-chip--${this.size()}`]: true,
    'ea-toggle-chip--selected': this.selected(),
  }));

  protected toggle(): void {
    if (this.disabled()) {
      return;
    }
    const next = !this.selected();
    this.selected.set(next);
    this.changed.emit(next);
  }
}
