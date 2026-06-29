// Reads the element's resolved writing direction so pointer math and arrow-key
// handling can mirror under `dir="rtl"`. Browser-only (callers are interaction
// handlers), so getComputedStyle is always available.
export function isRtl(element: Element): boolean {
  return getComputedStyle(element).direction === 'rtl';
}
