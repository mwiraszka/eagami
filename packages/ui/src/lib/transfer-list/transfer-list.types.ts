/**
 * A single transferable item in an `<ea-transfer-list>`.
 *
 * `id` must be unique across the whole list. Items with `disabled: true` are
 * rendered greyed-out, cannot be highlighted, and are skipped by the
 * "move all" buttons (so disabled items stay where they are).
 */
export interface TransferListItem {
  id: string;
  label: string;
  disabled?: boolean;
}
