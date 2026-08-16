import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { SearchIconComponent } from '../icons/search.component';
import { InputComponent } from '../input/input.component';
import { PointerPressTracker } from '../pointer-press';
import { uniqueId } from '../unique-id';
import type { CommandPaletteItem } from './command-palette.types';

interface PaletteEntry {
  item: CommandPaletteItem;
  flatIndex: number;
  disabled: boolean;
}

interface GroupedItems {
  group: string;
  items: readonly PaletteEntry[];
}

/**
 * `<ea-command-palette>` is a search-driven action launcher: a modal dialog
 * containing a search input and a filtered list of commands. Designed for
 * `Cmd/Ctrl + K`-style global menus.
 *
 * The component does NOT bind global shortcuts; the consumer wires up
 * whatever trigger they want and toggles `[(open)]`. Each selected command
 * is emitted via `(execute)`; the palette closes automatically afterwards.
 *
 * Items can be grouped via the `group` field; ungrouped items render first.
 * The active row is tracked via roving `aria-activedescendant` on the search
 * input, which is the canonical ARIA combobox-with-listbox pattern.
 */
@Component({
  selector: 'ea-command-palette',
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NgComponentOutlet, NgTemplateOutlet, InputComponent],
})
export class CommandPaletteComponent {
  private readonly i18n = inject(EagamiI18nService);
  private readonly hostEl = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly press = inject(PointerPressTracker);

  readonly items = input.required<readonly CommandPaletteItem[]>();

  readonly open = model<boolean>(false);

  readonly placeholder = input<string>('');

  readonly emptyMessage = input<string>('');

  /**
   * Optional predicate that disables every item it returns `true` for, in
   * addition to each item's own `disabled` flag.
   */
  readonly disabledWhen = input<(item: CommandPaletteItem) => boolean>();

  readonly execute = output<CommandPaletteItem>();

  protected readonly messages = this.i18n.messages;

  protected readonly resolvedPlaceholder = computed(
    () => this.placeholder() || this.messages().commandPalette.searchPlaceholder,
  );

  private readonly dialogEl = viewChild<ElementRef<HTMLDialogElement>>('dialogEl');
  private readonly searchEl = viewChild<InputComponent>('searchEl');

  protected readonly searchIcon = SearchIconComponent;

  protected readonly query = signal<string>('');

  protected readonly listboxId = uniqueId('ea-command-palette-listbox');

  /**
   * Items bucketed by `group`, then flattened back into display order
   * (ungrouped items first, then each named group). The matching
   * `filteredEntries` array follows this same order so `flatIndex` lines up
   * one-to-one with what the user sees. Each entry resolves its disabled state
   * once here, so a consumer's `disabledWhen` runs once per match rather than
   * on every binding read.
   */
  protected readonly groupedItems = computed<GroupedItems[]>(() => {
    const q = this.query().trim().toLowerCase();
    const disabledWhen = this.disabledWhen();
    const candidates = this.items().filter(item => {
      if (!q) {
        return true;
      }
      const haystack = [item.label, item.description ?? '', ...(item.keywords ?? [])]
        .join(' ')
        .toLowerCase();
      // Match when the query is a prefix of any word in the haystack.
      // Substring-anywhere matching would surface confusing results (typing
      // "c" matching "Repla*c*e" via a mid-word character); word-boundary
      // matching keeps results predictable.
      return haystack.split(/[\s\-_]+/).some(word => word.startsWith(q));
    });

    const buckets = new Map<string, CommandPaletteItem[]>();
    for (const item of candidates) {
      const key = item.group ?? '';
      if (!buckets.has(key)) {
        buckets.set(key, []);
      }
      buckets.get(key)!.push(item);
    }

    const groups: GroupedItems[] = [];
    let flatIndex = 0;
    const pushGroup = (group: string, items: CommandPaletteItem[]) => {
      groups.push({
        group,
        items: items.map(item => ({
          item,
          flatIndex: flatIndex++,
          disabled: !!item.disabled || !!disabledWhen?.(item),
        })),
      });
    };

    const ungrouped = buckets.get('');
    if (ungrouped && ungrouped.length > 0) {
      pushGroup('', ungrouped);
    }
    for (const [group, items] of buckets) {
      if (group !== '') {
        pushGroup(group, items);
      }
    }
    return groups;
  });

  /**
   * Flat list of matches in display order. Drives keyboard navigation and
   * `aria-activedescendant`.
   */
  protected readonly filteredEntries = computed(() =>
    this.groupedItems().flatMap(group => group.items),
  );

  private readonly _activeIndex = signal<number>(0);

  /**
   * Tracks what the user last did so the visual highlight only renders when
   * it actually reflects what a click/Enter would select right now:
   *  - `keyboard`: keyboard nav (or just-opened / just-typed): show the
   *    active item's background so keyboard users see what Enter will pick.
   *  - `mouse`: pointer is moving inside the list: rely on `:hover` for the
   *    visual; skip the active-row background to avoid two highlights.
   *  - `none`: pointer is outside the list and no keyboard nav has happened
   *    since: nothing is highlighted, because nothing on screen is a
   *    next-click target.
   */
  private readonly interaction = signal<'keyboard' | 'mouse' | 'none'>('keyboard');

  protected readonly activeIndex = computed(() => {
    const entries = this.filteredEntries();
    if (entries.length === 0) {
      return -1;
    }
    // Open/filter resets pin the index at 0, which may be a disabled row;
    // resolve to the nearest enabled one, preferring the next row down
    const start = Math.min(this._activeIndex(), entries.length - 1);
    const forward = this.firstEnabled(start, 1);
    return forward >= 0 ? forward : this.firstEnabled(start - 1, -1);
  });

  protected readonly activeId = computed(() => {
    const idx = this.activeIndex();
    if (idx < 0) {
      return undefined;
    }
    return `ea-command-palette-item-${this.filteredEntries()[idx].item.id}`;
  });

  constructor() {
    /* When the palette opens, focus the search input and reset state. The
       dialog needs an extra tick to call `showModal()` before the input is
       focusable, so queue the focus into a microtask. */
    effect(() => {
      const isOpen = this.open();
      const dialog = this.dialogEl()?.nativeElement;
      if (!dialog) {
        return;
      }

      if (isOpen) {
        if (!dialog.open) {
          dialog.showModal?.();
        }
        this.query.set('');
        this._activeIndex.set(0);
        this.interaction.set('keyboard');
        queueMicrotask(() => this.searchEl()?.focus());
      } else if (dialog.open) {
        dialog.close();
      }
    });
  }

  protected itemDomId(item: CommandPaletteItem): string {
    return `ea-command-palette-item-${item.id}`;
  }

  /** Index of the first enabled entry from `start`, walking in `step`; -1 when none. */
  private firstEnabled(start: number, step: 1 | -1): number {
    const entries = this.filteredEntries();
    for (let idx = start; idx >= 0 && idx < entries.length; idx += step) {
      if (!entries[idx].disabled) {
        return idx;
      }
    }
    return -1;
  }

  protected isActive(flatIndex: number): boolean {
    return this.activeIndex() === flatIndex;
  }

  /**
   * Whether the active row should render its highlighted background right
   * now. False when the pointer is hovering the list (`:hover` handles the
   * visual) or when the pointer is out of the list entirely (nothing is a
   * next-click target).
   */
  protected showActiveHighlight(flatIndex: number): boolean {
    return this.interaction() === 'keyboard' && this.isActive(flatIndex);
  }

  protected onQueryChange(value: string): void {
    this.query.set(value);
    this._activeIndex.set(0);
    // Typing implies keyboard intent; surface the first match so the user
    // knows what Enter would pick without having to mouse over.
    this.interaction.set('keyboard');
  }

  protected onSearchKeydown(event: KeyboardEvent): void {
    /* Bound on the field host, which also contains the clear button; keys
       pressed there must reach the button rather than drive the list. */
    if (event.target !== this.searchEl()?.inputEl()?.nativeElement) {
      return;
    }
    if (this.filteredEntries().length === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        this.moveActive(1);
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        this.moveActive(-1);
        break;
      }
      case 'Home': {
        event.preventDefault();
        this.edgeActive(1);
        break;
      }
      case 'End': {
        event.preventDefault();
        this.edgeActive(-1);
        break;
      }
      case 'Enter': {
        event.preventDefault();
        const entry = this.filteredEntries()[this.activeIndex()];
        if (entry) {
          this.executeItem(entry);
        }
        break;
      }
    }
  }

  /** Wrapping arrow-key move that skips disabled items. */
  private moveActive(delta: 1 | -1): void {
    const entries = this.filteredEntries();
    let idx = this.activeIndex();
    for (let i = 0; i < entries.length; i++) {
      idx = (idx + delta + entries.length) % entries.length;
      if (!entries[idx].disabled) {
        this.setActiveByKeyboard(idx);
        return;
      }
    }
  }

  /** Home/End move to the first enabled item from the given end. */
  private edgeActive(direction: 1 | -1): void {
    const start = direction === 1 ? 0 : this.filteredEntries().length - 1;
    const idx = this.firstEnabled(start, direction);
    if (idx >= 0) {
      this.setActiveByKeyboard(idx);
    }
  }

  private setActiveByKeyboard(idx: number): void {
    this._activeIndex.set(idx);
    this.interaction.set('keyboard');
    this.scrollActiveIntoView();
  }

  protected onItemClick(entry: PaletteEntry): void {
    this.executeItem(entry);
  }

  protected onItemMouseEnter(entry: PaletteEntry): void {
    if (entry.disabled) {
      return;
    }
    this._activeIndex.set(entry.flatIndex);
    this.interaction.set('mouse');
  }

  protected onListMouseLeave(): void {
    /* Once the pointer leaves the list, no item is a candidate for the next
       click, so drop the keyboard-highlight too. A subsequent keyboard nav
       will restore it. */
    this.interaction.set('none');
  }

  protected onBackdropClick(event: MouseEvent): void {
    /* Native `<dialog>` clicks land on the dialog itself when the user clicks
       the backdrop; clicks inside content bubble up via the panel. So a click
       whose target IS the dialog element means the user clicked the backdrop,
       unless the press behind it touched the panel at either end: the dialog is
       the first ancestor the two share, so a drag out of the panel reports the
       same target. */
    const dialog = this.dialogEl()?.nativeElement;
    if (event.target === dialog && this.press.stayedOn(dialog)) {
      this.open.set(false);
    }
  }

  protected onDialogClose(): void {
    /* The dialog's native `close` event fires when the user hits Esc or the
       backdrop dispatches `close`. Mirror that back into the `open` model
       so consumers stay in sync. */
    if (this.open()) {
      this.open.set(false);
    }
  }

  private executeItem(entry: PaletteEntry): void {
    if (entry.disabled) {
      return;
    }
    this.execute.emit(entry.item);
    this.open.set(false);
  }

  private scrollActiveIntoView(): void {
    queueMicrotask(() => {
      const id = this.activeId();
      if (!id) {
        return;
      }
      const el = this.hostEl.nativeElement.querySelector<HTMLElement>(`#${id}`);
      el?.scrollIntoView({ block: 'nearest' });
    });
  }
}
