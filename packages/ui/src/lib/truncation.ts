/**
 * Whether an element's text is clipped by its own box, i.e. whether an
 * `text-overflow: ellipsis` on it is actually showing. The one-pixel slack
 * absorbs the sub-pixel rounding a fractional layout leaves behind, which
 * would otherwise read as a permanent overflow on text that fits exactly.
 */
export function isTruncated(el: HTMLElement): boolean {
  return el.scrollWidth > el.clientWidth + 1;
}
