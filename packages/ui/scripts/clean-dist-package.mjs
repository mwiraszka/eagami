import { readFileSync, rmSync, writeFileSync } from 'fs';

const path = 'dist/eagami-ui/package.json';
const pkg = JSON.parse(readFileSync(path, 'utf8'));

// ng-packagr writes an .npmignore whose `**/package.json` rule would strip the
// schematics CommonJS marker. The `files` allowlist below is authoritative, so
// drop the .npmignore to avoid the conflict.
rmSync('dist/eagami-ui/.npmignore', { force: true });

delete pkg.pnpm;
delete pkg.packageManager;
delete pkg.dependencies?.tslib;

// Publish only the built artifacts; npm always includes package.json itself.
// `src/styles` ships the global stylesheet consumers import; `schematics`
// backs `ng add @eagami/ui`.
pkg.files = ['fesm2022', 'types', 'src/styles', 'schematics', 'testing', 'README.md'];
pkg.schematics = './schematics/collection.json';

writeFileSync(path, `${JSON.stringify(pkg, null, 2)}\n`);
