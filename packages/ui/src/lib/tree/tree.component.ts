import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Signal,
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
import { TreeNodeComponent } from './tree-node.component';
import { TreeNode, visibleNodeIds, walkTree } from './tree.types';

export type TreeSize = 'sm' | 'md' | 'lg';

/**
 * `<ea-tree>` renders a hierarchical, single-selection treeview with full
 * keyboard navigation (Arrow keys, Home, End, Enter / Space). Selection and
 * expansion state are model signals: pass `[selectedId]` / `[expandedIds]`
 * to control them, or bind `[(selectedId)]` / `[(expandedIds)]` for two-way
 * sync.
 *
 * The component implements the ARIA `tree` pattern:
 * - The outer `<ul>` carries `role="tree"`
 * - Each node is a `<li role="treeitem">` with `aria-level`, `aria-posinset`,
 *   `aria-setsize`, `aria-expanded` (branches only), and `aria-selected`
 * - Roving tabindex: only the currently-focused node has `tabindex="0"`
 */
@Component({
  selector: 'ea-tree',
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TreeNodeComponent],
})
export class TreeComponent {
  private readonly hostEl = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly i18n = inject(EagamiI18nService);

  readonly nodes = input.required<readonly TreeNode[]>();

  readonly size = input<TreeSize>('md');

  readonly disabled = input<boolean>(false);

  /** Currently-selected node id. `null` means nothing is selected. */
  readonly selectedId = model<string | null>(null);

  /** Ids of currently-expanded branch nodes. */
  readonly expandedIds = model<readonly string[]>([]);

  /** Optional aria-label for the tree itself. */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  readonly nodeClick = output<TreeNode>();

  private readonly listEl = viewChild<ElementRef<HTMLElement>>('listEl');

  private readonly _focusedId = signal<string | null>(null);

  protected readonly expandedSet: Signal<ReadonlySet<string>> = computed(
    () => new Set(this.expandedIds()),
  );

  /**
   * The node id currently driving the roving tabindex. Defaults to the first
   * visible node if nothing has been focused yet, so Tab-into-tree lands on a
   * sensible target.
   */
  protected readonly focusedId = computed(() => {
    const explicit = this._focusedId();
    if (explicit) {
      // If the previously-focused node has been hidden (a parent collapsed),
      // fall back to the first visible node so Tab still lands somewhere.
      const visible = visibleNodeIds(this.nodes(), this.expandedSet());
      if (visible.includes(explicit)) return explicit;
    }
    const visible = visibleNodeIds(this.nodes(), this.expandedSet());
    return visible[0] ?? null;
  });

  protected readonly messages = this.i18n.messages;

  protected readonly hostClasses = computed(() => [
    'ea-tree',
    `ea-tree--${this.size()}`,
    this.disabled() ? 'ea-tree--disabled' : '',
  ]);

  constructor() {
    /* When the consumer passes a `selectedId` for a node that is not yet
       expanded into view, expand the chain so the selection becomes visible.
       Only runs on `selectedId` changes (not on every nodes update). */
    effect(() => {
      const id = this.selectedId();
      if (!id) return;
      const ancestors = this.findAncestorIds(id);
      if (ancestors.length === 0) return;
      const current = new Set(this.expandedIds());
      let changed = false;
      for (const ancestorId of ancestors) {
        if (!current.has(ancestorId)) {
          current.add(ancestorId);
          changed = true;
        }
      }
      if (changed) this.expandedIds.set(Array.from(current));
    });
  }

  protected onNodeSelect(node: TreeNode): void {
    if (this.disabled() || node.disabled) return;
    this.selectedId.set(node.id);
    this._focusedId.set(node.id);
    this.nodeClick.emit(node);
  }

  protected onNodeToggle(id: string): void {
    if (this.disabled()) return;
    const current = new Set(this.expandedIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.expandedIds.set(Array.from(current));
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    const visible = visibleNodeIds(this.nodes(), this.expandedSet()).filter(
      id => !this.isNodeDisabled(id),
    );
    if (visible.length === 0) return;

    const currentId = this.focusedId();
    const currentIdx = currentId ? visible.indexOf(currentId) : -1;

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const next = visible[Math.min(currentIdx + 1, visible.length - 1)];
        this.focusNode(next);
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prev = visible[Math.max(currentIdx - 1, 0)];
        this.focusNode(prev);
        break;
      }
      case 'Home': {
        event.preventDefault();
        this.focusNode(visible[0]);
        break;
      }
      case 'End': {
        event.preventDefault();
        this.focusNode(visible[visible.length - 1]);
        break;
      }
      case 'ArrowRight': {
        event.preventDefault();
        if (!currentId) return;
        const node = this.findNode(currentId);
        if (!node) return;
        const hasChildren = (node.children?.length ?? 0) > 0;
        if (!hasChildren) return;
        if (!this.expandedSet().has(currentId)) {
          this.onNodeToggle(currentId);
        } else if (node.children && node.children.length > 0) {
          const firstChild = node.children.find(c => !c.disabled);
          if (firstChild) this.focusNode(firstChild.id);
        }
        break;
      }
      case 'ArrowLeft': {
        event.preventDefault();
        if (!currentId) return;
        const node = this.findNode(currentId);
        if (!node) return;
        const hasChildren = (node.children?.length ?? 0) > 0;
        if (hasChildren && this.expandedSet().has(currentId)) {
          this.onNodeToggle(currentId);
        } else {
          const parentId = this.findParentId(currentId);
          if (parentId) this.focusNode(parentId);
        }
        break;
      }
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (!currentId) return;
        const node = this.findNode(currentId);
        if (node) this.onNodeSelect(node);
        break;
      }
    }
  }

  protected onTreeFocus(event: FocusEvent): void {
    /* Track focus changes inside the tree so clicking a node updates the
       roving tabindex. Skip if focus moved outside the tree (relatedTarget
       is the next focus owner). */
    const target = event.target as HTMLElement | null;
    const itemId = target?.dataset['treeitemId'];
    if (itemId) this._focusedId.set(itemId);
  }

  private focusNode(id: string): void {
    this._focusedId.set(id);
    queueMicrotask(() => {
      const el = this.hostEl.nativeElement.querySelector<HTMLElement>(
        `[data-treeitem-id="${CSS.escape(id)}"]`,
      );
      el?.focus();
    });
  }

  private findNode(id: string): TreeNode | null {
    for (const { node } of walkTree(this.nodes())) {
      if (node.id === id) return node;
    }
    return null;
  }

  private findParentId(id: string): string | null {
    for (const { node, ancestors } of walkTree(this.nodes())) {
      if (node.id === id) {
        return ancestors[ancestors.length - 1]?.id ?? null;
      }
    }
    return null;
  }

  private findAncestorIds(id: string): string[] {
    for (const { node, ancestors } of walkTree(this.nodes())) {
      if (node.id === id) return ancestors.map(a => a.id);
    }
    return [];
  }

  private isNodeDisabled(id: string): boolean {
    if (this.disabled()) return true;
    const node = this.findNode(id);
    return !!node?.disabled;
  }

  // Silences the unused-warning on the viewChild ref, retained for programmatic
  // focus behaviour (e.g. focusing the tree from a parent component).
  protected readonly _listEl = this.listEl;
}
