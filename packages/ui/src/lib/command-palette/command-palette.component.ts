import { NgComponentOutlet } from '@angular/common';
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
import { XIconComponent } from '../icons/x.component';
import type { CommandPaletteItem } from './command-palette.types';

interface GroupedItems {
  group: string;
  items: ReadonlyArray<{ item: CommandPaletteItem; flatIndex: number }>;
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
  imports: [NgComponentOutlet, SearchIconComponent, XIconComponent],
})
export class CommandPaletteComponent {
  private readonly i18n = inject(EagamiI18nService);
  private readonly hostEl = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly items = input.required<readonly CommandPaletteItem[]>();

  readonly open = model<boolean>(false);

  readonly placeholder = input<string>('');

  readonly emptyMessage = input<string>('');

  readonly execute = output<CommandPaletteItem>();

  protected readonly messages = this.i18n.messages;

  private readonly dialogEl = viewChild<ElementRef<HTMLDialogElement>>('dialogEl');
  private readonly searchEl = viewChild<ElementRef<HTMLInputElement>>('searchEl');

  protected readonly query = signal<string>('');

  protected readonly listboxId = `ea-command-palette-listbox-${Math.random()
    .toString(36)
    .slice(2, 9)}`;

  /**
   * Items bucketed by `group`, then flattened back into display order
   * (ungrouped items first, then each named group). The matching
   * `filteredItems` array follows this same order so `flatIndex` lines up
   * one-to-one with what the user sees.
   */
  protected readonly groupedItems = computed<GroupedItems[]>(() => {
    const q = this.query().trim().toLowerCase();
    const candidates = this.items().filter(item => {
      if (item.disabled) {
        return false;
      }
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
        items: items.map(item => ({ item, flatIndex: flatIndex++ })),
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
  protected readonly filteredItems = computed(() =>
    this.groupedItems().flatMap(group => group.items.map(entry => entry.item)),
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
    const max = this.filteredItems().length - 1;
    if (max < 0) {
      return -1;
    }
    return Math.min(this._activeIndex(), max);
  });

  protected readonly activeId = computed(() => {
    const idx = this.activeIndex();
    if (idx < 0) {
      return null;
    }
    return `ea-command-palette-item-${this.filteredItems()[idx].id}`;
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
        queueMicrotask(() => this.searchEl()?.nativeElement.focus());
      } else if (dialog.open) {
        dialog.close();
      }
    });
  }

  protected itemDomId(item: CommandPaletteItem): string {
    return `ea-command-palette-item-${item.id}`;
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

  protected onQueryInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this._activeIndex.set(0);
    // Typing implies keyboard intent; surface the first match so the user
    // knows what Enter would pick without having to mouse over.
    this.interaction.set('keyboard');
  }

  protected clearQuery(): void {
    this.query.set('');
    this._activeIndex.set(0);
    this.interaction.set('keyboard');
    this.searchEl()?.nativeElement.focus();
  }

  protected onSearchKeydown(event: KeyboardEvent): void {
    const max = this.filteredItems().length - 1;
    if (max < 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        this._activeIndex.set(this.activeIndex() < max ? this.activeIndex() + 1 : 0);
        this.interaction.set('keyboard');
        this.scrollActiveIntoView();
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        this._activeIndex.set(this.activeIndex() > 0 ? this.activeIndex() - 1 : max);
        this.interaction.set('keyboard');
        this.scrollActiveIntoView();
        break;
      }
      case 'Home': {
        event.preventDefault();
        this._activeIndex.set(0);
        this.interaction.set('keyboard');
        this.scrollActiveIntoView();
        break;
      }
      case 'End': {
        event.preventDefault();
        this._activeIndex.set(max);
        this.interaction.set('keyboard');
        this.scrollActiveIntoView();
        break;
      }
      case 'Enter': {
        event.preventDefault();
        const item = this.filteredItems()[this.activeIndex()];
        if (item) {
          this.executeItem(item);
        }
        break;
      }
    }
  }

  protected onItemClick(item: CommandPaletteItem): void {
    if (item.disabled) {
      return;
    }
    this.executeItem(item);
  }

  protected onItemMouseEnter(flatIndex: number): void {
    this._activeIndex.set(flatIndex);
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
       whose target IS the dialog element means the user clicked the backdrop. */
    if (event.target === this.dialogEl()?.nativeElement) {
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

  private executeItem(item: CommandPaletteItem): void {
    if (item.disabled) {
      return;
    }
    this.execute.emit(item);
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
