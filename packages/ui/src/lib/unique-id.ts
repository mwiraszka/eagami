const counters = new Map<string, number>();

/**
 * Stable, collision-free element id for label/aria wiring when the consumer
 * doesn't supply one. Counts per prefix (`ea-input-0`, `ea-input-1`) rather than
 * randomising, so the same render order yields the same ids on the server and
 * the client and hydration doesn't mismatch.
 */
export function uniqueId(prefix: string): string {
  const next = counters.get(prefix) ?? 0;
  counters.set(prefix, next + 1);
  return `${prefix}-${next}`;
}
