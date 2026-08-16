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
 * Whether `el` or anything rendered inside it is cutting content off with no
 * way to reach it, on either axis (an ellipsis, or a line clamp). The box that
 * does the cutting is often further in than the one a caller holds, so the
 * whole subtree counts. A box the content can be scrolled through does not:
 * nothing is out of reach there.
 */
export function isContentClipped(el: HTMLElement): boolean {
  const clipped = (node: HTMLElement): boolean => {
    const style = getComputedStyle(node);
    const cut = (overflow: string): boolean =>
      overflow === 'hidden' || overflow === 'clip';
    return (
      (cut(style.overflowX) && node.scrollWidth > node.clientWidth + 1) ||
      (cut(style.overflowY) && node.scrollHeight > node.clientHeight + 1)
    );
  };
  return clipped(el) || [...el.querySelectorAll<HTMLElement>('*')].some(clipped);
}
