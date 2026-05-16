# Contributing

Conventions and workflows for contributing to the eagami monorepo.

## Repository layout

This is a pnpm workspace with two members:

- `packages/ui/` is the `@eagami/ui` component library, plus its sandbox app and Storybook
- `apps/website/` is [eagami.com](https://eagami.com), the marketing site and live documentation

The website consumes the library via `"@eagami/ui": "workspace:*"`, with a tsconfig alias to `packages/ui/dist/eagami-ui`. **The library must be built once before the website will serve.** Run `pnpm ui watch` in a second terminal during cross-cutting work so library source edits flow into the running website.

## Getting set up

```bash
git clone https://github.com/mwiraszka/eagami.git
cd eagami
pnpm install
pnpm sandbox       # quickest verification: library sandbox on http://localhost:4200
```

Requires **Node.js 20+** and **pnpm 10+** (the repo declares `packageManager`, so `pnpm` picks the right version automatically).

## Running it locally

All commands work from the monorepo root:

```bash
pnpm start         # website dev server (http://localhost:4200)
pnpm sandbox       # library sandbox app (http://localhost:4200)
pnpm storybook     # Storybook (http://localhost:6006)
pnpm test          # library tests (Jest)
pnpm lint          # lint every package
pnpm format        # prettier every package
pnpm build         # build the library to packages/ui/dist/eagami-ui
```

To run an arbitrary script in a single package, use `pnpm ui <script>` or `pnpm website <script>` (e.g. `pnpm ui test:watch`, `pnpm website build:prod`).

Hot reload works in both the sandbox and Storybook. Edit a component and the running surface updates.

## Branching

- Branch names carry a package prefix: `ui-vX.Y.Z` for library work (e.g., `ui-v1.3.0`), `website-vX.Y.Z` for website work. Plain `vX.Y.Z` is ambiguous and not allowed
- Don't commit directly to `main`. All changes ship through a PR
- The `version` field in the relevant package's `package.json` (`packages/ui/package.json` or `apps/website/package.json`) must match the branch version; CI rejects mismatches
- A single PR targets a single package. If a change spans both (a library feature and its website showcase), split into two sequential PRs: library first (so the new version publishes), then website

## Commit style

- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`, `test:`
- Lowercase after the prefix, single line
- No scopes: bare `feat:` / `fix:`, never `feat(ui):`
- Use `!` after the prefix for breaking changes: `refactor!: rename Foo to Bar`
- Group related changes into one commit; split unrelated work into separate commits

## What to update when you change a library component

Three in-repo surfaces are treated as equally important. A change isn't done until all three reflect it:

1. **Library** code at `packages/ui/src/lib/<name>/`
2. **Storybook** stories at `<name>.component.stories.ts` (add stories for any new variant or input)
3. **Sandbox** at `packages/ui/sandbox/sandbox.component.{html,ts}` (visible playground)

Tests live next to the component as `<name>.component.spec.ts`. The website's `/ui/components/<slug>` page also renders the live component, so visual changes propagate there once the library is rebuilt.

## Pull requests

- Title: the branch name (e.g. `ui-v1.3.0`)
- Body: leave empty; the CHANGELOG entry is the source of truth
- Update the relevant package's `CHANGELOG.md` (`packages/ui/CHANGELOG.md` or `apps/website/CHANGELOG.md`) in the same PR, describing user-facing changes only (no tooling chatter)
- CI must be green before merge

When a `ui-v*` PR is merged, an automated workflow tags the release, publishes `@eagami/ui` to npm, and creates a GitHub release using the latest `packages/ui/CHANGELOG.md` entry. When a `website-v*` PR is merged, Vercel deploys.

## Code conventions

- **Standalone components** with `ChangeDetectionStrategy.OnPush`
- **Signals** (`input()`, `model()`, `output()`, `signal()`, `computed()`); avoid RxJS unless something genuinely needs streams
- **Selector prefix** `ea-` for library components (`ea` camelCased for directives); `web-` for website components
- **No inline styles**; everything goes in `.scss`
- **No hard-coded colour literals in component SCSS**; use CSS custom properties from `packages/ui/src/styles/tokens/_colors.scss` (or `apps/website/src/styles/_variables.scss` for website-only colors)
- **No `any` casts in tests**; type your mocks. `@ts-expect-error` is OK only for accessing private/protected members
- **Spacing values**: only use `1, 2, 4, 8, 12, 16, 24, 32, 48, 64` for paddings, gaps, and margins

For accessibility, keyboard navigation, ARIA, and form-field plumbing conventions, follow the patterns established in [InputComponent](packages/ui/src/lib/input/input.component.ts) and [DropdownComponent](packages/ui/src/lib/dropdown/dropdown.component.ts).

## Reporting issues

- **Bugs**: include a minimal reproduction (Stackblitz is great)
- **API suggestions**: describe the use case first; the project is conservative about adding inputs

Open an issue at https://github.com/mwiraszka/eagami/issues.
