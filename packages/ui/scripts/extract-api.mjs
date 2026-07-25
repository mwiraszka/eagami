// Transforms the compodoc `documentation.json` into a trimmed, typed API
// dataset the website renders as each component's reference table. Run after
// compodoc via the `docs:api` script; not meant to be invoked on its own.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const UI_ROOT = resolve(here, '..');
const DOC_JSON = resolve(here, '../dist/compodoc/documentation.json');
const OUT_FILE = resolve(here, '../../../apps/website/src/app/data/ui-api.generated.ts');

// Compodoc 2 reports aliased inputs/outputs under their public alias (e.g.
// `aria-label`, `eaMenuTrigger`), but the knobs files, i18n descriptions, and
// playground state are all keyed by the TS property name, so map each alias
// back to the property that declares it
function aliasMapFor(entity) {
  const file = entity.file ? resolve(UI_ROOT, entity.file) : null;
  if (!file || !existsSync(file)) {
    return {};
  }
  const src = readFileSync(file, 'utf8');
  const map = {};
  for (const match of src.matchAll(
    /(\w+)\s*=\s*(?:input|model|output)(?:\.required)?[^;]*?alias:\s*'([^']+)'/g,
  )) {
    map[match[2]] = map[match[2]] ?? match[1];
  }
  return map;
}

function stripHtml(html) {
  return (html ?? '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function slugFromSelector(selector) {
  const cleaned = (selector ?? '').replace(/[[\]]/g, '').replace(/^ea-/, '');
  // Camel-case attribute directives (eaTooltip, eaMenuTrigger) share the kebab
  // slug style of the element selectors: eaTooltip -> tooltip.
  if (/^ea[A-Z]/.test(cleaned)) {
    return cleaned
      .replace(/^ea/, '')
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }
  return cleaned;
}

// Inputs that default to a generated value (random id, timestamp) expose the
// raw expression as their default; surface a readable placeholder instead.
function cleanDefault(raw) {
  // Multi-line `input(\n  'value',\n)` declarations surface the arg with its
  // trailing comma; strip it so defaults compare cleanly in the playground. Also
  // drop a trailing options object, e.g. `input(undefined, { alias: '...' })`,
  // so the default is just the value, not the whole argument list.
  const value = (raw ?? '')
    .trim()
    .replace(/,\s*\{[\s\S]*$/, '')
    .replace(/,\s*$/, '');
  // A bare options object, e.g. `input.required({ alias: '...' })`, has no default
  // value at all, so surface nothing rather than the config object.
  if (/^\{[\s\S]*\balias\s*:/.test(value)) {
    return '';
  }
  if (/uniqueId|Math\.random|crypto\.|Date\.now|\$\{/.test(value)) {
    return '(auto-generated)';
  }
  return value;
}

function toInput(prop, twoWay) {
  return {
    name: prop.name,
    type: prop.type || 'unknown',
    default: cleanDefault(prop.defaultValue),
    required: !!prop.required,
    twoWay,
  };
}

function toMethod(method) {
  const args = (method.args ?? [])
    .map(a => `${a.name}${a.optional ? '?' : ''}: ${a.type || 'unknown'}`)
    .join(', ');
  return {
    name: method.name,
    signature: `${method.name}(${args}): ${method.returnType || 'void'}`,
  };
}

function buildEntry(entity) {
  const aliasMap = aliasMapFor(entity);
  const unalias = prop => ({ ...prop, name: aliasMap[prop.name] ?? prop.name });
  const inputs = (entity.inputsClass ?? []).map(unalias);
  const outputs = (entity.outputsClass ?? []).map(unalias);
  const inputNames = new Set(inputs.map(i => i.name));

  return {
    selector: entity.selector ?? '',
    // A `model()` surfaces in both inputs and outputs; show it once, on the
    // input row, flagged two-way, rather than duplicating it under outputs.
    inputs: inputs.map(i =>
      toInput(
        i,
        outputs.some(o => o.name === i.name),
      ),
    ),
    outputs: outputs.filter(o => !inputNames.has(o.name)).map(o => toInput(o, false)),
    // Only methods with a doc comment are part of the intended public API;
    // CVA hooks and internal handlers are left undocumented and so excluded.
    methods: (entity.methodsClass ?? [])
      .filter(m => stripHtml(m.description))
      .map(toMethod),
  };
}

const doc = JSON.parse(readFileSync(DOC_JSON, 'utf8'));
const entities = [...(doc.components ?? []), ...(doc.directives ?? [])];

// Only entities exported from the public API are documented; internal
// renderers (e.g. ea-tree-node) would otherwise surface as orphan slugs
// with no demo page
const publicFiles = new Set(
  [
    ...readFileSync(resolve(UI_ROOT, 'src/public-api.ts'), 'utf8').matchAll(
      /export \* from '\.\/(.+?)';/g,
    ),
  ].map(m => `src/${m[1]}.ts`),
);

const api = {};
for (const entity of entities) {
  const slug = slugFromSelector(entity.selector);
  if (slug && publicFiles.has(entity.file)) {
    api[slug] = buildEntry(entity);
  }
}

const sorted = Object.fromEntries(
  Object.keys(api)
    .sort()
    .map(k => [k, api[k]]),
);

const banner = `// AUTO-GENERATED by packages/ui/scripts/extract-api.mjs; do not edit by hand.
// Regenerate with: pnpm --filter @eagami/ui docs:api
`;

const types = `export interface ApiProp {
  // Index signature lets rows satisfy ea-data-table's Record<string, unknown> generic
  [key: string]: unknown;
  name: string;
  type: string;
  default: string;
  required: boolean;
  twoWay: boolean;
}

export interface ApiMethod {
  [key: string]: unknown;
  name: string;
  signature: string;
}

export interface ComponentApi {
  selector: string;
  inputs: ApiProp[];
  outputs: ApiProp[];
  methods: ApiMethod[];
}
`;

const body = `export const UI_API: Readonly<Record<string, ComponentApi>> = ${JSON.stringify(sorted, null, 2)};
`;

writeFileSync(OUT_FILE, `${banner}\n${types}\n${body}`);
console.log(`Wrote ${Object.keys(sorted).length} component API entries to ${OUT_FILE}`);
