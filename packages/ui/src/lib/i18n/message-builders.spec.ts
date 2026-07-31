import type { EagamiMessages } from './i18n.types';
import { EAGAMI_ALL_LOCALES } from './messages';

type MessageFn = (...args: string[]) => string;

interface FoundFn {
  path: string;
  fn: MessageFn;
}

/** Every function-valued message in a bundle, with its dotted key path. */
function collectFns(node: unknown, path: string[] = []): FoundFn[] {
  if (typeof node === 'function') {
    return [{ path: path.join('.'), fn: node as MessageFn }];
  }
  if (Array.isArray(node)) {
    return node.flatMap((v, i) => collectFns(v, [...path, `${i}`]));
  }
  if (node && typeof node === 'object') {
    return Object.entries(node).flatMap(([k, v]) => collectFns(v, [...path, k]));
  }
  return [];
}

// The dictionaries are hand-written per locale, so a builder can be committed
// with a bad interpolation or a stray reference that only throws once that
// language is selected at runtime. Calling every one of them turns that into a
// build-time failure instead of a production one.
describe('Locale message builders', () => {
  const english = collectFns(EAGAMI_ALL_LOCALES[0].messages);

  it('finds the English builders to compare against', () => {
    expect(english.length).toBeGreaterThan(0);
  });

  for (const bundle of EAGAMI_ALL_LOCALES) {
    describe(bundle.locale, () => {
      const found = collectFns(bundle.messages as unknown as EagamiMessages);

      it('exposes the same set of builders as English', () => {
        expect(found.map(f => f.path).sort()).toEqual(english.map(f => f.path).sort());
      });

      it('returns a non-empty string from every builder', () => {
        const failures: string[] = [];

        for (const { path, fn } of found) {
          const args = Array.from({ length: fn.length }, (_, i) => `a${i}`);
          let result: unknown;
          try {
            result = fn(...args);
          } catch (error) {
            failures.push(`${path} threw: ${String(error)}`);
            continue;
          }
          if (typeof result !== 'string' || result.trim() === '') {
            failures.push(`${path} returned ${JSON.stringify(result)}`);
          }
        }

        expect(failures).toEqual([]);
      });

      it('interpolates every argument it accepts', () => {
        // A builder that ignores an argument is almost always a copy-paste slip
        // (a dropped placeholder), except where the argument selects wording
        // rather than being printed.
        const selectors = new Set(['common.themeToggleLabel']);
        const dropped = found
          .filter(f => f.fn.length > 0 && !selectors.has(f.path))
          .filter(({ fn }) => {
            const args = Array.from({ length: fn.length }, (_, i) => `a${i}`);
            const out = fn(...args);
            return args.some(a => !out.includes(a));
          })
          .map(f => f.path);

        expect(dropped).toEqual([]);
      });
    });
  }
});
