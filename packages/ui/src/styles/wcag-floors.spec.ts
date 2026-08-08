/// <reference types="node" />
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Source-level guards for the accessibility floors the library commits to.
 *
 * These cannot be covered by the per-component axe specs: jsdom has no layout,
 * so nothing at runtime can measure a rendered target box or a computed
 * font-size. The floors are therefore asserted against the stylesheets that
 * define them. Both floors regressed silently once, when the `2xs` tier scaled
 * every em-derived dimension down a step without anything failing.
 */

const SRC = process.cwd();

function read(relativePath: string): string {
  return readFileSync(join(SRC, relativePath), 'utf8');
}

function componentStylesheets(): { name: string; css: string }[] {
  const lib = join(SRC, 'src/lib');
  return readdirSync(lib, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .flatMap(dir =>
      readdirSync(join(lib, dir.name))
        .filter(file => file.endsWith('.component.scss'))
        .map(file => ({
          name: `${dir.name}/${file}`,
          css: readFileSync(join(lib, dir.name, file), 'utf8'),
        })),
    );
}

/** Font-size in px of the smallest tier, from the typography tokens. */
const SMALLEST_TIER_PX = 10;

describe('WCAG floors', () => {
  describe('SC 2.5.8 Target Size (Minimum)', () => {
    const mixins = read('src/styles/_mixins.scss');

    it('declares the 24px minimum as a single shared constant', () => {
      expect(mixins).toMatch(/\$target-size-min:\s*24px;/);
    });

    it('grows the shared icon-button target to that minimum', () => {
      const mixin = mixins.slice(mixins.indexOf('@mixin icon-button'));
      const body = mixin.slice(0, mixin.indexOf('\n}\n'));

      // The painted box stays small on the dense tiers, so the target has to be
      // grown independently of width/height, defaulting to the shared minimum
      expect(body).toContain('position: relative');
      expect(body).toMatch(
        /width:\s*max\(100%,\s*var\(--ea-icon-button-target,\s*#\{\$target-size-min\}\)\)/,
      );
      expect(body).toMatch(
        /height:\s*max\(100%,\s*var\(--ea-icon-button-target,\s*#\{\$target-size-min\}\)\)/,
      );
    });

    it('makes a component that shrinks the box decide about the grown target', () => {
      // A box smaller than the minimum either grows its target or opts out; it
      // must not silently keep a 24px target that can overlap its neighbour
      const shrunk = componentStylesheets().filter(({ css }) =>
        /--ea-icon-button-size:\s*(0|1(\.\d+)?)em/.test(css),
      );

      // Zero matches is a valid state: it means nothing currently shrinks the
      // box below the minimum, which is the outcome this rule is steering toward
      for (const { name, css } of shrunk) {
        expect(`${name}: ${/--ea-icon-button-target:/.test(css)}`).toBe(`${name}: true`);
      }
    });

    it('routes every icon button through the mixin rather than hand-rolling the box', () => {
      const handRolled = componentStylesheets().filter(({ css }) =>
        /\.ea-[a-z-]+__(close|clear|dismiss)\s*\{[^}]*\bwidth:/.test(css),
      );

      expect(handRolled.map(f => f.name)).toEqual([]);
    });
  });

  describe('Legible floors for field sub-text', () => {
    it('floors the field label at 12px however far the tier scales down', () => {
      const css = read('src/lib/field/field-label.component.scss');

      expect(css).toMatch(
        /font-size:\s*max\(var\(--ea-field-label-size[^)]*\)[^,]*,\s*0\.75rem\)/,
      );
    });

    it('floors error and hint text at 11px however far the tier scales down', () => {
      const css = read('src/lib/field/field-messages.component.scss');

      expect(css).toMatch(
        /font-size:\s*max\(var\(--ea-field-messages-size[^)]*\)[^,]*,\s*0\.6875rem\)/,
      );
    });

    it('keeps the floor at the point of use, not in each component that sets the variable', () => {
      // 18 components declare these variables; a floor copied into each would
      // be missed by the next one added
      const setters = componentStylesheets().filter(({ css }) =>
        /--ea-field-(label|messages)-size:/.test(css),
      );

      expect(setters.length).toBeGreaterThan(10);
      for (const { name, css } of setters) {
        expect(`${name}: ${/--ea-field-\w+-size:\s*max\(/.test(css)}`).toBe(
          `${name}: false`,
        );
      }
    });

    it('would otherwise scale sub-text below the floors at the smallest tier', () => {
      // Documents why the floors exist: the unclamped em values at 2xs
      expect(SMALLEST_TIER_PX * 0.875).toBeLessThan(12);
      expect(SMALLEST_TIER_PX * 0.8125).toBeLessThan(11);
    });
  });
});
