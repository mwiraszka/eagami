// Rebuilds the icon exports in public-api.ts and the ICONS catalogue from the
// icon component files on disk. Run via `sync-icons`, part of `pnpm regen-docs`.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const ICONS_DIR = resolve(here, '../src/lib/icons');
const PUBLIC_API = resolve(here, '../src/public-api.ts');
const CATALOGUE = resolve(ICONS_DIR, 'icons-catalogue.ts');

const SUFFIX = '.component.ts';
const EXPORT_LINE = /^export \* from '\.\/lib\/icons\/[^']+\.component';$/;
const IMPORT_LINE = /^import \{ \w+ \} from '\.\/[^']+\.component';$/;

const icons = readdirSync(ICONS_DIR)
  .filter(file => file.endsWith(SUFFIX))
  .map(file => {
    const source = readFileSync(resolve(ICONS_DIR, file), 'utf8');
    const match = /^export class (\w+IconComponent) extends IconComponentBase \{/m.exec(
      source,
    );
    if (!match) {
      throw new Error(`${file}: no exported class extending IconComponentBase`);
    }
    return { slug: file.slice(0, -SUFFIX.length), className: match[1] };
  });

const bySlug = [...icons].sort((a, b) => (a.slug < b.slug ? -1 : 1));
const byClassName = [...icons].sort((a, b) => (a.className < b.className ? -1 : 1));

function indexOrThrow(lines, predicate, what, file) {
  const index = lines.findIndex(predicate);
  if (index === -1) {
    throw new Error(`${file}: ${what} not found`);
  }
  return index;
}

const api = readFileSync(PUBLIC_API, 'utf8')
  .split('\n')
  .filter(line => !EXPORT_LINE.test(line));
const apiAnchor = indexOrThrow(
  api,
  line => line === "export * from './lib/icons/icons-catalogue';",
  'icons-catalogue export',
  'public-api.ts',
);
api.splice(
  apiAnchor + 1,
  0,
  ...bySlug.map(({ slug }) => `export * from './lib/icons/${slug}.component';`),
);
writeFileSync(PUBLIC_API, api.join('\n'));

const catalogue = readFileSync(CATALOGUE, 'utf8')
  .split('\n')
  .filter(line => !IMPORT_LINE.test(line));
catalogue.unshift(
  ...bySlug.map(
    ({ slug, className }) => `import { ${className} } from './${slug}.component';`,
  ),
);
const listStart =
  indexOrThrow(
    catalogue,
    line => line.startsWith('export const ICONS'),
    'ICONS declaration',
    'icons-catalogue.ts',
  ) + 1;
const listEnd = indexOrThrow(
  catalogue,
  line => line === '  ] as IconComponentType[]',
  'end of the ICONS literal',
  'icons-catalogue.ts',
);
if (catalogue[listStart] !== '  [') {
  throw new Error('icons-catalogue.ts: ICONS literal does not open on its own line');
}
catalogue.splice(
  listStart + 1,
  listEnd - listStart - 1,
  ...byClassName.map(({ className }) => `    ${className},`),
);
writeFileSync(CATALOGUE, catalogue.join('\n'));
