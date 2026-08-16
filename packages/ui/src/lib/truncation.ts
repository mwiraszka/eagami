/**
 * Whether an element's text is clipped by its own box, i.e. whether an
 * `text-overflow: ellipsis` on it is actually showing. The one-pixel slack
 * absorbs the sub-pixel rounding a fractional layout leaves behind, which
 * would otherwise read as a permanent overflow on text that fits exactly.
 */
export function isTruncated(el: HTMLElement): boolean {
  return el.scrollWidth > el.clientWidth + 1;
}

/**
 * Whether `el` or anything rendered inside it is cutting its own content off,
 * on either axis (an ellipsis, or a line clamp). The box that does the cutting
 * is often further in than the one a caller holds, so the whole subtree counts.
 */
export function isContentClipped(el: HTMLElement): boolean {
  const clipped = (node: HTMLElement): boolean =>
    node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1;
  return clipped(el) || [...el.querySelectorAll<HTMLElement>('*')].some(clipped);
}
