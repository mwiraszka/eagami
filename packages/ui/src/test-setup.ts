import { beforeEach, vi } from 'vitest';
import 'vitest-axe/extend-expect';

// zone.js patches MutationObserver, but its wrapper breaks axe-core (observer.observe is
// not a function). zone.js stashes the original under its own symbol; restore it before
// specs load axe so axe uses the environment's native implementation.
const withZoneOriginal = globalThis as typeof globalThis & {
  __zone_symbol__MutationObserver?: typeof MutationObserver;
};
if (withZoneOriginal.__zone_symbol__MutationObserver) {
  globalThis.MutationObserver = withZoneOriginal.__zone_symbol__MutationObserver;
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});
