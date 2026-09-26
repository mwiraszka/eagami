/// <reference types="node" />
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

/**
 * Source-level guards for the type scale, so text at a given size tier renders
 * at the same pixel size in every component. A component's `size` input picks
 * the base font-size; text below the body line inside the component is a fixed
 * fraction of it, taken from the one scale below. A near-miss ratio (0.85em
 * beside 0.875em) is invisible in review and only shows as mismatched text
 * when two components sit side by side.
 */

const SRC = process.cwd();

/** Relative sizes for text below the body line, by role. */
const SUB_BODY_SCALE: Record<string, number> = {
  secondary: 0.875,
  helper: 0.8125,
  caption: 0.75,
  micro: 0.625,
};

function libStylesheets(): { name: string; css: string }[] {
  const lib = join(SRC, 'src/lib');
  return readdirSync(lib, { recursive: true, encoding: 'utf8' })
    .filter(file => file.endsWith('.scss'))
    .map(file => ({
      name: relative(lib, join(lib, file)),
      css: readFileSync(join(lib, file), 'utf8'),
    }));
}

describe('Type scale', () => {
  it('sets each size tier to its own font-size token', () => {
    const mismatches: string[] = [];
    for (const { name, css } of libStylesheets()) {
      for (const [, tier, body] of css.matchAll(
        /&--(2xs|xs|sm|md|lg|xl)\s*\{([^{}]*)\}/g,
      )) {
        const size = body.match(/(?:^|[\s;])font-size:\s*([^;]+);/)?.[1];
        // A consumer override may sit in front, as long as it falls back to the tier's token
        const token = `var(--font-size-${tier})`;
        const overridable = new RegExp(
          `^var\\(--ea-[\\w-]+-font-size, ${token.replace(/[()]/g, '\\$&')}\\)$`,
        );
        if (size && size.trim() !== token && !overridable.test(size.trim())) {
          mismatches.push(`${name} --${tier}: ${size.trim()}`);
        }
      }
    }

    expect(mismatches).toEqual([]);
  });

  it('draws text below the body line from the shared scale', () => {
    const allowed = new Set(Object.values(SUB_BODY_SCALE));
    const offScale: string[] = [];
    for (const { name, css } of libStylesheets()) {
      for (const [declaration, value] of css.matchAll(
        /(?:font-size|--ea-field-(?:label|messages)-size):\s*([\d.]+)em\b/g,
      )) {
        const ratio = Number(value);
        if (ratio < 1 && !allowed.has(ratio)) {
          offScale.push(`${name}: ${declaration}`);
        }
      }
    }

    expect(offScale).toEqual([]);
  });
});
