import { Type } from '@angular/core';

/**
 * A single node in an `<ea-tree>` hierarchy.
 *
 * `id` must be unique across the entire tree (not just within siblings) — it
 * drives selection state, expansion state, and keyboard focus.
 */
export interface TreeNode<T = unknown> {
  /** Stable, unique identifier for the node. */
  id: string;

  /** Text label rendered for the node. */
  label: string;

  /** Child nodes. Omit (or empty array) to render as a leaf. */
  children?: readonly TreeNode<T>[];

  /** Optional leading-icon component class (e.g. `FolderIconComponent`). */
  icon?: Type<unknown>;

  /** When true, the node is skipped by keyboard navigation and cannot be selected. */
  disabled?: boolean;

  /** Arbitrary consumer-defined payload, passed through to `(nodeClick)`. */
  data?: T;
}

/**
 * Internal helper: walks a tree depth-first, yielding every node along with
 * its parent chain. Used by `<ea-tree>` for keyboard navigation and lookup.
 */
export function* walkTree<T>(
  nodes: readonly TreeNode<T>[],
  ancestors: readonly TreeNode<T>[] = [],
): Generator<{ node: TreeNode<T>; ancestors: readonly TreeNode<T>[] }> {
  for (const node of nodes) {
    yield { node, ancestors };
    if (node.children?.length) {
      yield* walkTree(node.children, [...ancestors, node]);
    }
  }
}

/**
 * Returns the flat list of currently-visible node ids, in tab order. A node
 * is visible iff every ancestor up to the root is in `expandedIds`.
 */
export function visibleNodeIds<T>(
  nodes: readonly TreeNode<T>[],
  expandedIds: ReadonlySet<string>,
): string[] {
  const out: string[] = [];
  const visit = (list: readonly TreeNode<T>[]) => {
    for (const node of list) {
      out.push(node.id);
      if (node.children?.length && expandedIds.has(node.id)) {
        visit(node.children);
      }
    }
  };
  visit(nodes);
  return out;
}
