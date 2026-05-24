import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

import { ChevronRightIconComponent } from '../icons/chevron-right.component';
import { TreeNode } from './tree.types';

/**
 * Internal recursive renderer for a single tree node and its descendants.
 * Selection and expansion state are owned by the parent `<ea-tree>`; this
 * component emits intents (`toggle`, `select`) and the parent reconciles
 * them against the shared signals.
 */
@Component({
  selector: 'ea-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, ChevronRightIconComponent],
  host: {
    role: 'none',
  },
})
export class TreeNodeComponent {
  readonly node = input.required<TreeNode>();

  /** Depth from the tree root (0-indexed). Drives indentation and `aria-level`. */
  readonly level = input.required<number>();

  /** 1-indexed position among the parent's children (for `aria-posinset`). */
  readonly posInSet = input.required<number>();

  /** Total number of siblings (for `aria-setsize`). */
  readonly setSize = input.required<number>();

  /** Currently-selected node id (single-select). */
  readonly selectedId = input<string | null>(null);

  /** Currently-focused node id (drives roving tabindex). */
  readonly focusedId = input<string | null>(null);

  /** Set of currently-expanded node ids. */
  readonly expandedIds = input.required<ReadonlySet<string>>();

  /** Whole-tree disabled state. */
  readonly disabled = input<boolean>(false);

  /** Localized aria-label for the expand chevron. */
  readonly expandLabel = input<string>('Expand');

  /** Localized aria-label for the collapse chevron. */
  readonly collapseLabel = input<string>('Collapse');

  readonly toggle = output<string>();

  readonly select = output<TreeNode>();

  protected readonly hasChildren = computed(
    () => (this.node().children?.length ?? 0) > 0,
  );

  protected readonly isExpanded = computed(() => this.expandedIds().has(this.node().id));

  protected readonly isSelected = computed(() => this.selectedId() === this.node().id);

  protected readonly isFocused = computed(() => this.focusedId() === this.node().id);

  protected readonly isDisabled = computed(
    () => this.disabled() || !!this.node().disabled,
  );

  protected readonly indentStyle = computed(() => ({
    '--ea-tree-node-level': String(this.level()),
  }));

  protected onRowClick(): void {
    if (this.isDisabled()) return;
    this.select.emit(this.node());
  }

  protected onChevronClick(event: MouseEvent): void {
    /* Chevron clicks toggle expansion without also triggering selection.
       Without stopPropagation the click would bubble to the row handler. */
    event.stopPropagation();
    if (this.isDisabled()) return;
    this.toggle.emit(this.node().id);
  }
}
