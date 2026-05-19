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

- **Form controls**: Input, Textarea, Checkbox, Switch, Radio, Dropdown, Autocomplete, Date picker, Slider, Code input, Segmented, Avatar editor
- **Overlays**: Dialog, Drawer, Tooltip, Menu, Toast
- **Navigation**: Tabs, Breadcrumbs, Paginator, Accordion
- **Display**: Card, Badge, Tag, Alert, Avatar, Skeleton, Spinner, Progress bar, Empty state, Divider, Eagami wordmark, Data table

Full API and live demos at [eagami.com/ui/components](https://eagami.com/ui/components).

## Icons

Standalone Angular components (`<ea-icon-*>`) that inherit their color and scale with `font-size`, so they render at any size. Most are derived from [Feather Icons](https://feathericons.com/) by [Cole Bemis](https://github.com/colebemis) under the [MIT License](https://github.com/feathericons/feather/blob/master/LICENSE); the rest are original eagami additions, plus a small coloured brand-icon set bundled for nominative use only. See [icons](https://eagami.com/ui/icons) for the full set and per-brand guideline links.

## Theming

Every visual property is a CSS custom property on `:root`, so overriding any token retunes the whole library. See [design tokens](https://eagami.com/ui/design-tokens) for the full reference and theming examples.

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
