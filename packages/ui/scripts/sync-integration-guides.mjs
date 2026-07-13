#!/usr/bin/env node
// Keeps the framework integration guides in sync with the SCSS token source.
// Reads packages/ui/src/styles/tokens/*.scss and regenerates every
// value-bearing artifact so no guide content is ever hand-edited:
//   1. apps/website/src/assets/eagami-ui-tokens.json (machine-readable export)
//   2. the full section 2 token tables in both guides
//   3. the CSS and TS code blocks in eagami-ui-react.md
//   4. the eagami_theme.dart code block in eagami-ui-flutter.md
//   5. both guides' frontmatter version, source, and last-synced date
// Run with --check to verify without writing (CI mode).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const UI_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO_ROOT = resolve(UI_ROOT, '../..');
const TOKENS_DIR = join(UI_ROOT, 'src/styles/tokens');
const ASSETS_DIR = join(REPO_ROOT, 'apps/website/src/assets');
const REACT_GUIDE = join(ASSETS_DIR, 'eagami-ui-react.md');
const FLUTTER_GUIDE = join(ASSETS_DIR, 'eagami-ui-flutter.md');
const TOKENS_JSON = join(ASSETS_DIR, 'eagami-ui-tokens.json');

const CHECK_MODE = process.argv.includes('--check');
const VERSION = JSON.parse(readFileSync(join(UI_ROOT, 'package.json'), 'utf8')).version;

const TOKEN_FILES = [
  '_colors.scss',
  '_typography.scss',
  '_spacing.scss',
  '_shape.scss',
  '_elevation.scss',
  '_motion.scss',
];

const errors = [];
const fail = msg => errors.push(msg);

// ---------------------------------------------------------------------------
// SCSS parsing

function parseScssFile(file) {
  const src = readFileSync(join(TOKENS_DIR, file), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '');
  const decls = [];
  const stack = [];
  let buf = '';
  for (const ch of src) {
    if (ch === '{') {
      stack.push(buf.trim());
      buf = '';
    } else if (ch === '}') {
      stack.pop();
      buf = '';
    } else if (ch === ';') {
      const m = buf.trim().match(/^(--[\w-]+)\s*:\s*([\s\S]+)$/);
      if (m) {
        decls.push({
          name: m[1],
          value: m[2]
            .replace(/\s+/g, ' ')
            .replace(/\(\s+/g, '(')
            .replace(/\s+\)/g, ')')
            .trim(),
          mode: modeOf(stack),
        });
      }
      buf = '';
    } else {
      buf += ch;
    }
  }
  return decls;
}

function modeOf(stack) {
  if (stack.some(h => h.startsWith('@mixin dark-'))) {
    return 'dark';
  }
  if (stack.some(h => h.includes('prefers-reduced-motion'))) {
    return 'reduced';
  }
  return 'light';
}

// tokens: Map of css var name to { value, dark?, reduced? }, insertion-ordered
const tokens = new Map();
for (const file of TOKEN_FILES) {
  for (const { name, value, mode } of parseScssFile(file)) {
    if (mode === 'light') {
      if (tokens.has(name)) {
        fail(`duplicate token ${name} in ${file}`);
      }
      tokens.set(name, { value });
    } else {
      const token = tokens.get(name);
      if (!token) {
        fail(`${mode} override for unknown token ${name} in ${file}`);
      } else {
        token[mode] = value;
      }
    }
  }
}

function tokenValue(name, mode) {
  const token = tokens.get(name);
  if (!token) {
    throw new Error(`unknown token ${name}`);
  }
  return (mode === 'dark' && token.dark) || token.value;
}

function resolveRefs(value, mode) {
  let out = value;
  for (let i = 0; i < 10 && out.includes('var('); i++) {
    out = out.replace(/var\((--[\w-]+)\)/g, (_, ref) => tokenValue(ref, mode));
  }
  return out;
}

// ---------------------------------------------------------------------------
// Generic value helpers

function pxOf(value) {
  if (value === '0') {
    return 0;
  }
  let m = value.match(/^(-?[\d.]+)(rem|em)$/);
  if (m) {
    return Number(m[1]) * 16;
  }
  m = value.match(/^(-?[\d.]+)px$/);
  if (m) {
    return Number(m[1]);
  }
  return null;
}

function fmtNum(n) {
  return String(n);
}

function splitTopLevel(value) {
  const parts = [];
  let depth = 0;
  let buf = '';
  for (const ch of value) {
    if (ch === '(') {
      depth++;
    }
    if (ch === ')') {
      depth--;
    }
    if (ch === ',' && depth === 0) {
      parts.push(buf.trim());
      buf = '';
    } else {
      buf += ch;
    }
  }
  parts.push(buf.trim());
  return parts;
}

function capFirst(s) {
  return s[0].toUpperCase() + s.slice(1);
}

// 'stripe-subtle' -> 'stripeSubtle', 'neutral-900' -> 'neutral900'
function camel(key) {
  return key.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

// bare Dart/TS identifiers cannot lead with a digit, so 2xl becomes xxl
function tsKey(key) {
  return camel(key.replace(/^2x/, 'xx').replace(/^3x/, 'xxx'));
}

// ---------------------------------------------------------------------------
// Color helpers

function parseColor(css) {
  let m = css.match(/^#([0-9a-f]{6})$/i);
  if (m) {
    const n = i => parseInt(m[1].slice(i, i + 2), 16);
    return { r: n(0), g: n(2), b: n(4), a: 1 };
  }
  m = css.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/);
  if (m) {
    return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
  }
  return null;
}

// Resolves a token value to a concrete rgba, computing color-mix blends in
// sRGB with the same percentage-weight semantics the browser applies
function resolveColor(value, mode) {
  const literal = resolveRefs(value, mode);
  const mix = literal.match(/^color-mix\(in srgb,\s*(.+)\)$/);
  if (mix) {
    const args = splitTopLevel(mix[1]).map(arg => {
      const w = arg.match(/^(.*?)\s+([\d.]+)%$/);
      return w
        ? { color: resolveColor(w[1], mode), weight: +w[2] }
        : { color: resolveColor(arg, mode), weight: null };
    });
    const given = args.filter(a => a.weight !== null).reduce((s, a) => s + a.weight, 0);
    const missing = args.filter(a => a.weight === null).length;
    for (const arg of args) {
      if (arg.weight === null) {
        arg.weight = (100 - given) / missing;
      }
    }
    const chan = key =>
      Math.round(args.reduce((s, a) => s + (a.color[key] * a.weight) / 100, 0));
    return {
      r: chan('r'),
      g: chan('g'),
      b: chan('b'),
      a: args.reduce((s, a) => s + (a.color.a * a.weight) / 100, 0),
    };
  }
  const color = parseColor(literal);
  if (!color) {
    throw new Error(`cannot resolve color from "${value}" (${literal})`);
  }
  return color;
}

// every color the generator emits, so the literal safety scan can allow it
const emittedColors = new Set();

function colorKey(c) {
  return `${c.r},${c.g},${c.b},${Math.round(c.a * 100) / 100}`;
}

function dartColor(c) {
  const hex2 = n => n.toString(16).padStart(2, '0').toUpperCase();
  emittedColors.add(colorKey(c));
  return `Color(0x${hex2(Math.round(c.a * 255))}${hex2(c.r)}${hex2(c.g)}${hex2(c.b)})`;
}

function displayHex(hex) {
  emittedColors.add(colorKey(parseColor(hex)));
  return hex.toUpperCase();
}

// ---------------------------------------------------------------------------
// Shadow parsing

function parseShadows(value) {
  if (value === 'none') {
    return { parts: [], highlight: false };
  }
  let highlight = false;
  const parts = [];
  for (const chunk of splitTopLevel(value)) {
    if (chunk === 'var(--shadow-edge-highlight)') {
      highlight = true;
      continue;
    }
    const inset = /^inset\b/.test(chunk);
    const body = chunk.replace(/^inset\s+/, '');
    const colorMatch = body.match(/(rgba?\([^)]*\)|#[0-9a-f]{6}|var\(--[\w-]+\))\s*$/i);
    if (!colorMatch) {
      throw new Error(`no color in shadow part "${chunk}"`);
    }
    const nums = body
      .slice(0, colorMatch.index)
      .trim()
      .split(/\s+/)
      .map(n => pxOf(n) ?? Number(n));
    const [x = 0, y = 0, blur = 0, spread = 0] = nums;
    parts.push({ inset, x, y, blur, spread, colorCss: colorMatch[1] });
  }
  return { parts, highlight };
}

// ---------------------------------------------------------------------------
// Markdown helpers

function mdTable(headers, rows) {
  const widths = headers.map((h, i) =>
    Math.max(3, h.length, ...rows.map(r => String(r[i]).length)),
  );
  const line = cells =>
    `| ${cells.map((c, i) => String(c).padEnd(widths[i])).join(' | ')} |`;
  return [
    line(headers),
    `| ${widths.map(w => '-'.repeat(w)).join(' | ')} |`,
    ...rows.map(line),
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Token groupings

const PRIMITIVE_COLOR =
  /^--color-(primary|secondary|neutral|success|warning|error|info)-\d+$/;
const PICKER_COLOR = /^--color-picker-/;
const SHADOW_LEVEL = /^--shadow-(none|xs|sm|md|lg|xl|2xl|inner)$/;

const SPACE_WHITELIST = new Set(
  ['0', '1', '2', '3', '4', '6', '8', '12', '16'].map(n => `--space-${n}`),
);

function primitiveShades(group) {
  return [...tokens.keys()]
    .filter(n => new RegExp(`^--color-${group}-\\d+$`).test(n))
    .map(n => ({ name: n, shade: n.split('-').pop(), hex: tokens.get(n).value }));
}

function semanticColorNames() {
  return [...tokens.keys()].filter(
    n => n.startsWith('--color-') && !PRIMITIVE_COLOR.test(n) && !PICKER_COLOR.test(n),
  );
}

// '--color-bg-stripe-subtle' -> 'surfaceStripeSubtle', '--color-divider' -> 'divider'
function flutterColorName(cssName) {
  const kebab = cssName.slice('--color-'.length).replace(/^bg(-|$)/, 'surface$1');
  return camel(kebab);
}

// text roles: every '--text-{role}-size' with a matching weight token
function textRoles() {
  return [...tokens.keys()]
    .filter(n => /^--text-[\w-]+-size$/.test(n))
    .map(n => n.slice('--text-'.length, -'-size'.length))
    .filter(role => tokens.has(`--text-${role}-weight`));
}

function refName(value, prefix) {
  const m = value.match(/^var\((--[\w-]+)\)$/);
  return m && m[1].startsWith(prefix) ? m[1].slice(prefix.length) : null;
}

function spaceScale() {
  return [...SPACE_WHITELIST].map(n => ({
    name: n,
    suffix: n.slice('--space-'.length),
    px: pxOf(tokens.get(n).value),
  }));
}

function internalSpaceNames() {
  return [...tokens.keys()].filter(
    n => /^--space-(?!n-)/.test(n) && !SPACE_WHITELIST.has(n),
  );
}

function scaleOf(prefix) {
  return [...tokens.keys()]
    .filter(n => n.startsWith(prefix))
    .map(n => ({ name: n, suffix: n.slice(prefix.length), token: tokens.get(n) }));
}

// ---------------------------------------------------------------------------
// Machine-readable JSON export (W3C Design Tokens format where practical)

const GROUPS = [
  ['--color-', 'color', 'color'],
  ['--font-family-', 'font-family', 'fontFamily'],
  ['--font-size-', 'font-size', 'dimension'],
  ['--font-weight-', 'font-weight', 'fontWeight'],
  ['--line-height-', 'line-height', 'number'],
  ['--letter-spacing-', 'letter-spacing', 'dimension'],
  ['--icon-', 'icon', 'dimension'],
  ['--text-', 'text', null],
  ['--space-', 'space', 'dimension'],
  ['--inset-', 'inset', null],
  ['--stack-', 'stack', 'dimension'],
  ['--inline-', 'inline', 'dimension'],
  ['--radius-', 'radius', 'dimension'],
  ['--border-width-', 'border-width', 'dimension'],
  ['--ea-', 'component', 'dimension'],
  ['--shadow-', 'shadow', 'shadow'],
  ['--z-index-', 'z-index', 'number'],
  ['--duration-', 'duration', 'duration'],
  ['--ease-', 'ease', null],
  ['--transition-', 'transition', null],
];

function groupOf(name) {
  const entry = GROUPS.find(([prefix]) => name.startsWith(prefix));
  if (!entry) {
    throw new Error(`no JSON group for token ${name}`);
  }
  return { group: entry[1], key: name.slice(entry[0].length), type: entry[2] };
}

function jsonValue(value, mode) {
  const alias = value.match(/^var\((--[\w-]+)\)$/);
  if (alias && tokens.has(alias[1])) {
    const { group, key } = groupOf(alias[1]);
    return `{${group}.${key}}`;
  }
  const resolved = value.includes('var(') ? resolveRefs(value, mode) : value;
  return /^-?\d+(\.\d+)?$/.test(resolved) ? Number(resolved) : resolved;
}

function buildTokensJson() {
  const out = {
    $description:
      `Eagami UI design tokens, generated from @eagami/ui@${VERSION} ` +
      '(packages/ui/src/styles/tokens/*.scss) by scripts/sync-integration-guides.mjs. ' +
      'Aliases use W3C Design Tokens {group.token} syntax. Dark-mode overrides live in ' +
      "$extensions['com.eagami.ui'].dark; tokens without one are identical in both " +
      'modes. Shadow, ease, and transition tokens carry raw CSS values.',
  };
  for (const [name, token] of tokens) {
    const { group, key, type } = groupOf(name);
    out[group] ??= {};
    const entry = {};
    if (type) {
      entry.$type = type;
    }
    entry.$value = jsonValue(token.value, 'light');
    const ext = {};
    if (token.dark) {
      ext.dark = jsonValue(token.dark, 'dark');
    }
    if (token.reduced) {
      ext.reducedMotion = jsonValue(token.reduced, 'light');
    }
    if (Object.keys(ext).length) {
      entry.$extensions = { 'com.eagami.ui': ext };
    }
    out[group][key] = entry;
  }
  return `${JSON.stringify(out, null, 2)}\n`;
}

// ---------------------------------------------------------------------------
// React guide: generated CSS block

const CSS_SKIP = name =>
  (name.startsWith('--space-') && !SPACE_WHITELIST.has(name)) ||
  name === '--ea-icon-button-size';

const CSS_SECTIONS = [
  ['Primitive palette: primary (H=205, S=50)', /^--color-primary-\d+$/],
  ['Primitive palette: secondary (H=222, S=25)', /^--color-secondary-\d+$/],
  ['Primitive palette: neutral', /^--color-neutral-\d+$/],
  ['Primitive palette: feedback', /^--color-(success|warning|error|info)-\d+$/],
  ['Color picker intrinsics (not themeable)', /^--color-picker-/],
  ['Semantic: text', /^--color-text-/],
  ['Semantic: background', /^--color-bg-/],
  ['Semantic: tooltip surface', /^--color-tooltip-/],
  ['Semantic: interactive state fills', /^--color-state-/],
  ['Semantic: border', /^--color-(border-|divider)/],
  ['Semantic: brand', /^--color-brand-/],
  [
    'Semantic: feedback roles',
    /^--color-(success|warning|error|info)-(default|subtle|muted|text)$/,
  ],
  ['Spacing: base scale (whitelist only)', /^--space-/],
  ['Spacing: semantic insets', /^--inset-/],
  ['Spacing: stack (vertical gap)', /^--stack-/],
  ['Spacing: inline (horizontal gap)', /^--inline-/],
  ['Typography: families', /^--font-family-/],
  ['Typography: sizes', /^--font-size-/],
  ['Typography: weights', /^--font-weight-/],
  ['Typography: line heights', /^--line-height-/],
  ['Typography: letter spacing', /^--letter-spacing-/],
  ['Typography: inline icon sizing', /^--icon-inline-size$/],
  ['Typography: composite text styles', /^--text-/],
  ['Shape: radius', /^--radius-/],
  ['Shape: border widths', /^--border-width-/],
  ['Elevation: shadows', /^--shadow-(none|xs|sm|md|lg|xl|2xl|inner|edge-highlight)$/],
  ['Elevation: relief (bevel and well)', /^--shadow-(bevel|well)/],
  ['Elevation: focus rings', /^--shadow-focus-ring/],
  ['Elevation: z-index', /^--z-index-/],
  ['Motion: durations', /^--duration-/],
  ['Motion: easings', /^--ease-/],
  ['Motion: composite transitions', /^--transition-/],
];

function cssSections() {
  const names = [...tokens.keys()].filter(n => !CSS_SKIP(n));
  const claimed = new Set();
  const sections = CSS_SECTIONS.map(([comment, re]) => {
    const members = names.filter(n => re.test(n) && !claimed.has(n));
    members.forEach(n => claimed.add(n));
    return { comment, members };
  }).filter(s => s.members.length);
  const orphans = names.filter(n => !claimed.has(n));
  if (orphans.length) {
    throw new Error(`tokens missing a CSS section: ${orphans.join(', ')}`);
  }
  return sections;
}

function declLines(name, rawValue, indent, mode) {
  const refs = [...rawValue.matchAll(/var\((--[\w-]+)\)/g)].map(m => m[1]);
  const value = refs.some(CSS_SKIP) ? resolveRefs(rawValue, mode) : rawValue;
  const single = `${indent}${name}: ${value};`;
  if (single.length <= 90) {
    return [single];
  }
  const parts = splitTopLevel(value);
  if (parts.length === 1) {
    return [single];
  }
  const lines = [`${indent}${name}:`];
  let buf = '';
  parts.forEach((part, i) => {
    const suffix = i === parts.length - 1 ? ';' : ',';
    const next = buf ? `${buf} ${part}${suffix}` : `${indent}  ${part}${suffix}`;
    if (next.length > 88 && buf) {
      lines.push(buf);
      buf = `${indent}  ${part}${suffix}`;
    } else {
      buf = next;
    }
  });
  if (buf) {
    lines.push(buf);
  }
  return lines;
}

function generateCssBlock() {
  const lines = [];
  lines.push(
    '/* ---------------------------------------------------------------------------',
    ' * Eagami UI: CSS tokens',
    ` * Generated from @eagami/ui@${VERSION} (packages/ui/src/styles/tokens/*.scss)`,
    ' * by scripts/sync-integration-guides.mjs. Do not edit by hand.',
    ' * ------------------------------------------------------------------------- */',
    '',
    ':root {',
  );
  const sections = cssSections();
  sections.forEach(({ comment, members }, i) => {
    if (i) {
      lines.push('');
    }
    lines.push(`  /* ${comment} */`);
    for (const name of members) {
      lines.push(...declLines(name, tokens.get(name).value, '  ', 'light'));
    }
  });
  lines.push('}', '');
  lines.push(
    '/* Dark mode: applied when the OS prefers dark, unless forced light via',
    ' * <html data-theme="light">. <html data-theme="dark"> forces dark. The',
    ' * declarations are duplicated across the two selectors below to match the',
    ' * upstream SCSS, which shares them via a mixin; keep the two lists identical. */',
  );
  const darkDecls = indent => {
    const out = [];
    let first = true;
    for (const { members } of sections) {
      const dark = members.filter(n => tokens.get(n).dark);
      if (!dark.length) {
        continue;
      }
      if (!first) {
        out.push('');
      }
      first = false;
      for (const name of dark) {
        out.push(...declLines(name, tokens.get(name).dark, indent, 'dark'));
      }
    }
    return out;
  };
  lines.push('@media (prefers-color-scheme: dark) {');
  lines.push("  :root:not([data-theme='light']) {");
  lines.push(...darkDecls('    '));
  lines.push('  }', '}', '');
  lines.push(":root[data-theme='dark'] {");
  lines.push('  color-scheme: dark;', '');
  lines.push(...darkDecls('  '));
  lines.push('}', '');
  lines.push('@media (prefers-reduced-motion: reduce) {');
  lines.push('  :root {');
  for (const [name, token] of tokens) {
    if (token.reduced) {
      lines.push(`    ${name}: ${token.reduced};`);
    }
  }
  lines.push('  }', '}');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// React guide: generated TypeScript block

function packEntries(lines, body, indent) {
  let buf = '';
  for (const part of body) {
    const next = buf ? `${buf} ${part},` : `${indent}${part},`;
    if (next.length > 88 && buf) {
      lines.push(buf);
      buf = `${indent}${part},`;
    } else {
      buf = next;
    }
  }
  if (buf) {
    lines.push(buf);
  }
}

function wrapObject(name, entries) {
  const body = entries.map(([k, v]) => `${k}: ${typeof v === 'string' ? `'${v}'` : v}`);
  const oneLine = `export const ${name} = { ${body.join(', ')} } as const;`;
  if (oneLine.length <= 90) {
    return [oneLine];
  }
  const lines = [`export const ${name} = {`];
  packEntries(lines, body, '  ');
  lines.push('} as const;');
  return lines;
}

function generateTsBlock() {
  const lines = [];
  lines.push(
    '/**',
    ' * Eagami UI: TypeScript tokens',
    ` * Generated from @eagami/ui@${VERSION} by scripts/sync-integration-guides.mjs.`,
    ' * Do not edit by hand.',
    ' */',
    '',
  );
  const groups = [
    'primary',
    'secondary',
    'neutral',
    'success',
    'warning',
    'error',
    'info',
  ];
  lines.push('export const palette = {');
  for (const group of groups) {
    const body = primitiveShades(group).map(({ shade, hex }) => `${shade}: '${hex}'`);
    const oneLine = `  ${group}: { ${body.join(', ')} },`;
    if (oneLine.length <= 90) {
      lines.push(oneLine);
    } else {
      lines.push(`  ${group}: {`);
      packEntries(lines, body, '    ');
      lines.push('  },');
    }
  }
  lines.push('} as const;', '');

  const gapEntries = prefix =>
    scaleOf(prefix).map(({ suffix, token }) => [
      tsKey(suffix),
      pxOf(resolveRefs(token.value, 'light')),
    ]);
  lines.push('export const spacing = {');
  lines.push(
    `  ${spaceScale()
      .map(({ suffix, px }) => `s${suffix}: ${px}`)
      .join(', ')},`,
  );
  lines.push(
    `  stack: { ${gapEntries('--stack-')
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ')} },`,
  );
  lines.push(
    `  inline: { ${gapEntries('--inline-')
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ')} },`,
  );
  lines.push('} as const;', '');

  const scaleEntries = (prefix, transform = v => pxOf(v)) =>
    scaleOf(prefix).map(({ suffix, token }) => [tsKey(suffix), transform(token.value)]);
  lines.push(...wrapObject('radius', scaleEntries('--radius-')), '');
  lines.push(...wrapObject('borderWidth', scaleEntries('--border-width-')), '');
  lines.push(
    ...wrapObject(
      'duration',
      scaleEntries('--duration-', v => Number(v.replace('ms', ''))),
    ),
    '',
  );
  lines.push(
    ...wrapObject(
      'easing',
      scaleEntries('--ease-', v => v),
    ),
    '',
  );
  lines.push(...wrapObject('zIndex', scaleEntries('--z-index-', Number)), '');
  lines.push(
    '/**',
    ' * Read a semantic color token at runtime. Use this when you need the current',
    ' * resolved value in JS (e.g. for Canvas rendering). For everything else, prefer',
    ' * CSS `var(--color-...)` references.',
    ' */',
    'export function readCssToken(name: string): string {',
    "  if (typeof window === 'undefined') return '';",
    '  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();',
    '}',
  );
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// React guide: generated section 2

function reactCell(value) {
  const single = value.match(/^var\((--[\w-]+)\)$/);
  if (single) {
    return `\`${single[1]}\``;
  }
  if (/^#[0-9a-f]{6}$/i.test(value)) {
    return `\`${displayHex(value)}\``;
  }
  return `\`${value}\``;
}

function reactPaletteTable(group) {
  return mdTable(
    ['Token', 'Hex'],
    primitiveShades(group).map(({ name, hex }) => [
      `\`${name}\``,
      `\`${displayHex(hex)}\``,
    ]),
  );
}

function pairedFeedbackTable(nameOf) {
  const left = [...primitiveShades('success'), ...primitiveShades('error')];
  const right = [...primitiveShades('warning'), ...primitiveShades('info')];
  return mdTable(
    ['Token', 'Hex', '', 'Token', 'Hex'],
    left.map((l, i) => [
      `\`${nameOf(l.name)}\``,
      `\`${displayHex(l.hex)}\``,
      '',
      `\`${nameOf(right[i].name)}\``,
      `\`${displayHex(right[i].hex)}\``,
    ]),
  );
}

function prosePairs(prefix, render = v => v) {
  return scaleOf(prefix)
    .map(({ suffix, token }) => `\`${suffix}\` ${render(token.value)}`)
    .join(', ');
}

function generateReactTokensSection() {
  const out = [];
  const push = (...blocks) => out.push(...blocks);
  const shadowRows = (names, mode) =>
    names.map(name => {
      const token = tokens.get(name);
      const raw = mode === 'dark' ? (token.dark ?? token.value) : token.value;
      return [`\`${name}\``, `\`${raw}\``];
    });

  push(
    'All values below mirror the CSS custom properties in `packages/ui/src/styles/tokens/*.scss` in the upstream Angular library. This whole section is generated by `scripts/sync-integration-guides.mjs`; never edit it by hand, regenerate it with `pnpm ui sync-guides` when upstream tokens change (see section 8).',
  );

  push('### 2.1 Colors, primitive palette');
  push(
    'Use these only if a semantic token is not available. Adding a new semantic is almost always the right move.',
  );
  push('#### Primary (brand)');
  push('The primary ramp is a single hue (H=205, S=50) varying only by lightness.');
  push(reactPaletteTable('primary'));
  push('#### Secondary');
  push('The secondary ramp is a single hue (H=222, S=25) varying only by lightness.');
  push(reactPaletteTable('secondary'));
  push('#### Neutral');
  push(reactPaletteTable('neutral'));
  push('#### Feedback');
  push(pairedFeedbackTable(n => n));
  push('#### Color-picker intrinsics');
  push(
    "Pure RGB primaries for the color picker's hue wheel and saturation/value gradient. Intrinsic to the picker, not themeable, and identical in light and dark mode. Only the picker consumes them.",
  );
  push(
    mdTable(
      ['Token', 'Value'],
      [...tokens.keys()]
        .filter(n => PICKER_COLOR.test(n))
        .map(n => [`\`${n}\``, reactCell(tokens.get(n).value)]),
    ),
  );

  push('### 2.2 Colors, semantic (light / dark)');
  push(
    'In light mode (default) and dark mode (`@media (prefers-color-scheme: dark)`, or `<html data-theme="dark">`):',
  );
  push(
    mdTable(
      ['Semantic token', 'Light ref', 'Dark ref'],
      semanticColorNames().map(n => {
        const token = tokens.get(n);
        return [`\`${n}\``, reactCell(token.value), reactCell(token.dark ?? token.value)];
      }),
    ),
  );
  push(
    'In dark mode the surface model splits the page (`bg-canvas`, deepest) from the surfaces that sit on it (`bg-base`, `bg-subtle`, `bg-elevated`, `bg-muted`). Canvas stays at the deepest neutral while every component surface lifts above it so inputs, cards, accordion items, and popover panels read above the page instead of disappearing into it. `bg-stripe` is the alternating-row tone for tables; it sits *below* `bg-base` to keep odd rows darker than the surrounding card, and `bg-stripe-subtle` mixes it toward `bg-base` for a quieter zebra fill. `bg-muted` is the opaque static fill for disabled fields, tracks, and skeletons; `bg-emphasis` is the soft placeholder fill (e.g. avatar initials).',
  );
  push(
    'Hover and active/selected fills route through `--color-state-hover` / `--color-state-active`, not through `bg-*`. Light mode uses solid neutral tones; dark mode swaps to translucent white washes so a lift still reads on any dark surface, including the tier where several `bg-*` roles coincide.',
  );
  push(
    '`--color-brand-text` is the brand colour used as a **foreground** on a non-brand surface (selected dropdown row, today marker, sorted column header, spinner, active paginator page). It needs a 4.5:1 contrast against `--color-bg-base`, so it flips to a lighter shade in dark mode. `--color-brand-default` stays free to be optimized as a surface (button background, badge background) without dragging the text-on-surface contrast along with it. The status `*-text` tokens mirror this split: each is the status hue as a foreground on its own `*-subtle` / `*-muted` wash (badge, tag, toast), flipping from a dark shade in light mode to a light pastel in dark mode to keep 4.5:1 on the translucent dark washes.',
  );

  push('### 2.3 Spacing, base scale');
  push(
    mdTable(
      ['Token', 'Value (px)'],
      spaceScale().map(({ name, px }) => [`\`${name}\``, px]),
    ),
  );
  push(
    `Only these values are permitted (see section 1.1). The upstream SCSS defines additional values (${internalSpaceNames()
      .map(n => `\`${n}\``)
      .join(
        ', ',
      )}, plus negative variants) for internal library use; consumers should not use them.`,
  );

  push('### 2.4 Spacing, semantic');
  push('**Inset (component padding, vertical horizontal):**');
  push(
    mdTable(
      ['Token', 'Value', 'px'],
      scaleOf('--inset-').map(({ name, token }) => [
        `\`${name}\``,
        `\`${token.value}\``,
        resolveRefs(token.value, 'light')
          .split(' ')
          .map(v => `${pxOf(v)}px`)
          .join(' '),
      ]),
    ),
  );
  const gapTable = prefix =>
    mdTable(
      ['Token', 'Value'],
      scaleOf(prefix).map(({ name, token }) => [
        `\`${name}\``,
        `${pxOf(resolveRefs(token.value, 'light'))}px`,
      ]),
    );
  push('**Stack (vertical gap):**');
  push(gapTable('--stack-'));
  push('**Inline (horizontal gap):**');
  push(gapTable('--inline-'));

  push('### 2.5 Typography');
  push('**Font families:**');
  push(
    mdTable(
      ['Token', 'Stack'],
      scaleOf('--font-family-').map(({ name, token }) => [
        `\`${name}\``,
        token.value.replace(/'/g, ''),
      ]),
    ),
  );
  push(
    'Load the web fonts (DM Sans, Syne) via `<link>` to Google Fonts or self-hosted via `@font-face`. The `* Fallback` faces are Arial tuned with metric overrides to match each web font, so they must sit immediately after the web font in the stack: text laid out before the font loads then shares the same metrics and `font-display: swap` causes no layout shift when the real font arrives. The mono stack is system-only (no web font). Set up the fallback `@font-face` metric-override declarations upstream, or drop the `* Fallback` entries if not replicating them.',
  );
  push('**Font sizes (rem, base 16px):**');
  push(
    mdTable(
      ['Token', 'rem', 'px'],
      scaleOf('--font-size-').map(({ name, token }) => [
        `\`${name}\``,
        token.value.replace('rem', ''),
        pxOf(token.value),
      ]),
    ),
  );
  push(`**Font weights:** ${prosePairs('--font-weight-')}.`);
  push(`**Line heights:** ${prosePairs('--line-height-')}.`);
  push(`**Letter spacing:** ${prosePairs('--letter-spacing-')}.`);
  push('**Composite text styles** (use these in components):');
  push(
    'Each role exposes `size`, `weight`, and (for most roles) `lh` custom properties; roles with a pinned font family also expose `family`.',
  );
  push(
    mdTable(
      ['Role', 'Size', 'Weight', 'Line height', 'Family'],
      textRoles().map(role => {
        const size = tokens.get(`--text-${role}-size`).value;
        const weight = tokens.get(`--text-${role}-weight`).value;
        const lh = tokens.get(`--text-${role}-lh`)?.value;
        const family = tokens.get(`--text-${role}-family`)?.value;
        return [
          `\`${role}\``,
          refName(size, '--font-size-') ?? size,
          refName(weight, '--font-weight-') ?? weight,
          lh ? (refName(lh, '--line-height-') ?? lh) : '-',
          family ? (refName(family, '--font-family-') ?? family) : '-',
        ];
      }),
    ),
  );
  push(
    '`helper` uses a fixed 13px size, between `xs` and `sm`, for field hint/error text and short metadata. `code` and `kbd` size in `em` so they track the surrounding text; both also expose color, background, padding, and radius tokens (`--text-code-*`, `--text-kbd-*`) for inline code chips and keyboard-key glyphs.',
  );
  push('Usage example:');
  push(
    '```css\n.title {\n  font-size: var(--text-h2-size);\n  font-weight: var(--text-h2-weight);\n  line-height: var(--text-h2-lh);\n}\n```',
  );

  push('### 2.6 Shape');
  push('**Border radius:**');
  push(
    mdTable(
      ['Token', 'Value'],
      scaleOf('--radius-').map(({ name, token }) => [
        `\`${name}\``,
        pxOf(token.value) === null ? token.value : `${pxOf(token.value)}px`,
      ]),
    ),
  );
  push('**Border width:**');
  push(
    mdTable(
      ['Token', 'Value'],
      scaleOf('--border-width-').map(({ name, token }) => [`\`${name}\``, token.value]),
    ),
  );

  const levels = [...tokens.keys()].filter(n => SHADOW_LEVEL.test(n));
  const relief = [...tokens.keys()].filter(n => /^--shadow-(bevel|well)/.test(n));
  const focus = [...tokens.keys()].filter(n => /^--shadow-focus-ring/.test(n));
  push('### 2.7 Elevation');
  push('**Shadows (light mode):**');
  push(
    mdTable(
      ['Token', 'Value'],
      [...shadowRows(levels, 'light'), ...shadowRows(focus, 'light')],
    ),
  );
  push(
    '**Shadows (dark mode):** a drop shadow is the absence of light, so dark mode keeps the shadows **black** (and deeper than light mode); a white "shadow" reads as a glow and looks wrong. Elevation is instead carried by the lifted surface tone plus a hairline top highlight (`--shadow-edge-highlight`, a no-op in light mode) appended to every level so the surface catches light along its top edge.',
  );
  push(
    mdTable(
      ['Token', 'Dark value'],
      shadowRows(
        ['--shadow-edge-highlight', ...levels].filter(n => tokens.get(n).dark),
        'dark',
      ),
    ),
  );
  push(
    '**Bevel and well (relief):** paired inset shadows for surfaces that should read as raised or recessed. Compose with `--shadow-*` for an ambient drop, e.g. `box-shadow: var(--shadow-bevel), var(--shadow-sm);`. Dark-mode variants drop the highlight alpha and raise the shadow alpha so the relief still reads against the lifted `bg-base`.',
  );
  push(mdTable(['Token', 'Light value'], shadowRows(relief, 'light')));
  push(mdTable(['Token', 'Dark value'], shadowRows(relief, 'dark')));
  push('**Z-index:**');
  push(
    mdTable(
      ['Token', 'Value'],
      scaleOf('--z-index-').map(({ name, token }) => [`\`${name}\``, token.value]),
    ),
  );

  push('### 2.8 Motion');
  push('**Durations:**');
  push(
    mdTable(
      ['Token', 'Value'],
      scaleOf('--duration-').map(({ name, token }) => [`\`${name}\``, token.value]),
    ),
  );
  push(
    'Under `@media (prefers-reduced-motion: reduce)`, all non-instant durations collapse to 0ms automatically.',
  );
  push('**Easings:**');
  push(
    mdTable(
      ['Token', 'Value'],
      scaleOf('--ease-').map(({ name, token }) => [`\`${name}\``, `\`${token.value}\``]),
    ),
  );
  push('**Composite transitions:**');
  push(
    mdTable(
      ['Token', 'Value'],
      scaleOf('--transition-').map(({ name, token }) => [
        `\`${name}\``,
        `\`${token.value}\``,
      ]),
    ),
  );

  return out.join('\n\n');
}

// ---------------------------------------------------------------------------
// Flutter guide: generated section 2

function flutterColorCell(value, mode) {
  const single = value.match(/^var\((--color-[\w-]+)\)$/);
  if (single) {
    return `\`${flutterColorName(single[1])}\``;
  }
  return `\`${dartColor(resolveColor(value, mode))}\``;
}

function proseColor(colorCss, mode) {
  const single = colorCss.match(/^var\((--color-[\w-]+)\)$/);
  if (single) {
    return `\`${flutterColorName(single[1])}\``;
  }
  const c = resolveColor(colorCss, mode);
  const pct = `${Math.round(c.a * 100)}%`;
  if (c.r === 0 && c.g === 0 && c.b === 0) {
    return `${pct} black`;
  }
  if (c.r === 255 && c.g === 255 && c.b === 255) {
    return `${pct} white`;
  }
  return `\`${dartColor(c)}\` (${pct})`;
}

function shadowProse(name, mode) {
  const token = tokens.get(name);
  const raw = mode === 'dark' ? (token.dark ?? token.value) : token.value;
  const { parts, highlight } = parseShadows(raw);
  if (!parts.length && !highlight) {
    return '`[]`';
  }
  const rendered = parts.map(p => {
    const spread = p.spread ? ` spread ${fmtNum(p.spread)}` : '';
    const inset = p.inset ? 'inset ' : '';
    return `${inset}\`(${fmtNum(p.x)},${fmtNum(p.y)}) blur ${fmtNum(p.blur)}${spread}\` at ${proseColor(p.colorCss, mode)}`;
  });
  return rendered.join(' + ') + (highlight ? ' + top highlight' : '');
}

function dartCurve(cssEase) {
  const m = cssEase.match(/^cubic-bezier\(([^)]+)\)$/);
  if (!m) {
    throw new Error(`unsupported easing "${cssEase}"`);
  }
  return `Cubic(${m[1]})`;
}

function generateFlutterTokensSection() {
  const out = [];
  const push = (...blocks) => out.push(...blocks);
  const flutterKey = (prefix, suffix) => `${prefix}${capFirst(camel(suffix))}`;

  push(
    'All values below are directly encoded into the Dart source in § 3. They mirror the CSS custom properties in `packages/ui/src/styles/tokens/*.scss` in the upstream Angular library. This whole section (and the theme code in § 3.2) is generated by `scripts/sync-integration-guides.mjs`; never edit it by hand, regenerate it with `pnpm ui sync-guides` when upstream tokens change (see § 8).',
  );

  const paletteTable = group =>
    mdTable(
      ['Token', 'Hex'],
      primitiveShades(group).map(({ shade, hex }) => [
        `\`${group}${shade}\``,
        `\`${displayHex(hex)}\``,
      ]),
    );
  push('### 2.1 Colors, primitive palette');
  push(
    'Use these only if a semantic token is not available. Adding a new semantic is almost always the right move.',
  );
  push('#### Primary (brand)');
  push('The primary ramp is a single hue (H=205, S=50) varying only by lightness.');
  push(paletteTable('primary'));
  push('#### Secondary');
  push('The secondary ramp is a single hue (H=222, S=25) varying only by lightness.');
  push(paletteTable('secondary'));
  push('#### Neutral');
  push(paletteTable('neutral'));
  push('#### Feedback');
  push(pairedFeedbackTable(n => camel(n.slice('--color-'.length))));

  push('### 2.2 Colors, semantic (light & dark)');
  push(
    'Dark-mode `*Subtle` and `*Muted` for status colours are re-tinted as low-alpha washes of the saturated `*500` so dark-mode text remains readable on them. Light-mode pastels would otherwise be unreadable behind light text in dark mode. Blended upstream values (`color-mix`) are precomputed to flat `Color` literals.',
  );
  push(
    mdTable(
      ['Semantic token', 'Light', 'Dark'],
      semanticColorNames().map(n => {
        const token = tokens.get(n);
        return [
          `\`${flutterColorName(n)}\``,
          flutterColorCell(token.value, 'light'),
          flutterColorCell(token.dark ?? token.value, 'dark'),
        ];
      }),
    ),
  );
  push(
    'In dark mode the surface model splits the page (`surfaceCanvas`, deepest) from the surfaces that sit on it (`surfaceBase`, `surfaceSubtle`, `surfaceElevated`, `surfaceMuted`). Canvas stays at the deepest neutral while every component surface lifts above it so inputs, cards, accordion items, and popover panels read above the page instead of disappearing into it. `surfaceStripe` is the alternating-row tone for tables; it sits **below** `surfaceBase` to keep odd rows darker than the surrounding card, and `surfaceStripeSubtle` mixes it toward `surfaceBase` for a quieter zebra fill. `surfaceMuted` is the opaque static fill for disabled fields, slider and progress tracks, and skeletons; hover and active fills route through the translucent `stateHover` / `stateActive` washes, so this shade never collides with them.',
  );
  push(
    '`brandText` is the brand colour used as a **foreground** on a non-brand surface (selected dropdown row, today marker, sorted column header, spinner, active paginator page). It needs a 4.5:1 contrast against `surfaceBase`, so it flips to a lighter shade in dark mode. `brandDefault` stays free to be optimized as a surface (button background, badge background) without dragging the text-on-surface contrast along with it. The status `*Text` tokens mirror this split for text on the status washes.',
  );

  push('### 2.3 Spacing, base scale');
  push(
    mdTable(
      ['Token', 'Pixels'],
      spaceScale().map(({ suffix, px }) => [`\`s${suffix}\``, px]),
    ),
  );
  push(
    `Only these values are permitted (see § 1.1). The upstream SCSS defines additional values (${internalSpaceNames()
      .map(n => `${pxOf(tokens.get(n).value)}px`)
      .join(', ')}) but these exist for internal library use and are not exposed here.`,
  );

  push('### 2.4 Spacing, semantic');
  push('**Inset (component padding, vertical × horizontal):**');
  push(
    mdTable(
      ['Token', 'Vertical', 'Horizontal'],
      scaleOf('--inset-').map(({ suffix, token }) => {
        const [v, h] = resolveRefs(token.value, 'light')
          .split(' ')
          .map(x => pxOf(x));
        return [`\`${flutterKey('inset', suffix)}\``, v, h];
      }),
    ),
  );
  push(
    '`insetSm` and `insetXs` may use values off the public scale internally; do not construct the equivalent `EdgeInsets.symmetric(...)` directly, reach for the token so the choice stays consistent.',
  );
  const gapTable = prefix =>
    mdTable(
      ['Token', 'Pixels'],
      scaleOf(prefix).map(({ suffix, token }) => [
        `\`${flutterKey(prefix.slice(2, -1), suffix)}\``,
        pxOf(resolveRefs(token.value, 'light')),
      ]),
    );
  push('**Stack (vertical gap):**');
  push(gapTable('--stack-'));
  push('**Inline (horizontal gap):**');
  push(gapTable('--inline-'));

  push('### 2.5 Typography');
  push('**Font families** (bundled per § 3.1; upstream web stacks shown for reference):');
  push(
    mdTable(
      ['Token', 'Upstream stack'],
      scaleOf('--font-family-').map(({ suffix, token }) => [
        `\`${flutterKey('font', suffix)}\``,
        token.value.replace(/'/g, '').split(', ').join(' → '),
      ]),
    ),
  );
  push("**Font sizes** (logical pixels; Flutter's `TextStyle.fontSize`):");
  push(
    mdTable(
      ['Token', 'Pixels'],
      scaleOf('--font-size-').map(({ suffix, token }) => [
        `\`${flutterKey('size', suffix)}\``,
        pxOf(token.value),
      ]),
    ),
  );
  push('**Font weights:**');
  push(
    mdTable(
      ['Token', 'Value'],
      scaleOf('--font-weight-').map(({ suffix, token }) => [
        `\`${suffix}\``,
        `\`w${token.value}\``,
      ]),
    ),
  );
  push('**Line heights** (unitless multiplier):');
  push(
    mdTable(
      ['Token', 'Value'],
      scaleOf('--line-height-').map(({ suffix, token }) => [
        `\`${flutterKey('lh', suffix)}\``,
        token.value,
      ]),
    ),
  );
  push('**Letter spacing** (em):');
  push(
    mdTable(
      ['Token', 'Value'],
      scaleOf('--letter-spacing-').map(({ suffix, token }) => [
        `\`${flutterKey('ls', suffix)}\``,
        token.value.replace('em', ''),
      ]),
    ),
  );
  push('**Composite text styles** (what widget code should actually use):');
  push(
    mdTable(
      ['Style', 'Size', 'Weight', 'Line height', 'Family'],
      textRoles().map(role => {
        const size = pxOf(resolveRefs(tokens.get(`--text-${role}-size`).value, 'light'));
        const weight = resolveRefs(tokens.get(`--text-${role}-weight`).value, 'light');
        const lh = tokens.get(`--text-${role}-lh`);
        const family = tokens.get(`--text-${role}-family`)?.value;
        const familyName = family
          ? (refName(family, '--font-family-') ?? 'sans')
          : 'sans';
        return [
          `\`${tsKey(role)}\``,
          size,
          weight,
          lh ? resolveRefs(lh.value, 'light') : '-',
          familyName,
        ];
      }),
    ),
  );

  push('### 2.6 Shape');
  push('**Border radius:**');
  push(
    mdTable(
      ['Token', 'Pixels'],
      scaleOf('--radius-').map(({ suffix, token }) => [
        `\`${flutterKey('radius', suffix)}\``,
        pxOf(token.value) ?? token.value,
      ]),
    ),
  );
  push('**Border width:**');
  push(
    mdTable(
      ['Token', 'Pixels'],
      scaleOf('--border-width-').map(({ suffix, token }) => [
        `\`${flutterKey('borderWidth', suffix)}\``,
        pxOf(token.value) ?? token.value,
      ]),
    ),
  );

  push('### 2.7 Elevation');
  push(
    '**Shadows** (Flutter `BoxShadow` list). Both modes use black-at-low-alpha drop shadows: a drop shadow is the absence of light, so a white "shadow" reads as a glow and looks wrong. Dark mode deepens the black alpha and appends a hairline top highlight to every non-`none` level so the lifted surface catches light along its top edge. Elevation in dark mode is carried primarily by the lifted surface tone (see `surfaceElevated`) plus that top highlight, with the deeper drop shadow secondary.',
  );
  const levels = [...tokens.keys()].filter(n => SHADOW_LEVEL.test(n));
  push(
    mdTable(
      ['Token', 'Light', 'Dark'],
      levels.map(n => [
        `\`${tsKey(n.slice('--shadow-'.length))}\``,
        shadowProse(n, 'light'),
        tokens.get(n).dark ? shadowProse(n, 'dark') : '(same as light)',
      ]),
    ),
  );
  push(
    '**Bevel and well (relief)**: paired inset shadows that make a surface read as raised (`bevel`) or recessed (`well`). Flutter does not support inset `BoxShadow` natively; render with `CustomPainter`, stacked translucent `Container` overlays, or by painting a `BoxDecoration` whose `gradient` produces the highlight + shadow stops. Dark mode shifts the highlight to a lower alpha and the shadow to a higher alpha so the relief still reads on the lifted `surfaceBase`.',
  );
  const relief = [...tokens.keys()].filter(n => /^--shadow-(bevel|well)/.test(n));
  push(
    mdTable(
      ['Token', 'Light', 'Dark'],
      relief.map(n => [
        `\`${tsKey(n.slice('--shadow-'.length))}\``,
        shadowProse(n, 'light'),
        shadowProse(n, 'dark'),
      ]),
    ),
  );
  push('**Focus rings** (no dark-mode override):');
  push(
    mdTable(
      ['Token', 'Definition'],
      [...tokens.keys()]
        .filter(n => /^--shadow-focus-ring/.test(n))
        .map(n => [`\`${tsKey(n.slice('--shadow-'.length))}\``, shadowProse(n, 'light')]),
    ),
  );
  push(
    '**Z-index** (for `Stack` ordering; Flutter does not use CSS-style z-index, but these are semantic ordering constants):',
  );
  push(
    mdTable(
      ['Token', 'Value'],
      scaleOf('--z-index-').map(({ suffix, token }) => [
        `\`${flutterKey('z', suffix)}\``,
        token.value,
      ]),
    ),
  );

  push('### 2.8 Motion');
  push('**Durations** (`Duration`):');
  push(
    mdTable(
      ['Token', 'Value'],
      scaleOf('--duration-').map(({ suffix, token }) => [
        `\`${suffix}\``,
        `${parseInt(token.value)} ms`,
      ]),
    ),
  );
  push(
    'Under `prefers-reduced-motion`, every duration above (except `instant`) collapses to 0 ms upstream. Mirror that in Flutter via `context.eagamiDuration(base)` (see § 1.4 and § 3.3).',
  );
  push('**Easing** (`Cubic` / `Curve`):');
  push(
    mdTable(
      ['Token', 'Value'],
      scaleOf('--ease-').map(({ suffix, token }) => [
        `\`${flutterKey('ease', suffix)}\``,
        token.value === 'linear' ? '`Curves.linear`' : `\`${dartCurve(token.value)}\``,
      ]),
    ),
  );

  return out.join('\n\n');
}

// ---------------------------------------------------------------------------
// Flutter guide: generated theme extension (eagami_theme.dart)

function dartBoxShadow(part, indent) {
  const args = [];
  if (part.x || part.y) {
    args.push(`offset: Offset(${fmtNum(part.x)}, ${fmtNum(part.y)})`);
  }
  if (part.blur) {
    args.push(`blurRadius: ${fmtNum(part.blur)}`);
  }
  if (part.spread) {
    args.push(`spreadRadius: ${fmtNum(part.spread)}`);
  }
  args.push(`color: ${dartColor(resolveColor(part.colorCss, 'light'))}`);
  return `${indent}BoxShadow(${args.join(', ')}),`;
}

function generateFlutterTheme() {
  const lines = [];
  const semantic = semanticColorNames().map(n => ({
    css: n,
    dart: flutterColorName(n),
  }));
  const roles = textRoles();
  const shadowLevels = [...tokens.keys()]
    .filter(n => SHADOW_LEVEL.test(n))
    .map(n => ({ css: n, dart: tsKey(n.slice('--shadow-'.length)) }));
  const flutterKey = (prefix, suffix) => `${prefix}${capFirst(camel(suffix))}`;

  lines.push(
    "import 'package:flutter/material.dart';",
    '',
    '// =============================================================================',
    '// EagamiTheme: design-token theme extension',
    `// Generated from @eagami/ui@${VERSION} (packages/ui/src/styles/tokens/*.scss)`,
    '// by scripts/sync-integration-guides.mjs. Do not edit by hand.',
    '// =============================================================================',
    '',
    '@immutable',
    'class EagamiTheme extends ThemeExtension<EagamiTheme> {',
    '  const EagamiTheme({',
    '    required this.colors,',
    '    required this.typography,',
    '    required this.spacing,',
    '    required this.radius,',
    '    required this.borderWidth,',
    '    required this.elevation,',
    '    required this.motion,',
    '  });',
    '',
    '  final EagamiColors colors;',
    '  final EagamiTypography typography;',
    '  final EagamiSpacing spacing;',
    '  final EagamiRadius radius;',
    '  final EagamiBorderWidth borderWidth;',
    '  final EagamiElevation elevation;',
    '  final EagamiMotion motion;',
    '',
    '  static const EagamiTheme light = EagamiTheme(',
    '    colors: EagamiColors.light,',
    '    typography: EagamiTypography.base,',
    '    spacing: EagamiSpacing.base,',
    '    radius: EagamiRadius.base,',
    '    borderWidth: EagamiBorderWidth.base,',
    '    elevation: EagamiElevation.light,',
    '    motion: EagamiMotion.base,',
    '  );',
    '',
    '  static const EagamiTheme dark = EagamiTheme(',
    '    colors: EagamiColors.dark,',
    '    typography: EagamiTypography.base,',
    '    spacing: EagamiSpacing.base,',
    '    radius: EagamiRadius.base,',
    '    borderWidth: EagamiBorderWidth.base,',
    '    elevation: EagamiElevation.dark,',
    '    motion: EagamiMotion.base,',
    '  );',
    '',
    '  @override',
    '  EagamiTheme copyWith({',
    '    EagamiColors? colors,',
    '    EagamiTypography? typography,',
    '    EagamiSpacing? spacing,',
    '    EagamiRadius? radius,',
    '    EagamiBorderWidth? borderWidth,',
    '    EagamiElevation? elevation,',
    '    EagamiMotion? motion,',
    '  }) {',
    '    return EagamiTheme(',
    '      colors: colors ?? this.colors,',
    '      typography: typography ?? this.typography,',
    '      spacing: spacing ?? this.spacing,',
    '      radius: radius ?? this.radius,',
    '      borderWidth: borderWidth ?? this.borderWidth,',
    '      elevation: elevation ?? this.elevation,',
    '      motion: motion ?? this.motion,',
    '    );',
    '  }',
    '',
    '  @override',
    '  EagamiTheme lerp(ThemeExtension<EagamiTheme>? other, double t) {',
    '    if (other is! EagamiTheme) return this;',
    '    return t < 0.5 ? this : other;',
    '  }',
    '}',
    '',
    '// =============================================================================',
    '// Colors',
    '// =============================================================================',
    '',
    '@immutable',
    'class EagamiColors {',
    '  const EagamiColors({',
  );
  for (const { dart } of semantic) {
    lines.push(`    required this.${dart},`);
  }
  lines.push('  });', '');
  for (const { dart } of semantic) {
    lines.push(`  final Color ${dart};`);
  }
  for (const mode of ['light', 'dark']) {
    lines.push('', `  static const ${mode} = EagamiColors(`);
    for (const { css, dart } of semantic) {
      lines.push(`    ${dart}: ${dartColor(resolveColor(tokenValue(css, mode), mode))},`);
    }
    lines.push('  );');
  }
  lines.push('}', '');

  lines.push(
    '// =============================================================================',
    '// Typography',
    '// =============================================================================',
    '',
    '@immutable',
    'class EagamiTypography {',
    '  const EagamiTypography({',
  );
  for (const role of roles) {
    lines.push(`    required this.${tsKey(role)},`);
  }
  lines.push('  });', '');
  for (const role of roles) {
    lines.push(`  final TextStyle ${tsKey(role)};`);
  }
  lines.push(
    '',
    "  static const _sans = 'DM Sans';",
    "  static const _brand = 'Syne';",
    "  static const _mono = 'JetBrains Mono';",
    '',
    '  static const base = EagamiTypography(',
  );
  for (const role of roles) {
    const size = pxOf(resolveRefs(tokens.get(`--text-${role}-size`).value, 'light'));
    const weight = resolveRefs(tokens.get(`--text-${role}-weight`).value, 'light');
    const lh = tokens.get(`--text-${role}-lh`);
    const family = tokens.get(`--text-${role}-family`)?.value;
    const familyRef = family ? (refName(family, '--font-family-') ?? 'sans') : 'sans';
    const familyVar =
      { sans: '_sans', brand: '_brand', mono: '_mono' }[familyRef] ?? '_sans';
    const args = [
      `fontFamily: ${familyVar}`,
      `fontSize: ${fmtNum(size)}`,
      `fontWeight: FontWeight.w${weight}`,
    ];
    if (lh) {
      args.push(`height: ${resolveRefs(lh.value, 'light')}`);
    }
    lines.push(`    ${tsKey(role)}: TextStyle(${args.join(', ')}),`);
  }
  lines.push('  );', '}', '');

  lines.push(
    '// =============================================================================',
    '// Spacing',
    '// =============================================================================',
    '',
    '@immutable',
    'class EagamiSpacing {',
    '  const EagamiSpacing();',
    '',
    '  // Base scale, only these values are permitted (see § 1.1).',
  );
  for (const { suffix, px } of spaceScale()) {
    lines.push(`  double get s${suffix} => ${fmtNum(px)};`);
  }
  lines.push(
    '',
    '  // Semantic shortcuts, size mapping for component paddings/gaps',
    '  double get xs => s1;',
    '  double get sm => s2;',
    '  double get md => s4;',
    '  double get lg => s6;',
    '  double get xl => s8;',
    '',
    '  // Insets (component padding). Some insets use values off the public',
    '  // 10-value scale internally; treat them as opaque tokens and reach for',
    '  // them through this API rather than constructing EdgeInsets directly.',
  );
  for (const { suffix, token } of scaleOf('--inset-')) {
    const [v, h] = resolveRefs(token.value, 'light')
      .split(' ')
      .map(x => pxOf(x));
    lines.push(
      `  EdgeInsets get ${flutterKey('inset', suffix)} => const EdgeInsets.symmetric(vertical: ${fmtNum(v)}, horizontal: ${fmtNum(h)});`,
    );
  }
  const gapGetters = prefix => {
    for (const { suffix, token } of scaleOf(prefix)) {
      lines.push(
        `  double get ${flutterKey(prefix.slice(2, -1), suffix)} => ${fmtNum(pxOf(resolveRefs(token.value, 'light')))};`,
      );
    }
  };
  lines.push('', '  // Stack (vertical gap)');
  gapGetters('--stack-');
  lines.push('', '  // Inline (horizontal gap)');
  gapGetters('--inline-');
  lines.push('', '  static const base = EagamiSpacing();', '}', '');

  lines.push(
    '// =============================================================================',
    '// Shape',
    '// =============================================================================',
    '',
    '@immutable',
    'class EagamiRadius {',
    '  const EagamiRadius();',
    '',
  );
  for (const { suffix, token } of scaleOf('--radius-')) {
    const px = pxOf(token.value);
    const value = px === 0 ? 'BorderRadius.zero' : `BorderRadius.circular(${fmtNum(px)})`;
    lines.push(`  BorderRadius get ${tsKey(suffix)} => ${value};`);
  }
  lines.push(
    '',
    '  static const base = EagamiRadius();',
    '}',
    '',
    '@immutable',
    'class EagamiBorderWidth {',
    '  const EagamiBorderWidth();',
    '',
  );
  for (const { suffix, token } of scaleOf('--border-width-')) {
    lines.push(`  double get ${tsKey(suffix)} => ${fmtNum(pxOf(token.value) ?? 0)};`);
  }
  lines.push('', '  static const base = EagamiBorderWidth();', '}', '');

  lines.push(
    '// =============================================================================',
    '// Elevation',
    '// =============================================================================',
    '',
    '@immutable',
    'class EagamiElevation {',
    '  const EagamiElevation({',
  );
  for (const { dart } of shadowLevels) {
    lines.push(`    required this.${dart},`);
  }
  lines.push('  });', '');
  for (const { dart } of shadowLevels) {
    lines.push(`  final List<BoxShadow> ${dart};`);
  }
  lines.push(
    '',
    '  // Focus rings are theme-independent (light/dark share the same values).',
  );
  for (const name of [...tokens.keys()].filter(n => /^--shadow-focus-ring/.test(n))) {
    const { parts } = parseShadows(tokens.get(name).value);
    lines.push(
      `  List<BoxShadow> get ${tsKey(name.slice('--shadow-'.length))} => const [`,
    );
    for (const part of parts) {
      lines.push(dartBoxShadow(part, '        '));
    }
    lines.push('      ];');
  }
  lines.push('', '  // Z-index constants (for Stack ordering / overlay layering)');
  for (const { suffix, token } of scaleOf('--z-index-')) {
    lines.push(`  int get ${flutterKey('z', suffix)} => ${token.value};`);
  }
  const elevationConst = mode => {
    lines.push('', `  static const ${mode} = EagamiElevation(`);
    for (const { css, dart } of shadowLevels) {
      const { parts } = parseShadows(tokenValue(css, mode));
      if (!parts.length) {
        lines.push(`    ${dart}: [],`);
        continue;
      }
      lines.push(`    ${dart}: [`);
      for (const part of parts) {
        lines.push(dartBoxShadow(part, '      '));
      }
      lines.push('    ],');
    }
    lines.push('  );');
  };
  elevationConst('light');
  lines.push(
    '',
    '  // Dark drop shadows stay black (deeper than light) rather than flipping to',
    '  // white, which would read as a glow. The upstream tokens also append a',
    '  // hairline top highlight (inset (0,1) at 6% white) to every non-none level;',
    "  // Flutter's BoxShadow has no inset, so paint that separately (a top-edge",
    '  // gradient stop or a 1px translucent-white top border on the surface).',
    '  // The upstream bevel/well relief tokens are inset-only and are likewise',
    '  // not modelled here; see § 2.7 for how to approximate them.',
  );
  elevationConst('dark');
  lines.push('}', '');

  lines.push(
    '// =============================================================================',
    '// Motion',
    '// =============================================================================',
    '',
    '@immutable',
    'class EagamiMotion {',
    '  const EagamiMotion();',
    '',
  );
  for (const { suffix, token } of scaleOf('--duration-')) {
    const ms = parseInt(token.value);
    const value = ms === 0 ? 'Duration.zero' : `const Duration(milliseconds: ${ms})`;
    lines.push(`  Duration get ${suffix} => ${value};`);
  }
  lines.push('');
  for (const { suffix, token } of scaleOf('--ease-')) {
    const value =
      token.value === 'linear' ? 'Curves.linear' : `const ${dartCurve(token.value)}`;
    lines.push(`  Curve get ${flutterKey('ease', suffix)} => ${value};`);
  }
  lines.push('', '  static const base = EagamiMotion();', '}');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Guide file rewriting

function replaceGeneratedBlock(md, id, heading, lang, body) {
  const startMark = `<!-- eagami:generated:${id} start -->`;
  const endMark = `<!-- eagami:generated:${id} end -->`;
  const block = `${startMark}\n\n\`\`\`${lang}\n${body}\n\`\`\`\n\n${endMark}`;
  if (md.includes(startMark)) {
    const start = md.indexOf(startMark);
    const end = md.indexOf(endMark) + endMark.length;
    if (end < start) {
      throw new Error(`malformed markers for ${id}`);
    }
    return md.slice(0, start) + block + md.slice(end);
  }
  const headingIdx = md.indexOf(heading);
  if (headingIdx === -1) {
    throw new Error(`heading not found: ${heading}`);
  }
  const fenceStart = md.indexOf(`\`\`\`${lang}\n`, headingIdx);
  const fenceEnd = md.indexOf('\n```', fenceStart + 3);
  if (fenceStart === -1 || fenceEnd === -1) {
    throw new Error(`no ${lang} fence found under ${heading}`);
  }
  return md.slice(0, fenceStart) + block + md.slice(fenceEnd + 4);
}

function replaceSection(md, id, heading, nextHeading, body) {
  const startMark = `<!-- eagami:generated:${id} start -->`;
  const endMark = `<!-- eagami:generated:${id} end -->`;
  const block = `${startMark}\n\n${body}\n\n${endMark}`;
  if (md.includes(startMark)) {
    const start = md.indexOf(startMark);
    const end = md.indexOf(endMark) + endMark.length;
    if (end < start) {
      throw new Error(`malformed markers for ${id}`);
    }
    return md.slice(0, start) + block + md.slice(end);
  }
  const headingIdx = md.indexOf(`\n${heading}\n`);
  if (headingIdx === -1) {
    throw new Error(`heading not found: ${heading}`);
  }
  const contentStart = headingIdx + heading.length + 2;
  const nextIdx = md.indexOf(`\n${nextHeading}`, contentStart);
  if (nextIdx === -1) {
    throw new Error(`next heading not found: ${nextHeading}`);
  }
  const sepIdx = md.lastIndexOf('\n---\n', nextIdx);
  const contentEnd = sepIdx > contentStart ? sepIdx : nextIdx;
  return `${md.slice(0, contentStart)}\n${block}\n${md.slice(contentEnd)}`;
}

function stampFrontmatter(md) {
  return md
    .replace(/^version: .*$/m, `version: ${VERSION}`)
    .replace(
      /^source: .*$/m,
      `source: '@eagami/ui@${VERSION} (https://github.com/mwiraszka/eagami)'`,
    );
}

function withSyncDate(md, previous) {
  const strip = s => s.replace(/^last-synced: .*$/m, 'last-synced: X');
  if (strip(md) === strip(previous)) {
    return previous;
  }
  const today = new Date().toISOString().slice(0, 10);
  return md.replace(/^last-synced: .*$/m, `last-synced: ${today}`);
}

// ---------------------------------------------------------------------------
// Literal safety scan: any color or curve literal in the hand-written parts of
// a guide must be a value the tokens (or this generator) produce, so a stale
// hand-written example cannot survive a token change silently.

function allowedColorKeys() {
  const keys = new Set(emittedColors);
  for (const token of tokens.values()) {
    for (const mode of ['light', 'dark']) {
      const raw = mode === 'dark' ? (token.dark ?? token.value) : token.value;
      const literal = resolveRefs(raw, mode);
      for (const m of literal.matchAll(/#[0-9a-f]{6}\b|rgba?\([^)]*\)/gi)) {
        const c = parseColor(m[0]);
        if (c) {
          keys.add(colorKey(c));
        }
      }
    }
  }
  return keys;
}

function scanGuideLiterals(md, label, { curves = false } = {}) {
  const allowed = allowedColorKeys();
  for (const m of md.matchAll(/#[0-9A-Fa-f]{6}\b/g)) {
    if (!allowed.has(colorKey(parseColor(m[0])))) {
      fail(`${label}: hex ${m[0]} is not an upstream token value`);
    }
  }
  for (const m of md.matchAll(/Color\(0x([0-9A-Fa-f]{8})\)/g)) {
    const argb = m[1];
    const c = {
      r: parseInt(argb.slice(2, 4), 16),
      g: parseInt(argb.slice(4, 6), 16),
      b: parseInt(argb.slice(6, 8), 16),
      a: Math.round((parseInt(argb.slice(0, 2), 16) / 255) * 100) / 100,
    };
    if (!allowed.has(colorKey(c))) {
      fail(`${label}: Color(0x${argb}) is not an upstream token value`);
    }
  }
  if (curves) {
    const modelCurves = new Set(
      [...tokens.values()]
        .flatMap(t => t.value.match(/cubic-bezier\([^)]+\)/g) ?? [])
        .map(c => c.match(/\(([^)]+)\)/)[1].replace(/\s+/g, '')),
    );
    for (const m of md.matchAll(/Cubic\(([^)]+)\)/g)) {
      if (!modelCurves.has(m[1].replace(/\s+/g, ''))) {
        fail(`${label}: Cubic(${m[1]}) is not an upstream easing`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Main

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const artifacts = [];

artifacts.push({ path: TOKENS_JSON, content: buildTokensJson(), label: 'tokens json' });

const reactPrev = readFileSync(REACT_GUIDE, 'utf8');
let react = stampFrontmatter(reactPrev);
react = replaceSection(
  react,
  'react-tokens',
  '## 2. Tokens',
  '## 3.',
  generateReactTokensSection(),
);
react = replaceGeneratedBlock(
  react,
  'react-css',
  '### 3.1 CSS custom properties',
  'css',
  generateCssBlock(),
);
react = replaceGeneratedBlock(
  react,
  'react-ts',
  '### 3.2 TypeScript constants module',
  'ts',
  generateTsBlock(),
);
react = withSyncDate(react, reactPrev);
artifacts.push({ path: REACT_GUIDE, content: react, label: 'react guide' });

const flutterPrev = readFileSync(FLUTTER_GUIDE, 'utf8');
let flutter = stampFrontmatter(flutterPrev);
flutter = replaceSection(
  flutter,
  'flutter-tokens',
  '## 2. Tokens',
  '## 3.',
  generateFlutterTokensSection(),
);
flutter = replaceGeneratedBlock(
  flutter,
  'flutter-theme',
  '### 3.2 Theme extension',
  'dart',
  generateFlutterTheme(),
);
flutter = withSyncDate(flutter, flutterPrev);
artifacts.push({ path: FLUTTER_GUIDE, content: flutter, label: 'flutter guide' });

scanGuideLiterals(react, 'react guide');
scanGuideLiterals(flutter, 'flutter guide', { curves: true });

let stale = false;
for (const { path, content, label } of artifacts) {
  let current = null;
  try {
    current = readFileSync(path, 'utf8');
  } catch {
    // missing artifact counts as stale
  }
  if (current === content) {
    continue;
  }
  if (CHECK_MODE) {
    stale = true;
    console.error(`stale artifact: ${label} (${path}); run pnpm ui sync-guides`);
  } else {
    writeFileSync(path, content);
    console.log(`wrote ${label}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
if (stale) {
  process.exit(1);
}
console.log(
  CHECK_MODE
    ? `integration guides in sync with ${tokens.size} tokens`
    : `synced ${tokens.size} tokens`,
);
