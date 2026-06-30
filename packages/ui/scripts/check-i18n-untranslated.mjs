/*
 * Verifies that string values in every non-default locale file were actually
 * translated, rather than left byte-identical to `en.ts`. The drift check
 * (`check-i18n-drift.mjs`) guarantees every locale has the same KEY paths, but
 * says nothing about VALUES — an agent can copy a key over and forget to
 * translate the English prose, silently degrading the non-default locale.
 *
 * Usage: node check-i18n-untranslated.mjs <messages-dir> [<messages-dir> ...]
 *
 * For each non-`en` locale we extract every string-literal leaf keyed by its
 * dot-path (array elements get a numeric segment, e.g. `cards.0.title`) and
 * flag any whose value equals en's value at the same path AND looks like
 * translatable content. Function/template initializers are skipped — their
 * bodies legitimately vary and aren't plain prose.
 *
 * False positives are avoided by EXCLUDING, as intentionally-identical:
 *   - values with no letters (numbers, punctuation, symbols)
 *   - URLs / paths / emails (contain '://' or '@', or start with '/')
 *   - the ALLOWLIST below: brand/technical/code tokens that are correctly the
 *     same in every language
 * When uncertain we REPORT rather than skip — a false positive can be quieted
 * by extending the allowlist; a missed gap ships untranslated text.
 *
 * Resolves `typescript` from the directory this script lives in (colocated with
 * `packages/ui/scripts/`), matching `check-i18n-drift.mjs`.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import process from 'node:process';
import ts from 'typescript';

/*
 * Values that are legitimately byte-identical across every locale: brand names,
 * technical acronyms, code/token fragments, and the placeholder example email.
 * Compared case-insensitively against the trimmed value.
 */
const ALLOWLIST = new Set(
  [
    // Brand / proper nouns
    'eagami',
    'eagami home',
    'Eagami',
    'Eagami UI',
    '@eagami/ui',
    'eagami on GitHub',
    'GitHub',
    'npm',
    'Stripe',
    'Vercel',
    'Angular',
    'TypeScript',
    'JavaScript',
    'Feather',
    'MacBook Pro',
    'Pro',
    'London Chess',
    'CIRC Aesthetics',
    'Brewski Bets',
    'Chordbomb',
    'Kanban',
    // Technical acronyms / formats kept verbatim in every locale
    'SCSS',
    'CSS',
    'HTML',
    'ARIA',
    'RGB',
    'HSL',
    'HEX',
    'RGBA',
    'HSLA',
    'API',
    'UI',
    'URL',
    'CLI',
    'npx',
    'pnpm',
    'Node',
    'Node.js',
    'MIT',
    'AM',
    'PM',
    'PIN',
    'ID',
    'OK',
    '404',
    // Composite page titles built from brand + allowlisted tokens, identical in every locale
    'Eagami | 404',
    'Eagami | UI',
    // Placeholder / example values shown literally in demos
    'you@example.com',
    // Option *values* (form-state codes, never displayed) and brand domains
    'apple',
    'banana',
    'cherry',
    'date',
    'day',
    'week',
    'month',
    'light',
    'dark',
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
    'londonchess.ca',
    'circaesthetics.ca',
    'brewskibets.com',
    'chordbomb.com',
    // Icon slugs (registry identifiers, not prose)
    'users',
    'credit-card',
    'globe',
    'moon',
    'bar-chart',
    'mail',
    // Popover placement demo labels mirror the literal CSS-style placement API tokens
    'top',
    'bottom',
    'left',
    'right',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    // Cross-language cognates, loanwords, and technical/UI terms that native review
    // confirmed are byte-identical in the target languages (de, fr, nl, es, pl, pt-BR).
    // Translating these would produce a less natural label than the borrowed form.
    'Accessible',
    'Account',
    'Admin',
    'Autocomplete',
    'Autofocus',
    'Badge',
    'Code',
    'Danger',
    'Dashboard',
    'Demo',
    'Description',
    'Documentation',
    'Easings',
    'Editor',
    'Enterprise',
    'Error',
    'Express',
    'Families',
    'Format',
    'Fruit',
    'General',
    'Ghost',
    'Hint',
    'Home',
    'Info',
    'Label',
    'Laptops',
    'Layout',
    'Live demo',
    'Long',
    'Max',
    'Maximum',
    'Message',
    'Min',
    'Minimum',
    'Modern',
    'Name',
    'Neutral',
    'Notifications',
    'Option',
    'Option 1',
    'Option 2',
    'Option 3',
    'Option A',
    'Option B',
    'Orientation',
    'Personal',
    'Section',
    'Services',
    'Standard',
    'Status',
    'Type',
    'Variant',
    'Volume',
    'autocomplete',
    'horizontal',
    'minimal',
    'positions',
    'trigger',
    'vertical',
    // Month display labels spelled identically to English in some target languages
    'April',
    'August',
    'September',
    'November',
    'December',
  ].map(s => s.toLowerCase()),
);

function looksTranslatable(value) {
  const v = value.trim();
  if (v.length === 0) return false;
  // No letters at all (digits, punctuation, emoji, symbols) — nothing to translate.
  if (!/\p{L}/u.test(v)) return false;
  // URLs, emails, absolute paths, asset paths, and filenames are identical by design.
  if (v.includes('://') || v.includes('@') || v.startsWith('/')) return false;
  if (/^[\w./-]+\.(svg|png|jpe?g|webp|gif|ico|ts|js|css|scss|html|json)$/i.test(v)) return false;
  if (ALLOWLIST.has(v.toLowerCase())) return false;
  return true;
}

/*
 * Walks `export const <name>: <Type> = { ... }` and records every
 * string-literal leaf value keyed by dot-path. Object properties contribute a
 * named segment; array elements contribute a numeric index segment. Non-string,
 * non-object, non-array initializers (functions, template literals, references)
 * are leaves that we simply don't record.
 */
function extractStringLeaves(source) {
  const sf = ts.createSourceFile('x.ts', source, ts.ScriptTarget.Latest, true);
  const leaves = new Map();

  function record(path, initializer) {
    if (ts.isObjectLiteralExpression(initializer)) {
      collectFromObject(initializer, path);
    } else if (ts.isArrayLiteralExpression(initializer)) {
      collectFromArray(initializer, path);
    } else if (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) {
      leaves.set(path, initializer.text);
    }
    // Function expressions, template expressions, etc. are intentionally ignored.
  }

  function collectFromArray(arr, path) {
    arr.elements.forEach((el, i) => record(path ? `${path}.${i}` : `${i}`, el));
  }

  function collectFromObject(obj, path) {
    for (const prop of obj.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const name = ts.isIdentifier(prop.name)
        ? prop.name.text
        : ts.isStringLiteral(prop.name)
          ? prop.name.text
          : null;
      if (name === null) continue;
      record(path ? `${path}.${name}` : name, prop.initializer);
    }
  }

  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.initializer) {
      let init = node.initializer;
      if (ts.isAsExpression(init)) init = init.expression;
      if (ts.isObjectLiteralExpression(init)) {
        collectFromObject(init, '');
        return;
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sf);
  return leaves;
}

function checkDirectory(dir) {
  const absDir = resolve(dir);
  const files = readdirSync(absDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
  if (!files.includes('en.ts')) {
    console.error(`::error::No en.ts found in ${absDir}`);
    return 1;
  }

  const en = extractStringLeaves(readFileSync(join(absDir, 'en.ts'), 'utf8'));
  let failures = 0;

  for (const file of files) {
    if (file === 'en.ts') continue;
    const leaves = extractStringLeaves(readFileSync(join(absDir, file), 'utf8'));
    const flagged = [];

    for (const [path, value] of leaves) {
      const enValue = en.get(path);
      if (enValue === undefined) continue;
      if (value !== enValue) continue;
      if (!looksTranslatable(value)) continue;
      flagged.push({ path, value });
    }

    if (flagged.length) {
      const rel = `${dir}/${file}`;
      console.error(`\n${rel}: ${flagged.length} untranslated value(s)`);
      for (const { path, value } of flagged) {
        const preview = value.length > 80 ? `${value.slice(0, 77)}...` : value;
        console.error(`  ${path}: ${JSON.stringify(preview)}`);
      }
      failures += flagged.length;
    }
  }

  return failures;
}

const dirs = process.argv.slice(2);
if (dirs.length === 0) {
  console.error('Usage: node check-i18n-untranslated.mjs <messages-dir> [<messages-dir> ...]');
  process.exit(2);
}

let totalFailures = 0;
for (const dir of dirs) totalFailures += checkDirectory(dir);

if (totalFailures > 0) {
  console.error(
    `\n${totalFailures} untranslated value(s) found. Translate them, or add genuinely language-neutral tokens to the ALLOWLIST in check-i18n-untranslated.mjs.`,
  );
  process.exit(1);
}

console.log(
  `i18n values translated across ${dirs.length} director${dirs.length === 1 ? 'y' : 'ies'}.`,
);
