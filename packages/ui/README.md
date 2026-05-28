<h1 align="center">Eagami UI</h1>

<p align="center">
  <img src="assets/logo.png" alt="Eagami UI logo" width="150" height="150" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@eagami/ui"><img src="https://img.shields.io/npm/v/@eagami/ui.svg" alt="npm version" /></a>
  <a href="https://github.com/mwiraszka/eagami/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@eagami/ui.svg" alt="license" /></a>
</p>

`@eagami/ui` is a lightweight, accessible Angular component library. Sensible defaults out of the box, with a fully customizable design to fit any brand.

**Live documentation:** [eagami.com/ui](https://eagami.com/ui)

## Design principles

- **Accessible.** Keyboard navigation, focus management, screen-reader support, and reduced-motion handling are built into every component.
- **Lightweight.** Each component imports independently and the bundle only ships what you use.
- **Themeable.** Fully customizable with [design tokens](https://eagami.com/ui/design-tokens) while maintaining a unified look across every page. Light and dark variants ship together and default to the user's system preference.
- **Localized.** Built-in component text ships in English, French, Greek, Polish, and Spanish.
- **Modern.** Regularly updated with the latest Angular features and modern web standards.
- **Unlocked.** Every component is plain Angular and CSS with no vendor lock-in, so the source can be read, copied, or modified like any other code in your project.

## Installation

```bash
npm install @eagami/ui
# or
pnpm add @eagami/ui
# or
yarn add @eagami/ui
```

Add the global stylesheet to your `angular.json`:

```json
"styles": ["node_modules/@eagami/ui/src/styles/eagami-ui.scss"]
```

See the [Setup](https://eagami.com/ui/setup) page for fonts and your first component import.

## What's included

- **Actions**: Button, Command Palette
- **Form controls**: Autocomplete, Avatar Editor, Checkbox, Code Input, Color Picker, Date Picker, Dropdown, File Uploader, Input, Multi-Select, Radio, Range Slider, Rating, Segmented, Slider, Switch, Textarea, Time Picker, Transfer List
- **Overlays**: Dialog, Drawer, Menu, Popover, Toast, Tooltip
- **Navigation**: Breadcrumbs, Paginator, Stepper, Tabs
- **Display**: Accordion, Alert, Avatar, Badge, Card, Data Table, Divider, Eagami Wordmark, Empty State, Progress Bar, Skeleton, Spinner, Tag, Tree, Virtual List

Full API and live demos at [eagami.com/ui/components](https://eagami.com/ui/components).

## Icons

Standalone Angular components (`<ea-icon-*>`) that inherit their color and scale with `font-size`, so they render at any size. The library ships the full [Feather Icons](https://feathericons.com/) set (287 icons at their canonical slugs) by [Cole Bemis](https://github.com/colebemis), used under the [MIT License](https://github.com/feathericons/feather/blob/master/LICENSE), plus a set of original Eagami UI additions (basic shapes, household objects, the Eagami brand mark) and a small coloured brand-icon set for nominative use.

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

Built-in strings ship in English, French (France), Greek, Polish, and Spanish (Spain), with runtime switching via `EagamiI18nService`. See [internationalization](https://eagami.com/ui/i18n) for setup and per-string overrides.

## Framework integration

`@eagami/ui` is Angular-only, but its design tokens are framework-agnostic. Copy-and-paste guides for non-Angular targets:

- **[eagami-ui-flutter.md](https://github.com/mwiraszka/eagami/blob/main/eagami-ui-flutter.md)** for Flutter projects
- **[eagami-ui-react.md](https://github.com/mwiraszka/eagami/blob/main/eagami-ui-react.md)** for React projects

## Compatibility

| | |
|---|---|
| Angular | `^21.0.0` (peer dep) |
| Node | `>= 20` for build/dev tooling |
| Browsers | Last 2 stable versions of Chrome, Edge, Firefox (plus current ESR), Safari |

> **Upgrading from v0.x?** See [MIGRATION.md](MIGRATION.md).
