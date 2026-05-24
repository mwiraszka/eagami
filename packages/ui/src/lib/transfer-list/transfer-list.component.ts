import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { ChevronLeftIconComponent } from '../icons/chevron-left.component';
import { ChevronRightIconComponent } from '../icons/chevron-right.component';
import { ChevronsLeftIconComponent } from '../icons/chevrons-left.component';
import { ChevronsRightIconComponent } from '../icons/chevrons-right.component';
import { TransferListItem } from './transfer-list.types';

export type TransferListSize = 'sm' | 'md' | 'lg';

/**
 * `<ea-transfer-list>` is a two-pane shuttle control for moving items between
 * a "source" set and a "target" set. The full pool of items lives in
 * `[items]`; the `selectedIds` model tracks which subset is currently on the
 * target side. Highlighted-for-transfer state is internal to the component —
 * a user clicks one or more rows to highlight them, then clicks one of the
 * four direction buttons to move them.
 *
 * Each pane is a `role="listbox"` with `aria-multiselectable="true"`; rows
 * are `role="option"` with `aria-selected`.
 */
@Component({
  selector: 'ea-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrl: './transfer-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ChevronLeftIconComponent,
    ChevronRightIconComponent,
    ChevronsLeftIconComponent,
    ChevronsRightIconComponent,
  ],
})
export class TransferListComponent {
  private readonly i18n = inject(EagamiI18nService);

  readonly items = input.required<readonly TransferListItem[]>();

  /** Ids currently on the target (right) side. */
  readonly selectedIds = model<readonly string[]>([]);

  /** Heading rendered above the source (left) pane. Omit to hide the heading row. */
  readonly sourceLabel = input<string>('');

  /** Heading rendered above the target (right) pane. Omit to hide the heading row. */
  readonly targetLabel = input<string>('');

  readonly size = input<TransferListSize>('md');

  readonly disabled = input<boolean>(false);

  protected readonly messages = this.i18n.messages;

  // Highlight state — which rows in each pane are currently "selected for
  // transfer" (visually checked, but not yet moved). Cleared after every
  // transfer so the user starts fresh on the next move.
  private readonly leftHighlighted = signal<ReadonlySet<string>>(new Set<string>());
  private readonly rightHighlighted = signal<ReadonlySet<string>>(new Set<string>());

  protected readonly sourceItems = computed(() => {
    const selected = new Set(this.selectedIds());
    return this.items().filter(item => !selected.has(item.id));
  });

  protected readonly targetItems = computed(() => {
    const selected = new Set(this.selectedIds());
    return this.items().filter(item => selected.has(item.id));
  });

  protected readonly canMoveRight = computed(() => {
    if (this.disabled()) return false;
    const highlighted = this.leftHighlighted();
    const allowed = new Set(
      this.sourceItems()
        .filter(i => !i.disabled)
        .map(i => i.id),
    );
    return Array.from(highlighted).some(id => allowed.has(id));
  });

  protected readonly canMoveAllRight = computed(() => {
    if (this.disabled()) return false;
    return this.sourceItems().some(i => !i.disabled);
  });

  protected readonly canMoveLeft = computed(() => {
    if (this.disabled()) return false;
    const highlighted = this.rightHighlighted();
    const allowed = new Set(
      this.targetItems()
        .filter(i => !i.disabled)
        .map(i => i.id),
    );
    return Array.from(highlighted).some(id => allowed.has(id));
  });

  protected readonly canMoveAllLeft = computed(() => {
    if (this.disabled()) return false;
    return this.targetItems().some(i => !i.disabled);
  });

  protected readonly hostClasses = computed(() => [
    'ea-transfer-list',
    `ea-transfer-list--${this.size()}`,
    this.disabled() ? 'ea-transfer-list--disabled' : '',
  ]);

  protected isHighlighted(pane: 'source' | 'target', id: string): boolean {
    const set = pane === 'source' ? this.leftHighlighted() : this.rightHighlighted();
    return set.has(id);
  }

  protected onItemClick(pane: 'source' | 'target', item: TransferListItem): void {
    if (this.disabled() || item.disabled) return;
    const signal = pane === 'source' ? this.leftHighlighted : this.rightHighlighted;
    const next = new Set(signal());
    if (next.has(item.id)) {
      next.delete(item.id);
    } else {
      next.add(item.id);
    }
    signal.set(next);
  }

  protected onItemKeydown(
    event: KeyboardEvent,
    pane: 'source' | 'target',
    item: TransferListItem,
  ): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.onItemClick(pane, item);
    }
  }

  protected moveSelectedRight(): void {
    if (!this.canMoveRight()) return;
    const highlighted = this.leftHighlighted();
    const sourceIds = new Set(
      this.sourceItems()
        .filter(i => !i.disabled)
        .map(i => i.id),
    );
    const toMove = Array.from(highlighted).filter(id => sourceIds.has(id));
    this.selectedIds.set([...this.selectedIds(), ...toMove]);
    this.leftHighlighted.set(new Set<string>());
  }

  protected moveAllRight(): void {
    if (!this.canMoveAllRight()) return;
    const moveable = this.sourceItems()
      .filter(i => !i.disabled)
      .map(i => i.id);
    this.selectedIds.set([...this.selectedIds(), ...moveable]);
    this.leftHighlighted.set(new Set<string>());
  }

  protected moveSelectedLeft(): void {
    if (!this.canMoveLeft()) return;
    const highlighted = this.rightHighlighted();
    const targetIds = new Set(
      this.targetItems()
        .filter(i => !i.disabled)
        .map(i => i.id),
    );
    const toRemove = new Set(Array.from(highlighted).filter(id => targetIds.has(id)));
    this.selectedIds.set(this.selectedIds().filter(id => !toRemove.has(id)));
    this.rightHighlighted.set(new Set<string>());
  }

  protected moveAllLeft(): void {
    if (!this.canMoveAllLeft()) return;
    const stickyIds = new Set(
      this.targetItems()
        .filter(i => i.disabled)
        .map(i => i.id),
    );
    this.selectedIds.set(this.selectedIds().filter(id => stickyIds.has(id)));
    this.rightHighlighted.set(new Set<string>());
  }
}
