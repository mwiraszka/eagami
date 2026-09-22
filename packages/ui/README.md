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

`@eagami/ui` is a lightweight, accessible Angular component library and design system. Sensible defaults out of the box, with a fully customizable design to fit any brand.

<p align="center">
  <a href="https://eagami.com/ui">Documentation</a> · <a href="https://eagami.com/ui/components">Components</a> · <a href="https://eagami.com/ui/icons">Icons</a><br />
  <a href="https://eagami.com/ui/design-tokens">Design tokens</a> · <a href="https://eagami.com/ui/theme-builder">Theme builder</a> · <a href="https://eagami.com/ui/i18n">Internationalization</a> · <a href="https://eagami.com/ui/accessibility">Accessibility</a>
</p>

## Why Eagami UI

- **THEMES TO YOUR BRAND.** Give it one color per role and it generates a full, contrast-checked palette.
- **LIGHTWEIGHT.** No runtime dependencies, no CSS framework, and standalone side-effect-free components, so your app bundles only what it imports.
- **ACCESSIBLE AND LOCALIZED.** Every component meets WCAG 2.2 AA with full keyboard support and its own axe-core test suite. Built-in text ships in 15 languages you can switch at runtime.
- **YOURS TO OWN.** Plain Angular and CSS with no lock-in: read, copy, or fork any component like the rest of your app.
- **MODERN ANGULAR.** Signals and native control flow throughout, with SSR-safe rendering, prerendering, and hydration.

## Install

```bash
ng add @eagami/ui
```

The schematic installs the package and registers the global stylesheet and fonts. To wire it up by hand, see [Setup](https://eagami.com/ui/setup).

## Use

```ts
import { ButtonComponent } from '@eagami/ui';

@Component({
  imports: [ButtonComponent],
  template: `<ea-button (clicked)="save()">Save</ea-button>`,
})
export class MyComponent {
  save() {}
}
```

## Theme

Pass one color per role to `provideEagamiUi`:

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

Everything else is a CSS custom property you can override. See [Design tokens](https://eagami.com/ui/design-tokens).

## Testing

`<ea-dialog>` and `<ea-drawer>` are built on the native `<dialog>` element, and `@eagami/ui/testing` keeps them working in jsdom, which lacks `showModal()` and `close()`. Call `installNativeDialogShim()` once from your test setup file:

```ts
import { installNativeDialogShim } from '@eagami/ui/testing';

installNativeDialogShim();
```

## Links

<p align="center">
  <a href="CHANGELOG.md">Changelog</a> · <a href="MIGRATION.md">v4.x migration guide</a> · <a href="https://github.com/mwiraszka/eagami/blob/main/SUPPORT.md">Support</a> · <a href="https://github.com/mwiraszka/eagami/blob/main/LICENSE">License</a>
</p>
