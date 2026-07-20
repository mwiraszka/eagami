# Migrating from v4.x to v5.0.0

v5.0.0 renames two `<ea-drawer>` inputs. Both are simple find/replace on the drawer's bindings.

## `animated` becomes `animation`

The boolean `animated` input is now an `animation` input with three values: `none`, `linear`, and `eased`.

```html
<!-- Before -->
<ea-drawer [animated]="true" />
<ea-drawer [animated]="false" />

<!-- After -->
<ea-drawer animation="eased" />
<ea-drawer animation="none" />
```

`animation` defaults to `eased`, so a drawer that previously relied on the default (unanimated) now slides in and out unless you set `animation="none"`. The panel also animates on close now, not only on open.

## `width` becomes `size`

The `width` input is renamed to `size` (it sets the panel's extent along its main axis: width for side drawers, height for top and bottom drawers). The accepted values are unchanged.

```html
<!-- Before -->
<ea-drawer width="lg" />

<!-- After -->
<ea-drawer size="lg" />
```

The exported `DrawerWidth` type is removed; use `DrawerSize` instead.

---

# Migrating from v3.x to v4.0.0

v4.0.0 makes the built-in locales opt-in, so an app bundles only the languages it actually uses instead of all of them. English is always available; every other language must now be registered.

## Register the locales you use

Before, every language resolved automatically:

```ts
provideEagamiUi({ locale: 'fr-FR' });
```

Now, register each non-English locale you reference:

```ts
import { frFR, provideEagamiUi } from '@eagami/ui';

provideEagamiUi({ locale: 'fr-FR', locales: [frFR] });
```

To keep the old behavior (every shipped language available, e.g. for a language switcher), register them all:

```ts
import { EAGAMI_ALL_LOCALES, provideEagamiUi } from '@eagami/ui';

provideEagamiUi({ locales: EAGAMI_ALL_LOCALES });
```

`EagamiI18nService.setLocale(locale)` and the `locale` config option now fall back to English when the requested locale was not registered.

The `EAGAMI_MESSAGES` export has been removed; use `EAGAMI_ALL_LOCALES` (an array of locale bundles) instead.

---

# Migrating from v0.x to v1.0.0

v1.0.0 is the first stable release. It consolidates the API surface across components for consistency and adds form-field plumbing and accessibility coverage that several components were missing. This guide gathers every breaking change in one place so consumers can upgrade in a single pass.

If you only have time for one thing, run the [find/replace table](#findreplace-quick-reference) below. It covers most of the migration.

## Find/replace quick reference

These are mechanical text replacements. Most upgrades only need this section.

### Template attributes

| Find | Replace | Affected components |
|---|---|---|
| `error="…"` | `errorMsg="…"` | Input, Textarea, Code input, Date picker, Dropdown, Autocomplete, Slider |
| `[error]="…"` | `[errorMsg]="…"` | (same as above) |
| `eaCardHeader` | `slot="header"` | Card |
| `eaCardFooter` | `slot="footer"` | Card |

### Output bindings

| Find | Replace | Component |
|---|---|---|
| `(inputFocused)="…"` | `(focused)="…"` | Input |
| `(inputBlurred)="…"` | `(blurred)="…"` | Input |
| `(textareaFocused)="…"` | `(focused)="…"` | Textarea |
| `(textareaBlurred)="…"` | `(blurred)="…"` | Textarea |
| `(tabChange)="…"` | `(changed)="…"` | Tabs |
| `(sortChange)="…"` | `(sorted)="…"` | Data table |
| `(itemClicked)="…"` | `(clicked)="…"` | Menu item, Breadcrumbs |
| `(cropStateChange)="…"` | `(cropStateChanged)="…"` | Avatar editor |
| `(fileError)="…"` | `(errored)="…"` | Avatar editor |
| `(optionSelected)="…"` | `(selected)="…"` | Autocomplete |
| `(valueChanged)="…"` | `(changed)="…"` | Autocomplete |

### Input renames

| Find | Replace | Component |
|---|---|---|
| `placement="left\|center\|right"` | `align="left\|center\|right"` | Paginator |
| `[placement]` | `[align]` | Paginator |

### Type imports

| Find | Replace |
|---|---|
| `import { AutocompleteOption } from '@eagami/ui'` | `import { SelectOption } from '@eagami/ui'` |
| `import { DropdownOption } from '@eagami/ui'` | `import { SelectOption } from '@eagami/ui'` |
| `import { SegmentedOption } from '@eagami/ui'` | `import { SelectOption } from '@eagami/ui'` |
| `import { SortDirection } from '@eagami/ui'` | `import { DataTableSortDirection } from '@eagami/ui'` |
| `import { PaginatorPlacement } from '@eagami/ui'` | `import { PaginatorAlign } from '@eagami/ui'` |

The type shape for `SelectOption` is unchanged: `{ value: string; label: string; disabled?: boolean }`.

## Removed APIs

### `status` input on Input, Textarea, Code input

The `status` input (`'default' | 'error' | 'success'`) and the corresponding `success` visual variant were removed. Error state is now driven solely by `errorMsg`. The `success` variant had no semantic counterpart in form validation flows.

```diff
- <ea-input status="error" />
+ <ea-input errorMsg="Required" />
```

There is no replacement for the `success` styling. If you need a "success" indicator next to a field, use `BadgeComponent` or render your own affordance below the field.

### `primary` variant on Tag

`TagComponent` no longer accepts `variant="primary"`. Tags are now intended for semantic statuses only (`default | success | warning | error | info`). For brand-coloured chips, use `BadgeComponent` or a styled element.

```diff
- <ea-tag variant="primary">TypeScript</ea-tag>
+ <ea-badge variant="info">TypeScript</ea-badge>
```

## Card content slots

`CardComponent` now uses standard `slot=` attribute selectors instead of attribute directives. This aligns Card with `DialogComponent` and `DrawerComponent`, which already used the slot pattern.

```diff
  <ea-card variant="elevated">
-   <span eaCardHeader>Title</span>
+   <span slot="header">Title</span>
    Body content.
-   <span eaCardFooter>
+   <span slot="footer">
      <ea-button>Save</ea-button>
    </span>
  </ea-card>
```

## Output-name conventions

All event outputs now follow past-tense naming, and verbosity around the concept name was removed where redundant.

- Past-tense everywhere: `selected`, `clicked`, `changed`, `sorted`, `errored`, `removed`
- No `*Change` suffix where the event already implies a change has occurred (`tabChange` → `changed`, `sortChange` → `sorted`, `cropStateChange` → `cropStateChanged`)
- No nested concept prefixes (`itemClicked` → `clicked` because the host is `ea-menu-item`; `inputFocused` → `focused` because the host is `ea-input`)

## Autocomplete redesign

Beyond the input/output renames, the internal `focused` signal was renamed to `isFocused` to free the name for a new `focused: output<FocusEvent>` (matching `InputComponent`). If you reached into `myAutocomplete.focused()` from a `viewChild`, rename to `isFocused()`:

```diff
  @ViewChild(AutocompleteComponent) ac!: AutocompleteComponent;

  ngAfterViewInit() {
-   if (this.ac.focused()) { … }
+   if (this.ac.isFocused()) { … }
  }
```

A new `focus()` public method is now available on the component as a programmatic alternative.

## Additive changes (no migration needed)

These don't break v0.x consumers but are worth knowing about as upgrade incentives:

- **Form-field plumbing on RadioGroup, Switch, Checkbox, Segmented:** they now accept `label`, `hint`, `errorMsg`, `required` for parity with Input/Textarea/Dropdown
- **`focus()` public method** on Autocomplete, Dropdown, Date picker (Input, Textarea, Code input already had one)
- **`readonly` input** on Dropdown, Date picker, Code input
- **`placeholder` input** on Code input
- **`removeLabel` input** on Tag (defaults to `"Remove"`)
- **`headingLevel` input** on Empty state (default `h2`, accepts `h2`–`h6`)
- **`id` input** exposed on Menu, Dialog, Drawer, Radio group for external `aria-labelledby` / `aria-controls` references
- **Roving keyboard navigation** on Menu items
- **Calendar focus management:** the Date picker grid receives focus when the calendar opens
- **Improved accessible names** on overlays, custom triggers, and tags
- **Dark-mode link tokens:** `--color-text-link` and `--color-text-link-hover` now have dark-mode overrides

## Need a hand?

If you hit something this guide doesn't cover, please [open an issue](https://github.com/mwiraszka/eagami/issues) describing what you tried and what surprised you. It's the fastest way to get this guide better.
