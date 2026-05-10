# Contributing

Thanks for your interest in @eagami/ui! This guide covers what you need to know to land a change.

## Getting set up

```bash
git clone https://github.com/mwiraszka/eagami-design-system.git
cd eagami-design-system
pnpm install
```

You'll need:

- **Node.js 20+** and **pnpm 10+** (the repo declares `packageManager` so `pnpm` will pick the right version automatically)
- **Angular CLI knowledge** — the project is an Angular workspace with two apps: the `eagami-ui` library (in `src/`) and a `sandbox` app (in `sandbox/`) used for visual checks

## Running it locally

```bash
pnpm sandbox       # dev server for the sandbox app on http://localhost:4200
pnpm storybook     # Storybook on http://localhost:6006
pnpm test          # Jest unit + integration tests
pnpm test:watch    # Same, in watch mode
pnpm lint          # ESLint
pnpm format        # Prettier (also auto-runs on save in many editors)
pnpm build         # Build the publishable library to dist/eagami-ui
```

Hot reload works in both the sandbox and Storybook — edit a component and the running surface updates.

## Branching

- **Branch from `main`** with a name that matches the next version (e.g. `v1.0.1`, `v1.1.0`)
- Don't commit directly to `main` — all changes ship through a PR
- The `version` in `package.json` should match the branch name before you push (CI will reject mismatches)

## Commit style

- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`, `test:`
- Lowercase after the prefix, single line
- Use `!` after the prefix for breaking changes: `refactor!: rename Foo to Bar`
- Group related changes into one commit; split unrelated work into separate commits

## What to update when you change a component

The project treats three in-repo surfaces as equally important. A change is not done until all three reflect it:

1. **Library** — the component code in `src/lib/<name>/`
2. **Storybook** — `<name>.component.stories.ts` (add stories for any new variant or input)
3. **Sandbox** — `sandbox/sandbox.component.{html,ts}` (visible playground)

Tests live next to the component as `<name>.component.spec.ts`.

## Pull requests

- Title: just the version (e.g. `v1.0.1`)
- Body: leave empty — the CHANGELOG entry is the source of truth
- Update `CHANGELOG.md` in the same PR, describing user-facing changes only (no tooling chatter)
- CI must be green before merge

When the PR is merged, an automated workflow tags the release, publishes to npm, and creates a GitHub release using the latest CHANGELOG entry.

## Code conventions

- **Standalone components** with `ChangeDetectionStrategy.OnPush`
- **Signals** (`input()`, `model()`, `output()`, `signal()`, `computed()`) — avoid RxJS unless something genuinely needs streams
- **Selector prefix** `ea-` for components, `ea` (camelCased) for directives
- **No inline styles** — everything goes in `.scss`
- **No hard-coded colour literals in component SCSS** — use CSS custom properties from `src/styles/tokens/_colors.scss`
- **No `any` casts in tests** — type your mocks; `@ts-expect-error` is OK only for accessing private/protected members
- **Spacing values** — only use `1, 2, 4, 8, 12, 16, 24, 32, 48, 64` for paddings/gaps/margins

For accessibility, keyboard navigation, ARIA, and form-field plumbing conventions, follow the patterns established in [InputComponent](src/lib/input/input.component.ts) and [DropdownComponent](src/lib/dropdown/dropdown.component.ts).

## Reporting issues

- **Bugs** — please include a minimal reproduction (Stackblitz is great)
- **API suggestions** — describe the use case first; we're conservative about adding inputs

Open issues at https://github.com/mwiraszka/eagami-design-system/issues.
