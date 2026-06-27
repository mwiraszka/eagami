import { copyFileSync, mkdirSync, writeFileSync } from 'fs';

// tsc compiles the schematic TypeScript; the JSON descriptors are copied as-is
const dest = 'dist/eagami-ui/schematics';
mkdirSync(`${dest}/ng-add`, { recursive: true });

copyFileSync('src/schematics/collection.json', `${dest}/collection.json`);
copyFileSync('src/schematics/ng-add/schema.json', `${dest}/ng-add/schema.json`);

// The published package is ESM ("type":"module"), but schematics are compiled to
// CommonJS, so mark this subtree as CommonJS or the CLI can't require() them.
writeFileSync(
  `${dest}/package.json`,
  `${JSON.stringify({ type: 'commonjs' }, null, 2)}\n`,
);
