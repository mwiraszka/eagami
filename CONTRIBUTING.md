# Contributing

Conventions for the eagami monorepo.

## Layout

- `packages/ui/` — `@eagami/ui`, the Angular component library and Storybook
- `apps/website/` — [eagami.com](https://eagami.com), the marketing site and live docs

The website consumes the library via `"@eagami/ui": "workspace:*"`, aliased through tsconfig directly to the library's source at `packages/ui/src/public-api`. The website's build compiles the library source as part of its own bundle, with Storybook being the canonical workbench for component-in-isolation work.

## Getting set up

```bash
git clone https://github.com/mwiraszka/eagami.git
cd eagami
pnpm install
```

Requires Node.js 20+ and pnpm 10+ (the repo's `packageManager` field handles the pnpm version automatically).

## Commands

All run from the monorepo root.

```bash
pnpm start              # website dev server (http://localhost:4444)
pnpm storybook          # Storybook
pnpm test               # library tests
pnpm lint               # lint every package
pnpm format             # prettier every package
pnpm build              # build the library to packages/ui/dist/eagami-ui

pnpm ui <script>        # run any script in @eagami/ui
pnpm website <script>   # run any script in the website
```

## Branching and releases

Every branch that lands on `main` is a release. Two valid prefixes:

- **`website-vX.Y.Z`** for website-only changes. Bump `apps/website/package.json` to `X.Y.Z`, update `apps/website/CHANGELOG.md`. Merge → Vercel prod deploy + `website-vX.Y.Z` GitHub tag/release.
- **`ui-vA.B.C-website-vX.Y.Z`** for any library change. Library releases must always pair with a website version bump so the live site picks up the new library code with its own tag and changelog. Bump both `package.json` files and update both CHANGELOGs in the same PR. Merge → npm publish + `ui-vA.B.C` + `website-vX.Y.Z` tags/releases + Vercel deploy.

Plain `vX.Y.Z` and standalone `ui-vX.Y.Z` are not allowed; CI rejects them.

The website bump in a combined PR is usually a patch, with a one-line `### Changed` entry like `- Pick up @eagami/ui v1.3.0`. If substantial website changes ship in the same PR, the pickup folds into the larger website bump.

Dependabot PRs aren't merged directly. When cutting a release branch, locally pull in the pending dependabot bumps you want, then bump versions and CHANGELOGs as one PR. Dependabot auto-closes its PRs when the underlying bumps land on `main`.

## Commits

- Conventional: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`, `test:`
- Bare prefix, no scopes (never `feat(ui):`)
- Lowercase after the prefix, single line
- One commit per concern; split unrelated work

## Pull requests

- Title is the branch name (e.g. `website-v1.3.0`, `ui-v1.3.0-website-v1.2.5`)
- Body left empty; the CHANGELOG entry is the source of truth
- CI must be green before merge

## Changing a library component

Three surfaces stay in sync:

1. The component at `packages/ui/src/lib/<name>/`
2. Stories at `<name>.component.stories.ts` (cover new variants and inputs)
3. The website's components page at `apps/website/src/app/pages/ui/ui-component/ui-component-page.component.html` (the `@case ('<slug>')` block — add a demo per variant, with i18n strings in all five locales)

Tests live alongside as `<name>.component.spec.ts`. For accessibility, ARIA, and form-field plumbing patterns, follow [InputComponent](packages/ui/src/lib/input/input.component.ts) and [DropdownComponent](packages/ui/src/lib/dropdown/dropdown.component.ts).

## Code conventions

- Standalone components with `ChangeDetectionStrategy.OnPush`
- Signals (`input()`, `model()`, `output()`, `signal()`, `computed()`); reach for RxJS only when something genuinely needs streams
- Selector prefix: `ea-` for library, `web-` for website
- No inline styles; everything in `.scss`
- No hard-coded color literals in component SCSS; use the tokens in `packages/ui/src/styles/tokens/_colors.scss` or `apps/website/src/styles/_variables.scss`
- No `any` casts in tests; type your mocks (`@ts-expect-error` is fine for accessing private/protected members)
- Spacing values: `1, 2, 4, 8, 12, 16, 24, 32, 48, 64` only

## Reporting issues

Open one at https://github.com/mwiraszka/eagami/issues. Include a minimal reproduction for bugs; describe the use case for API suggestions.
