# Changelog

All notable changes to eagami.com are documented in this file.

## [3.15.0] - 2026-07-24

### Added

- Add a rich template-content example to the tooltip demo page.

### Changed

- Display icons in a compact icon-only grid, with each icon's name and selector shown in its tooltip.
- Pick up @eagami/ui v5.10.0.

### Fixed

- Fix the React integration guide's outdated icon list; it now stays in sync with the library automatically.

## [3.14.9] - 2026-07-24

### Changed

- Pick up @eagami/ui v5.9.0.

## [3.14.8] - 2026-07-21

### Fixed

- Update Angular to its latest 21.2 patch release, resolving several security advisories.

## [3.14.7] - 2026-07-18

### Changed

- Consolidate the marketing CTA button styles into a shared mixin and align internal page spacing to the standard scale.

## [3.14.6] - 2026-07-18

### Changed

- Pick up @eagami/ui v5.8.5.

## [3.14.5] - 2026-07-18

### Changed

- Pick up @eagami/ui v5.8.4.

## [3.14.4] - 2026-07-18

### Changed

- Pick up @eagami/ui v5.8.3.

## [3.14.3] - 2026-07-18

### Changed

- Pick up @eagami/ui v5.8.2.

## [3.14.2] - 2026-07-17

### Changed

- Pick up @eagami/ui v5.8.1.

## [3.14.1] - 2026-07-16

### Changed

- Pick up @eagami/ui v5.8.0 and surface the new size controls on the menu, accordion, breadcrumbs, data table, form field, and toast demo pages.

## [3.14.0] - 2026-07-14

### Added

- Document lazy locale loading on the internationalization page.

### Changed

- Download each language's dictionaries only when that language is first used, instead of shipping all 15 with the initial page, so the site loads faster, especially on slow connections.

## [3.13.0] - 2026-07-14

### Added

- Show a dimmed loading overlay when navigation takes more than a moment, highlight the destination link the instant it is clicked, and preload pages in the background so navigation stays fast on slow connections.

### Changed

- Improve page titles and meta descriptions across the docs for search and link sharing: titles now lead with the page topic (e.g. "Angular Button Component | Eagami UI"), and every page sets an Open Graph title.

## [3.12.0] - 2026-07-13

### Added

- Host the React and Flutter integration guides and the design-token JSON export, linked from the setup and design-tokens pages.

## [3.11.5] - 2026-07-12

### Changed

- Pick up @eagami/ui v5.6.1.

## [3.11.4] - 2026-07-11

### Changed

- Correct the release script so the @eagami/ui v5.6.0 npm publish succeeds; no functional website changes.

## [3.11.3] - 2026-07-11

### Changed

- Ship a release-pipeline fix so @eagami/ui v5.6.0 publishes to npm; no functional website changes.

## [3.11.2] - 2026-07-11

### Added

- List brand-guideline links for the ten new brand icons on the icons reference page; the gallery picks up all 21 new marks from @eagami/ui v5.6.0.

### Changed

- Use the new languages icon in place of the globe for the locale switcher and localization-related feature and principle cards.
- Show `provideEagamiUi()` with parentheses consistently across the theming and i18n docs.

### Fixed

- Give the site header a hairline bottom border so it reads as a distinct bar consistently in light and dark mode, instead of blending into the page in light mode only.

## [3.11.1] - 2026-07-10

### Added

- Add a demo page for the new timeline component, with a live playground and API reference, translated into every locale.

### Changed

- Give the component playground controls an equal share of each row, and flag semantic-only controls with a note.

## [3.11.0] - 2026-07-10

### Added

- Add a demo page for the new number input component, with a live playground and API reference, translated into every locale.

## [3.10.0] - 2026-07-08

### Added

- Add an interactive theme builder to the UI docs that derives a full light and dark palette from your brand colors, flags any WCAG contrast failures live, previews it on real components, and gives you the provider config and CSS to copy, translated into every locale.

### Changed

- Present the design-tokens color scales as compact swatch strips rather than large labelled cards, and link the theme builder from the page's palette section.
- Pick up @eagami/ui v5.3.0; the theme builder preview now shows the secondary color at work via the progress bar's buffered segment.

## [3.9.2] - 2026-07-07

### Changed

- Pick up @eagami/ui v5.2.2.

## [3.9.1] - 2026-07-04

### Changed

- Pick up @eagami/ui v5.2.1.

## [3.9.0] - 2026-07-04

### Added

- Add a demo page for the new form field component, with a live playground, API reference, and translations in every locale.

### Changed

- Pick up @eagami/ui v5.2.0.

## [3.8.0] - 2026-07-03

### Added

- Add an Accessibility page to the UI docs presenting the WCAG 2.2 AA conformance target and the accessibility features built into every component, translated into every locale.

### Changed

- Pick up @eagami/ui v5.1.0.
- Surface the library's new accessibility inputs in the component playgrounds and API references, including a heading-level control on the accordion demo.

## [3.7.1] - 2026-07-02

### Changed

- Tighten the UI landing page showcase with smaller row gaps, switch its controls to their compact sm size on mobile, and drop the color picker from the wall.
- Move the theme card's reset control to a ghost button on its own row in the top corner, matching the component demo pages.
- Lay out the UI section's page links in two columns on mobile so the expanded components list keeps more of the sidebar.
- Pick up @eagami/ui v5.0.1.

### Fixed

- Keep showcase controls inside the card edge when a wide playground font is selected.
- Open the first component in a single click when selecting Components from another UI page.

## [3.7.0] - 2026-07-02

### Added

- Add mode and animation controls to the drawer demo for switching between the overlay and push variants and between the slide animations.

### Changed

- Pick up @eagami/ui v5.0.0.

### Fixed

- Make the drawer demo's title and body follow the selected position instead of always reading "Right".

## [3.6.0] - 2026-07-01

### Added

- Add a live theme customizer to the UI landing page that restyles the showcase and its toasts as you adjust the brand color, corner radius, and font.
- Show the date picker, multi-select, and breadcrumbs in the component showcase.

### Fixed

- Fix right-to-left layout on the UI docs pages: the sidebar mirrors correctly, the expand caret points the right way, and code snippets no longer mirror.

## [3.5.0] - 2026-06-30

### Added

- Add Arabic, Hebrew, and Hindi, with the interface switching to right-to-left for Arabic and Hebrew.

### Changed

- Cap the language menu height so it scrolls rather than overflowing.
- Pick up @eagami/ui v4.8.0.

## [3.4.3] - 2026-06-30

### Added

- Add an LTR/RTL toggle to every component demo and the internationalization page for previewing right-to-left.

### Changed

- Pick up @eagami/ui v4.7.0.

## [3.4.2] - 2026-06-27

### Changed

- Feature the new `ng add @eagami/ui` one-command setup on the Setup page.
- Pick up @eagami/ui v4.6.0.

## [3.4.1] - 2026-06-26

### Changed

- Pick up @eagami/ui v4.5.1.

### Fixed

- Show all twelve languages in the locale menu without scrolling.

## [3.4.0] - 2026-06-25

### Added

- Translate the site into Ukrainian and Russian and add them to the language switcher.

### Changed

- Pick up @eagami/ui v4.5.0.

## [3.3.3] - 2026-06-24

### Changed

- Pick up @eagami/ui v4.4.0.

## [3.3.2] - 2026-06-24

### Changed

- Pick up @eagami/ui v4.3.1.

## [3.3.1] - 2026-06-22

### Changed

- Pick up @eagami/ui v4.3.0 and document its new icons and data-table clickable rows.

## [3.3.0] - 2026-06-22

### Added

- Showcase a wall of live, interactive components on the UI landing page.
- Document the complete set of overridable surface, state, and border color tokens on the design tokens page.
- Expand the internationalization live demo with more components whose built-in text is localized.

### Changed

- Pick up @eagami/ui v4.2.0.

## [3.2.4] - 2026-06-20

### Changed

- Reformat the i18n locale chips so the native language name leads and the locale code follows in muted parentheses.

### Fixed

- Correct the localization feature card to reflect that built-in text ships in ten languages.

## [3.2.3] - 2026-06-20

### Changed

- Pick up @eagami/ui v4.1.0.

## [3.2.2] - 2026-06-20

### Added

- Add a changelog page that surfaces the library's release history and links to the migration guide.
- Document each composite component's public sub-components (such as `<ea-radio-group>` and `<ea-menu-item>`) in its API reference.

### Changed

- Pick up @eagami/ui v4.0.0 and register all locales for the language switcher.

## [3.2.1] - 2026-06-20

### Changed

- Pick up @eagami/ui v3.2.1.

## [3.2.0] - 2026-06-20

### Added

- Add a keyboard-navigation toggle to the data table demo so the new grid navigation can be tried out interactively.

### Changed

- Pick up @eagami/ui v3.2.0.

## [3.1.1] - 2026-06-19

### Fixed

- Stop the breadcrumbs component demo from navigating to placeholder URLs when its items are clicked.

### Changed

- Pick up @eagami/ui v3.1.1.

## [3.1.0] - 2026-06-14

### Added

- Add a live validation control to every form component's playground so the localized error messages can be tried out interactively and switched between languages.

### Changed

- Document the `errorMessages` input on each form component's API reference.
- Pick up @eagami/ui v3.1.0.

## [3.0.0] - 2026-06-13

### Added

- Add German, Brazilian Portuguese, Mandarin Chinese, Icelandic, and Dutch to the language switcher.

### Changed

- Refine the component demo pages with clearer triggers, labels, and defaults, and localize the new demo copy.
- Pick up @eagami/ui v3.0.0.

### Fixed

- Show every language in the locale switcher and align the menu to the trigger's right edge so it no longer clips the last entries.
- Reinstate the transfer list's source and target label defaults in the controls when a label field is cleared.
- Wrap each attribute onto its own line in the generated code snippet for directive-based components such as the tooltip.

## [2.12.0] - 2026-06-10

### Changed

- Rebuild the remaining component pages (dropdown, multi-select, segmented, file uploader, time picker, drawer, popover, menu, tabs, stepper, breadcrumbs, transfer list, tree, virtual list, tooltip, and toast) as interactive playgrounds, so every component now has a consistent playground demo.
- Pick up @eagami/ui v2.12.0.

## [2.11.0] - 2026-06-09

### Changed

- Add a label control to the button playground and show a success toast when the button is clicked.
- Keep the code-input demo centered, scroll it horizontally when its cells outgrow the card, reserve room so a focused cell's ring is not clipped, and cap the placeholder to the code length.
- Rebuild the command palette, data table, date picker, and dialog pages as interactive playgrounds.
- Pick up @eagami/ui v2.11.0.

## [2.10.0] - 2026-06-08

### Changed

- Rebuild the accordion, autocomplete, and avatar-editor pages as interactive playgrounds, with inline add, remove, and edit controls for the accordion items and autocomplete options.
- Shorten the autocomplete demo's option list and give the avatar-editor canvas size sensible bounds.
- Update playground number fields only when you click away or press Enter, and show each field's allowed range, so the preview no longer flickers through invalid values while typing.
- Add API reference descriptions for every component's inputs, outputs, and methods, translated across all locales.
- Pick up @eagami/ui v2.10.0.

## [2.9.0] - 2026-06-08

### Changed

- Pick up @eagami/ui v2.9.0, tightening every playground number control (narrower fields, no scroll-wheel value changes, no `e`).
- Add sensible bounds to the playground number controls (e.g. sliders capped at ±1,000, wordmark size floored at 10px).
- Pick the wordmark variant from named values and label its size control in px.
- Surface the new slider and range-slider thousands-separator toggle in their playgrounds.
- Default the color-picker playground to the new `all` format.

## [2.8.0] - 2026-06-07

### Added

- Surface the new `<ea-button>` icon, `<ea-divider>` thickness, and `<ea-empty-state>` icon and bordered controls in their component playgrounds.

### Changed

- Pick up @eagami/ui v2.8.0, including the full `xs`-`xl` size range across components.

### Fixed

- Center the skeleton preview in the component playground, cap its height, and scroll when its set width or height exceeds the preview.

## [2.7.0] - 2026-06-06

### Added

- Rebuild the simple component pages as interactive playgrounds, matching the Input page: a live instance driven by controls, a generated code snippet for the current configuration, and a localized API reference of each component's inputs, outputs, and methods.

### Changed

- Pick up @eagami/ui v2.7.0.

## [2.6.0] - 2026-06-05

### Added

- Rebuild the Input component page as an interactive playground: a single live instance driven by controls, a generated code snippet for the current configuration, and a localized API reference of its inputs, outputs, and methods.

### Changed

- Pick up @eagami/ui v2.6.0.

## [2.5.3] - 2026-06-04

### Changed

- Update dependencies to their latest compatible releases and pick up @eagami/ui v2.5.3.

### Fixed

- Resolve a moderate-severity security advisory.

## [2.5.2] - 2026-05-31

### Changed

- Pick up @eagami/ui v2.5.2.

## [2.5.1] - 2026-05-29

### Changed

- Pick up @eagami/ui v2.5.1.
- Rework the Motion section of `/ui/design-tokens` into animated duration lanes and cubic-bezier easing curve plots, responsive down to mobile.
- Compact the Spacing, Sizes, and semantic-colour lists on `/ui/design-tokens` into tight rows instead of full-width cards.
- Stage the dark-mode drop-shadow swatches on a lifted surface so the elevation levels stay distinguishable.
- Improve token reference readability: higher-contrast values, larger sub-labels, and wrapping for long inline code.

## [2.5.0] - 2026-05-29

### Changed

- Pick up @eagami/ui v2.5.0.
- Tighten source comments across the site to a stricter house style.

## [2.4.0] - 2026-05-28

### Added

- Document the new `--shadow-bevel` / `--shadow-well` token pair and the `--text-section-heading-*` composite on `/ui/design-tokens`.
- Add a wrapping section to the `<ea-segmented>` demo showing a twelve-option control reflow onto multiple rows.

### Changed

- Pick up @eagami/ui v2.4.0.
- Route the design-principle ring's 3D shadows through `--shadow-bevel` / `--shadow-well` and the `<h2>` section headings through `--text-section-heading-*`, replacing hand-rolled rgba and 22px values.
- Cap the `/ui` sidebar at 50dvh on mobile and split it into two independently-scrolling regions (primary nav + components list) so neither dominates the viewport when components is expanded.
- Bump every 13px text block to 14px and every 15px text block to 16px to align with the type scale; the iOS-Safari zoom-on-focus issue is incidentally avoided on the icons search field now that it sits at 16px.

### Fixed

- Replace the brief "Redirecting…" interstitial at `/ui/components` with a Vercel-level 308 redirect, so direct visits land on the first component without flashing the meta-refresh placeholder.

## [2.3.0] - 2026-05-28

### Added

- Document the `provideEagamiUi({ palette })` brand-palette derivation pipeline on the `/ui/design-tokens` page, including the OKLCH workflow, per-shade overrides, role remapping, and the WCAG 2.1 AA bootstrap assertion.
- Surface the new `--color-bg-canvas`, `--color-bg-stripe`, `--color-border-subtle`, and `--color-brand-text` semantic swatches in the design tokens reference.

### Changed

- Pick up @eagami/ui v2.3.0.
- Refresh the design principles on `/ui` as a responsive card grid (three columns wide, two below 1200px, one below 700px), each card pairing a 3D gray ring + green checkmark with the principle title and body. Trailing periods on the six principle titles removed.

## [2.2.0] - 2026-05-25

### Added

- Document the new `<ea-command-palette>` component on the `/ui/components/command-palette` page. A page-scoped `Ctrl/Cmd + K` listener opens the palette, and selecting any command fires a confirmation toast. Demo strings (command labels, descriptions, group headings, the trigger button, and the executed-toast message) translated across the five locales.
- Document the new `<ea-virtual-list>` component on the `/ui/components/virtual-list` page, with a default 10,000-row scroll demo (showing a live "row X of Y" position indicator wired to `scrollIndexChange`) and a compact-density variant. Demo strings translated across the five locales.
- Document the new `<ea-transfer-list>` component on the `/ui/components/transfer-list` page, with demos covering the default state, an initial-selection variant, a disabled-item variant (a sticky pre-assigned owner), three sizes, and the disabled state. Demo strings (role names and pane labels) translated across the five locales.
- Document the new `<ea-tree>` component on the `/ui/components/tree` page, with demos covering the default collapsed file tree, a selection-driven auto-expand, three sizes, an org-chart variant with a disabled node, and the disabled state. New `with selection` section heading translated across the five locales.

### Changed

- Pick up @eagami/ui v2.2.0.
- Restructure the components page so each `<ea-*>` lives on its own per-component route (`/ui/components/<slug>`) under a shared layout, instead of a single switch over the slug. URL surface is unchanged.

## [2.1.0] - 2026-05-24

### Added

- Document the new `<ea-file-uploader>` component on the `/ui/components/file-uploader` page, with demos covering the default multi-file dropzone, accept / maxSize / maxFiles constraints, single-file mode, three sizes, hint / error states, a custom-icon variant (swapping the default cloud icon for a paperclip via the new `icon` content slot), and the disabled state. All new section headings and demo strings are translated across the five locales.
- Document the new `<ea-rating>` component on the `/ui/components/rating` page, with demos covering the default 5-star rating, half-step granularity, three sizes, read-only mode, hint / error states, a 10-star scale, a custom-icon variant (hearts via the `icon` / `icon-fill` slots), and the disabled state. All new section headings and demo strings are translated across the five locales.

### Changed

- Mention the new icon `[strokeWidth]` input on the `/ui/icons` page lede (translated across all five locales).
- Remove the vertical divider between the search input and the category checkboxes on the `/ui/icons` filter card.

## [2.0.0] - 2026-05-23

### Added

- Document the new components on the `/ui/components` page (`popover`, `multi-select`, `range-slider`, `time-picker`, `stepper`).
- Expand variation coverage on existing component demos to mirror Storybook (canvas sizes for `avatar-editor`, many-levels and disabled-item for `breadcrumbs`, output formats and no-alpha for `color-picker`, Sunday-start for `date-picker`, two-actions and sizes for `empty-state`, custom-label for `spinner`, with-maxlength for `textarea`, custom size and not-animated for `skeleton`, stepped for `slider`, and more). All new section headings are translated across the five locales.
- Demo the new `<ea-badge>` `shape` input on the `/ui/components/badge` page. A "shapes" row compares `pill` and `pin` at the default variant and `md` size with both single- and double-digit content, illustrating that pin stays a perfect circle for single characters and only widens into a pill once content forces it. A new `shapes` section heading is translated across all five locales.

### Changed

- Pick up @eagami/ui v2.0.0, which removes the deprecated `<ea-icon-apple>` and `<ea-icon-pencil>` icons. The "edit" menu demo on the components page now uses `<ea-icon-edit-2>` directly.
- Replace the bespoke inline-code styling repeated across the home page, `/ui` index, setup, i18n, components, tokens, and icons pages with a single `code-chip` mixin (sourcing the new `--text-code-*` tokens from @eagami/ui v2.0.0). Visual output is consistent across pages and themable through one set of CSS variables; per-page `<code>` rules collapse from ~7 lines each to a one-line `@include`.

### Fixed

- Drop the explicit `placement="bottom-end"` override on the header locale-switcher menu so it uses the library default (`bottom-start`) with viewport-aware cross-axis clamping.

## [1.5.0] - 2026-05-20

### Added

- Pick up @eagami/ui v1.5.0, which introduces `<ea-color-picker>`. The new component ships with its own page on the `/ui/components` route, demoing the basic picker, hint/error states, output format variants (`hex`/`rgb`/`hsl`), opaque-only mode, and all three sizes.

## [1.4.1] - 2026-05-20

### Changed

- Reword the home page Services note to describe Eagami UI as "a custom component library and design system" (translated across all five locales).

## [1.4.0] - 2026-05-20

### Added

- Pick up @eagami/ui v1.4.0, which adds 11 new icons (`bottle`, `candle`, `circle`, `heptagon`, `hexagon`, `lamp`, `pentagon`, `rectangle-horizontal`, `rectangle-vertical`, `soccer-ball`, `trophy`) and closes coverage of the upstream Feather Icons set: 39 previously-missing Feather icons (arrows, chevrons, weather, phone variants, etc.) plus second-variant Feather-outline versions (`<brand>-2`) of every brand mark that ships as a filled brand-coloured icon. Categorization on the page is now invariant: every icon is exactly one of `feather` or `eagami`, with `brand` as an orthogonal tag. Total visible on `/ui/icons`: 326 (the deprecated `pencil` alias is hidden).
- Add a sticky search-and-filter card to `/ui/icons`. Typing matches against a multilingual tag list per icon (English plus French, Spanish, Greek, and Polish equivalents), so a French user can find `cœur` for `heart`, a Polish user can find `wiadomość` for the message icons, and so on. Diacritics are normalized on both sides of the match, the input is capped at 64 characters, and an empty-result state shows a localized "no icons match your search" message. The card sits as a rounded, drop-shadowed panel below the app header so it reads as its own UI rather than a header extension. Stickiness is scoped to the icon-grid section so the card releases before the brand-icons reference section.
- Add three category checkboxes (Feather, Eagami UI, Brand), built with `<ea-checkbox>` from the library, to the filter card. Each carries its running count in dimmer secondary text, and hovering the row tints both the label and the count for clear interactive affordance. Combined with the text filter, they let a reader narrow to e.g. "all Eagami UI shapes" in one click. Categories live on each icon as a typed `categories: IconCategory[]` field so an icon can belong to more than one group (e.g. the `eagami` brand mark counts as both `eagami` and `brand`).
- Show a running total below the input (`279 icons` when unfiltered, `42 of 279 icons` when narrowed), localized in all five locales and announced via `aria-live="polite"` so screen readers pick up the new total as the user types.
- Tag audio-control icons (play, pause, skip-forward, headphones, volume, etc.) with `music` / `audio` so a user can collect the whole group with one query. Other family tags (`shape` on all basic shapes) round out the multilingual coverage.

### Changed

- Reword the `/ui/icons` lede to acknowledge that not every icon is Feather-derived (the household, brand and Eagami UI originals are not), and restore inline links on Feather Icons, Cole Bemis, and the MIT License. Switching the lede to a single localized HTML string also fixes the awkward whitespace around `<code>font-size</code>`.
- Override the icon display name for slugs whose canonical casing doesn't match the default `slug → Title Case` (e.g. `github → GitHub`, `youtube → YouTube`, `linkedin → LinkedIn`, `npm → npm`, `rss → RSS`, `cpu → CPU`, `tv → TV`, `mongodb → MongoDB`, `codepen → CodePen`, `codesandbox → CodeSandbox`, `paypal → PayPal`, `x-twitter → X (Twitter)`).
- Sort the `/ui/icons` grid in slug order so a base icon (`github`) always precedes its `-2` brand variant (`github-2`).

## [1.3.0] - 2026-05-17

### Added

- Translate the entire site into five locales (English, French, Greek, Polish, Spanish). Every page (Home, UI Overview, UI Setup, UI Design tokens, UI Icons, UI Internationalization, UI Components, 404) plus the header, footer, theme toggle, and 404 page now reads in the active language, and the active locale also drives every embedded `@eagami/ui` component (date picker, paginator, etc.) through `EagamiI18nService`.
- Add a globe icon and locale dropdown to the app header. Switching language updates the UI immediately and persists across reloads (same pattern as the dark-mode toggle), and the `<html lang>` attribute updates so assistive tech and search engines pick up the right language.

### Changed

- Pick up @eagami/ui v1.3.0, which expands the icon set from 100 to 268 icons. The Icons documentation page now lists every Feather icon plus a coloured brand-icon set, with links to each brand's official guidelines.
- Run the dev server on port 4444 by default (set in `angular.json`), avoiding collisions with other Angular dev servers on the default 4200.
- Replace the CSS-only `[data-tooltip]` pattern used on header links and toggles with the library's `[eaTooltip]` directive so every tooltip benefits from the directive's viewport clamping and re-positions cleanly when the page reflows under it.

### Fixed

- Eliminate the theme and locale flash on reload. The inline `<head>` bootstrap script now resolves theme and locale (auto-detecting from `prefers-color-scheme` and `navigator.languages` when nothing is stored), then sets `data-theme` and `<html lang>` before any paint. For locales other than the prerendered English, the body is held with `visibility: hidden` until `AppComponent`'s `ApplicationRef.isStable` callback fires — waiting on full app stability rather than just the first render lets Angular's hydration reconciliation finish swapping the English strings out for the active locale's strings before the gate lifts.
- Inset the focus ring on the `/ui` sidebar so it no longer gets clipped on the right and bottom edges by neighbouring grid cells and the sticky scroll context.
- Polish: change the UI overview "Zacznij" link from "Instalacja" (nominative) to "Instalacji" (genitive) so "Przejdź do Instalacji" reads naturally, and route every locale's `getStartedAfter` through the same whitespace-suppressed template so the comma in the Polish phrase no longer renders with a leading space.

### Changed

- Remove the GitHub link from the app header. It was duplicated in the footer; the footer is the canonical home for repository / npm links. Footer npm and GitHub links now carry tooltips ("View @eagami/ui on npm", "View source on GitHub", localised).
- Refresh the "Ongoing maintenance" service description: "Monthly upkeep covering hosting, security patches, dependency upgrades, content edits, and analytics reviews." Sharper verbs throughout ("patches" for unambiguous security fixes, "dependency upgrades" for "third-party package upgrades", "edits" for "revisions", "analytics reviews" to clarify the work is reviewing analytics, not setting them up). Translated to all five locales.

### Added

- Auto-detect the user's preferred theme and locale on first visit. Theme falls back to the OS preference (`prefers-color-scheme: dark` → dark mode), and locale picks the first match in `navigator.languages` (exact, then language-only — `fr-CA` resolves to `fr-FR`, `es-MX` to `es-ES`, etc.). Explicit choices through the toggle and locale switcher still win and persist as before.

## [1.2.0] - 2026-05-16

### Added

- Add a copy-to-clipboard button to every code snippet across the `/ui` documentation pages, with a tooltip and a success toast on click.

### Changed

- Pick up @eagami/ui v1.2.1.
- Refresh the `/ui` documentation pages with tighter copy, clearer structure, and a numbered three-step Setup flow.

### Fixed

- Improve dark-mode tooltip contrast so tooltips no longer blend into the surface beneath them.
- Show a clear disabled state on the design-tokens _Simulate_ button while a simulation is running.

## [1.1.0] - 2026-05-16

### Added

- Add an Internationalization page under `/ui/i18n` documenting @eagami/ui's new locale support (English, French, Greek, Polish, Spanish), with a live switcher so Alert, DatePicker, Dropdown, and Paginator pick up the active locale's strings and date formatting in real time.

### Changed

- Upgrade @eagami/ui from 1.1.1 to 1.2.0 and wire `provideEagamiUi()` into the app config so every library component honors the active locale.

### Fixed

- Fully eliminate the dark-mode reload flash. The previous pass darkened the page background immediately, but the home-hero still painted in its light-mode tint for a beat while the main stylesheet caught up. The hero now lands in the correct theme on the first paint.

## [1.0.9] - 2026-05-14

### Fixed

- Give the home-page Toolkit section an anchor so links and the scroll-spy URL sync can target it like the other sections.
- Drop the home-hero type block's leftward tuck on mobile, where the heron stacks above it and there's no longer anything to tuck under.
- Keep the home-hero heron at full size between the medium and large breakpoints instead of scaling it down.

## [1.0.8] - 2026-05-14

### Changed

- Update the Open Graph social-share card artwork.
- Overlap the home-hero type block with the heron so the bird's beak sits just above the _eagami_ wordmark.

### Fixed

- Sync the URL anchor to the home-page section currently in view while scrolling, so refreshing the page restores your place instead of jumping back to whatever section you originally clicked.
- Eliminate the jarring white flash when reloading the site in dark mode — the page now paints its dark background from the very first frame.

## [1.0.7] - 2026-05-14

### Changed

- Replace the giant centered-logo social-share preview with a purpose-built 1200×630 Open Graph card (brand-gradient backdrop, heron mark on the left, _eagami_ wordmark + _elegant web design_ tagline on the right), and switch the Twitter card to `summary_large_image` so WhatsApp, LinkedIn, Slack, Discord, and Twitter all render the new image as a designed card rather than a cropped square logo.
- Announce contact-form send-success and send-failure to screen readers via live regions, validate the email field's format inline once the user blurs it, and add the missing `Validators.email` + `autocomplete="email"`.
- Deepen `--color-text-tertiary` in light mode from neutral-400 to neutral-500 so eyebrow labels, the footer copyright, and the icon-grid captions clear the WCAG AA 4.5:1 contrast floor against white.
- Lift the dark-mode hero secondary link to neutral-50 / neutral-0 so it stays ≥ 4.5:1 against every phase of the hero's flutter-gradient.
- Restate the home Services _Features_ row as a styled eyebrow label rather than a heading and promote each add-on title to h3, fixing the broken h2 → h3 → h4 heading order screen readers were navigating through.
- Hide the hero scroll-indicator chevron, the decorative bird icon, and the wordmark sheen duplicate from assistive tech, and label the hero region by the wordmark so screen-reader landmark lists name it correctly.
- Announce screen-reader-only status text whenever the _Recent projects_ carousel advances, and support left/right arrow keys when the carousel viewport is focused.

### Fixed

- Honor `prefers-reduced-motion` on the contact-form placeholder typewriter (now rotates slowly through full hints with no cursor), the Recent-projects carousel slide transition, and the design-token motion _Simulate_ button (which now becomes disabled rather than animating against the user's setting).
- Stop the project-card focus ring from being clipped by the carousel's `overflow: hidden` viewport — focus now paints inside the card via an inset ring.
- Restore a visible focus ring on `<main>` when the skip-link sends focus there; previously `outline: none` swallowed the indication.
- Set decorative project-card logos to `alt=""` so screen readers don't read the project name twice in a row.
- Add `role="list"` to every `list-style: none` list across the site so VoiceOver on Safari stops silently dropping them from the list rotor.
- Add an accessible name to the `/ui` documentation sidebar, hide its decorative chevron caret from screen readers, and make the sidebar's scrollable region itself focusable via the keyboard.
- Add `aria-pressed` to the header theme toggle and `aria-controls` / `aria-pressed` to the tokens _Simulate_ button so screen readers convey their toggled state.

## [1.0.6] - 2026-05-14

### Added

- Pulsing chevron-down indicator near the bottom of the hero (anchored to _Services_) so it's immediately obvious there's more content below the fold; hidden on landscape phones and disabled under `prefers-reduced-motion`.

### Changed

- Move the _Recent projects_ section below _Toolkit_ so the home page flows pitch → showcase → proof → contact, and re-alternate every section's background so no two neighboring sections share the same shade.
- Deepen the _subtle_ surface shade in light mode (now neutral-100 rather than the near-invisible neutral-50) so the gray sections, project cards, and service cards read with a clear contrast against the white sections.

### Fixed

- Eliminate the flash of black text on first paint by inlining critical theme-aware background and text colors in the document head, so the page renders in the correct light or dark palette before the main stylesheet loads.
- Preload the DM Sans italic latin subset so the hero tagline renders in its real italic on first paint instead of briefly flickering through a synthesized Arial fallback.
- Extend the _eagami_ wordmark sheen's painted area past the parent line-box so the gradient now sweeps all the way through the descender of the _g_ instead of getting clipped a few pixels short.
- Tighten the home contact section's height to `100dvh − header − footer` so jumping to `#contact` lands the _Got a project in mind?_ heading at the top of the viewport without leaving an awkward empty band between the form and the footer.

## [1.0.5] - 2026-05-13

### Changed

- Swap the placeholder origami-heron logo for the new polygonal heron mark across favicons, social link previews, the PWA install icon, and the Windows tile.
- Tighten meta descriptions to "Elegant web design" so social link previews stop showing the outdated "Freelance web design and development" line.
- Self-host DM Sans and Syne (as variable woff2) and preload the critical latin subsets so first-load typography no longer shifts as the web fonts swap in.
- Inline a 1.3 KB subset of Syne containing only the home-hero wordmark's five glyphs so the brand mark renders in its real typeface on first paint with no network round-trip and no swap.

### Fixed

- Bring the Windows tile color and Android PWA chrome color in line with the design system's brand token so the installed app's URL bar and tile match the rest of the eagami palette.

## [1.0.4] - 2026-05-12

### Added

- Dedicated 404 _Page not found_ page so unknown URLs no longer silently redirect to home.
- Skip-to-main-content link at the top of every page for keyboard users.
- Open Graph image, Twitter Card, and canonical link meta tags so the site previews cleanly when shared in Slack, LinkedIn, X, and search results.

### Changed

- Rename the home page work section from _Selected work_ to _Recent projects_ and tighten its lede to "A few sites in active development."; update the hero CTA to "See recent projects" and refresh the page meta description to match.
- Lift the carousel project cards off the _Recent projects_ section by giving them a slightly subtler background in both light and dark mode.
- Brand the installed-PWA toolbar color and Windows tile color with the eagami primary blue instead of plain white.
- Expand sitemap.xml to list every routable page (the `/ui` landing, setup, design-tokens, icons, and each component playground).
- Shift the icon cards on `/ui/icons` to sit one shade lighter than the page in dark mode (`bg-subtle` over `bg-base`) so they no longer blend into the page surface while remaining distinct from the click-to-copy tooltip.
- Anchor the click-to-copy tooltip below each card on `/ui/icons` so the icon glyph stays unobscured while hovering.

## [1.0.3] - 2026-05-12

### Added

- Cycle three example messages through the contact form textarea with a typewriter effect (45 ms per character, 2.5 s hold, then a hard clear) so the placeholder primes first-time senders on what to write.
- Hide the header brand (eagami bird + wordmark) while at the top of the home page and fade it in over 1.5 s when you scroll down or navigate to another page; the brand snaps back out instantly when you scroll the home page back to the top. Honors `prefers-reduced-motion`.

### Changed

- Drop em-dashes from the `/ui/icons` and `/ui/design-tokens` intro paragraphs in favor of colons or rephrased connectives.
- Refresh the Services section to drop technical jargon: rename _SaaS control plane_ to _User management_ and _Internationalization_ to _Multilingual support_, change "from a single landing page to a full SaaS" to "...to a full web app", broaden Stripe payments to mention other providers on request, and tighten the maintenance, analytics, and email-notifications descriptions.
- Rewrite the contact-section lede ("Send a message using the form below") and inline success message ("Thanks for the message. You'll hear back soon") to drop the em-dashes and the explicit reply-time promise; the post-submit toast becomes a terse "Message sent".
- Lighten the dark-mode "Get in touch" CTA so the button reads as more clearly brand-coloured against the deep hero and contact backgrounds, with a softer hover delta.
- Sit the icon cards on `/ui/icons` flush with the page background in dark mode, defining them via their border so the tooltip still lifts off on hover.
- Enlarge the header eagami bird from 28 px to 31 px and tighten the spacing between the bird and the wordmark.
- Render the Tooltip page header as `[eaTooltip]` instead of `<ea-tooltip />` to reflect that the tooltip is a directive applied via attribute, not a component element.

### Fixed

- Stretch the home page contact section to fill the desktop viewport (minus the sticky header) so jumping to `#contact` no longer leaves a sliver of the previous section's _Explore the toolkit_ button visible at the top.
- Correct the _At a glance_ count on the `/ui` Overview from 51 icons to the actual 100 icons shipped with `@eagami/ui`.

## [1.0.2] - 2026-05-12

### Changed

- Shrink `/ui` page titles from 36 px to 32 px and lede paragraph copy from 18 px to 16 px across Overview, Setup, Design tokens, Icons, and individual component pages.
- Color the inline `@eagami/ui` mentions on the Icons and Design tokens page intros as links (matching the Overview convention) so the npm package reference reads as clickable.
- Tune the home hero for short landscape viewports so the heron, wordmark, and tagline scale down together: the bird now stays visibly larger than the type instead of shrinking to a token glyph beside oversized text.

### Fixed

- Untangle the inline `@eagami/ui` link in the Icons page intro so the link tag, its `<code>` content, and the closing tag each sit on their own line instead of being jammed onto the last attribute line by Prettier's strict whitespace mode.
- Darken the icon cards on `/ui/icons` from `--color-bg-muted` to `--color-bg-subtle` so the selector tooltip's background lifts off the card surface in dark mode (the previous `bg-muted` value resolved to the same `neutral-700` shade as the dark-mode tooltip override, making the two surfaces blend).

## [1.0.1] - 2026-05-12

### Added

- Surface the missing _Tooltip_ entry in the `/ui` Components sidebar (the playground demo at `/ui/components/tooltip` existed all along but was unreachable from navigation).

### Changed

- Gate the Tooltip playground demo on touch devices: show an explanatory `<ea-alert>` and mark each position button as disabled (reactive to runtime `(hover: hover)` changes so DevTools mobile toggling and Bluetooth peripherals are handled). Re-center the 2×2 button cluster in the card with `max-content` columns so it stays anchored on any viewport.

### Fixed

- Lift the `@eagami/ui` tooltip background off elevated cards in dark mode by shifting it one shade lighter (`--color-neutral-700`); previously both surfaces resolved to the same `--color-neutral-800` value, making the tooltip blend into the card it floated above.

## [1.0.0] - 2026-05-12

### Added

- Animate the hero `eagami` wordmark with a slow diagonal sheen that sweeps across the letters every 8 seconds (`prefers-reduced-motion` honored).
- Click any icon card on the `/ui/icons` page to copy its `ea-icon-*` selector to the clipboard, with success and failure toasts.

### Changed

- Tidy the Toolkit showcase labels: rename Skeletons to _Loading skeletons_ and reorder it above Tags, and rename the Services _Add-ons_ subsection to _Features_.
- Expand the Toolkit master checkbox to toggle all three left checkboxes together (including the disabled-but-checked one), with refined per-checkbox toast text.
- Tune the home hero for short landscape viewports (phones rotated sideways): switch back to a side-by-side icon-and-text layout, drop the full-viewport-height floor, and scale the heron icon off `vh` so it fits the available height without overflow.
- Rebuild the `/ui/icons` page: list 100 `@eagami/ui` icons alphabetically in a single grid (categories removed, brand-only _Apple_ icon dropped), render icons at 24 × 24 px on hover-distinct cards, and credit Feather Icons / Cole Bemis (MIT) in the intro.
- Refine the `/ui` sidebar Components disclosure: move the caret to sit after the _Components_ label, and treat clicking _Components_ as a page link — expand the children and jump to the first one (_Accordion_) when the user isn't already viewing a component.
- Link the `@eagami/ui` mention in the `/ui/icons` and `/ui/design-tokens` page intros to the npm package, matching the convention used in the home Toolkit and Overview sections.

### Fixed

- Stop the Toolkit master checkbox from showing the indeterminate state when all three left checkboxes are unchecked.
- Prevent the notch and curved corners on iPhones in edge-to-edge mode from clipping content in the header, hero, page sections, and footer by respecting iOS safe-area insets.
- Suppress header icon tooltips on touch-only devices so a tap no longer latches the tooltip open until the user taps somewhere else.
- Hide the `@eagami/ui` tooltip on touch-only devices too, so tapping an icon card on `/ui/icons` no longer leaves its selector tooltip stuck on screen.
- Stop the trailing space after inline links (e.g. _Feather Icons_ and _Cole Bemis_ on the Icons page) from being underlined on hover.
- Span the paginator's top-border divider across the full width of the data-table playground demo, even when the paginator's controls wrap to multiple lines.

## [0.8.0] - 2026-05-11

### Changed

- Reduce home-page section heading sizes so the Syne brand font reads as a section header instead of competing with the hero wordmark.
- Shrink `/ui` page headings from 48 px to 36 px across Overview, Setup, Design tokens, and Icons for a consistent docs heading scale.
- Tighten the home-hero type stack by halving the gap between wordmark, tagline, and actions.
- Rebuild the Toolkit section as a live `@eagami/ui` component medley with labelled rows for buttons, progress bars, sliders (with a live value badge), tags, spinners, switches, skeletons, radio buttons, and a master/child checkbox group — each interactive control firing an info toast on use to make the demos feel live.
- Add a _See all components →_ link below the showcase pointing at `/ui/components/accordion`, rename the section CTA from _Browse the components_ to _Explore the toolkit_, and trim the trailing bullets to three short points.
- Link the `@eagami/ui` code reference in both the home Toolkit lede and the `/ui` Overview lede to the npm package, opening in a new tab.
- Give add-on service items a thin brand-gradient accent bar to break up the Services section without overpowering the copy.

## [0.7.0] - 2026-05-11

### Changed

- Rework the home page typography on mobile: section headings (Selected work, Services, Got a project in mind?) now scale down to a more natural size on small viewports, and section ledes, card titles, and descriptions follow suit.
- Reduce section, card, and service-item padding on mobile so content uses the available width more efficiently.
- Flatten the `/ui` sidebar: Overview, Setup, Design tokens, and Icons are now top-level links. Components sits at the same level with a chevron toggle and expands to reveal the full component list (auto-expands on `/ui/components/*` routes).
- Rewrite the `/ui` Overview as a landing page with _At a glance_, _Design principles_, and _How to start_ sections, instead of two link cards.
- Rename _Setup guide_ to _Setup_ for consistency with the rest of the sidebar.
- Rename the design-tokens route from `/ui/tokens` to `/ui/design-tokens` for consistency with the sidebar label.
- Redesign the Icons page: render each icon at 32 × 32 px in title-case-labelled cards, organised into Branding, Arrows & chevrons, Status & feedback, Actions, and Objects & content. Each card shows its selector (`ea-icon-…`) in a tooltip on hover or focus.
- Contact form's _Send message_ button only requires the three fields to be non-empty; format and length validation no longer block submission. Failure surfacing now uses the red error toast variant so it matches the inline error message color.

### Fixed

- Selected-work carousel no longer renders cards so narrow that titles like _London Chess_ wrap on every word. Cards drop to a single full-width card below 800 px, two cards below 1000 px, and three cards above.
- Carousel previous / next arrows are now always visible — they previously disappeared below 500 px, making the carousel unnavigable on phones.
- Inline links on the Overview no longer underline the trailing space after the link text; the underline now sits cleanly under the link label only.
- _Get in touch_ and _See selected work_ anchor links now scroll the target section below the sticky header on every viewport, including mobile, by configuring the router's `ViewportScroller` with a live header-height offset.
- Sidebar divider line now extends the full page height as a single 1 px line, independent of whether the sticky sidebar has reached its end.
- Sweep every component template to remove leading / trailing whitespace inside inline tag content and convert the awkward `>Text</tag\n>` form to the standard text-on-its-own-line layout for multi-attribute tags.

## [0.6.0] - 2026-05-11

### Added

- New Icons section in the `/ui` documentation, sitting between Get started and Components, listing every `@eagami/ui` icon at 32 × 32 px in a simple flex layout grouped by purpose (branding, arrows, status, actions, communication, objects, navigation).

### Changed

- Contact form's _Send message_ button is now disabled until name, email, and message are all filled in (and the email is a valid address).
- Submitting the contact form now raises a success or warning toast in addition to the inline confirmation / error message.

## [0.5.0] - 2026-05-10

### Added

- Rebuild the home page as a marketing landing for the freelance practice: hero, selected work, services, a brief mention of the `@eagami/ui` toolkit, and a contact form.
- Wire the contact form to a Vercel serverless function at `/api/contact` that emails inquiries to `michal@eagami.com` via Resend (requires `RESEND_API_KEY` env var on Vercel).
- Add Chordbomb as the fourth project in the selected-work carousel.
- Cycling slide carousel for selected work — clicking the arrow buttons smoothly slides the cards by one position and loops indefinitely.
- Restructure the `/ui` documentation into Overview, Design tokens, and Setup guide, with the install + quick-start instructions promoted to a dedicated Setup guide page.
- Add a "Simulate" button to the Motion section of the design-tokens page that animates a small bar at each duration and easing token's exact value.

### Changed

- Site header is now translucent with a backdrop blur instead of a solid background and bottom border.
- Component playground cards no longer carry a redundant header label / divider — the page heading already names the component.
- Hero call-to-action hierarchy reworked: _Get in touch_ is now the primary filled button and _See selected work_ steps down to a secondary text link.
- Tighten the primary CTA hover behaviour — a stronger two-step contrast in light mode and a sub-shade blend in dark mode — and bring the contact form's _Send message_ button onto the same scheme so it shares base and hover colors with the hero _Get in touch_ CTA in both modes.
- Color swatches on the design-tokens page are wider so each `--color-*` token name fits on one line, and the shade label + token name now sit inside the colored rectangle.
- Elevation and shape preview captions now sit inside their cards instead of below them.
- Browser tab title is now simply _Eagami_ on the home page and _Eagami | UI_ across all `/ui` pages.
- Drop the local dark-mode shadow workaround now that `@eagami/ui` 1.0.2 ships proper white-at-low-alpha shadows.
- Bump `@eagami/ui` to 1.0.2, picking up dark-mode color fixes from the library.

### Fixed

- Site header now sticks to the top of the viewport correctly when scrolling.
- Hero in dark mode now resolves to the correct brand and gradient shades — fixes a view-encapsulation selector bug that was silently dropping every component-scoped dark-mode rule (hero, contact button, elevation surface).
- Page scroll resets to the top on every route navigation instead of preserving the previous position.
- Hero radial-gradient glow returns in dark mode in mid-tone brand shades, keeping the circular effect while leaving the hero text readable.
- _See selected work_ link is now legible in dark mode against the radial-gradient backdrop.
- Selected-work card edges are no longer clipped at the carousel column boundaries.
- Project logos render at consistent visual size; Chordbomb's viewBox is now tight to the bomb shape.
- CIRC Aesthetics inner _C_ renders in `#bea477` instead of being a transparent cutout.
- UI sidebar stays inside the docs region and no longer scrolls inside the viewport when the components list is long.

## [0.4.0] - 2026-05-09

### Added

- Build out interactive component playgrounds at `/ui/components/{slug}` for all 33 components, mirroring the design-system sandbox card pattern with header-labeled variant sections.
- Document the full design-token reference at `/ui/tokens` — color palettes (primary, secondary, neutral, status), semantic color, typography, spacing, elevation, shape, and motion — with visual swatches for every token.

### Changed

- Upgrade `@eagami/ui` from 0.12.0 to 1.0.0.

### Fixed

- Link rest-to-hover color delta is now visibly distinct in light mode, and links meet WCAG AA contrast in dark mode.
- Replace the library's invisible black-rgba shadow tokens with thin outline borders in dark mode so elevated surfaces (e.g. cards) remain visible until the upstream tokens are dark-mode-aware.

## [0.3.0] - 2026-05-09

### Added

- Build out the `/ui` documentation section with a sticky sidebar listing all 33 components alongside links to the introduction and design tokens reference.
- Document install instructions and a quick-start example on the new `/ui` introduction page.
- Scaffold per-component routes at `/ui/components/{slug}` for every component in the library (live demos and API tables to follow).
- Stub a `/ui/tokens` page for the upcoming design tokens reference.

## [0.2.0] - 2026-05-09

### Added

- Sticky site header with the eagami wordmark, navigation, GitHub link, and theme toggle.
- Minimal site footer with copyright and npm / GitHub links.
- Light / dark theme toggle that defaults to light, persists across visits, and updates the browser chrome's theme color to match.
- Helper tooltips on the header's UI link, GitHub link, and theme toggle, shown on hover and keyboard focus.

### Changed

- Redesign the home page with an asymmetric layout: a large heron illustration on the left, paired with the eagami wordmark set in Syne, an italic tagline, and a primary call-to-action button.
- Replace the home backdrop with three slowly drifting radial color washes (still honoring `prefers-reduced-motion`).
- Scale the home wordmark and heron fluidly on smaller viewports so the brand name no longer overflows on mobile.

## [0.1.0] - 2026-05-09

### Added

- Initial home page with the eagami wordmark, tagline, and a call-to-action linking to the component library.
- `/ui` landing page placeholder linking the `@eagami/ui` package on npm.
- Animated gradient backdrop on home and `/ui` using muted brand-palette colors, with automatic light / dark mode and `prefers-reduced-motion` opt-out.
- Theme-aware `theme-color` meta tag so the browser chrome matches the active color scheme.

[3.15.0]: https://github.com/mwiraszka/eagami/compare/website-v3.14.9...website-v3.15.0
[3.14.9]: https://github.com/mwiraszka/eagami/compare/website-v3.14.8...website-v3.14.9
[3.14.8]: https://github.com/mwiraszka/eagami/compare/website-v3.14.7...website-v3.14.8
[3.14.7]: https://github.com/mwiraszka/eagami/compare/website-v3.14.6...website-v3.14.7
[3.14.6]: https://github.com/mwiraszka/eagami/compare/website-v3.14.5...website-v3.14.6
[3.14.5]: https://github.com/mwiraszka/eagami/compare/website-v3.14.4...website-v3.14.5
[3.14.4]: https://github.com/mwiraszka/eagami/compare/website-v3.14.3...website-v3.14.4
[3.14.3]: https://github.com/mwiraszka/eagami/compare/website-v3.14.2...website-v3.14.3
[3.14.2]: https://github.com/mwiraszka/eagami/compare/website-v3.14.1...website-v3.14.2
[3.14.1]: https://github.com/mwiraszka/eagami/compare/website-v3.14.0...website-v3.14.1
[3.14.0]: https://github.com/mwiraszka/eagami/compare/website-v3.13.0...website-v3.14.0
[3.13.0]: https://github.com/mwiraszka/eagami/compare/website-v3.12.0...website-v3.13.0
[3.12.0]: https://github.com/mwiraszka/eagami/compare/website-v3.11.5...website-v3.12.0
[3.11.5]: https://github.com/mwiraszka/eagami/compare/website-v3.11.4...website-v3.11.5
[3.11.4]: https://github.com/mwiraszka/eagami/compare/website-v3.11.3...website-v3.11.4
[3.11.3]: https://github.com/mwiraszka/eagami/compare/website-v3.11.2...website-v3.11.3
[3.11.2]: https://github.com/mwiraszka/eagami/compare/website-v3.11.1...website-v3.11.2
[3.11.1]: https://github.com/mwiraszka/eagami/compare/website-v3.11.0...website-v3.11.1
[3.11.0]: https://github.com/mwiraszka/eagami/compare/website-v3.10.0...website-v3.11.0
[3.10.0]: https://github.com/mwiraszka/eagami/compare/website-v3.9.2...website-v3.10.0
[3.9.2]: https://github.com/mwiraszka/eagami/compare/website-v3.9.1...website-v3.9.2
[3.9.1]: https://github.com/mwiraszka/eagami/compare/website-v3.9.0...website-v3.9.1
[3.9.0]: https://github.com/mwiraszka/eagami/compare/website-v3.8.0...website-v3.9.0
[3.8.0]: https://github.com/mwiraszka/eagami/compare/website-v3.7.1...website-v3.8.0
[3.7.1]: https://github.com/mwiraszka/eagami/compare/website-v3.7.0...website-v3.7.1
[3.7.0]: https://github.com/mwiraszka/eagami/compare/website-v3.6.0...website-v3.7.0
[3.6.0]: https://github.com/mwiraszka/eagami/compare/website-v3.5.0...website-v3.6.0
[3.5.0]: https://github.com/mwiraszka/eagami/compare/website-v3.4.3...website-v3.5.0
[3.4.3]: https://github.com/mwiraszka/eagami/compare/website-v3.4.2...website-v3.4.3
[3.4.2]: https://github.com/mwiraszka/eagami/compare/website-v3.4.1...website-v3.4.2
[3.4.1]: https://github.com/mwiraszka/eagami/compare/website-v3.4.0...website-v3.4.1
[3.4.0]: https://github.com/mwiraszka/eagami/compare/website-v3.3.3...website-v3.4.0
[3.3.3]: https://github.com/mwiraszka/eagami/compare/website-v3.3.2...website-v3.3.3
[3.3.2]: https://github.com/mwiraszka/eagami/compare/website-v3.3.1...website-v3.3.2
[3.3.1]: https://github.com/mwiraszka/eagami/compare/website-v3.3.0...website-v3.3.1
[3.3.0]: https://github.com/mwiraszka/eagami/compare/website-v3.2.4...website-v3.3.0
[3.2.4]: https://github.com/mwiraszka/eagami/compare/website-v3.2.3...website-v3.2.4
[3.2.3]: https://github.com/mwiraszka/eagami/compare/website-v3.2.2...website-v3.2.3
[3.2.2]: https://github.com/mwiraszka/eagami/compare/website-v3.2.1...website-v3.2.2
[3.2.1]: https://github.com/mwiraszka/eagami/compare/website-v3.2.0...website-v3.2.1
[3.2.0]: https://github.com/mwiraszka/eagami/compare/website-v3.1.1...website-v3.2.0
[3.1.1]: https://github.com/mwiraszka/eagami/compare/website-v3.1.0...website-v3.1.1
[3.1.0]: https://github.com/mwiraszka/eagami/compare/website-v3.0.0...website-v3.1.0
[3.0.0]: https://github.com/mwiraszka/eagami/compare/website-v2.12.0...website-v3.0.0
[2.12.0]: https://github.com/mwiraszka/eagami/compare/website-v2.11.0...website-v2.12.0
[2.11.0]: https://github.com/mwiraszka/eagami/compare/website-v2.10.0...website-v2.11.0
[2.10.0]: https://github.com/mwiraszka/eagami/compare/website-v2.9.0...website-v2.10.0
[2.9.0]: https://github.com/mwiraszka/eagami/compare/website-v2.8.0...website-v2.9.0
[2.8.0]: https://github.com/mwiraszka/eagami/compare/website-v2.7.0...website-v2.8.0
[2.7.0]: https://github.com/mwiraszka/eagami/compare/website-v2.6.0...website-v2.7.0
[2.6.0]: https://github.com/mwiraszka/eagami/compare/website-v2.5.3...website-v2.6.0
[2.5.3]: https://github.com/mwiraszka/eagami/compare/website-v2.5.2...website-v2.5.3
[2.5.2]: https://github.com/mwiraszka/eagami/compare/website-v2.5.1...website-v2.5.2
[2.5.1]: https://github.com/mwiraszka/eagami/compare/website-v2.5.0...website-v2.5.1
[2.5.0]: https://github.com/mwiraszka/eagami/compare/website-v2.4.0...website-v2.5.0
[2.4.0]: https://github.com/mwiraszka/eagami/compare/website-v2.3.0...website-v2.4.0
[2.3.0]: https://github.com/mwiraszka/eagami/compare/website-v2.2.0...website-v2.3.0
[2.2.0]: https://github.com/mwiraszka/eagami/compare/website-v2.1.0...website-v2.2.0
[2.1.0]: https://github.com/mwiraszka/eagami/compare/website-v2.0.0...website-v2.1.0
[2.0.0]: https://github.com/mwiraszka/eagami/compare/website-v1.5.0...website-v2.0.0
[1.5.0]: https://github.com/mwiraszka/eagami/compare/website-v1.4.1...website-v1.5.0
[1.4.1]: https://github.com/mwiraszka/eagami/compare/website-v1.4.0...website-v1.4.1
[1.4.0]: https://github.com/mwiraszka/eagami/compare/website-v1.3.0...website-v1.4.0
[1.3.0]: https://github.com/mwiraszka/eagami/compare/website-v1.2.0...website-v1.3.0
[1.2.0]: https://github.com/mwiraszka/eagami/releases/tag/website-v1.2.0
[1.1.0]: https://github.com/mwiraszka/eagami-website-archive/compare/v1.0.9...v1.1.0
[1.0.9]: https://github.com/mwiraszka/eagami-website-archive/compare/v1.0.8...v1.0.9
[1.0.8]: https://github.com/mwiraszka/eagami-website-archive/compare/v1.0.7...v1.0.8
[1.0.7]: https://github.com/mwiraszka/eagami-website-archive/compare/v1.0.6...v1.0.7
[1.0.6]: https://github.com/mwiraszka/eagami-website-archive/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/mwiraszka/eagami-website-archive/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/mwiraszka/eagami-website-archive/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/mwiraszka/eagami-website-archive/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/mwiraszka/eagami-website-archive/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/mwiraszka/eagami-website-archive/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/mwiraszka/eagami-website-archive/compare/v0.8.0...v1.0.0
[0.8.0]: https://github.com/mwiraszka/eagami-website-archive/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/mwiraszka/eagami-website-archive/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/mwiraszka/eagami-website-archive/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/mwiraszka/eagami-website-archive/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/mwiraszka/eagami-website-archive/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/mwiraszka/eagami-website-archive/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/mwiraszka/eagami-website-archive/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/mwiraszka/eagami-website-archive/releases/tag/v0.1.0
