# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2026-05-10

### Fixed

- Fix hue/saturation drift in primary and secondary color palettes — all primary shades now share H=205° / S=50%, all secondary shades share H=264° / S=25%, varying only lightness, so each ramp reads as a single hue at different lightnesses rather than several different colors. Dark-mode `--color-brand-subtle` and `--color-brand-muted` retinted to the new primary-400 so they no longer drift from the rest of the palette
- Restore visible elevation on `--shadow-*` tokens in dark mode by layering an inset top highlight (ramping from 0.04 → 0.14 white alpha as elevation increases) on top of the existing dark drop shadows, since black drop shadows alone are nearly invisible against a near-black page. Every surface using a shadow token now picks up a "lit from above" rim of light without any per-component change — `Card` variant="elevated", `Dialog`, `Drawer`, `Dropdown`, `Autocomplete`, `Menu`, `Toast`, `DatePicker` calendar, `Tabs` underline indicator, `Segmented` selected pill, `Slider` thumb, and `Switch` thumb

## [1.0.1] - 2026-05-10

### Added

- Support manual theme override via `<html data-theme="light">` or `<html data-theme="dark">` so consumers can ship their own dark/light toggles independent of the OS `prefers-color-scheme` setting
- New `--color-bg-elevated` semantic token for surfaces that float above the page (Card variant="elevated", Dialog, Drawer). Resolves to the page background in light mode and to a step-lighter shade in dark mode so elevated surfaces remain visibly distinct from the page

### Fixed

- Restore visibility of `Card` variant="elevated", `Dialog`, and `Drawer` in dark mode — they previously shared the same near-black background as the page, with shadows that vanished against it. Switched these surfaces to the new `--color-bg-elevated` token and deepened `--shadow-*` token alpha values for additional depth
- Switch the single-color brand icons (`GithubIconComponent`, `AppleIconComponent`, `FacebookIconComponent`, `XTwitterIconComponent`) to `currentColor` so they inherit the surrounding text color and remain legible in dark mode; opt back in to the original brand color via the new `[brand]` input
- Add dark-mode overrides for `--color-{success,warning,error,info}-{subtle,muted}` so `AlertComponent`, `ToastComponent`, and other status surfaces darken enough for primary text to remain readable against them
- `AvatarEditorComponent` "Change photo" hover overlay now picks white or black ink based on the loaded photo's average luminance instead of the active theme, so the affordance stays readable on both bright and dark images

## [1.0.0] - 2026-05-09

> See [MIGRATION.md](MIGRATION.md) for a step-by-step upgrade guide from v0.x.

### Added

- Introduce shared `SelectOption` interface (`{ value, label, disabled? }`) used by `AutocompleteComponent`, `DropdownComponent`, and `SegmentedComponent` for their `options` input, replacing the previous per-component option types
- Bring `RadioGroupComponent`, `SwitchComponent`, `CheckboxComponent`, and `SegmentedComponent` to parity with other form controls — they now expose `label` (where missing), `hint`, `errorMsg`, and `required` inputs; group controls also wire `aria-labelledby` to the rendered label and `aria-required`/`aria-invalid` to the host
- Add `focus()` public method to `AutocompleteComponent`, `DropdownComponent`, and `DatePickerComponent`; add `readonly` input to `DropdownComponent`, `DatePickerComponent`, and `CodeInputComponent`; add `placeholder` input to `CodeInputComponent`
- Add `focused` and `blurred` outputs (`FocusEvent`) to `AutocompleteComponent`
- Add `removeLabel` input to `TagComponent` so consumers can override the remove-button accessible name per tag
- Add `headingLevel` input to `EmptyStateComponent` (`h2`–`h6`, default `h2`) so the title fits the surrounding document outline
- Add `id` input to `MenuComponent`, `DialogComponent`, `DrawerComponent`, and `RadioGroupComponent` so external `aria-labelledby`/`aria-controls` references can target the host
- `MenuComponent` now implements WAI-ARIA roving keyboard navigation across menu items: arrow keys, Home/End, focus the first item on open
- Calendar grid in `DatePickerComponent` receives focus on open so keyboard users land on the focused day immediately
- `AvatarEditorComponent` canvas is now keyboard-pannable (arrow keys, Shift for larger steps; `+`/`-` to zoom) and exposes a descriptive `aria-label`
- `Spinner` animation honours `prefers-reduced-motion` by slowing the spin rather than disabling the loading affordance

### Changed

- **Breaking:** Rename the `error` input to `errorMsg` on `InputComponent`, `TextareaComponent`, `CodeInputComponent`, `DatePickerComponent`, `DropdownComponent`, `AutocompleteComponent`, and `SliderComponent`. Migration: `<ea-input error="…" />` becomes `<ea-input errorMsg="…" />`
- **Breaking:** `CardComponent` now reads its header and footer from standard `[slot=header]` and `[slot=footer]` content slots rather than the `[eaCardHeader]` and `[eaCardFooter]` attribute directives. Migration: `<span eaCardHeader>…</span>` becomes `<span slot="header">…</span>`. This aligns Card with `DialogComponent` and `DrawerComponent`, which already use the slot pattern
- **Breaking:** Replace `AutocompleteOption`, `DropdownOption`, and `SegmentedOption` types with the single shared `SelectOption` interface. The shape is unchanged; update import sites accordingly
- **Breaking:** Rename `inputFocused`/`inputBlurred` outputs to `focused`/`blurred` on `InputComponent`, and `textareaFocused`/`textareaBlurred` to `focused`/`blurred` on `TextareaComponent`, matching native DOM event names
- **Breaking:** Standardize event output names across components — `TabsComponent.tabChange`, `DataTableComponent.sortChange`, `MenuItemComponent.itemClicked`, and `BreadcrumbsComponent.itemClicked` are now `changed`, `sorted`, and `clicked` respectively
- **Breaking:** Rename `AvatarEditorComponent.cropStateChange` → `cropStateChanged` and `fileError` → `errored` to follow the past-tense convention
- **Breaking:** Rename `PaginatorComponent.placement` → `align` (and the corresponding `PaginatorPlacement` type → `PaginatorAlign`), since "placement" is reserved for popover positioning elsewhere in the library
- **Breaking:** Redesign `AutocompleteComponent` API for parity with other form controls — outputs are now `selected` (was `optionSelected`) and `changed` (was `valueChanged`), and the internal focus signal was renamed to `isFocused` to free the `focused` name for the new output
- **Breaking:** Rename the public type `SortDirection` → `DataTableSortDirection` to avoid leaking a generic name into consumer scope
- `ProgressBarComponent.label` now defaults to `undefined` rather than the empty string, matching the convention used by all other label inputs

### Fixed

- Increase contrast of the `--color-text-link-hover` token in light mode (now `--color-primary-800`) and add dark-mode overrides for `--color-text-link` and `--color-text-link-hover` so links meet WCAG AA in both schemes and the rest→hover delta is perceptible at a glance
- Scope `role="alert"` to the `error` and `warning` variants of `AlertComponent` and `ToastComponent`; non-urgent variants now use `role="status"` with a polite live region instead of interrupting screen-reader output for routine messages
- Add `aria-required` to the focusable element of `DropdownComponent`, `AutocompleteComponent`, `DatePickerComponent`, `SliderComponent`, and `SegmentedComponent` so screen readers announce required custom controls
- `DialogComponent` and `DrawerComponent` now derive an `aria-labelledby` from the slotted header when no `aria-label` is supplied, giving every overlay a programmatic name
- `DropdownComponent` no longer self-references its own trigger via `aria-labelledby`; the visible label now carries an id and the trigger references it
- `DataTableComponent` sortable header cells use the implicit `<th>` role plus `aria-sort` instead of an invalid `role="columnheader button"`
- `TooltipDirective` appends to (and removes from) `aria-describedby` rather than overwriting it, so it no longer clobbers an input's existing hint/error wiring
- Unwrap the `DatePickerComponent` clear button from inside the trigger button (which produced invalid HTML) and position it as a sibling
- `ProgressBarComponent` now exposes `aria-busy` while indeterminate
- Each digit input in `CodeInputComponent` now reflects `aria-invalid` when the group has an error
- `AvatarComponent` falls back to the supplied `initials` for its accessible name when `alt` is empty
- `AvatarEditorComponent` file input now exposes an `aria-label`

### Removed

- **Breaking:** Remove the `status` input (`'default' | 'error' | 'success'`) from `InputComponent`, `TextareaComponent`, and `CodeInputComponent` along with the `success` visual variant. Error state is now driven solely by the `errorMsg` input
- **Breaking:** Remove the `primary` variant from `TagComponent`. Tags now cover semantic statuses only (`default | success | warning | error | info`); use a styled element or `BadgeComponent` for brand-colored chips

## [0.12.0] - 2026-05-08

### Added

- Add `SliderComponent` (`ea-slider`) — single-value range input with `min`/`max`/`step`, `sm`/`md`/`lg` sizes, optional value display and min/max labels, full keyboard navigation (arrows, PageUp/PageDown, Home/End), pointer drag, error/hint messages, and `ControlValueAccessor` integration
- Add `SegmentedComponent` (`ea-segmented`) — toggle button group for view/mode switching with `sm`/`md`/`lg` sizes, full-width option, per-option disabled state, arrow-key navigation, and `ControlValueAccessor` integration
- Add `EmptyStateComponent` (`ea-empty-state`) — pattern component for "no results" / "nothing here yet" states with `media` and `actions` content slots, optional title and description, and `sm`/`md`/`lg` sizes

### Changed

- **Breaking:** `MenuComponent` no longer wraps its trigger via the `[slot=trigger]` content slot. Apply the new `[eaMenuTrigger]` directive to your own button instead and reference the menu by template variable. Migration: `<ea-menu><ea-button slot="trigger">…</ea-button>…</ea-menu>` becomes `<ea-button [eaMenuTrigger]="m">…</ea-button><ea-menu #m>…</ea-menu>`. The trigger now receives `aria-haspopup`/`aria-expanded`/`aria-controls` directly on the focusable element rather than on a wrapping `<div>`, fixing the largest a11y gap in the menu API. The popup is positioned with `position: fixed` so it escapes overflow-clipping ancestors

### Fixed

- Improve accessibility across the library: `DropdownComponent` trigger now exposes `aria-describedby` and `aria-invalid` for hint/error text; `AutocompleteComponent` input declares `aria-haspopup="listbox"` and `aria-autocomplete="list"`; `AccordionItemComponent` trigger and panel are linked via `aria-controls` and `aria-labelledby`; `TabComponent` panels are linked to their tab buttons via `aria-controls`/`aria-labelledby` and become keyboard-focusable; `TooltipDirective` now wires `aria-describedby` on the host, marks the popover with `role="tooltip"`, and dismisses on Escape; `SwitchComponent` accepts an `aria-label` for icon-only usage; `CodeInputComponent` group falls back to a descriptive `aria-label` when no visible label is set
- Restore focus to the previously focused element when `DialogComponent` and `DrawerComponent` close, so keyboard users return to the trigger that opened the overlay
- Remove redundant `aria-disabled` from `ButtonComponent` (native `disabled` is authoritative)
- Drop misleading `aria-modal="false"` from `DatePickerComponent` calendar popover

## [0.11.1] - 2026-04-22

### Fixed

- Prevent the `DropdownComponent` menu from being clipped by overflow-hidden ancestors (e.g. `CardComponent`) by switching it to fixed positioning anchored to the trigger

## [0.11.0] - 2026-04-21

### Added

- Introduce `design-system-flutter.md` and `design-system-react.md` — self-contained framework integration guides covering the full Eagami token set, mandatory design rules, ready-to-paste theme setup, usage patterns, and component API conventions, intended to be copied into consuming Flutter and React projects and written to be readable by both human developers and AI coding agents

### Fixed

- Allow the `DropdownComponent` menu to grow wider than its trigger so long option labels are no longer clipped or wrapped

## [0.10.1] - 2026-04-19

### Changed

- Rework `EagamiWordmarkComponent` API — replace `variant` and `text` inputs with a numeric `variant` (`1`–`4`) that maps to the four text options internally, add `layout` input (`stacked` | `inline`) for single-line rendering with em dash separator, and switch `size` from preset strings to a numeric pixel value for continuous scaling

### Fixed

- Prevent menu dropdown from being clipped by card boundaries in the sandbox

## [0.10.0] - 2026-04-14

### Added

- Add `DatePickerComponent` (`ea-date-picker`) — calendar popover with prev/next month and year navigation, today shortcut, `sm`/`md`/`lg` sizes, `short`/`medium`/`long` locale-aware display formats, configurable week start (Sunday or Monday), `minDate`/`maxDate` bounds, full keyboard navigation (arrows, PageUp/PageDown, Home/End, Enter, Escape), and `ControlValueAccessor` integration
- Introduce a `text` input on `EagamiWordmarkComponent` to switch the wordmark between "eagami" and "eagami design system"
- Build out `CardComponent` with a `headerDivider` input that renders an `ea-divider` between the header and the body

### Changed

- Standardize multi-word component names to sentence case across the README and Storybook sidebar (e.g. "Data Table" → "Data table", "Avatar Editor" → "Avatar editor")

## [0.9.0] - 2026-04-13

### Added

- Add `AutocompleteComponent` (`ea-autocomplete`) — text input with filtered suggestion dropdown, keyboard navigation, configurable `minLength` and `maxResults`, and `ControlValueAccessor` integration
- Add `BreadcrumbsComponent` (`ea-breadcrumbs`) — navigation trail with chevron or slash separators, link/button/disabled item rendering, and automatic current-page handling for the last item
- Add `DrawerComponent` (`ea-drawer`) — side panel built on native `<dialog>` with four positions (left/right/top/bottom), sizes, focus trapping, backdrop/escape close, and header/footer content slots
- Add `EagamiWordmarkComponent` (`ea-eagami-wordmark`) — branded wordmark linking to eagami.com with `logo`, `signature`, and `brand` variants and `sm`/`md`/`lg` sizes that scale the logo and text proportionally
- Add `MenuComponent` (`ea-menu`) and `MenuItemComponent` (`ea-menu-item`) — popup action menu with trigger slot, four placements, keyboard navigation, icon support, disabled items, and `danger` variant
- Add `ea-icon-eagami` brand logo icon used by `EagamiWordmarkComponent`

### Fixed

- Set default `1em × 1em` sizing on all icon components so icons render at the inherited font size when placed inside buttons without explicit sizing
- Allow `PaginatorComponent` controls to wrap onto multiple lines in narrow containers instead of overflowing horizontally
- Resolve strict type checking error in Storybook build for the autocomplete story

## [0.8.1] - 2026-04-11

### Fixed

- Ensure package.json version matches branch version before merge to prevent failed npm publishes

## [0.8.0] - 2026-04-11

### Added

- Add `DataTableComponent` (`ea-data-table`) with sortable columns, sticky header, density modes, striped/bordered/hoverable options, column formatting via `format` callback, and empty state
- Add `PaginatorComponent` (`ea-paginator`) with page size selector, range label, placement option, and smart page number ellipsis
- Add `aria-current` input to `ButtonComponent` for active page indication in pagination
- Add `captureOriginal()` method to `AvatarEditorComponent` for snapshotting the current image and crop state as the new original after a save
- Add 25 utility icon components: `alert-triangle`, `arrow-left`, `arrow-right`, `bell`, `calendar`, `check-circle`, `chevron-up`, `clock`, `copy`, `download`, `external-link`, `file`, `filter`, `heart`, `image`, `link`, `log-out`, `mail`, `menu`, `more-horizontal`, `pencil`, `search`, `settings`, `star`, `x-circle`
- Add 5 brand logo icon components with official brand colors: `apple`, `facebook`, `github`, `microsoft`, `x-twitter`
- Add Storybook stories for Avatar, Badge, Divider, Spinner, Switch, Toast, and Tooltip components

## [0.7.4] - 2026-04-04

### Added

- Add `loading` input to `AvatarEditorComponent` for showing a skeleton placeholder while avatar data is fetched externally

### Fixed

- Fix `AvatarEditorComponent` revert button being enabled on initial load before any changes are made
- Restore exact original zoom/pan crop state when reverting, instead of resetting to defaults
- Preserve the original image in memory so reverting after file uploads restores it instantly without a network request
- Support reverting to an empty state when the component started with no image
- Remove unused `revertSrc` input from `AvatarEditorComponent` (revert now always uses the stored original from initial load)

## [0.7.3] - 2026-04-04

### Added

- Separate `revertSrc` input on `AvatarEditorComponent` so the "revert to original" button can reset to a different image than `currentSrc`

### Fixed

- Remove unused `tslib` dependency from published package

## [0.7.2] - 2026-04-03

### Added

- Show a loading skeleton inside `AvatarEditorComponent` while an image is being fetched — skeleton matches the editor shape (`circle` or `rect`) and canvas size

### Fixed

- Disable `AvatarEditorComponent` revert button once already reverted to original; re-enables on any zoom or pan change

## [0.7.1] - 2026-04-03

### Fixed

- Fix `AvatarEditorComponent` to apply `cropState` on every `currentSrc` change, not just the initial load — restores crop position correctly when the source URL is swapped after the first render
- Fix `AvatarEditorComponent` to suppress `cropStateChange` emission during programmatic image loads (`currentSrc` changes and revert) — prevents transient state divergence that caused the save button to flicker enabled

## [0.7.0] - 2026-04-02

### Added

- Add `ProgressBarComponent` (`ea-progress-bar`) with determinate and indeterminate modes, semantic variants, and optional label/value display
- Add `TagComponent` (`ea-tag`) with semantic variants, sizes, and optional remove button
- Add `cropState` input to `AvatarEditorComponent` — when provided alongside `currentSrc`, restores zoom and pan position after the image loads; ignored on subsequent `currentSrc` changes
- Add `cropStateChange` output to `AvatarEditorComponent` — emits the current crop state on every zoom or pan change
- Add `fileSelected` output to `AvatarEditorComponent` — emits the original `File` when the user picks or drops a file (fires after validation passes)
- `exportCrop()` on `AvatarEditorComponent` now returns `Promise<Blob>`; the `(cropped)` output continues to fire for backwards compatibility
- Add `--ea-card-header-padding`, `--ea-card-body-padding`, and `--ea-card-footer-padding` CSS custom properties to `CardComponent` for per-section padding overrides
- Add `--ea-input-toggle-color` CSS custom property to `InputComponent` for overriding the password visibility toggle color

## [0.6.0] - 2026-03-28

### Added

- Add `CodeInputComponent` (`ea-code-input`) for verification code entry with auto-advance, paste support, arrow key navigation, and `ControlValueAccessor` integration
- Add `TabsComponent` (`ea-tabs`) and `TabComponent` (`ea-tab`) with underline and filled variants, keyboard navigation, and ARIA tab roles
- Add `AlertComponent` (`ea-alert`) with semantic variants (default, success, warning, error, info) and dismissible option
- Add `SkeletonComponent` (`ea-skeleton`) with text, circle, and rect variants for loading placeholders
- Add `AccordionComponent` (`ea-accordion`) and `AccordionItemComponent` (`ea-accordion-item`) with single and multi-expand modes
- Add `ea-icon-chevron-down` icon component

### Changed

- Remove `rxjs` from peer dependencies (no longer used by any component)
- Remove `tslib` from dependencies (not used in compiled output)

### Fixed

- Fix tab panel spacing increasing with each tab due to empty host elements participating in flex gap layout

## [0.5.0] - 2026-03-22

### Added

- Add hover overlay on avatar editor canvas to change photo by clicking the image
- Add revert-to-original and remove icon buttons inline with zoom controls in avatar editor
- Add tooltips to all avatar editor icon buttons
- Add `removed` output to `AvatarEditorComponent`
- Add icon components: `ea-icon-camera`, `ea-icon-minus`, `ea-icon-plus`, `ea-icon-rotate-ccw`, `ea-icon-trash`, `ea-icon-upload`
- Add `--shadow-focus-ring-error` and `--shadow-focus-ring-success` elevation tokens
- Add `pnpm screenshots` command to capture README component images via Puppeteer

### Changed

- Redesign avatar editor controls: replace Change/Remove/Apply buttons with icon button row and canvas hover overlay
- Avatar editor controls are always visible (disabled when no image is loaded)

### Fixed

- Fix avatar editor image not displaying until clicked by using `afterNextRender` instead of `setTimeout`/`requestAnimationFrame`
- Fix browser autofill adding light blue background to input fields
- Replace all hardcoded hex and rgba colors with design token references

## [0.4.1] - 2026-03-22

### Fixed

- Update README so npm package page displays correctly

## [0.4.0] - 2026-03-22

### Changed

- Use `--color-text-primary` as default color for `AvatarEditorComponent` zoom buttons instead of `--color-text-secondary`

### Fixed

- Set `display: inline-block; line-height: 0` on `AvatarComponent` host element to eliminate extra space below the avatar
- Load `currentSrc` image in `AvatarEditorComponent` on initialization so pre-existing avatars display in the editor
- Use local sample avatar image in sandbox instead of external URL

## [0.3.0] - 2026-03-21

### Added

- Add `xl` padding option to `CardComponent` (32px)
- Add `--ea-card-shadow` CSS custom property for overriding card box-shadow without `::ng-deep`
- Add `--ea-button-font-size` and `--ea-button-font-weight` CSS custom properties for overriding button typography without `::ng-deep`
- Add icon components: `ea-icon-google`, `ea-icon-check`, `ea-icon-x`, `ea-icon-user`, `ea-icon-info`, `ea-icon-loader`
- Add `AvatarComponent` with image, initials, and icon fallback; `size` (xs–xl) and `shape` (circle/square) inputs
- Add `BadgeComponent` with semantic variants (default/success/warning/error/info) and size options
- Add `SpinnerComponent` with SVG-based loading animation and accessible `role="status"`
- Add `SwitchComponent` with `ControlValueAccessor` integration, label, and size options
- Add `TextareaComponent` with `ControlValueAccessor` integration, mirroring `InputComponent` API (label, hint, error, size, status, resize, maxlength)
- Add `DividerComponent` with horizontal/vertical orientation and optional label
- Add `TooltipDirective` (`[eaTooltip]`) with configurable position (top/bottom/left/right), triggered on hover and focus
- Add `ToastComponent` and `ToastService` for notification toasts with semantic variants, auto-dismiss, and slide-in animation
- Add `AvatarEditorComponent` with drag-and-drop upload, pan, zoom, and crop export for circle and square shapes

### Fixed

- Make toast widths independent so each toast sizes to its own content; full-width layout on mobile (<640px)
- Increase `lg` size font for `InputComponent` and `TextareaComponent` to `--font-size-lg` for a clearer distinction from `md`
- Remove double spacing between card header/body/footer sections (header no longer adds bottom padding, footer no longer adds top padding)
- Use color inheritance in `InputComponent` so password toggle and hint messages respect parent context colors
- Move Angular and RxJS from direct dependencies to peer dependencies to prevent version conflicts for consumers with different minor/patch versions

## [0.2.0] - 2026-03-14

### Added

- Add `autocomplete`, `autofocus`, and password visibility toggle inputs to `InputComponent`
- Add `headerAlign` input to `CardComponent`
- Add `IconComponent` and `IconButtonComponent`

## [0.1.0] - 2026-03-09

### Added

- `ButtonComponent` with variant (`primary`, `secondary`, `ghost`, `danger`), size, and loading state support
- `InputComponent` with full `ControlValueAccessor` integration, label, hint, and error state
- `CheckboxComponent` with `ControlValueAccessor` integration and indeterminate state
- `RadioComponent` and `RadioGroupComponent` with composite pattern and `ControlValueAccessor` integration
- `DropdownComponent` with `ControlValueAccessor` integration
- `DialogComponent` built on the native `<dialog>` element
- `CardComponent`
- Global SCSS design tokens for colors, typography, spacing, elevation, motion, and shape
- CSS custom property theming support

[1.0.2]: https://github.com/mwiraszka/eagami-design-system/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/mwiraszka/eagami-design-system/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/mwiraszka/eagami-design-system/compare/v0.12.0...v1.0.0
[0.12.0]: https://github.com/mwiraszka/eagami-design-system/compare/v0.11.1...v0.12.0
[0.11.1]: https://github.com/mwiraszka/eagami-design-system/compare/v0.11.0...v0.11.1
[0.11.0]: https://github.com/mwiraszka/eagami-design-system/compare/v0.10.1...v0.11.0
[0.10.1]: https://github.com/mwiraszka/eagami-design-system/compare/v0.10.0...v0.10.1
[0.10.0]: https://github.com/mwiraszka/eagami-design-system/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/mwiraszka/eagami-design-system/compare/v0.8.1...v0.9.0
[0.8.1]: https://github.com/mwiraszka/eagami-design-system/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/mwiraszka/eagami-design-system/compare/v0.7.4...v0.8.0
[0.7.4]: https://github.com/mwiraszka/eagami-design-system/compare/v0.7.3...v0.7.4
[0.7.3]: https://github.com/mwiraszka/eagami-design-system/compare/v0.7.2...v0.7.3
[0.7.2]: https://github.com/mwiraszka/eagami-design-system/compare/v0.7.1...v0.7.2
[0.7.1]: https://github.com/mwiraszka/eagami-design-system/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/mwiraszka/eagami-design-system/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/mwiraszka/eagami-design-system/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/mwiraszka/eagami-design-system/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/mwiraszka/eagami-design-system/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/mwiraszka/eagami-design-system/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/mwiraszka/eagami-design-system/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/mwiraszka/eagami-design-system/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/mwiraszka/eagami-design-system/releases/tag/v0.1.0
