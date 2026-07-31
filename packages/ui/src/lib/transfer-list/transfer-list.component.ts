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
import { type EaSize } from '../sizes';
import type { TransferListItem } from './transfer-list.types';

export type TransferListSize = EaSize;

/**
 * `<ea-transfer-list>` is a two-pane shuttle control for moving items between
 * a "source" set and a "target" set. The full pool of items lives in
 * `[items]`; the `selectedIds` model tracks which subset is currently on the
 * target side. Highlighted-for-transfer state is internal to the component:
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

  /**
   * Heading rendered above the source (left) pane. Defaults to the localized
   * `transferList.sourceLabel` from i18n; pass an explicit empty string to
   * hide the heading row entirely.
   */
  readonly sourceLabel = input<string | undefined>(undefined);

  /**
   * Heading rendered above the target (right) pane. Defaults to the localized
   * `transferList.targetLabel` from i18n; pass an explicit empty string to
   * hide the heading row entirely.
   */
  readonly targetLabel = input<string | undefined>(undefined);

  readonly size = input<TransferListSize>('md');

  readonly disabled = input<boolean>(false);

  protected readonly messages = this.i18n.messages;

  // Highlight state: which rows in each pane are currently "selected for
  // transfer" (visually checked, but not yet moved). Cleared after every
  // transfer so the user starts fresh on the next move.
  private readonly leftHighlighted = signal<ReadonlySet<string>>(new Set<string>());
  private readonly rightHighlighted = signal<ReadonlySet<string>>(new Set<string>());

  // Per-pane "anchor" id: the last item the user clicked without Shift.
  // Shift-click on another item selects the range from anchor to target,
  // matching the standard list-selection convention (Windows Explorer,
  // macOS Finder, every file picker).
  private readonly leftAnchor = signal<string | null>(null);
  private readonly rightAnchor = signal<string | null>(null);

  // Roving tabindex: one option per pane is tabbable; arrows move it
  private readonly leftActiveId = signal<string | null>(null);
  private readonly rightActiveId = signal<string | null>(null);

  private readonly leftActiveIndex = computed(() =>
    this.resolveActiveIndex(this.sourceItems(), this.leftActiveId()),
  );
  private readonly rightActiveIndex = computed(() =>
    this.resolveActiveIndex(this.targetItems(), this.rightActiveId()),
  );

  protected readonly sourceItems = computed(() => {
    const selected = new Set(this.selectedIds());
    return this.items().filter(item => !selected.has(item.id));
  });

  protected readonly targetItems = computed(() => {
    const selected = new Set(this.selectedIds());
    return this.items().filter(item => selected.has(item.id));
  });

  protected readonly canMoveRight = computed(() => {
    if (this.disabled()) {
      return false;
    }
    const highlighted = this.leftHighlighted();
    const allowed = new Set(
      this.sourceItems()
        .filter(i => !i.disabled)
        .map(i => i.id),
    );
    return Array.from(highlighted).some(id => allowed.has(id));
  });

  protected readonly canMoveAllRight = computed(() => {
    if (this.disabled()) {
      return false;
    }
    return this.sourceItems().some(i => !i.disabled);
  });

  protected readonly canMoveLeft = computed(() => {
    if (this.disabled()) {
      return false;
    }
    const highlighted = this.rightHighlighted();
    const allowed = new Set(
      this.targetItems()
        .filter(i => !i.disabled)
        .map(i => i.id),
    );
    return Array.from(highlighted).some(id => allowed.has(id));
  });

  protected readonly canMoveAllLeft = computed(() => {
    if (this.disabled()) {
      return false;
    }
    return this.targetItems().some(i => !i.disabled);
  });

  protected readonly resolvedSourceLabel = computed(
    () => this.sourceLabel() ?? this.messages().transferList.sourceLabel,
  );

  protected readonly resolvedTargetLabel = computed(
    () => this.targetLabel() ?? this.messages().transferList.targetLabel,
  );

  // Moves rearrange both panes at once, which a screen reader has no way to
  // report on its own, so each transfer is summarized in a live region.
  protected readonly announcement = signal('');

  protected readonly hostClasses = computed(() => [
    'ea-transfer-list',
    `ea-transfer-list--${this.size()}`,
    this.disabled() ? 'ea-transfer-list--disabled' : '',
  ]);

  protected isHighlighted(pane: 'source' | 'target', id: string): boolean {
    const set = pane === 'source' ? this.leftHighlighted() : this.rightHighlighted();
    return set.has(id);
  }

  protected itemTabindex(
    pane: 'source' | 'target',
    index: number,
    item: TransferListItem,
  ): number {
    if (item.disabled || this.disabled()) {
      return -1;
    }
    const activeIndex =
      pane === 'source' ? this.leftActiveIndex() : this.rightActiveIndex();
    return index === activeIndex ? 0 : -1;
  }

  protected onItemClick(
    pane: 'source' | 'target',
    item: TransferListItem,
    event: MouseEvent,
  ): void {
    if (this.disabled() || item.disabled) {
      return;
    }
    this.setActive(pane, item.id);
    if (event.shiftKey) {
      this.selectRangeTo(pane, item);
    } else {
      this.toggleHighlight(pane, item);
    }
  }

  protected onItemKeydown(
    event: KeyboardEvent,
    pane: 'source' | 'target',
    item: TransferListItem,
  ): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (event.shiftKey) {
        this.selectRangeTo(pane, item);
      } else {
        this.toggleHighlight(pane, item);
      }
      return;
    }

    const items = pane === 'source' ? this.sourceItems() : this.targetItems();
    const currentIndex = items.findIndex(i => i.id === item.id);
    let nextIndex: number;
    switch (event.key) {
      case 'ArrowDown':
        nextIndex = this.nextEnabledIndex(items, currentIndex, 1);
        break;
      case 'ArrowUp':
        nextIndex = this.nextEnabledIndex(items, currentIndex, -1);
        break;
      case 'Home':
        nextIndex = items.findIndex(i => !i.disabled);
        break;
      case 'End':
        nextIndex = this.nextEnabledIndex(items, items.length, -1);
        break;
      default:
        return;
    }

    event.preventDefault();
    if (nextIndex < 0) {
      return;
    }
    this.setActive(pane, items[nextIndex].id);
    this.focusOption(event, nextIndex);
  }

  private resolveActiveIndex(
    items: readonly TransferListItem[],
    activeId: string | null,
  ): number {
    const index = items.findIndex(i => i.id === activeId && !i.disabled);
    return index >= 0 ? index : items.findIndex(i => !i.disabled);
  }

  private nextEnabledIndex(
    items: readonly TransferListItem[],
    from: number,
    step: 1 | -1,
  ): number {
    for (let i = from + step; i >= 0 && i < items.length; i += step) {
      if (!items[i].disabled) {
        return i;
      }
    }
    return from >= 0 && from < items.length ? from : -1;
  }

  private setActive(pane: 'source' | 'target', id: string): void {
    const active = pane === 'source' ? this.leftActiveId : this.rightActiveId;
    active.set(id);
  }

  private focusOption(event: KeyboardEvent, index: number): void {
    const list = (event.currentTarget as HTMLElement).closest('[role="listbox"]');
    const options = list?.querySelectorAll<HTMLElement>('[role="option"]');
    options?.[index]?.focus();
  }

  private toggleHighlight(pane: 'source' | 'target', item: TransferListItem): void {
    const highlight = pane === 'source' ? this.leftHighlighted : this.rightHighlighted;
    const anchor = pane === 'source' ? this.leftAnchor : this.rightAnchor;
    const next = new Set(highlight());
    if (next.has(item.id)) {
      next.delete(item.id);
    } else {
      next.add(item.id);
    }
    highlight.set(next);
    anchor.set(item.id);
  }

  private selectRangeTo(pane: 'source' | 'target', item: TransferListItem): void {
    const highlight = pane === 'source' ? this.leftHighlighted : this.rightHighlighted;
    const anchor = pane === 'source' ? this.leftAnchor : this.rightAnchor;
    const items = pane === 'source' ? this.sourceItems() : this.targetItems();
    const anchorId = anchor();
    /* If there is no anchor yet (or the anchor row has been moved to the
       other pane), fall back to a single-row toggle so Shift-click never
       feels broken. */
    const anchorIdx = anchorId === null ? -1 : items.findIndex(i => i.id === anchorId);
    const currentIdx = items.findIndex(i => i.id === item.id);
    if (anchorIdx < 0 || currentIdx < 0) {
      this.toggleHighlight(pane, item);
      return;
    }
    const [start, end] =
      anchorIdx <= currentIdx ? [anchorIdx, currentIdx] : [currentIdx, anchorIdx];
    const next = new Set(highlight());
    for (let i = start; i <= end; i++) {
      const row = items[i];
      if (!row.disabled) {
        next.add(row.id);
      }
    }
    highlight.set(next);
    // Anchor stays put on shift-click so successive shift-clicks always
    // extend from the original anchor (matching native list behaviour).
  }

  protected moveSelectedRight(): void {
    if (!this.canMoveRight()) {
      return;
    }
    const highlighted = this.leftHighlighted();
    const sourceIds = new Set(
      this.sourceItems()
        .filter(i => !i.disabled)
        .map(i => i.id),
    );
    const toMove = Array.from(highlighted).filter(id => sourceIds.has(id));
    this.selectedIds.set([...this.selectedIds(), ...toMove]);
    this.leftHighlighted.set(new Set<string>());
    this.announceMove(toMove.length, this.resolvedTargetLabel());
  }

  protected moveAllRight(): void {
    if (!this.canMoveAllRight()) {
      return;
    }
    const moveable = this.sourceItems()
      .filter(i => !i.disabled)
      .map(i => i.id);
    this.selectedIds.set([...this.selectedIds(), ...moveable]);
    this.leftHighlighted.set(new Set<string>());
    this.announceMove(moveable.length, this.resolvedTargetLabel());
  }

  protected moveSelectedLeft(): void {
    if (!this.canMoveLeft()) {
      return;
    }
    const highlighted = this.rightHighlighted();
    const targetIds = new Set(
      this.targetItems()
        .filter(i => !i.disabled)
        .map(i => i.id),
    );
    const toRemove = new Set(Array.from(highlighted).filter(id => targetIds.has(id)));
    this.selectedIds.set(this.selectedIds().filter(id => !toRemove.has(id)));
    this.rightHighlighted.set(new Set<string>());
    this.announceMove(toRemove.size, this.resolvedSourceLabel());
  }

  protected moveAllLeft(): void {
    if (!this.canMoveAllLeft()) {
      return;
    }
    const stickyIds = new Set(
      this.targetItems()
        .filter(i => i.disabled)
        .map(i => i.id),
    );
    const movedCount = this.targetItems().filter(i => !i.disabled).length;
    this.selectedIds.set(this.selectedIds().filter(id => stickyIds.has(id)));
    this.rightHighlighted.set(new Set<string>());
    this.announceMove(movedCount, this.resolvedSourceLabel());
  }

  private announceMove(count: number, listLabel: string): void {
    if (count > 0) {
      this.announcement.set(this.messages().transferList.moved(`${count}`, listLabel));
    }
  }
}
