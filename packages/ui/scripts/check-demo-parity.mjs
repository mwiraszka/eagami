// Cross-references the three hand-or-tool-maintained docs sources to catch
// drift between a component's real API and what the website + Storybook expose:
//   1. ui-api.generated.ts  - inputs/outputs/methods (compodoc, source of truth)
//   2. *.component.knobs.ts  - interactive playground controls (website + stories)
//   3. messages/en.ts        - API-reference descriptions (mirrored to all locales)
//
// Run via `pnpm --filter @eagami/ui check-parity`. Exits non-zero when any
// input or output lacks a description, or a knob points at no real input.
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '../../..');
const API_FILE = resolve(repo, 'apps/website/src/app/data/ui-api.generated.ts');
const EN_FILE = resolve(repo, 'apps/website/src/app/i18n/messages/en.ts');
const KNOBS_BARREL = resolve(here, '../src/playground-knobs.ts');
const LIB_DIR = resolve(here, '../src/lib');

// Primary demo slug -> public sub-components documented alongside it. A knob on
// the primary may drive a sub-component input (e.g. the radio demo's `size` is a
// <ea-radio-group> input), so the stale-knob check unions both APIs.
const RELATED_SLUGS = {
  radio: ['radio-group'],
  accordion: ['accordion-item'],
  menu: ['menu-item', 'menu-trigger'],
  tabs: ['tab'],
  stepper: ['step'],
};

// Inputs/outputs that are intentionally never wired as interactive knobs:
// content-projection slots, template refs, complex object/array config, and
// event outputs. Listing them keeps the "missing knob" advisory signal honest.
const KNOB_EXEMPT = new Set([
  'errorMessages',
  'cellTemplate',
  'columns',
  'rows',
  'data',
  'items',
  'options',
  'value',
  'ngModel',
]);

function readText(path) {
  return readFileSync(path, 'utf8');
}

// Extracts the object literal that follows `marker` in `src`, brace-matching
// while ignoring braces inside string literals so prose values are safe.
function extractObjectLiteral(src, marker) {
  const at = src.indexOf(marker);
  if (at === -1) throw new Error(`marker not found: ${marker}`);
  const open = src.indexOf('{', at);
  let depth = 0;
  let quote = null;
  for (let i = open; i < src.length; i++) {
    const ch = src[i];
    const prev = src[i - 1];
    if (quote) {
      if (ch === quote && prev !== '\\') quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return src.slice(open, i + 1);
    }
  }
  throw new Error(`unbalanced braces after ${marker}`);
}

function evalObject(literal) {
  // eslint-disable-next-line no-new-func
  return new Function(`return (${literal});`)();
}

// --- 1. UI_API ---------------------------------------------------------------
const apiSrc = readText(API_FILE);
const UI_API = evalObject(extractObjectLiteral(apiSrc, 'export const UI_API'));

// --- 2. knobs (slug -> arg names) -------------------------------------------
const barrel = readText(KNOBS_BARREL);
const importPaths = new Map(); // exportName -> file path
for (const m of barrel.matchAll(
  /import\s*\{\s*(\w+)\s*\}\s*from\s*'(\.\/lib\/[^']+)'/g,
)) {
  importPaths.set(m[1], resolve(here, '..', 'src', m[2].replace(/^\.\//, '') + '.ts'));
}
const slugToExport = new Map(); // slug -> exportName
const registry = extractObjectLiteral(barrel, 'export const PLAYGROUND_KNOBS');
for (const m of registry.matchAll(/(?:'([^']+)'|(\w[\w-]*))\s*:\s*(\w+_KNOBS)\s*,/g)) {
  slugToExport.set(m[1] ?? m[2], m[3]);
}

const knobNames = new Map(); // slug -> { all:Set, demoOnly:Set }
for (const [slug, exp] of slugToExport) {
  const file = importPaths.get(exp);
  if (!file) continue;
  let src = readText(file);
  src = src.replace(/^\s*import[^\n]*\n/gm, '');
  src = src.replace(/export const \w+\s*(?::\s*ComponentKnobs)?\s*=/, 'return');
  src = src.replace(/\bas const\b/g, '');
  // eslint-disable-next-line no-new-func
  const knobs = new Function(src)();
  const all = new Set(Object.keys(knobs.argTypes ?? {}));
  const demoOnly = new Set(
    Object.entries(knobs.argTypes ?? {})
      .filter(([, v]) => v && v.demoOnly)
      .map(([k]) => k),
  );
  knobNames.set(slug, { all, demoOnly });
}

// --- 3. descriptions (slug -> Set of described keys) ------------------------
const enSrc = readText(EN_FILE);
const descriptions = evalObject(extractObjectLiteral(enSrc, 'descriptions:'));
const describedKeys = new Map();
for (const [slug, dict] of Object.entries(descriptions)) {
  describedKeys.set(slug, new Set(Object.keys(dict)));
}

// --- cross-reference --------------------------------------------------------
const apiSlugs = Object.keys(UI_API).sort();
const missingDesc = []; // { slug, kind, name }
const missingKnob = []; // { slug, name }
const staleKnob = []; // { slug, name }
const staleDesc = []; // { slug, name }

for (const slug of apiSlugs) {
  const api = UI_API[slug];
  const desc = describedKeys.get(slug) ?? new Set();
  const knob = knobNames.get(slug) ?? { all: new Set(), demoOnly: new Set() };
  const apiInputNames = new Set(api.inputs.map(p => p.name));
  const apiOutputNames = new Set(api.outputs.map(p => p.name));
  const apiMethodNames = new Set(api.methods.map(m => m.name));

  for (const p of api.inputs) {
    if (!desc.has(p.name) && p.name !== 'errorMessages') {
      missingDesc.push({ slug, kind: 'input', name: p.name });
    }
    if (!knob.all.has(p.name) && !KNOB_EXEMPT.has(p.name) && p.type !== 'TemplateRef') {
      missingKnob.push({ slug, name: p.name, type: p.type });
    }
  }
  for (const p of api.outputs) {
    if (!desc.has(p.name)) missingDesc.push({ slug, kind: 'output', name: p.name });
  }
  // Knobs that map to no real input or output, unioning related sub-components
  // (a knob may drive an event output as a Storybook action, or a sub-component
  // input). Anything left is a typo or a removed input.
  const boundNames = new Set([...apiInputNames, ...apiOutputNames]);
  for (const related of RELATED_SLUGS[slug] ?? []) {
    for (const p of UI_API[related]?.inputs ?? []) boundNames.add(p.name);
    for (const p of UI_API[related]?.outputs ?? []) boundNames.add(p.name);
  }
  for (const name of knob.all) {
    if (knob.demoOnly.has(name)) continue;
    if (!boundNames.has(name)) staleKnob.push({ slug, name });
  }
  // Descriptions for keys that aren't an input, output, or method
  for (const name of desc) {
    if (
      !apiInputNames.has(name) &&
      !apiOutputNames.has(name) &&
      !apiMethodNames.has(name)
    ) {
      staleDesc.push({ slug, name });
    }
  }
}

// Story wiring: a component with a knobs file must surface those knobs in its
// Storybook story (import *_KNOBS + spread its argTypes/args), so Storybook and
// the website playground expose the same controls. Catches the class of drift
// where an input is demoable on the site but not in Storybook.
const unwiredStories = [];
for (const dir of readdirSync(LIB_DIR, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const d = resolve(LIB_DIR, dir.name);
  const files = readdirSync(d);
  const hasKnobs = files.some(f => f.endsWith('.knobs.ts'));
  const storyFile = files.find(f => f.endsWith('.stories.ts'));
  if (!hasKnobs || !storyFile) continue;
  const story = readText(resolve(d, storyFile));
  if (!/_KNOBS/.test(story) || !/argTypes\s*:/.test(story)) {
    unwiredStories.push(dir.name);
  }
}

// Slugs that exist in the API but have no description block at all
const undocSlugs = apiSlugs.filter(s => !describedKeys.has(s));

function report(title, rows, fmt) {
  if (!rows.length) return;
  console.log(`\n${title} (${rows.length}):`);
  for (const r of rows) console.log('  ' + fmt(r));
}

console.log('=== Demo / API parity report ===');
console.log(`API components: ${apiSlugs.length}`);
report(
  'Slugs with NO description block',
  undocSlugs.map(s => ({ s })),
  r => r.s,
);
report(
  'Stories that do NOT wire their *_KNOBS (no Storybook controls)',
  unwiredStories.map(s => ({ s })),
  r => r.s,
);
report(
  'Inputs/outputs MISSING a description (blank API-ref cell)',
  missingDesc,
  r => `${r.slug}.${r.name} [${r.kind}]`,
);
if (process.argv.includes('--advisory')) {
  report(
    'Inputs with NO interactive knob (advisory)',
    missingKnob,
    r => `${r.slug}.${r.name} : ${r.type}`,
  );
}
report('STALE knobs (no matching input)', staleKnob, r => `${r.slug}.${r.name}`);
report(
  'STALE descriptions (no matching input/output/method)',
  staleDesc,
  r => `${r.slug}.${r.name}`,
);

const hardFailures =
  missingDesc.length + staleKnob.length + staleDesc.length + unwiredStories.length;
console.log(
  `\nSummary: ${missingDesc.length} missing descriptions, ${missingKnob.length} missing knobs (advisory), ${staleKnob.length} stale knobs, ${staleDesc.length} stale descriptions, ${undocSlugs.length} undocumented slugs, ${unwiredStories.length} unwired stories.`,
);
process.exitCode = hardFailures > 0 ? 1 : 0;
