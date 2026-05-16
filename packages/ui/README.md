<h1 align="center">Eagami UI</h1>

<p align="center">
  <img src="assets/logo.png" alt="Eagami UI logo" width="150" height="150" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@eagami/ui"><img src="https://img.shields.io/npm/v/@eagami/ui.svg" alt="npm version" /></a>
  <a href="https://github.com/mwiraszka/eagami/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@eagami/ui.svg" alt="license" /></a>
</p>

A lightweight, accessible Angular component library built on CSS custom properties. Standalone, signal-based, fully themable, and localized in five languages out of the box.

**Live documentation:** [eagami.com/ui](https://eagami.com/ui)

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

## Features

- Standalone components; no `NgModule` boilerplate
- Signal-based APIs (`input()`, `model()`, `output()`)
- Tree-shakeable; ~70 KB gzipped for the whole library
- Themed via CSS custom properties on `:root`
- Dark mode automatic via `prefers-color-scheme`
- Accessible: ARIA, keyboard, focus management, reduced motion
- Localized in English, French, Greek, Polish, Spanish
- `ControlValueAccessor` on every form control

## What's included

- **Form controls**: Input, Textarea, Checkbox, Switch, Radio, Dropdown, Autocomplete, Date picker, Slider, Code input, Segmented, Avatar editor
- **Overlays**: Dialog, Drawer, Tooltip, Menu, Toast
- **Navigation**: Tabs, Breadcrumbs, Paginator, Accordion
- **Display**: Card, Badge, Tag, Alert, Avatar, Skeleton, Spinner, Progress bar, Empty state, Divider, Eagami wordmark, Data table
- **Icons**: 100 stroke-based SVG icon components (`<ea-icon-*>`)

Full API and live demos at [eagami.com/ui/components](https://eagami.com/ui/components).

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
