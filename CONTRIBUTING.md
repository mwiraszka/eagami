# Contributing

Conventions for the eagami monorepo.

## Layout

- `packages/ui/`: `@eagami/ui`, the Angular component library and Storybook
- `apps/website/`: [eagami.com](https://eagami.com), the marketing site and live docs

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
pnpm dev                # website + Storybook together
pnpm site               # website dev server (http://localhost:4444)
pnpm storybook          # Storybook
pnpm test               # library tests
pnpm lint               # lint every package
pnpm format             # prettier every package
pnpm build              # build every workspace package

pnpm regen-docs         # regenerate the website's generated API and changelog data
pnpm ui check-parity    # every input/output has a description, knob, and story wiring
pnpm website check-i18n # every website locale file carries the same keys
pnpm ui check-tokens    # the framework integration guides match the token source
pnpm ui check-changelog # the release's changelog entry follows the conventions below
pnpm ui check-css-order # SCSS declarations follow the property order below

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

## Changelog entries

Each package keeps its own changelog (`packages/ui/CHANGELOG.md`, `apps/website/CHANGELOG.md`); there is no root one. The release workflow publishes the entry verbatim as the GitHub release notes, so entries are written for the people using the package:

- Group entries under `### Added`, `### Changed`, or `### Fixed`, and omit a section with nothing in it. Removals belong under `### Changed`
- Breaking entries come first within `### Changed`, prefixed `**Breaking:**`
- Open with a present-tense verb (`Add`, `Fix`, `Prevent`, `Ensure`) and vary it, rather than starting every line the same way
- One sentence per entry, ending in a period, and no em-dashes
- User-facing changes only. Lockfile syncs, tooling, and CI work stay out, unless they are the entire release, in which case keep the entry short and high level
- A brand-new component gets a single consolidated entry, never one per input or variant
- Footer links compare tags: `.../compare/ui-v1.2.0...ui-v1.3.0` for the library, `.../compare/website-v1.1.0...website-v1.2.0` for the website

`pnpm ui check-changelog` enforces the mechanical half of that (sections, opening verb, single sentence, trailing period) against the entry a release is about to ship. If it rejects a verb that is genuinely the right word, add it to the list in [check-changelog-format.mjs](packages/ui/scripts/check-changelog-format.mjs) in the same PR.

## Commits

- Conventional: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`, `test:`
- Bare prefix, no scopes (never `feat(ui):`)
- Lowercase after the prefix, single line
- One commit per concern; split unrelated work

## Pull requests

- Title is the branch name (e.g. `website-v1.3.0`, `ui-v1.3.0-website-v1.2.5`)
- Body is the release notes: paste the version's CHANGELOG entries verbatim (both entries for a combined `ui-v...-website-v*` PR, each under its own heading)
- CI must be green before merge

## Adding a new component

Use this checklist when creating a brand-new component. Skip nothing; partial coverage breaks the assumption that every component has stories, a website demo, and a11y tests.

**Library (`packages/ui/`)**

- [ ] Create `packages/ui/src/lib/<slug>/<slug>.component.{ts,html,scss}` (kebab-case slug, `ea-<slug>` selector)
- [ ] Standalone component with `ChangeDetectionStrategy.OnPush`
- [ ] Inputs/outputs as signals (`input()`, `model()`, `output()`); reach for RxJS only when streams are genuinely needed
- [ ] If form-like (exposes `errorMsg` / `hint`): follow the field-message pattern in [InputComponent](packages/ui/src/lib/input/input.component.ts) (icon + `role="alert"`, `var(--text-helper-*)` typography, `var(--color-error-default)` colour)
- [ ] Implement the matching [WAI-ARIA APG pattern](https://www.w3.org/WAI/ARIA/apg/patterns/): correct roles/states/properties, full keyboard support (roving tabindex, arrows with RTL awareness, Home/End, Escape, Enter/Space), focus trapping and restoration for modal surfaces, live regions for async and validation state, `aria-hidden` on decorative elements, and an accessible name for every interactive element (localized defaults for built-in controls, an `aria-label` input for consumer-named ones)
- [ ] No hard-coded color literals in `.scss`; tokens only (`packages/ui/src/styles/tokens/_colors.scss`)
- [ ] Add `<slug>.component.stories.ts`: cover every variant, state, size, and edge case (loading, error, empty, RTL where relevant)
- [ ] Add `<slug>.component.spec.ts`: interaction tests, ARIA assertions, edge cases. No `any` casts
- [ ] Add `<slug>.component.a11y.spec.ts` with `vitest-axe` assertions for each meaningful rendered state (default, error, disabled, expanded)
- [ ] Export from `packages/ui/src/public-api.ts` in the component block (the file is grouped: shared modules, then components, then icons)
- [ ] Run `pnpm ui test`, `pnpm ui lint`, `pnpm ui build-storybook`; all must pass

**Website (`apps/website/`)**

- [ ] Add an entry to `apps/website/src/app/data/ui-components.ts` (alphabetical by slug)
- [ ] Add the route in `apps/website/src/app/app.routes.ts` under `ui/components/<slug>` with `loadComponent` pointing at the per-component page
- [ ] Create `apps/website/src/app/pages/ui/components/<slug>/<slug>-demo-page.component.{ts,html,scss}` (selector `web-<slug>-demo-page`) demonstrating every variant
- [ ] All demo strings go through i18n in every locale file under `apps/website/src/app/i18n/messages/` (the set grows over time; mirror whatever `*.ts` files exist)
- [ ] Run `pnpm regen-docs` and commit the regenerated `apps/website/src/app/data/*.generated.ts` files; the pre-push hook blocks the push without them
- [ ] Run `pnpm site` (or `pnpm dev` for the site plus Storybook) and visit `http://localhost:4444/ui/components/<slug>` to verify the demo renders in light and dark mode

**Release**

- [ ] Bump `packages/ui/package.json` and `apps/website/package.json` to the matching `ui-vA.B.C-website-vX.Y.Z` versions
- [ ] Add a single consolidated `### Added` entry per CHANGELOG (library and website), naming the component once; do not break out individual inputs or variants
- [ ] Update the footer comparison links in both CHANGELOGs

## Changing a component

Three surfaces stay in sync:

1. The component at `packages/ui/src/lib/<name>/`
2. Stories at `<name>.component.stories.ts` (cover new variants and inputs)
3. The website's per-component demo at `apps/website/src/app/pages/ui/components/<slug>/<slug>-demo-page.component.html` (add a demo per variant, with i18n strings in every locale file)

Tests live alongside as `<name>.component.spec.ts` and `<name>.component.a11y.spec.ts`. For accessibility, ARIA, and form-field plumbing patterns, follow [InputComponent](packages/ui/src/lib/input/input.component.ts) and [DropdownComponent](packages/ui/src/lib/dropdown/dropdown.component.ts).

Accessibility is release-blocking: changes must keep the component conformant with WCAG 2.2 AA and its WAI-ARIA APG pattern, and the axe suites must stay green. Anything that alters roles, names, keyboard behavior, or announcements needs a matching update to the README's Accessibility section and the website's accessibility page if it affects the claims made there.

## Code conventions

- Standalone components with `ChangeDetectionStrategy.OnPush`
- Signals (`input()`, `model()`, `output()`, `signal()`, `computed()`); reach for RxJS only when something genuinely needs streams
- Selector prefix: `ea-` for library, `web-` for website
- No inline styles; everything in `.scss`
- No hard-coded color literals in component SCSS; use the tokens in `packages/ui/src/styles/tokens/_colors.scss` or `apps/website/src/styles/_variables.scss`
- Brand colours are derivable from a single hex via the OKLCH pipeline in `packages/ui/src/lib/palette/`. The default `--color-primary-*` and `--color-secondary-*` scales in `_colors.scss` are the un-themed fallback; consumers can replace either ramp at runtime by passing a `palette` to `provideEagamiUi`. When touching colour tokens, keep the two paths in sync: any new `--color-brand-*` role added in `_colors.scss` should be mapped in `palette.types.ts` (`PaletteRoles`) and `apply-palette.ts`, and the contrast assertions in `validate-palette.ts` should be extended to cover it
- No `any` casts in tests; type your mocks (`@ts-expect-error` is fine for accessing private/protected members)
- Spacing values: `1, 2, 4, 8, 12, 16, 24, 32, 48, 64` only

### CSS/SCSS property order

Declarations within a rule are grouped by category, in this order, so every stylesheet reads the same way:

1. **Display and positioning**: `z-index`, `position`, `top`/`right`/`bottom`/`left`, `overflow`, `opacity`, `visibility`, `display`
2. **Flexbox and grid**: `flex`, `flex-direction`, `align-items`, `justify-content`, `gap`, `grid-template-*`
3. **Box model**: `box-sizing`, `width`, `height`, `padding`, `margin`, `aspect-ratio`
4. **Typography**: `font-size`, `font-weight`, `line-height`, `text-align`, `letter-spacing`, `font-family`
5. **Colour and borders**: `border`, `border-radius`, `outline`, `box-shadow`, `background`, `color`, `filter`
6. **Interaction**: `cursor`, `pointer-events`, `user-select`, `appearance`, `resize`
7. **Animation**: `transition`, `transform`, `animation-*`, `will-change`, `transform-origin`
8. **Miscellaneous**: `content`, `quotes`, `page-break-inside`

Custom properties, at-rules, and nested selectors are exempt. `pnpm ui check-css-order` checks the declarations your branch adds on top of `main`, since the stylesheets predate the rule; the full ordered list of properties lives in [check-css-property-order.mjs](packages/ui/scripts/check-css-property-order.mjs).

## Reporting issues

Open one at https://github.com/mwiraszka/eagami/issues. Include a minimal reproduction for bugs; describe the use case for API suggestions.
