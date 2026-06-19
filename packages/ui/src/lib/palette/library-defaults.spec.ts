/// <reference types="node" />
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { WCAG_AA, contrastRatio } from './contrast';

// Guards the library's brand tokens against WCAG AA failures. Parses the live SCSS
// rather than mirroring values so any tweak to `_colors.scss` runs through these bars.
const COLORS_SCSS = readFileSync(
  join(process.cwd(), 'src/styles/tokens/_colors.scss'),
  'utf8',
);

interface ScopeTokens {
  [token: string]: string;
}

function resolve(tokens: ScopeTokens, raw: string): string {
  let value = raw.trim();
  let depth = 0;
  while (value.startsWith('var(') && depth < 10) {
    const match = value.match(/^var\((--[a-z0-9-]+)\)$/i);
    if (!match) {
      break;
    }
    const next = tokens[match[1]];
    if (next === undefined) {
      throw new Error(`Unresolved CSS var ${match[1]}`);
    }
    value = next;
    depth++;
  }
  return value;
}

/** Pull `--name: value;` declarations between two markers. */
function parseScope(start: RegExp, end: RegExp): ScopeTokens {
  const startMatch = COLORS_SCSS.match(start);
  if (!startMatch) {
    throw new Error(`Scope start not found: ${start}`);
  }
  const sliceFrom = COLORS_SCSS.indexOf(startMatch[0]) + startMatch[0].length;
  const after = COLORS_SCSS.slice(sliceFrom);
  const endMatch = after.match(end);
  const sliceTo = endMatch ? after.indexOf(endMatch[0]) : after.length;
  const body = after.slice(0, sliceTo);

  const tokens: ScopeTokens = {};
  // Strip line comments so they don't contaminate the value match
  const stripped = body.replace(/\/\/[^\n]*/g, '');
  for (const match of stripped.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    tokens[match[1]] = match[2].trim();
  }
  return tokens;
}

const lightRaw = parseScope(/:root\s*\{/, /^\}/m);
const darkRaw = { ...lightRaw, ...parseScope(/@mixin\s+dark-color-tokens\s*\{/, /^\}/m) };

function tokens(raw: ScopeTokens): ScopeTokens {
  const out: ScopeTokens = {};
  for (const key of Object.keys(raw)) {
    out[key] = resolve(raw, raw[key]);
  }
  return out;
}

const light = tokens(lightRaw);
const dark = tokens(darkRaw);

describe('library default tokens (SCSS) clear WCAG AA', () => {
  it.each([
    ['light', light],
    ['dark', dark],
  ])('%s: --color-brand-text on --color-bg-canvas >= 4.5:1', (_mode, t) => {
    const ratio = contrastRatio(t['--color-brand-text'], t['--color-bg-canvas']);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA.text);
  });

  it.each([
    ['light', light],
    ['dark', dark],
  ])('%s: --color-brand-default carries white text >= 4.5:1', (_mode, t) => {
    const ratio = contrastRatio(t['--color-brand-default'], '#ffffff');
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA.text);
  });

  it.each([
    ['light', light],
    ['dark', dark],
  ])('%s: --color-brand-default on --color-bg-canvas >= 3:1', (_mode, t) => {
    const ratio = contrastRatio(t['--color-brand-default'], t['--color-bg-canvas']);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA.nonText);
  });

  it.each([
    ['light', light],
    ['dark', dark],
  ])('%s: --color-text-primary on --color-bg-canvas >= 4.5:1', (_mode, t) => {
    const ratio = contrastRatio(t['--color-text-primary'], t['--color-bg-canvas']);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA.text);
  });

  it.each([
    ['light', light],
    ['dark', dark],
  ])('%s: --color-text-primary on --color-bg-base >= 4.5:1', (_mode, t) => {
    const ratio = contrastRatio(t['--color-text-primary'], t['--color-bg-base']);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA.text);
  });
});
