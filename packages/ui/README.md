<h1 align="center">Eagami UI</h1>

<p align="center">
  <img src="assets/logo.png" alt="Eagami UI logo" width="150" height="150" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@eagami/ui"><img src="https://img.shields.io/npm/v/@eagami/ui.svg" alt="npm version" /></a>
  <a href="https://github.com/mwiraszka/eagami/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@eagami/ui.svg" alt="license" /></a>
  <a href="https://main--6a14a63d5cab2ebad17871ff.chromatic.com"><img src="https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white" alt="Storybook" /></a>
  <a href="https://eagami.com/ui/accessibility"><img src="https://img.shields.io/badge/WCAG%202.2%20AA-axe--core%20tested-0b7261" alt="WCAG 2.2 AA, tested with axe-core" /></a>
</p>

`@eagami/ui` is a lightweight, accessible Angular component library. Sensible defaults out of the box, with a fully customizable design to fit any brand.

**Live documentation:** [eagami.com/ui](https://eagami.com/ui)

**Try it live:** [open a starter on StackBlitz](https://stackblitz.com/github/mwiraszka/eagami/tree/main/examples/starter), no install needed.

## Why Eagami UI

Angular teams usually reach for [Angular Material](https://material.angular.dev), [PrimeNG](https://primeng.org), or a Tailwind copy-paste kit like [Spartan](https://spartan.ng). Eagami UI is different where it counts:

- **Themes to your brand.** Give it one color per role and it generates a full, accessibility-checked palette; every other style is a CSS variable you can override (see [design tokens](https://eagami.com/ui/design-tokens)). Light and dark are built in and follow the system preference.
- **Lightweight.** One runtime dependency (`tslib`), no CSS framework, and standalone side-effect-free components, so your app bundles only what it imports (the whole library, every component and icon, is ~260 KB gzipped).
- **Accessible and localized out of the box.** Every component is keyboard-navigable and screen-reader-ready, with built-in text in 15 languages you can switch at runtime.
- **Yours to own.** Plain Angular and CSS with no lock-in: read, copy, or fork any component like the rest of your app.
- **Modern Angular.** Signals, native control flow, and SSR-safe rendering throughout.

| | Eagami UI | Angular Material | PrimeNG | Spartan |
|---|---|---|---|---|
| Styling model | CSS custom properties | Sass / Material 3 tokens | Design tokens + presets | Tailwind, copy-paste |
| Re-skin to any brand | First-class | Within Material Design | Preset-based | You own the markup |
| Built-in text i18n | 15 languages, runtime | Provide your own | Provide your own | Your markup |
| Per-component a11y tests | Yes (axe-core) | Backed by the CDK | Varies by component | Your responsibility |
| Requires a CSS framework | No | No | No | Tailwind |
| Runtime dependencies | 1 (`tslib`) | Angular CDK | multiple | Tailwind |

## Installation

The quickest way is the schematic, which installs the package and registers the global stylesheet and fonts for you:

```bash
ng add @eagami/ui
```

Prefer to wire it up by hand? Install the package:

```bash
npm install @eagami/ui
# or
pnpm add @eagami/ui
# or
yarn add @eagami/ui
```

Then add the global stylesheet to your `angular.json`:

```json
"styles": ["node_modules/@eagami/ui/src/styles/eagami-ui.scss"]
```

See the [Setup](https://eagami.com/ui/setup) page for fonts and your first component import.

## What's included

- **Actions**: Button, Command Palette
- **Form controls**: Autocomplete, Avatar Editor, Checkbox, Code Input, Color Picker, Date Picker, Dropdown, File Uploader, Form Field, Input, Multi-Select, Number Input, Radio, Range Slider, Rating, Segmented, Slider, Switch, Textarea, Time Picker, Transfer List
- **Overlays**: Dialog, Drawer, Menu, Popover, Toast, Tooltip
- **Navigation**: Breadcrumbs, Paginator, Stepper, Tabs
- **Display**: Accordion, Alert, Avatar, Badge, Card, Data Table, Divider, Eagami Wordmark, Empty State, Progress Bar, Skeleton, Spinner, Tag, Timeline, Tree, Virtual List

Full API and live demos at [eagami.com/ui/components](https://eagami.com/ui/components).

## Icons

Standalone Angular components (`<ea-icon-*>`) that inherit their color and scale with `font-size`, so they render at any size. The library ships the [Feather Icons](https://feathericons.com/) set (286 icons at their canonical slugs) by [Cole Bemis](https://github.com/colebemis), used under the [MIT License](https://github.com/feathericons/feather/blob/master/LICENSE), plus additional line icons from [Lucide](https://lucide.dev/) (ISC License), a set of original Eagami UI additions (basic shapes, household objects, the Eagami brand mark), and a coloured brand-icon set for nominative use that includes marks from [Simple Icons](https://simpleicons.org/) (CC0).

Each icon component exposes `static readonly` metadata so consumers can build catalogues, search indices, or doc tables without importing every icon:

```ts
import { GithubIconComponent } from '@eagami/ui';

GithubIconComponent.slug;     // 'github'
GithubIconComponent.category; // 'feather'
GithubIconComponent.isBrand;  // true
GithubIconComponent.tags;     // ['github', 'git', 'repository', ...]
```

The shape of this metadata is described by the exported `IconCategory`, `IconMeta`, and `IconComponentType` types. Every icon component extends the abstract `IconComponentBase` directive, which contributes the shared `display: inline-flex; width: 1em; height: 1em` host bindings.

For catalogue-style use cases, import the `ICONS` array (a slug-sorted, `ReadonlyArray<IconComponentType>` of every non-deprecated icon) and the `iconDisplayName(iconOrSlug)` helper that resolves the human-readable label with the correct casing for acronyms and brand marks (`GitHub`, `npm`, `CodePen`, `X (Twitter)`, etc.). Importing `ICONS` pulls every icon into the bundle, so apps that only render a handful should keep importing the components they use directly.

See [icons](https://eagami.com/ui/icons) for the full set, per-brand guideline links, and a searchable filter.

## Theming

Every visual property is a CSS custom property on `:root`, so overriding any token retunes the whole library. See [design tokens](https://eagami.com/ui/design-tokens) for the full reference and theming examples.

For the brand colour specifically, pass a single hex to `provideEagamiUi` and the library derives a full ten-shade scale (50 through 900) in [OKLCH](https://www.w3.org/TR/css-color-4/#ok-lab) space:

```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideEagamiUi({
      palette: {
        primary: { base: '#2563eb' },
        secondary: { base: '#f97316' },
      },
    }),
  ],
});
```

Every brand-role pairing is checked against WCAG 2.1 AA at bootstrap; a contrast violation throws before the app loads. Pin specific shades with `overrides` or remap which derived shade backs each role with `roles`. See [design tokens](https://eagami.com/ui/design-tokens) for the full API.

## Internationalization

Built-in strings ship in 15 languages, with runtime switching via `EagamiI18nService`. English is bundled by default; register the other languages you use with `provideEagamiUi({ locales: [...] })` (or pass `EAGAMI_ALL_LOCALES` for all of them) so you ship only what you need, or register `localeLoaders` instead to fetch dictionaries on demand the first time a language is activated. See [internationalization](https://eagami.com/ui/i18n) for setup, lazy loading, and per-string overrides.

## Accessibility

Every component adheres to WCAG 2.2 Level AA and follows the matching [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) pattern: correct roles and states, full keyboard support with roving tabindex and RTL-aware arrows, focus trapping and restoration in modal surfaces, and live-region announcements for toasts, alerts, and validation errors, localized in all 15 languages. Conformance is self-assessed and continuously verified: each component has an axe-core (vitest-axe) test suite that runs on every change, so regressions in roles, names, contrast, or ARIA usage fail the build. Components that render no visible text expose `aria-label` inputs (with localized defaults for built-in controls), which is the one piece the consuming app must supply. See [accessibility](https://eagami.com/ui/accessibility) for an overview.

## Server-side rendering

The library is SSR-safe and renders on the server (Angular Universal / `@angular/ssr`) without reaching for `window` or `document`. Browser-only work (focus management, the native `<dialog>`, overlay positioning, resize/intersection observers) is deferred to the client via `afterNextRender` and `isPlatformBrowser` guards, so prerendering, streaming SSR, and hydration work with no extra configuration.

## Framework integration

`@eagami/ui` is Angular-only, but its design tokens are framework-agnostic. Self-contained copy-and-paste guides and a machine-readable token export are published with the docs and kept in sync with the token source on every release:

- **[React integration guide](https://eagami.com/assets/eagami-ui-react.md)**
- **[Flutter integration guide](https://eagami.com/assets/eagami-ui-flutter.md)**
- **[Design tokens as JSON](https://eagami.com/assets/eagami-ui-tokens.json)** (W3C Design Tokens format where practical)

## Stability and support

Eagami UI follows [Semantic Versioning](https://semver.org). Breaking changes ship only in major releases, are listed under a **Breaking** heading in the [changelog](CHANGELOG.md), and are preceded by a deprecation period wherever practical. See [SUPPORT.md](https://github.com/mwiraszka/eagami/blob/main/SUPPORT.md) for the versioning policy, supported versions, deprecation policy, and how to get help.

## Compatibility

| | |
|---|---|
| Angular | `^21.0.0 || ^22.0.0` (peer dep) |
| Node | `>= 20` for build/dev tooling |
| Rendering | Browser, SSR / prerender (Angular Universal), hydration |
| Browsers | Last 2 stable versions of Chrome, Edge, Firefox (plus current ESR), Safari |

> **Upgrading across a major version?** See [MIGRATION.md](MIGRATION.md).
