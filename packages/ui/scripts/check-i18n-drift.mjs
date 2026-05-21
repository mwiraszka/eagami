/*
 * Verifies that every locale file in a messages directory exposes the exact
 * same set of key paths as `en.ts`. Catches the case where a new key is added
 * to one locale but forgotten in another — easy to miss across 5+ files and
 * silently degrades the experience for non-default locales.
 *
 * Usage: node check-i18n-drift.mjs <messages-dir> [<messages-dir> ...]
 *
 * Each <messages-dir> is expected to hold one `<locale>.ts` per locale plus
 * an `index.ts` aggregator. We diff the *shape* of each non-default locale
 * against `en.ts`; values aren't compared because runtime function bodies
 * (e.g. `paginator.range`) and locale-appropriate text are expected to differ.
 *
 * Resolves `typescript` from the directory the script lives in — which is why
 * this file is colocated with `packages/ui/scripts/`. Both library and website
 * workflows can invoke it through `pnpm --filter @eagami/ui exec`.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import process from 'node:process';
import ts from 'typescript';

function extractKeyPaths(source) {
  const sf = ts.createSourceFile('x.ts', source, ts.ScriptTarget.Latest, true);
  const paths = new Set();

  /*
   * Walks every object literal under `export const <name>: <Type> = { ... }`,
   * recording dot-joined paths to every leaf property. Nested literals recurse;
   * non-literal initializers (function expressions, references) count as
   * leaves so a locale that swaps a function for a different function still
   * matches the en shape.
   */
  function collectFromObject(obj, path) {
    for (const prop of obj.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const name = ts.isIdentifier(prop.name)
        ? prop.name.text
        : ts.isStringLiteral(prop.name)
          ? prop.name.text
          : null;
      if (name === null) continue;
      const childPath = path ? `${path}.${name}` : name;
      if (ts.isObjectLiteralExpression(prop.initializer)) {
        collectFromObject(prop.initializer, childPath);
      } else {
        paths.add(childPath);
      }
    }
  }

  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.initializer) {
      let init = node.initializer;
      // Strip an outer `as const` so we still see the literal underneath.
      if (ts.isAsExpression(init)) init = init.expression;
      if (ts.isObjectLiteralExpression(init)) {
        collectFromObject(init, '');
        return;
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sf);
  return paths;
}

function diff(a, b) {
  return [...a].filter(x => !b.has(x)).sort();
}

function checkDirectory(dir) {
  const absDir = resolve(dir);
  const files = readdirSync(absDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
  if (!files.includes('en.ts')) {
    console.error(`::error::No en.ts found in ${absDir}`);
    return 1;
  }

  const en = extractKeyPaths(readFileSync(join(absDir, 'en.ts'), 'utf8'));
  let failures = 0;

  for (const file of files) {
    if (file === 'en.ts') continue;
    const keys = extractKeyPaths(readFileSync(join(absDir, file), 'utf8'));
    const missing = diff(en, keys);
    const extra = diff(keys, en);

    if (missing.length || extra.length) {
      const rel = `${dir}/${file}`;
      console.error(`\n${rel}:`);
      if (missing.length) console.error(`  missing keys: ${missing.join(', ')}`);
      if (extra.length) console.error(`  extra keys:   ${extra.join(', ')}`);
      failures++;
    }
  }

  return failures;
}

const dirs = process.argv.slice(2);
if (dirs.length === 0) {
  console.error('Usage: node check-i18n-drift.mjs <messages-dir> [<messages-dir> ...]');
  process.exit(2);
}

let totalFailures = 0;
for (const dir of dirs) totalFailures += checkDirectory(dir);

if (totalFailures > 0) {
  console.error(`\n${totalFailures} locale file(s) drifted from en.ts.`);
  process.exit(1);
}

console.log(
  `i18n locales in sync across ${dirs.length} director${dirs.length === 1 ? 'y' : 'ies'}.`,
);
