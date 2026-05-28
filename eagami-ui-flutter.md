---
title: 'Eagami UI: Flutter Integration'
version: 2.3.0
source: '@eagami/ui@2.3.0 (https://github.com/mwiraszka/eagami)'
last-synced: 2026-05-28
audience: human developers and AI coding agents
purpose: >
  Single-file specification for applying the Eagami UI design tokens to a Flutter/Dart
  codebase without depending on the upstream Angular library. Copy this file into the
  consuming project's docs/ directory. When building or modifying UI in that project,
  follow every rule below and use only the tokens listed here.
---

# Eagami UI: Flutter Integration

This document is the complete, self-contained specification for applying the Eagami UI design tokens to a Flutter project. It contains:

1. Mandatory design rules
2. Full token set (values)
3. Ready-to-paste Dart theme setup
4. Usage patterns (do / don't)
5. Component API conventions
6. Internationalization
7. Accessibility requirements
8. Sync checklist

**For AI agents:** When building or modifying UI in this project, follow every rule in § 1 and use only the tokens in § 2 (accessed via the `EagamiTheme` in § 3). Do not introduce arbitrary color, spacing, or typography values. If a required token is missing, request an upstream addition rather than hard-coding. The `RULE:` markers below identify invariants that must always hold.

---

## Table of contents

1. [Design rules](#1-design-rules)
2. [Tokens](#2-tokens)
3. [Theme setup](#3-theme-setup)
4. [Usage patterns](#4-usage-patterns)
5. [Component API conventions](#5-component-api-conventions)
6. [Internationalization](#6-internationalization)
7. [Accessibility requirements](#7-accessibility-requirements)
8. [Sync checklist](#8-sync-checklist)

---

## 1. Design rules

### 1.1 Spacing scale

**RULE:** All padding, margin, and gap values must be drawn from this scale:

`1, 2, 4, 8, 12, 16, 24, 32, 48, 64`

Units are Flutter's default logical pixels. Arbitrary values (5, 10, 20, 100, etc.) are forbidden. Prefer named tokens (`context.eagami.spacing.md`) over numeric literals so the scale stays discoverable.

### 1.2 Colors

**RULE:** Never hard-code color literals (`Color(0xFF...)`, `Colors.blue`, `CupertinoColors.*`) in widget code. All colors come from `EagamiTheme` semantic tokens.

- Use **semantic names** (`colors.textPrimary`, `colors.surfaceBase`, `colors.borderDefault`) rather than primitives (`neutral900`, `primary500`).
- Tokens adapt automatically across `EagamiTheme.light` and `EagamiTheme.dark`.
- For translucent overlays, use `colors.surfaceOverlay`. Do not call `Color.withOpacity()` on raw palette colors.
- Surfaces that float above the page (cards with `variant: elevated`, dialogs, drawers, dropdowns, menus, toasts) must paint with `colors.surfaceElevated`, not `surfaceBase`. In dark mode that token resolves to a step-lighter shade so elevation reads at a glance, since drop shadows alone are too subtle on a near-black page.
- If a required semantic token is missing, add it upstream rather than falling back to primitives.

### 1.3 Focus indicators

**RULE:** Every focusable widget must render a visible keyboard focus indicator.

- Use `elevation.focusRing` as the default focus style (3px outer glow using a translucent blue).
- For error and success contexts, use `elevation.focusRingError` and `elevation.focusRingSuccess` so the ring colour matches the field state.
- Wrap custom interactive widgets in `FocusableActionDetector` or apply `Focus` + visual feedback.
- Never set `focusColor: Colors.transparent` or otherwise suppress the indicator.

### 1.4 Motion and reduced motion

**RULE:** Use the provided motion tokens for all animations. Respect reduced-motion.

- `motion.fast`, `motion.normal`, `motion.slow`, `motion.slower` are all `Duration` values; `motion.instant` is `Duration.zero`.
- `motion.easeIn`, `motion.easeOut`, `motion.easeInOut`, `motion.easeSpring`, `motion.easeLinear` are all `Curve` values.
- Use `context.eagamiDuration(base)` at every animation site. It reads `MediaQuery.disableAnimationsOf(context)` and collapses to `Duration.zero` when the user has requested reduced motion. Do not bypass this by constructing raw `Duration` literals.
- For loading affordances, prefer slowing rather than removing the animation. The upstream `Spinner` slows its spin under reduced motion rather than freezing, since freezing the only "I'm working" cue is worse than a gentle rotation.

### 1.5 Typography

**RULE:** Use semantic typography tokens when styling text.

- `typography.display`, `typography.h1`, `typography.h2`, `typography.h3`, `typography.h4`
- `typography.bodyLg`, `typography.bodyMd`, `typography.bodySm`
- `typography.labelLg`, `typography.labelMd`, `typography.labelSm`
- `typography.helper`, `typography.code`

Do not compose `TextStyle` from raw font sizes/weights. If a role is missing, add a token upstream.

### 1.6 Interactive element sizing

**RULE:** All tappable targets must be at least 44×44 logical pixels. Use the size tokens (`sm`, `md`, `lg`) which are calibrated to meet this for `md` and `lg`; `sm` is reserved for non-tappable or dense secondary contexts only.

### 1.7 Component API shape

**RULE:** Widgets that mirror Eagami components must preserve these prop shapes so behavior is predictable across Angular and Flutter:

| Prop              | Type                  | Notes                                                                            |
| ----------------- | --------------------- | -------------------------------------------------------------------------------- |
| `variant`         | enum                  | Matches Angular component's variant (e.g. Button → `ButtonVariant.primary`).      |
| `size`            | `EagamiSize` enum     | `sm | md | lg`, default `md`. Defined once and reused by every sized component.   |
| `disabled`        | `bool`                | Default `false`.                                                                  |
| `loading`         | `bool`                | Where applicable.                                                                 |
| `fullWidth`       | `bool`                | Where applicable.                                                                 |
| `hint`            | `String?`             | Below-field helper text. Hidden while an `errorMsg` is present.                    |
| `errorMsg`        | `String?`             | Below-field error text. When non-null, forces the field into the error state.     |
| `required`        | `bool`                | Default `false`. Drives the visible "required" marker and `aria-required`.        |
| `readonly`        | `bool`                | Default `false`. Non-disabled but non-editable; supported on most form controls.  |
| value/onChanged   | controlled pattern    | Pair `value: T` with `onChanged: ValueChanged<T>` (or a `model<T>` two-way).      |

A common change since the previous version of this doc: every text/select-style control now uses `errorMsg` (not `error`), and there is no separate `status` enum any more. The presence of `errorMsg` is what flips the field into the error state.

See § 5 for per-component specifics.

---

## 2. Tokens

All values below are directly encoded into the Dart source in § 3. They mirror the CSS custom properties in `packages/ui/src/styles/tokens/*.scss` in the upstream Angular library. Do not edit these tables in isolation, regenerate this file when upstream tokens change (see § 8).

### 2.1 Colors, primitive palette

Use these only if a semantic token is not available. Adding a new semantic is almost always the right move.

#### Primary (brand)

Re-tuned in @eagami/ui@1.0.2 so the whole ramp shares H=205° / S=50% (varying only lightness). Any older copy of this doc with the previous primary palette is stale.

| Token         | Hex       |
| ------------- | --------- |
| `primary50`   | `#ECF3F9` |
| `primary100`  | `#D1E3F0` |
| `primary200`  | `#ABCBE3` |
| `primary300`  | `#7DAFD4` |
| `primary400`  | `#4B91C3` |
| `primary500`  | `#3674A1` |
| `primary600`  | `#2A5B7E` |
| `primary700`  | `#204560` |
| `primary800`  | `#162F41` |
| `primary900`  | `#0D1C26` |

#### Secondary

Re-tuned in @eagami/ui@1.0.2 to share H=264° / S=25%.

| Token          | Hex       |
| -------------- | --------- |
| `secondary50`  | `#F2EFF5` |
| `secondary100` | `#DFD9E8` |
| `secondary200` | `#C4B9D5` |
| `secondary300` | `#A493BE` |
| `secondary400` | `#8169A5` |
| `secondary500` | `#665086` |
| `secondary600` | `#503F69` |
| `secondary700` | `#3D3050` |
| `secondary800` | `#292136` |
| `secondary900` | `#181320` |

#### Neutral

| Token         | Hex       |
| ------------- | --------- |
| `neutral0`    | `#FFFFFF` |
| `neutral50`   | `#F9FAFB` |
| `neutral100`  | `#F3F4F6` |
| `neutral200`  | `#E5E7EB` |
| `neutral300`  | `#D1D5DB` |
| `neutral400`  | `#9CA3AF` |
| `neutral500`  | `#6B7280` |
| `neutral600`  | `#4B5563` |
| `neutral700`  | `#374151` |
| `neutral800`  | `#1F2937` |
| `neutral900`  | `#111827` |
| `neutral950`  | `#030712` |

#### Feedback

| Token          | Hex       |     | Token          | Hex       |
| -------------- | --------- | --- | -------------- | --------- |
| `success50`    | `#F0FDF4` |     | `warning50`    | `#FFFBEB` |
| `success100`   | `#DCFCE7` |     | `warning100`   | `#FEF3C7` |
| `success200`   | `#BBF7D0` |     | `warning200`   | `#FDE68A` |
| `success500`   | `#22C55E` |     | `warning500`   | `#F59E0B` |
| `success600`   | `#16A34A` |     | `warning600`   | `#D97706` |
| `success700`   | `#15803D` |     | `warning700`   | `#B45309` |
| `error50`      | `#FEF2F2` |     | `info50`       | `#ECFEFF` |
| `error100`     | `#FEE2E2` |     | `info100`      | `#CFFAFE` |
| `error200`     | `#FECACA` |     | `info200`      | `#A5F3FC` |
| `error500`     | `#EF4444` |     | `info500`      | `#06B6D4` |
| `error600`     | `#DC2626` |     | `info600`      | `#0891B2` |
| `error700`     | `#B91C1C` |     | `info700`      | `#0E7490` |

### 2.2 Colors, semantic (light & dark)

Dark-mode `*Subtle` and `*Muted` for status colours are re-tinted as low-alpha washes of the saturated `*500` so dark-mode text remains readable on them. Light-mode pastels would otherwise be unreadable behind light text in dark mode.

| Semantic token            | Light                           | Dark                            |
| ------------------------- | ------------------------------- | ------------------------------- |
| `textPrimary`             | `neutral900`                    | `neutral50`                     |
| `textSecondary`           | `neutral600`                    | `neutral300`                    |
| `textTertiary`            | `neutral400`                    | `neutral500`                    |
| `textDisabled`            | `neutral400`                    | `neutral500`                    |
| `textInverse`             | `neutral0`                      | `neutral900`                    |
| `textLink`                | `primary600`                    | `primary300`                    |
| `textLinkHover`           | `primary800`                    | `primary100`                    |
| `surfaceCanvas`           | `neutral0`                      | `neutral950`                    |
| `surfaceBase`             | `neutral0`                      | `neutral800`                    |
| `surfaceSubtle`           | `neutral50`                     | `neutral700`                    |
| `surfaceStripe`           | `neutral50`                     | `neutral900`                    |
| `surfaceElevated`         | `neutral0`                      | `neutral700`                    |
| `surfaceMuted`            | `neutral100`                    | `neutral600`                    |
| `surfaceOverlay`          | `Color(0x80000000)`             | `Color(0x80000000)`             |
| `borderSubtle`            | `neutral200`                    | `Color.lerp(neutral700, neutral800, 0.5)` |
| `borderDefault`           | `neutral200`                    | `neutral400`                    |
| `borderStrong`            | `neutral400`                    | `neutral300`                    |
| `borderFocus`             | `primary500`                    | `primary500`                    |
| `brandDefault`            | `primary600`                    | `primary500`                    |
| `brandHover`              | `primary700`                    | `primary600`                    |
| `brandActive`             | `primary800`                    | `primary700`                    |
| `brandText`               | `primary700`                    | `primary300`                    |
| `brandSubtle`             | `primary50`                     | `Color(0x1A4B91C3)`             |
| `brandMuted`              | `primary100`                    | `Color(0x334B91C3)`             |
| `brandSecondaryDefault`   | `secondary500`                  | `secondary500`                  |
| `brandSecondaryHover`     | `secondary600`                  | `secondary600`                  |
| `brandSecondaryActive`    | `secondary700`                  | `secondary700`                  |
| `brandSecondarySubtle`    | `secondary50`                   | `secondary50`                   |
| `brandSecondaryMuted`     | `secondary100`                  | `secondary100`                  |
| `successDefault`          | `success600`                    | `success600`                    |
| `successSubtle`           | `success50`                     | `Color(0x2622C55E)`             |
| `successMuted`            | `success100`                    | `Color(0x4022C55E)`             |
| `warningDefault`          | `warning600`                    | `warning600`                    |
| `warningSubtle`           | `warning50`                     | `Color(0x26F59E0B)`             |
| `warningMuted`            | `warning100`                    | `Color(0x40F59E0B)`             |
| `errorDefault`            | `error600`                      | `error600`                      |
| `errorSubtle`             | `error50`                       | `Color(0x26EF4444)`             |
| `errorMuted`              | `error100`                      | `Color(0x40EF4444)`             |
| `infoDefault`             | `info600`                       | `info600`                       |
| `infoSubtle`              | `info50`                        | `Color(0x2606B6D4)`             |
| `infoMuted`               | `info100`                       | `Color(0x4006B6D4)`             |

In dark mode the surface model splits the page (`surfaceCanvas`, deepest) from the surfaces that sit on it (`surfaceBase`, `surfaceSubtle`, `surfaceElevated`, `surfaceMuted`). Canvas stays at `neutral950` while every component surface lifts to `neutral800` or higher so inputs, cards, accordion items, and popover panels read above the page instead of disappearing into it. `surfaceStripe` (`neutral900`) is the alternating-row tone for tables; it sits **below** `surfaceBase` to keep odd rows darker than the surrounding card. `surfaceMuted` (`neutral600`) is the topmost hover-state tone so it stays readable inside elevated surfaces.

`brandText` is the brand colour used as a **foreground** on a non-brand surface (selected dropdown row, today marker, sorted column header, spinner, active paginator page). It needs a 4.5:1 contrast against `surfaceBase`, so light mode uses `primary700` and dark mode uses `primary300`. `brandDefault` stays free to be optimized as a surface (button background, badge background) without dragging the text-on-surface contrast along with it.

### 2.3 Spacing, base scale

| Token  | Pixels |
| ------ | ------ |
| `s0`   | 0      |
| `s1`   | 4      |
| `s2`   | 8      |
| `s3`   | 12     |
| `s4`   | 16     |
| `s6`   | 24     |
| `s8`   | 32     |
| `s12`  | 48     |
| `s16`  | 64     |

Only these values are permitted (see § 1.1). The upstream SCSS defines additional values (1px, 2, 6, 10, 14, 20, 28, 36, 40, 44, 56, 80, 96, 128) but these exist for internal library use and are not exposed here. Follow the 10-value scale above.

### 2.4 Spacing, semantic

**Inset (component padding, vertical × horizontal):**

| Token      | Vertical | Horizontal |
| ---------- | -------- | ---------- |
| `insetXs`  | 4        | 8          |
| `insetSm`  | 6        | 12         |
| `insetMd`  | 8        | 16         |
| `insetLg`  | 12       | 24         |
| `insetXl`  | 16       | 32         |

`insetSm` and `insetXs` use the off-scale 6-pixel value internally; do not reach for `EdgeInsets.symmetric(vertical: 6, ...)` directly, use `insetSm` so the choice stays consistent.

**Stack (vertical gap):**

| Token         | Pixels |
| ------------- | ------ |
| `stack2xs`    | 4      |
| `stackXs`     | 8      |
| `stackSm`     | 12     |
| `stackMd`     | 16     |
| `stackLg`     | 24     |
| `stackXl`     | 32     |
| `stack2xl`    | 48     |

**Inline (horizontal gap):**

| Token       | Pixels |
| ----------- | ------ |
| `inline2xs` | 4      |
| `inlineXs`  | 8      |
| `inlineSm`  | 12     |
| `inlineMd`  | 16     |
| `inlineLg`  | 24     |

### 2.5 Typography

**Font families** (must be declared in `pubspec.yaml` with font files bundled):

| Token       | Stack                                                       |
| ----------- | ----------------------------------------------------------- |
| `fontSans`  | DM Sans → Segoe UI → system-ui → -apple-system → sans-serif |
| `fontBrand` | Syne → DM Sans → system-ui → sans-serif                     |
| `fontSerif` | Georgia → Times New Roman → serif                           |
| `fontMono`  | JetBrains Mono → Fira Code → Cascadia Code → monospace      |

**Font sizes** (logical pixels; Flutter's `TextStyle.fontSize`):

| Token     | Pixels |
| --------- | ------ |
| `size2xs` | 10     |
| `sizeXs`  | 12     |
| `sizeSm`  | 14     |
| `sizeMd`  | 16     |
| `sizeLg`  | 18     |
| `sizeXl`  | 20     |
| `size2xl` | 24     |
| `size3xl` | 30     |
| `size4xl` | 36     |
| `size5xl` | 48     |

**Font weights:**

| Token        | Value          |
| ------------ | -------------- |
| `regular`    | `w400`         |
| `medium`     | `w500`         |
| `semibold`   | `w600`         |
| `bold`       | `w700`         |
| `extrabold`  | `w800`         |

**Line heights** (unitless multiplier):

| Token      | Value |
| ---------- | ----- |
| `lhNone`   | 1.0   |
| `lhTight`  | 1.25  |
| `lhSnug`   | 1.375 |
| `lhNormal` | 1.5   |
| `lhRelaxed`| 1.625 |
| `lhLoose`  | 2.0   |

**Letter spacing** (em):

| Token           | Value    |
| --------------- | -------- |
| `lsTighter`     | -0.05    |
| `lsTight`       | -0.025   |
| `lsNormal`      | 0        |
| `lsWide`        | 0.025    |
| `lsWider`       | 0.05     |
| `lsWidest`      | 0.1      |

**Composite text styles** (what widget code should actually use):

| Style        | Size | Weight     | Line height | Family        |
| ------------ | ---- | ---------- | ----------- | ------------- |
| `display`    | 48   | bold       | 1.25        | sans          |
| `h1`         | 36   | bold       | 1.25        | sans          |
| `h2`         | 30   | semibold   | 1.375       | sans          |
| `h3`         | 24   | semibold   | 1.375       | sans          |
| `h4`         | 20   | semibold   | 1.375       | sans          |
| `bodyLg`     | 18   | regular    | 1.625       | sans          |
| `bodyMd`     | 16   | regular    | 1.5         | sans          |
| `bodySm`     | 14   | regular    | 1.5         | sans          |
| `labelLg`    | 16   | medium     | 1.25        | sans          |
| `labelMd`    | 14   | medium     | 1.25        | sans          |
| `labelSm`    | 12   | medium     | 1.25        | sans          |
| `helper`     | 12   | regular    | 1.5         | sans          |
| `code`       | 14   | regular    | 1.5         | mono          |

### 2.6 Shape

**Border radius:**

| Token        | Pixels |
| ------------ | ------ |
| `radiusNone` | 0      |
| `radiusXs`   | 2      |
| `radiusSm`   | 4      |
| `radiusMd`   | 6      |
| `radiusLg`   | 8      |
| `radiusXl`   | 12     |
| `radius2xl`  | 16     |
| `radius3xl`  | 24     |
| `radiusFull` | 9999   |

**Border width:**

| Token               | Pixels |
| ------------------- | ------ |
| `borderWidthNone`   | 0      |
| `borderWidthThin`   | 1      |
| `borderWidthMedium` | 2      |
| `borderWidthThick`  | 4      |

### 2.7 Elevation

**Shadows** (Flutter `BoxShadow` list). Light-mode shadows are black-at-low-alpha. Dark-mode shadows are flipped to white-at-low-alpha because a black drop shadow is nearly invisible against a near-black page; the soft white fade blends down to a muted dark-grey that mirrors the role black-at-low-alpha plays in light mode. The larger tokens (`xl`, `2xl`) use tighter offset/blur in dark mode so the lighter fade does not sprawl into a halo.

| Token       | Light                                                                                            | Dark                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `none`      | `[]`                                                                                              | `[]`                                                                                           |
| `xs`        | `(0,1) blur 2 spread 0` at 5% black                                                              | `(0,1) blur 2 spread 0` at 4% white                                                            |
| `sm`        | `(0,1) blur 3 spread 0` at 10% + `(0,1) blur 2 spread -1` at 10% black                            | `(0,1) blur 3` at 5% + `(0,1) blur 2 spread -1` at 4% white                                    |
| `md`        | `(0,4) blur 6 spread -1` at 10% + `(0,2) blur 4 spread -2` at 10% black                           | `(0,4) blur 6 spread -1` at 6% + `(0,2) blur 4 spread -2` at 4% white                          |
| `lg`        | `(0,10) blur 15 spread -3` at 10% + `(0,4) blur 6 spread -4` at 10% black                         | `(0,8) blur 12 spread -2` at 8% + `(0,3) blur 5 spread -3` at 5% white                         |
| `xl`        | `(0,20) blur 25 spread -5` at 10% + `(0,8) blur 10 spread -6` at 10% black                        | `(0,12) blur 18 spread -4` at 5% + `(0,5) blur 8 spread -4` at 3% white                        |
| `2xl`       | `(0,25) blur 50 spread -12` at 25% black                                                         | `(0,16) blur 28 spread -8` at 6% white                                                         |
| `inner`     | `inset (0,2) blur 4 spread 0` at 5% black                                                        | (same as light)                                                                                |

**Focus rings** (no dark-mode override):

| Token              | Definition                                                                  |
| ------------------ | --------------------------------------------------------------------------- |
| `focusRing`        | `(0,0) blur 0 spread 3` at `rgba(59, 130, 246, 0.45)`, outer glow            |
| `focusRingError`   | `(0,0) blur 0 spread 3` at `error200`                                       |
| `focusRingSuccess` | `(0,0) blur 0 spread 3` at `success200`                                     |

**Z-index** (for `Stack` ordering; Flutter does not use CSS-style z-index, but these are semantic ordering constants):

| Token      | Value |
| ---------- | ----- |
| `zBase`    | 0     |
| `zRaised`  | 10    |
| `zDropdown`| 100   |
| `zSticky`  | 200   |
| `zOverlay` | 300   |
| `zModal`   | 400   |
| `zPopover` | 500   |
| `zToast`   | 600   |
| `zTooltip` | 700   |

### 2.8 Motion

**Durations** (`Duration`):

| Token       | Value       |
| ----------- | ----------- |
| `instant`   | 0 ms        |
| `fast`      | 100 ms      |
| `normal`    | 200 ms      |
| `slow`      | 300 ms      |
| `slower`    | 500 ms      |

Under `prefers-reduced-motion`, every duration above (except `instant`) collapses to 0 ms upstream. Mirror that in Flutter via `context.eagamiDuration(base)` (see § 1.4 and § 3.3).

**Easing** (`Cubic` / `Curve`):

| Token       | Value                       |
| ----------- | --------------------------- |
| `easeLinear`| `Curves.linear`             |
| `easeIn`    | `Cubic(0.4, 0, 1, 1)`       |
| `easeOut`   | `Cubic(0, 0, 0.2, 1)`       |
| `easeInOut` | `Cubic(0.4, 0, 0.2, 1)`     |
| `easeSpring`| `Cubic(0.34, 1.56, 0.64, 1)`|

---

## 3. Theme setup

### 3.1 Bundle fonts

Add to `pubspec.yaml`:

```yaml
flutter:
  fonts:
    - family: DM Sans
      fonts:
        - asset: assets/fonts/DMSans-Regular.ttf
          weight: 400
        - asset: assets/fonts/DMSans-Medium.ttf
          weight: 500
        - asset: assets/fonts/DMSans-SemiBold.ttf
          weight: 600
        - asset: assets/fonts/DMSans-Bold.ttf
          weight: 700
    - family: Syne
      fonts:
        - asset: assets/fonts/Syne-Bold.ttf
          weight: 700
        - asset: assets/fonts/Syne-ExtraBold.ttf
          weight: 800
    - family: JetBrains Mono
      fonts:
        - asset: assets/fonts/JetBrainsMono-Regular.ttf
          weight: 400
```

Download fonts from Google Fonts (DM Sans, Syne, JetBrains Mono).

### 3.2 Theme extension

Create `lib/theme/eagami_theme.dart`:

```dart
import 'package:flutter/material.dart';

// =============================================================================
// EagamiTheme: design-token theme extension
// Sync source: @eagami/ui@2.3.0 (packages/ui/src/styles/tokens/*.scss)
// =============================================================================

@immutable
class EagamiTheme extends ThemeExtension<EagamiTheme> {
  const EagamiTheme({
    required this.colors,
    required this.typography,
    required this.spacing,
    required this.radius,
    required this.borderWidth,
    required this.elevation,
    required this.motion,
  });

  final EagamiColors colors;
  final EagamiTypography typography;
  final EagamiSpacing spacing;
  final EagamiRadius radius;
  final EagamiBorderWidth borderWidth;
  final EagamiElevation elevation;
  final EagamiMotion motion;

  static const EagamiTheme light = EagamiTheme(
    colors: EagamiColors.light,
    typography: EagamiTypography.base,
    spacing: EagamiSpacing.base,
    radius: EagamiRadius.base,
    borderWidth: EagamiBorderWidth.base,
    elevation: EagamiElevation.light,
    motion: EagamiMotion.base,
  );

  static const EagamiTheme dark = EagamiTheme(
    colors: EagamiColors.dark,
    typography: EagamiTypography.base,
    spacing: EagamiSpacing.base,
    radius: EagamiRadius.base,
    borderWidth: EagamiBorderWidth.base,
    elevation: EagamiElevation.dark,
    motion: EagamiMotion.base,
  );

  @override
  EagamiTheme copyWith({
    EagamiColors? colors,
    EagamiTypography? typography,
    EagamiSpacing? spacing,
    EagamiRadius? radius,
    EagamiBorderWidth? borderWidth,
    EagamiElevation? elevation,
    EagamiMotion? motion,
  }) {
    return EagamiTheme(
      colors: colors ?? this.colors,
      typography: typography ?? this.typography,
      spacing: spacing ?? this.spacing,
      radius: radius ?? this.radius,
      borderWidth: borderWidth ?? this.borderWidth,
      elevation: elevation ?? this.elevation,
      motion: motion ?? this.motion,
    );
  }

  @override
  EagamiTheme lerp(ThemeExtension<EagamiTheme>? other, double t) {
    if (other is! EagamiTheme) return this;
    return t < 0.5 ? this : other;
  }
}

// =============================================================================
// Colors
// =============================================================================

@immutable
class EagamiColors {
  const EagamiColors({
    required this.textPrimary,
    required this.textSecondary,
    required this.textTertiary,
    required this.textDisabled,
    required this.textInverse,
    required this.textLink,
    required this.textLinkHover,
    required this.surfaceCanvas,
    required this.surfaceBase,
    required this.surfaceSubtle,
    required this.surfaceStripe,
    required this.surfaceElevated,
    required this.surfaceMuted,
    required this.surfaceOverlay,
    required this.borderSubtle,
    required this.borderDefault,
    required this.borderStrong,
    required this.borderFocus,
    required this.brandDefault,
    required this.brandHover,
    required this.brandActive,
    required this.brandText,
    required this.brandSubtle,
    required this.brandMuted,
    required this.brandSecondaryDefault,
    required this.brandSecondaryHover,
    required this.brandSecondaryActive,
    required this.brandSecondarySubtle,
    required this.brandSecondaryMuted,
    required this.successDefault,
    required this.successSubtle,
    required this.successMuted,
    required this.warningDefault,
    required this.warningSubtle,
    required this.warningMuted,
    required this.errorDefault,
    required this.errorSubtle,
    required this.errorMuted,
    required this.infoDefault,
    required this.infoSubtle,
    required this.infoMuted,
  });

  final Color textPrimary;
  final Color textSecondary;
  final Color textTertiary;
  final Color textDisabled;
  final Color textInverse;
  final Color textLink;
  final Color textLinkHover;
  final Color surfaceCanvas;
  final Color surfaceBase;
  final Color surfaceSubtle;
  final Color surfaceStripe;
  final Color surfaceElevated;
  final Color surfaceMuted;
  final Color surfaceOverlay;
  final Color borderSubtle;
  final Color borderDefault;
  final Color borderStrong;
  final Color borderFocus;
  final Color brandDefault;
  final Color brandHover;
  final Color brandActive;
  final Color brandText;
  final Color brandSubtle;
  final Color brandMuted;
  final Color brandSecondaryDefault;
  final Color brandSecondaryHover;
  final Color brandSecondaryActive;
  final Color brandSecondarySubtle;
  final Color brandSecondaryMuted;
  final Color successDefault;
  final Color successSubtle;
  final Color successMuted;
  final Color warningDefault;
  final Color warningSubtle;
  final Color warningMuted;
  final Color errorDefault;
  final Color errorSubtle;
  final Color errorMuted;
  final Color infoDefault;
  final Color infoSubtle;
  final Color infoMuted;

  static const light = EagamiColors(
    textPrimary: Color(0xFF111827),
    textSecondary: Color(0xFF4B5563),
    textTertiary: Color(0xFF9CA3AF),
    textDisabled: Color(0xFF9CA3AF),
    textInverse: Color(0xFFFFFFFF),
    textLink: Color(0xFF2A5B7E),
    textLinkHover: Color(0xFF162F41),
    surfaceCanvas: Color(0xFFFFFFFF),
    surfaceBase: Color(0xFFFFFFFF),
    surfaceSubtle: Color(0xFFF9FAFB),
    surfaceStripe: Color(0xFFF9FAFB),
    surfaceElevated: Color(0xFFFFFFFF),
    surfaceMuted: Color(0xFFF3F4F6),
    surfaceOverlay: Color(0x80000000),
    borderSubtle: Color(0xFFE5E7EB),
    borderDefault: Color(0xFFE5E7EB),
    borderStrong: Color(0xFF9CA3AF),
    borderFocus: Color(0xFF3674A1),
    brandDefault: Color(0xFF2A5B7E),
    brandHover: Color(0xFF204560),
    brandActive: Color(0xFF162F41),
    brandText: Color(0xFF204560),
    brandSubtle: Color(0xFFECF3F9),
    brandMuted: Color(0xFFD1E3F0),
    brandSecondaryDefault: Color(0xFF665086),
    brandSecondaryHover: Color(0xFF503F69),
    brandSecondaryActive: Color(0xFF3D3050),
    brandSecondarySubtle: Color(0xFFF2EFF5),
    brandSecondaryMuted: Color(0xFFDFD9E8),
    successDefault: Color(0xFF16A34A),
    successSubtle: Color(0xFFF0FDF4),
    successMuted: Color(0xFFDCFCE7),
    warningDefault: Color(0xFFD97706),
    warningSubtle: Color(0xFFFFFBEB),
    warningMuted: Color(0xFFFEF3C7),
    errorDefault: Color(0xFFDC2626),
    errorSubtle: Color(0xFFFEF2F2),
    errorMuted: Color(0xFFFEE2E2),
    infoDefault: Color(0xFF0891B2),
    infoSubtle: Color(0xFFECFEFF),
    infoMuted: Color(0xFFCFFAFE),
  );

  static const dark = EagamiColors(
    textPrimary: Color(0xFFF9FAFB),
    textSecondary: Color(0xFFD1D5DB),
    textTertiary: Color(0xFF6B7280),
    textDisabled: Color(0xFF6B7280),
    textInverse: Color(0xFF111827),
    textLink: Color(0xFF7DAFD4),
    textLinkHover: Color(0xFFD1E3F0),
    surfaceCanvas: Color(0xFF030712),
    surfaceBase: Color(0xFF1F2937),
    surfaceSubtle: Color(0xFF374151),
    surfaceStripe: Color(0xFF111827),
    surfaceElevated: Color(0xFF374151),
    surfaceMuted: Color(0xFF4B5563),
    surfaceOverlay: Color(0x80000000),
    borderSubtle: Color(0xFF2B3544),
    borderDefault: Color(0xFF9CA3AF),
    borderStrong: Color(0xFFD1D5DB),
    borderFocus: Color(0xFF3674A1),
    brandDefault: Color(0xFF3674A1),
    brandHover: Color(0xFF2A5B7E),
    brandActive: Color(0xFF204560),
    brandText: Color(0xFF7DAFD4),
    brandSubtle: Color(0x1A4B91C3),
    brandMuted: Color(0x334B91C3),
    brandSecondaryDefault: Color(0xFF665086),
    brandSecondaryHover: Color(0xFF503F69),
    brandSecondaryActive: Color(0xFF3D3050),
    brandSecondarySubtle: Color(0xFFF2EFF5),
    brandSecondaryMuted: Color(0xFFDFD9E8),
    successDefault: Color(0xFF16A34A),
    successSubtle: Color(0x2622C55E),
    successMuted: Color(0x4022C55E),
    warningDefault: Color(0xFFD97706),
    warningSubtle: Color(0x26F59E0B),
    warningMuted: Color(0x40F59E0B),
    errorDefault: Color(0xFFDC2626),
    errorSubtle: Color(0x26EF4444),
    errorMuted: Color(0x40EF4444),
    infoDefault: Color(0xFF0891B2),
    infoSubtle: Color(0x2606B6D4),
    infoMuted: Color(0x4006B6D4),
  );
}

// =============================================================================
// Typography
// =============================================================================

@immutable
class EagamiTypography {
  const EagamiTypography({
    required this.display,
    required this.h1,
    required this.h2,
    required this.h3,
    required this.h4,
    required this.bodyLg,
    required this.bodyMd,
    required this.bodySm,
    required this.labelLg,
    required this.labelMd,
    required this.labelSm,
    required this.helper,
    required this.code,
  });

  final TextStyle display;
  final TextStyle h1;
  final TextStyle h2;
  final TextStyle h3;
  final TextStyle h4;
  final TextStyle bodyLg;
  final TextStyle bodyMd;
  final TextStyle bodySm;
  final TextStyle labelLg;
  final TextStyle labelMd;
  final TextStyle labelSm;
  final TextStyle helper;
  final TextStyle code;

  static const _sans = 'DM Sans';
  static const _mono = 'JetBrains Mono';

  static const base = EagamiTypography(
    display: TextStyle(fontFamily: _sans, fontSize: 48, fontWeight: FontWeight.w700, height: 1.25),
    h1:      TextStyle(fontFamily: _sans, fontSize: 36, fontWeight: FontWeight.w700, height: 1.25),
    h2:      TextStyle(fontFamily: _sans, fontSize: 30, fontWeight: FontWeight.w600, height: 1.375),
    h3:      TextStyle(fontFamily: _sans, fontSize: 24, fontWeight: FontWeight.w600, height: 1.375),
    h4:      TextStyle(fontFamily: _sans, fontSize: 20, fontWeight: FontWeight.w600, height: 1.375),
    bodyLg:  TextStyle(fontFamily: _sans, fontSize: 18, fontWeight: FontWeight.w400, height: 1.625),
    bodyMd:  TextStyle(fontFamily: _sans, fontSize: 16, fontWeight: FontWeight.w400, height: 1.5),
    bodySm:  TextStyle(fontFamily: _sans, fontSize: 14, fontWeight: FontWeight.w400, height: 1.5),
    labelLg: TextStyle(fontFamily: _sans, fontSize: 16, fontWeight: FontWeight.w500, height: 1.25),
    labelMd: TextStyle(fontFamily: _sans, fontSize: 14, fontWeight: FontWeight.w500, height: 1.25),
    labelSm: TextStyle(fontFamily: _sans, fontSize: 12, fontWeight: FontWeight.w500, height: 1.25),
    helper:  TextStyle(fontFamily: _sans, fontSize: 12, fontWeight: FontWeight.w400, height: 1.5),
    code:    TextStyle(fontFamily: _mono, fontSize: 14, fontWeight: FontWeight.w400, height: 1.5),
  );
}

// =============================================================================
// Spacing
// =============================================================================

@immutable
class EagamiSpacing {
  const EagamiSpacing();

  // Base scale, only these values are permitted (see § 1.1).
  double get s0 => 0;
  double get s1 => 4;
  double get s2 => 8;
  double get s3 => 12;
  double get s4 => 16;
  double get s6 => 24;
  double get s8 => 32;
  double get s12 => 48;
  double get s16 => 64;

  // Semantic shortcuts, size mapping for component paddings/gaps
  double get xs => s1;
  double get sm => s2;
  double get md => s4;
  double get lg => s6;
  double get xl => s8;

  // Insets (component padding). insetXs and insetSm intentionally use 6px,
  // which sits off the public 10-value scale; treat them as opaque tokens
  // for "small button padding" and reach for them through this API rather
  // than constructing EdgeInsets.symmetric directly.
  EdgeInsets get insetXs => const EdgeInsets.symmetric(vertical: 4, horizontal: 8);
  EdgeInsets get insetSm => const EdgeInsets.symmetric(vertical: 6, horizontal: 12);
  EdgeInsets get insetMd => const EdgeInsets.symmetric(vertical: 8, horizontal: 16);
  EdgeInsets get insetLg => const EdgeInsets.symmetric(vertical: 12, horizontal: 24);
  EdgeInsets get insetXl => const EdgeInsets.symmetric(vertical: 16, horizontal: 32);

  static const base = EagamiSpacing();
}

// =============================================================================
// Shape
// =============================================================================

@immutable
class EagamiRadius {
  const EagamiRadius();

  BorderRadius get none => BorderRadius.zero;
  BorderRadius get xs => BorderRadius.circular(2);
  BorderRadius get sm => BorderRadius.circular(4);
  BorderRadius get md => BorderRadius.circular(6);
  BorderRadius get lg => BorderRadius.circular(8);
  BorderRadius get xl => BorderRadius.circular(12);
  BorderRadius get xxl => BorderRadius.circular(16);
  BorderRadius get xxxl => BorderRadius.circular(24);
  BorderRadius get full => BorderRadius.circular(9999);

  static const base = EagamiRadius();
}

@immutable
class EagamiBorderWidth {
  const EagamiBorderWidth();

  double get none => 0;
  double get thin => 1;
  double get medium => 2;
  double get thick => 4;

  static const base = EagamiBorderWidth();
}

// =============================================================================
// Elevation
// =============================================================================

@immutable
class EagamiElevation {
  const EagamiElevation({
    required this.none,
    required this.xs,
    required this.sm,
    required this.md,
    required this.lg,
    required this.xl,
    required this.xxl,
    required this.inner,
  });

  final List<BoxShadow> none;
  final List<BoxShadow> xs;
  final List<BoxShadow> sm;
  final List<BoxShadow> md;
  final List<BoxShadow> lg;
  final List<BoxShadow> xl;
  final List<BoxShadow> xxl;
  final List<BoxShadow> inner;

  // Focus rings are theme-independent (light/dark share the same values).
  List<BoxShadow> get focusRing => const [
        BoxShadow(spreadRadius: 3, color: Color(0x733B82F6)),
      ];
  List<BoxShadow> get focusRingError => const [
        BoxShadow(spreadRadius: 3, color: Color(0xFFFECACA)),
      ];
  List<BoxShadow> get focusRingSuccess => const [
        BoxShadow(spreadRadius: 3, color: Color(0xFFBBF7D0)),
      ];

  // Z-index constants (for Stack ordering / overlay layering)
  int get zBase => 0;
  int get zRaised => 10;
  int get zDropdown => 100;
  int get zSticky => 200;
  int get zOverlay => 300;
  int get zModal => 400;
  int get zPopover => 500;
  int get zToast => 600;
  int get zTooltip => 700;

  static const light = EagamiElevation(
    none: [],
    xs: [
      BoxShadow(offset: Offset(0, 1), blurRadius: 2, color: Color(0x0D000000)),
    ],
    sm: [
      BoxShadow(offset: Offset(0, 1), blurRadius: 3, color: Color(0x1A000000)),
      BoxShadow(offset: Offset(0, 1), blurRadius: 2, spreadRadius: -1, color: Color(0x1A000000)),
    ],
    md: [
      BoxShadow(offset: Offset(0, 4), blurRadius: 6, spreadRadius: -1, color: Color(0x1A000000)),
      BoxShadow(offset: Offset(0, 2), blurRadius: 4, spreadRadius: -2, color: Color(0x1A000000)),
    ],
    lg: [
      BoxShadow(offset: Offset(0, 10), blurRadius: 15, spreadRadius: -3, color: Color(0x1A000000)),
      BoxShadow(offset: Offset(0, 4), blurRadius: 6, spreadRadius: -4, color: Color(0x1A000000)),
    ],
    xl: [
      BoxShadow(offset: Offset(0, 20), blurRadius: 25, spreadRadius: -5, color: Color(0x1A000000)),
      BoxShadow(offset: Offset(0, 8), blurRadius: 10, spreadRadius: -6, color: Color(0x1A000000)),
    ],
    xxl: [
      BoxShadow(offset: Offset(0, 25), blurRadius: 50, spreadRadius: -12, color: Color(0x40000000)),
    ],
    inner: [
      BoxShadow(offset: Offset(0, 2), blurRadius: 4, color: Color(0x0D000000)),
    ],
  );

  static const dark = EagamiElevation(
    none: [],
    xs: [
      BoxShadow(offset: Offset(0, 1), blurRadius: 2, color: Color(0x0AFFFFFF)),
    ],
    sm: [
      BoxShadow(offset: Offset(0, 1), blurRadius: 3, color: Color(0x0DFFFFFF)),
      BoxShadow(offset: Offset(0, 1), blurRadius: 2, spreadRadius: -1, color: Color(0x0AFFFFFF)),
    ],
    md: [
      BoxShadow(offset: Offset(0, 4), blurRadius: 6, spreadRadius: -1, color: Color(0x0FFFFFFF)),
      BoxShadow(offset: Offset(0, 2), blurRadius: 4, spreadRadius: -2, color: Color(0x0AFFFFFF)),
    ],
    lg: [
      BoxShadow(offset: Offset(0, 8), blurRadius: 12, spreadRadius: -2, color: Color(0x14FFFFFF)),
      BoxShadow(offset: Offset(0, 3), blurRadius: 5, spreadRadius: -3, color: Color(0x0DFFFFFF)),
    ],
    xl: [
      BoxShadow(offset: Offset(0, 12), blurRadius: 18, spreadRadius: -4, color: Color(0x0DFFFFFF)),
      BoxShadow(offset: Offset(0, 5), blurRadius: 8, spreadRadius: -4, color: Color(0x08FFFFFF)),
    ],
    xxl: [
      BoxShadow(offset: Offset(0, 16), blurRadius: 28, spreadRadius: -8, color: Color(0x0FFFFFFF)),
    ],
    inner: [
      BoxShadow(offset: Offset(0, 2), blurRadius: 4, color: Color(0x0D000000)),
    ],
  );
}

// =============================================================================
// Motion
// =============================================================================

@immutable
class EagamiMotion {
  const EagamiMotion();

  Duration get instant => Duration.zero;
  Duration get fast => const Duration(milliseconds: 100);
  Duration get normal => const Duration(milliseconds: 200);
  Duration get slow => const Duration(milliseconds: 300);
  Duration get slower => const Duration(milliseconds: 500);

  Curve get easeLinear => Curves.linear;
  Curve get easeIn => const Cubic(0.4, 0, 1, 1);
  Curve get easeOut => const Cubic(0, 0, 0.2, 1);
  Curve get easeInOut => const Cubic(0.4, 0, 0.2, 1);
  Curve get easeSpring => const Cubic(0.34, 1.56, 0.64, 1);

  static const base = EagamiMotion();
}
```

### 3.3 Context extension (ergonomic access)

Create `lib/theme/eagami_context.dart`:

```dart
import 'package:flutter/material.dart';
import 'eagami_theme.dart';

extension EagamiContext on BuildContext {
  EagamiTheme get eagami =>
      Theme.of(this).extension<EagamiTheme>() ?? EagamiTheme.light;

  /// Returns a motion duration that collapses to zero when the user has
  /// requested reduced motion. Use this at every animation site instead of
  /// passing the raw token duration directly.
  Duration eagamiDuration(Duration base) {
    final disabled = MediaQuery.maybeDisableAnimationsOf(this) ?? false;
    return disabled ? Duration.zero : base;
  }
}
```

### 3.4 Wire up `MaterialApp`

In `main.dart` (or wherever the root `MaterialApp` lives):

```dart
import 'package:flutter/material.dart';
import 'theme/eagami_theme.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My App',
      theme: ThemeData.light().copyWith(
        extensions: const [EagamiTheme.light],
        scaffoldBackgroundColor: EagamiTheme.light.colors.surfaceCanvas,
      ),
      darkTheme: ThemeData.dark().copyWith(
        extensions: const [EagamiTheme.dark],
        scaffoldBackgroundColor: EagamiTheme.dark.colors.surfaceCanvas,
      ),
      themeMode: ThemeMode.system,
      home: const HomePage(),
    );
  }
}
```

### 3.5 Brand palette derivation

The upstream Angular library accepts a single brand hex via `provideEagamiUi({ palette: { primary: { base: '#…' } } })` and derives a full ten-shade scale in [OKLCH](https://www.w3.org/TR/css-color-4/#ok-lab) space, holding hue and chroma steady while stepping lightness. Every brand-role pairing (text-on-surface, surface-on-canvas) is asserted against WCAG 2.1 AA at bootstrap; a contrast violation throws before the app loads.

The Flutter integration uses compile-time `EagamiColors` constants, so the same workflow is offline: pick a base hex, derive the ten shades, paste the resulting `Color(0xFF…)` values into the `EagamiColors.light` and `EagamiColors.dark` constants for the four primary roles (`brandDefault`, `brandHover`, `brandActive`, `brandText`). A small Dart helper (mirroring `packages/ui/src/lib/palette/derive-palette.ts` in the upstream repo) can do the OKLCH derivation in a `tool/` script:

```dart
import 'package:flutter/material.dart';

// Target OKLCH lightness for each shade, matching the upstream scale.
const _targetL = <int, double>{
  50: 0.96,  100: 0.90, 200: 0.82, 300: 0.72, 400: 0.62,
  500: 0.52, 600: 0.42, 700: 0.34, 800: 0.26, 900: 0.18,
};

/// Derive a 10-shade scale by stepping OKLCH lightness around an anchor hex.
/// Use a package like `flutter_oklch` or `colorhash` for the actual conversion,
/// or shell out to a CSS-color-4 OKLCH library.
Map<int, Color> derivePrimaryScale(Color base) {
  // Convert base -> OKLCH, then for each shade rebuild with target L,
  // base C, base H, and re-encode as a Color(0xFF…) value.
  // (Implementation depends on the OKLCH package you choose.)
  throw UnimplementedError('Wire up to your OKLCH package of choice.');
}
```

Run the helper in a one-off script when picking a new brand colour and copy the result into `EagamiColors`. For brand books that pin specific hexes, override individual shades after derivation. After regenerating, verify with the Flutter inspector that text-on-surface and surface-on-canvas pairs still meet AA — the Angular library does this assertion at bootstrap; with compile-time constants you assert manually.

---

## 4. Usage patterns

### 4.1 Do

```dart
import 'package:flutter/material.dart';
import '../theme/eagami_context.dart';

class InfoCard extends StatelessWidget {
  const InfoCard({super.key, required this.title, required this.body});
  final String title;
  final String body;

  @override
  Widget build(BuildContext context) {
    final t = context.eagami;
    return Container(
      padding: t.spacing.insetLg,
      decoration: BoxDecoration(
        // surfaceElevated, not surfaceBase: the card floats above the page.
        color: t.colors.surfaceElevated,
        borderRadius: t.radius.lg,
        border: Border.all(
          color: t.colors.borderDefault,
          width: t.borderWidth.thin,
        ),
        boxShadow: t.elevation.sm,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: t.typography.h4.copyWith(color: t.colors.textPrimary)),
          SizedBox(height: t.spacing.sm),
          Text(body, style: t.typography.bodyMd.copyWith(color: t.colors.textSecondary)),
        ],
      ),
    );
  }
}
```

### 4.2 Don't

```dart
// Hard-coded colors, spacing, and typography
Container(
  padding: const EdgeInsets.all(15), // not on the scale
  decoration: BoxDecoration(
    color: const Color(0xFFFFFFFF), // use t.colors.surfaceElevated
    borderRadius: BorderRadius.circular(10), // not a radius token
    border: Border.all(color: Colors.grey), // use t.colors.borderDefault
  ),
  child: const Text(
    'Hello',
    style: TextStyle(fontSize: 17, fontWeight: FontWeight.w600), // use t.typography.*
  ),
)
```

### 4.3 Focus-aware button

```dart
class EagamiFocusableButton extends StatefulWidget {
  const EagamiFocusableButton({super.key, required this.onPressed, required this.child});
  final VoidCallback onPressed;
  final Widget child;

  @override
  State<EagamiFocusableButton> createState() => _EagamiFocusableButtonState();
}

class _EagamiFocusableButtonState extends State<EagamiFocusableButton> {
  bool _focused = false;

  @override
  Widget build(BuildContext context) {
    final t = context.eagami;
    return FocusableActionDetector(
      onFocusChange: (v) => setState(() => _focused = v),
      actions: {
        ActivateIntent: CallbackAction<ActivateIntent>(
          onInvoke: (_) { widget.onPressed(); return null; },
        ),
      },
      child: GestureDetector(
        onTap: widget.onPressed,
        child: AnimatedContainer(
          duration: context.eagamiDuration(t.motion.fast),
          curve: t.motion.easeOut,
          padding: t.spacing.insetMd,
          decoration: BoxDecoration(
            color: t.colors.brandDefault,
            borderRadius: t.radius.md,
            boxShadow: _focused ? t.elevation.focusRing : null,
          ),
          child: DefaultTextStyle(
            style: t.typography.labelMd.copyWith(color: t.colors.textInverse),
            child: widget.child,
          ),
        ),
      ),
    );
  }
}
```

---

## 5. Component API conventions

When building Flutter widgets that mirror Eagami components, preserve the property names, variant enums, and default values below. This keeps behaviour predictable across Angular and Flutter.

All sized components share a single `EagamiSize` enum:

```dart
/// Visual size shared by every sized Eagami component.
enum EagamiSize { sm, md, lg }
```

Form controls that surface an error state expose the same pair of inputs everywhere: `hint` for helper text and `errorMsg` for the error string. The presence of `errorMsg` (non-null, non-empty) is what flips the field into the error state, there is no separate `status` enum.

### 5.1 Button

```dart
enum ButtonVariant { primary, secondary, ghost, danger }
enum ButtonType { button, submit, reset } // rarely relevant in Flutter but preserve the enum

class EagamiButton extends StatelessWidget {
  const EagamiButton({
    super.key,
    required this.onPressed,
    required this.child,
    this.variant = ButtonVariant.primary,
    this.size = EagamiSize.md,
    this.type = ButtonType.button,
    this.disabled = false,
    this.loading = false,
    this.fullWidth = false,
    this.ariaLabel,
    this.ariaCurrent,
  });

  final VoidCallback? onPressed;
  final Widget child;
  final ButtonVariant variant;
  final EagamiSize size;
  final ButtonType type;
  final bool disabled;
  final bool loading;
  final bool fullWidth;
  final String? ariaLabel;
  final String? ariaCurrent;
}
```

**Behaviour:**
- `disabled || loading` disables the tap target.
- `loading` shows a spinner and disables activation, but preserves the button's rendered width.
- `fullWidth: true` stretches to the parent's width.
- Hover on desktop: background shifts to `brandHover` / `brandActive` (via `MouseRegion`).
- `ariaCurrent` mirrors the HTML `aria-current` attribute used by pagination controls.

### 5.2 Input (TextField)

```dart
enum InputType { text, email, password, number, search, tel, url }

class EagamiInput extends StatefulWidget {
  const EagamiInput({
    super.key,
    this.label,
    this.type = InputType.text,
    this.placeholder = '',
    this.size = EagamiSize.md,
    this.hint,
    this.errorMsg,
    this.disabled = false,
    this.readonly = false,
    this.required = false,
    this.autocomplete,
    this.autofocus = false,
    this.showPasswordToggle = true,
    this.value,
    this.onChanged,
    this.onFocused,
    this.onBlurred,
  });

  final String? label;
  final InputType type;
  final String placeholder;
  final EagamiSize size;
  final String? hint;
  final String? errorMsg;
  final bool disabled;
  final bool readonly;
  final bool required;
  final String? autocomplete;
  final bool autofocus;
  final bool showPasswordToggle;
  final String? value;
  final ValueChanged<String>? onChanged;
  final ValueChanged<FocusEvent>? onFocused;
  final ValueChanged<FocusEvent>? onBlurred;
}
```

**Behaviour:**
- A non-null/non-empty `errorMsg` forces the field into the error state. There is no `status` enum; `errorMsg` alone drives the visual.
- `hint` displays below the input; replaced by `errorMsg` when the latter is present.
- For `type: InputType.password`, the field renders a built-in show/hide toggle when `showPasswordToggle: true` (the default). The toggle is keyboard-reachable.
- Prefix/suffix widgets accepted via named parameters (`prefix`, `suffix`).

### 5.3 Textarea

```dart
enum TextareaResize { none, vertical, horizontal, both }

class EagamiTextarea extends StatefulWidget {
  const EagamiTextarea({
    super.key,
    this.label,
    this.placeholder = '',
    this.size = EagamiSize.md,
    this.hint,
    this.errorMsg,
    this.disabled = false,
    this.readonly = false,
    this.required = false,
    this.rows = 3,
    this.resize = TextareaResize.vertical,
    this.maxlength,
    this.value,
    this.onChanged,
    this.onFocused,
    this.onBlurred,
  });

  final String? label;
  final String placeholder;
  final EagamiSize size;
  final String? hint;
  final String? errorMsg;
  final bool disabled;
  final bool readonly;
  final bool required;
  final int rows;
  final TextareaResize resize;
  final int? maxlength;
  final String? value;
  final ValueChanged<String>? onChanged;
  final ValueChanged<FocusEvent>? onFocused;
  final ValueChanged<FocusEvent>? onBlurred;
}
```

### 5.4 Checkbox

```dart
class EagamiCheckbox extends StatelessWidget {
  const EagamiCheckbox({
    super.key,
    required this.checked,
    required this.onChanged,
    this.label,
    this.hint,
    this.errorMsg,
    this.size = EagamiSize.md,
    this.disabled = false,
    this.required = false,
    this.indeterminate = false,
    this.ariaLabel,
  });

  final bool checked;
  final ValueChanged<bool>? onChanged;
  final String? label;
  final String? hint;
  final String? errorMsg;
  final EagamiSize size;
  final bool disabled;
  final bool required;
  final bool indeterminate;
  final String? ariaLabel;
}
```

### 5.5 Switch

```dart
class EagamiSwitch extends StatelessWidget {
  const EagamiSwitch({
    super.key,
    required this.checked,
    required this.onChanged,
    this.label,
    this.hint,
    this.errorMsg,
    this.size = EagamiSize.md,
    this.disabled = false,
    this.required = false,
    this.ariaLabel,
  });

  final bool checked;
  final ValueChanged<bool>? onChanged;
  final String? label;
  final String? hint;
  final String? errorMsg;
  final EagamiSize size;
  final bool disabled;
  final bool required;
  final String? ariaLabel;
}
```

### 5.6 Radio group

```dart
enum RadioOrientation { vertical, horizontal }

class EagamiRadioGroup<T> extends StatelessWidget {
  const EagamiRadioGroup({
    super.key,
    required this.value,
    required this.onChanged,
    required this.children,
    this.name,
    this.label,
    this.hint,
    this.errorMsg,
    this.size = EagamiSize.md,
    this.orientation = RadioOrientation.vertical,
    this.disabled = false,
    this.required = false,
    this.ariaLabel,
  });

  final T value;
  final ValueChanged<T>? onChanged;
  final List<EagamiRadio<T>> children;
  final String? name;
  final String? label;
  final String? hint;
  final String? errorMsg;
  final EagamiSize size;
  final RadioOrientation orientation;
  final bool disabled;
  final bool required;
  final String? ariaLabel;
}

class EagamiRadio<T> extends StatelessWidget {
  const EagamiRadio({
    super.key,
    required this.value,
    this.label,
    this.disabled = false,
  });

  final T value;
  final String? label;
  final bool disabled;
}
```

The radio label sits vertically centred against the radio circle (top-aligned in 0.x). Match that vertical alignment in the Flutter render.

### 5.7 Card

```dart
enum CardVariant { elevated, outlined, filled }
enum CardPadding { none, sm, md, lg, xl }
enum CardHeaderAlign { start, center, end }

class EagamiCard extends StatelessWidget {
  const EagamiCard({
    super.key,
    required this.child,
    this.variant = CardVariant.elevated,
    this.padding = CardPadding.md,
    this.fullWidth = false,
    this.headerAlign = CardHeaderAlign.center,
    this.headerDivider = false,
    this.header,
    this.footer,
  });

  final Widget child;
  final CardVariant variant;
  final CardPadding padding;
  final bool fullWidth;
  final CardHeaderAlign headerAlign;
  final bool headerDivider;
  final Widget? header;
  final Widget? footer;
}
```

**Behaviour:**
- `header` and `footer` are content-slot widgets (matching the Angular `slot="header"` / `slot="footer"` pattern).
- `headerDivider: true` renders a divider between the header and the body.
- `variant: elevated` carries a hairline border in addition to the shadow so the top edge stays visible when shadows alone cannot define elevation (notably dark mode).

### 5.8 Dialog

```dart
enum DialogSize { sm, md, lg, full }

Future<T?> showEagamiDialog<T>({
  required BuildContext context,
  required WidgetBuilder builder,
  DialogSize size = DialogSize.md,
  bool closeOnBackdrop = true,
  bool closeOnEscape = true,
  bool showClose = true,
  Widget? header,
  Widget? footer,
  String? ariaLabel,
});
```

`closeOnBackdrop`/`closeOnEscape` default to `true`. When the dialog closes, restore focus to the element that was focused at the time it opened.

### 5.9 Drawer

```dart
enum DrawerPosition { left, right, top, bottom }
enum DrawerSize { sm, md, lg, full }

Future<T?> showEagamiDrawer<T>({
  required BuildContext context,
  required WidgetBuilder builder,
  DrawerPosition position = DrawerPosition.right,
  DrawerSize size = DrawerSize.md,
  bool closeOnBackdrop = true,
  bool closeOnEscape = true,
  bool showClose = true,
  Widget? header,
  Widget? footer,
  String? ariaLabel,
});
```

A drawer slides in from `position` and otherwise behaves like a dialog (modal, focus-trapped, restores focus on close).

### 5.10 Dropdown, Autocomplete, Segmented (single-select controls)

These three components share the `SelectOption` value type, defined once and imported wherever it is needed:

```dart
class SelectOption<T> {
  const SelectOption({required this.value, required this.label, this.disabled = false});
  final T value;
  final String label;
  final bool disabled;
}
```

#### Dropdown

```dart
class EagamiDropdown<T> extends StatefulWidget {
  const EagamiDropdown({
    super.key,
    required this.options,
    required this.value,
    required this.onChanged,
    this.label,
    this.placeholder,
    this.hint,
    this.errorMsg,
    this.size = EagamiSize.md,
    this.disabled = false,
    this.readonly = false,
    this.required = false,
  });

  final List<SelectOption<T>> options;
  final T? value;
  final ValueChanged<T?>? onChanged;
  final String? label;
  final String? placeholder; // falls back to the locale's `dropdown.placeholder`
  final String? hint;
  final String? errorMsg;
  final EagamiSize size;
  final bool disabled;
  final bool readonly;
  final bool required;
}
```

**Keyboard:** ArrowDown opens or moves focus down, ArrowUp moves up, Enter/Space selects, Escape closes. The popup is anchored to the trigger with absolute positioning so it escapes overflow-clipping ancestors.

#### Autocomplete

```dart
class EagamiAutocomplete<T> extends StatefulWidget {
  const EagamiAutocomplete({
    super.key,
    required this.options,
    required this.value,
    required this.onChanged,
    this.label,
    this.placeholder = '',
    this.hint,
    this.errorMsg,
    this.size = EagamiSize.md,
    this.disabled = false,
    this.readonly = false,
    this.required = false,
    this.minLength = 0,
    this.maxResults = 10,
    this.emptyMessage, // falls back to the locale's `autocomplete.empty`
    this.onSelected,
    this.onFocused,
    this.onBlurred,
  });

  final List<SelectOption<T>> options;
  final String value;
  final ValueChanged<String>? onChanged;
  final String? label;
  final String placeholder;
  final String? hint;
  final String? errorMsg;
  final EagamiSize size;
  final bool disabled;
  final bool readonly;
  final bool required;
  final int minLength;
  final int maxResults;
  final String? emptyMessage;
  final ValueChanged<SelectOption<T>>? onSelected;
  final ValueChanged<FocusEvent>? onFocused;
  final ValueChanged<FocusEvent>? onBlurred;
}
```

Filters options by case-insensitive substring on `label`. Emits `onChanged` for every text edit, `onSelected` only when the user picks a suggestion.

#### Segmented

```dart
class EagamiSegmented<T> extends StatelessWidget {
  const EagamiSegmented({
    super.key,
    required this.options,
    required this.value,
    required this.onChanged,
    this.label,
    this.hint,
    this.errorMsg,
    this.size = EagamiSize.md,
    this.disabled = false,
    this.required = false,
    this.fullWidth = false,
    this.ariaLabel,
  });

  final List<SelectOption<T>> options;
  final T value;
  final ValueChanged<T>? onChanged;
  final String? label;
  final String? hint;
  final String? errorMsg;
  final EagamiSize size;
  final bool disabled;
  final bool required;
  final bool fullWidth;
  final String? ariaLabel;
}
```

Implements `radiogroup` semantics with full keyboard support (arrow keys to move, Home/End to jump to ends, Enter/Space to select).

### 5.11 Date picker

```dart
enum DatePickerFormat { short, medium, long }
enum DatePickerWeekStart { sunday, monday } // 0 = Sunday, 1 = Monday

class EagamiDatePicker extends StatefulWidget {
  const EagamiDatePicker({
    super.key,
    required this.value,
    required this.onChanged,
    this.label,
    this.placeholder, // falls back to locale `datePicker.placeholder`
    this.hint,
    this.errorMsg,
    this.size = EagamiSize.md,
    this.disabled = false,
    this.readonly = false,
    this.required = false,
    this.minDate,
    this.maxDate,
    this.format = DatePickerFormat.medium,
    this.weekStartsOn = DatePickerWeekStart.monday,
    this.locale, // explicit locale, else the active EagamiI18n locale
  });

  final DateTime? value;
  final ValueChanged<DateTime?>? onChanged;
  final String? label;
  final String? placeholder;
  final String? hint;
  final String? errorMsg;
  final EagamiSize size;
  final bool disabled;
  final bool readonly;
  final bool required;
  final DateTime? minDate;
  final DateTime? maxDate;
  final DatePickerFormat format;
  final DatePickerWeekStart weekStartsOn;
  final String? locale;
}
```

**Behaviour:**
- Value is a `DateTime` at local midnight (or `null`).
- Format strings are locale-aware: `short` / `medium` / `long` map to the equivalent `intl` `DateFormat` presets, formatted in `locale` or the active `EagamiI18n` locale.
- Calendar grid receives focus on open so keyboard users land on the focused day immediately.
- **Keyboard:** arrows move by day, PageUp/PageDown by month (Shift = year), Home/End jump to the start/end of the week, Enter/Space selects, Escape closes.

### 5.12 Code input

```dart
class EagamiCodeInput extends StatefulWidget {
  const EagamiCodeInput({
    super.key,
    required this.value,
    required this.onChanged,
    this.label,
    this.placeholder = '',
    this.length = 6,
    this.size = EagamiSize.md,
    this.hint,
    this.errorMsg,
    this.disabled = false,
    this.readonly = false,
    this.required = false,
    this.onCompleted,
  });

  final String value;
  final ValueChanged<String>? onChanged;
  final String? label;
  final String placeholder;
  final int length;
  final EagamiSize size;
  final String? hint;
  final String? errorMsg;
  final bool disabled;
  final bool readonly;
  final bool required;
  final ValueChanged<String>? onCompleted;
}
```

Auto-advances on input, supports paste of the full code at once, ArrowLeft/ArrowRight for navigation, Backspace clears the current digit (or the previous one if already empty). Emits `onCompleted` with the full string once every digit is filled. Internally, the per-digit accessible name comes from the locale's `codeInput.digitLabel(index, length)`.

### 5.13 Slider

```dart
class EagamiSlider extends StatefulWidget {
  const EagamiSlider({
    super.key,
    required this.value,
    required this.onChanged,
    this.label,
    this.hint,
    this.errorMsg,
    this.min = 0,
    this.max = 100,
    this.step = 1,
    this.size = EagamiSize.md,
    this.disabled = false,
    this.required = false,
    this.showValue = false,
    this.showMinMaxLabels = false,
    this.formatValue,
    this.ariaLabel,
  });

  final double value;
  final ValueChanged<double>? onChanged;
  final String? label;
  final String? hint;
  final String? errorMsg;
  final double min;
  final double max;
  final double step;
  final EagamiSize size;
  final bool disabled;
  final bool required;
  final bool showValue;
  final bool showMinMaxLabels;
  final String Function(double value)? formatValue;
  final String? ariaLabel;
}
```

**Keyboard:** arrows step by `step`, PageUp/PageDown by `max(step * 10, range / 10)`, Home/End jump to bounds. Snap-clamp emitted values to the configured `min`/`max`/`step`.

### 5.14 Tabs

```dart
enum TabsVariant { underline, filled }

class EagamiTabs extends StatefulWidget {
  const EagamiTabs({
    super.key,
    required this.activeTab,
    required this.onChanged,
    required this.children,
    this.variant = TabsVariant.underline,
    this.size = EagamiSize.md,
  });

  final String activeTab;
  final ValueChanged<String>? onChanged;
  final List<EagamiTab> children;
  final TabsVariant variant;
  final EagamiSize size;
}

class EagamiTab extends StatelessWidget {
  const EagamiTab({
    super.key,
    required this.value,
    required this.label,
    required this.child,
    this.disabled = false,
  });

  final String value;
  final String label;
  final Widget child;
  final bool disabled;
}
```

**Keyboard:** ArrowLeft / ArrowRight move between tabs (wraps); Home / End jump to first/last enabled tab. The tab panel itself is focusable so keyboard users can scroll through its content.

### 5.15 Accordion

```dart
class EagamiAccordion extends StatefulWidget {
  const EagamiAccordion({
    super.key,
    required this.children,
    this.multi = false,
  });

  final List<EagamiAccordionItem> children;
  final bool multi; // when true, multiple items can stay expanded
}

class EagamiAccordionItem extends StatelessWidget {
  const EagamiAccordionItem({
    super.key,
    required this.value,
    required this.label,
    required this.child,
    this.disabled = false,
  });

  final String value;
  final String label;
  final Widget child;
  final bool disabled;
}
```

### 5.16 Menu

```dart
enum MenuPlacement { bottomStart, bottomEnd, topStart, topEnd }
enum MenuItemVariant { defaultItem, danger }

class EagamiMenu extends StatefulWidget {
  const EagamiMenu({
    super.key,
    required this.children,
    required this.trigger, // widget that opens the menu (e.g. EagamiButton)
    this.placement = MenuPlacement.bottomStart,
    this.disabled = false,
    this.ariaLabel,
    this.onOpened,
    this.onClosed,
  });

  final List<EagamiMenuItem> children;
  final Widget trigger;
  final MenuPlacement placement;
  final bool disabled;
  final String? ariaLabel;
  final VoidCallback? onOpened;
  final VoidCallback? onClosed;
}

class EagamiMenuItem extends StatelessWidget {
  const EagamiMenuItem({
    super.key,
    required this.onPressed,
    required this.child,
    this.icon,
    this.disabled = false,
    this.variant = MenuItemVariant.defaultItem,
  });

  final VoidCallback onPressed;
  final Widget child;
  final Widget? icon;
  final bool disabled;
  final MenuItemVariant variant;
}
```

**Behaviour:**
- The menu's trigger element receives `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls` directly (mirror this on the focusable element in Flutter via `Semantics`).
- The popup is positioned absolutely so it escapes overflow-clipping ancestors.
- Arrow keys move between enabled items; Home / End jump to ends; Escape closes and restores focus to the trigger; outside-click closes without restoring focus.

### 5.17 Breadcrumbs

```dart
enum BreadcrumbsSeparator { chevron, slash }

class BreadcrumbItem {
  const BreadcrumbItem({required this.label, this.href, this.disabled = false});
  final String label;
  final String? href;
  final bool disabled;
}

class BreadcrumbClickEvent {
  const BreadcrumbClickEvent({required this.item, required this.index});
  final BreadcrumbItem item;
  final int index;
}

class EagamiBreadcrumbs extends StatelessWidget {
  const EagamiBreadcrumbs({
    super.key,
    required this.items,
    this.separator = BreadcrumbsSeparator.chevron,
    this.ariaLabel, // falls back to locale `breadcrumbs.label`
    this.onClicked,
  });

  final List<BreadcrumbItem> items;
  final BreadcrumbsSeparator separator;
  final String? ariaLabel;
  final ValueChanged<BreadcrumbClickEvent>? onClicked;
}
```

The final item is always treated as the current page (non-interactive). Items with an `href` render as link-styled; others as buttons.

### 5.18 Paginator

```dart
enum PaginatorAlign { left, center, right }

class PaginatorState {
  const PaginatorState({required this.page, required this.pageSize});
  final int page;
  final int pageSize;
}

class EagamiPaginator extends StatelessWidget {
  const EagamiPaginator({
    super.key,
    required this.totalItems,
    required this.page,
    required this.pageSize,
    required this.onChanged,
    this.pageSizeOptions = const [10, 25, 50, 100],
    this.showPageSizeSelector = true,
    this.showRangeLabel = true,
    this.align = PaginatorAlign.right,
    this.disabled = false,
  });

  final int totalItems;
  final int page;
  final int pageSize;
  final ValueChanged<PaginatorState>? onChanged;
  final List<int> pageSizeOptions;
  final bool showPageSizeSelector;
  final bool showRangeLabel;
  final PaginatorAlign align;
  final bool disabled;
}
```

The range label ("1–10 of 47"), the "Rows per page" caption, and the prev/next button labels all come from the locale dictionary (`paginator.range`, `paginator.rowsPerPage`, `paginator.previousPage`, `paginator.nextPage`).

### 5.19 Data table

```dart
enum DataTableDensity { compact, comfortable, spacious }
enum DataTableSortDirection { asc, desc, none }
enum DataTableAlign { left, center, right }

class DataTableColumn<T> {
  const DataTableColumn({
    required this.key,
    required this.label,
    this.sortable = false,
    this.align = DataTableAlign.left,
    this.width,
    this.format,
    this.cellBuilder,
    this.headerBuilder,
  });

  final String key;
  final String label;
  final bool sortable;
  final DataTableAlign align;
  final String? width;
  final String Function(Object? value)? format;
  final Widget Function(BuildContext, T row, Object? value)? cellBuilder;
  final Widget Function(BuildContext, DataTableColumn<T> column)? headerBuilder;
}

class DataTableSortState {
  const DataTableSortState({required this.column, required this.direction});
  final String column;
  final DataTableSortDirection direction;
}

class EagamiDataTable<T> extends StatelessWidget {
  const EagamiDataTable({
    super.key,
    required this.columns,
    required this.data,
    required this.sort,
    required this.onSorted,
    this.trackBy,
    this.density = DataTableDensity.comfortable,
    this.stickyHeader = false,
    this.striped = false,
    this.hoverable = true,
    this.bordered = false,
    this.noDataText, // falls back to locale `dataTable.noData`
    this.noDataWidget,
  });

  final List<DataTableColumn<T>> columns;
  final List<T> data;
  final DataTableSortState sort;
  final ValueChanged<DataTableSortState>? onSorted;
  final String? trackBy; // property name used for keying rows
  final DataTableDensity density;
  final bool stickyHeader;
  final bool striped;
  final bool hoverable;
  final bool bordered;
  final String? noDataText;
  final Widget? noDataWidget;
}
```

**Behaviour:**
- Sortable columns cycle `none` → `asc` → `desc` → `none` on header click; clicking a different column starts at `asc`.
- Use semantic table markup (header cells, row scope, etc.); avoid ARIA `grid`/`row`/`gridcell` roles, the upstream library uses native table semantics with `scope="col"` for screen-reader reliability.
- For horizontal overflow, scroll an inner wrapper rather than the whole component so a sibling paginator is not pulled into the scrolled coordinate space.

### 5.20 Alert

```dart
enum AlertVariant { defaultVariant, success, warning, error, info }

class EagamiAlert extends StatelessWidget {
  const EagamiAlert({
    super.key,
    required this.child,
    this.variant = AlertVariant.defaultVariant,
    this.dismissible = false,
    this.visible = true,
    this.onDismissed,
  });

  final Widget child;
  final AlertVariant variant;
  final bool dismissible;
  final bool visible;
  final VoidCallback? onDismissed;
}
```

- `error` and `warning` variants render with `role: alert` (interrupting); other variants use `role: status` (polite).
- The decorative status icon should be marked decorative for screen readers; the dismiss button accessible name comes from the locale's `alert.dismiss`.
- Vertically centre the status icon against the first line of content rather than against the icon container's top edge.

### 5.21 Tag

```dart
enum TagVariant { defaultVariant, success, warning, error, info }

class EagamiTag extends StatelessWidget {
  const EagamiTag({
    super.key,
    required this.child,
    this.variant = TagVariant.defaultVariant,
    this.size = EagamiSize.md,
    this.removable = false,
    this.disabled = false,
    this.removeLabel, // falls back to locale `tag.remove`
    this.onRemoved,
  });

  final Widget child;
  final TagVariant variant;
  final EagamiSize size;
  final bool removable;
  final bool disabled;
  final String? removeLabel;
  final VoidCallback? onRemoved;
}
```

Tags cover semantic statuses only. There is no `primary` variant; for brand-colored chips, style an element directly or use `EagamiBadge`.

### 5.22 Badge

```dart
enum BadgeVariant { defaultVariant, success, warning, error, info }

class EagamiBadge extends StatelessWidget {
  const EagamiBadge({
    super.key,
    required this.child,
    this.variant = BadgeVariant.defaultVariant,
    this.size = EagamiSize.md,
  });

  final Widget child;
  final BadgeVariant variant;
  final EagamiSize size;
}
```

### 5.23 Avatar

```dart
enum AvatarSize { xs, sm, md, lg, xl } // five sizes, not the global EagamiSize
enum AvatarShape { circle, square }

class EagamiAvatar extends StatelessWidget {
  const EagamiAvatar({
    super.key,
    this.src,
    this.alt = '',
    this.initials,
    this.size = AvatarSize.md,
    this.shape = AvatarShape.circle,
  });

  final String? src;
  final String alt;
  final String? initials;
  final AvatarSize size;
  final AvatarShape shape;
}
```

Falls back to `initials` when `src` is empty, then to a generic user icon when neither is provided. When `alt` is empty, the accessible name falls back to `initials`.

### 5.24 Avatar editor

```dart
enum AvatarEditorShape { circle, square }

class AvatarEditorCropEvent {
  const AvatarEditorCropEvent({required this.bytes, required this.dataUrl});
  final Uint8List bytes;
  final String dataUrl;
}

class AvatarEditorCropState {
  const AvatarEditorCropState({
    required this.zoom,
    required this.offsetX,
    required this.offsetY,
  });
  final double zoom;
  final double offsetX;
  final double offsetY;
}

class EagamiAvatarEditor extends StatefulWidget {
  const EagamiAvatarEditor({
    super.key,
    this.shape = AvatarEditorShape.circle,
    this.canvasSize = 200,
    this.currentSrc,
    this.loading = false,
    this.accept = 'image/*',
    this.maxFileSize = 5 * 1024 * 1024,
    this.minZoom = 1,
    this.maxZoom = 3,
    this.exportQuality = 0.92,
    this.exportType = 'image/png',
    this.cropState,
    this.onCropped,
    this.onFileSelected,
    this.onRemoved,
    this.onErrored,
    this.onCropStateChanged,
  });

  final AvatarEditorShape shape;
  final double canvasSize;
  final String? currentSrc;
  final bool loading;
  final String accept;
  final int maxFileSize;
  final double minZoom;
  final double maxZoom;
  final double exportQuality;
  final String exportType;
  final AvatarEditorCropState? cropState;
  final ValueChanged<AvatarEditorCropEvent>? onCropped;
  final ValueChanged<File>? onFileSelected;
  final VoidCallback? onRemoved;
  final ValueChanged<String>? onErrored;
  final ValueChanged<AvatarEditorCropState>? onCropStateChanged;
}
```

**Behaviour:**
- Supports drag-and-drop upload, pan via mouse/touch drag, zoom via slider or scroll wheel.
- **Keyboard:** arrow keys pan the image (Shift for larger steps); `+`/`-` zoom in/out.
- Public methods: `captureOriginal()` (snapshot the current image/crop as the new baseline for revert), `revertImage()` (restore the captured baseline), `exportCrop()` (export current crop and emit `onCropped`).
- The hover overlay picks white or black ink based on the loaded photo's average luminance (not the active theme) so the "Change photo" affordance stays readable on both light and dark images.
- Honour `loading: true` by showing a skeleton matching the editor shape (`circle` or `rect`) until the consumer hides it.

### 5.25 Skeleton

```dart
enum SkeletonVariant { text, circle, rect }

class EagamiSkeleton extends StatelessWidget {
  const EagamiSkeleton({
    super.key,
    this.variant = SkeletonVariant.text,
    this.width,
    this.height,
    this.animated = true,
  });

  final SkeletonVariant variant;
  final String? width;
  final String? height;
  final bool animated;
}
```

The pulse animation is automatically suppressed under reduced motion; do not key it off `animated` for that purpose.

### 5.26 Spinner

```dart
class EagamiSpinner extends StatelessWidget {
  const EagamiSpinner({
    super.key,
    this.size = EagamiSize.md,
    this.label, // falls back to locale `spinner.label`
  });

  final EagamiSize size;
  final String? label;
}
```

Under reduced motion, slow the rotation rather than removing it (the spin is the affordance).

### 5.27 Progress bar

```dart
enum ProgressBarVariant { defaultVariant, success, warning, error, info }

class EagamiProgressBar extends StatelessWidget {
  const EagamiProgressBar({
    super.key,
    this.value = 0,
    this.max = 100,
    this.variant = ProgressBarVariant.defaultVariant,
    this.size = EagamiSize.md,
    this.label, // default: undefined; no automatic placeholder
    this.showValue = false,
    this.indeterminate = false,
  });

  final double value;
  final double max;
  final ProgressBarVariant variant;
  final EagamiSize size;
  final String? label;
  final bool showValue;
  final bool indeterminate;
}
```

Expose `aria-busy: true` while `indeterminate: true`.

### 5.28 Empty state

```dart
enum EmptyStateHeadingLevel { h2, h3, h4, h5, h6 }

class EagamiEmptyState extends StatelessWidget {
  const EagamiEmptyState({
    super.key,
    this.title,
    this.description,
    this.size = EagamiSize.md,
    this.headingLevel = EmptyStateHeadingLevel.h2,
    this.media,
    this.actions,
  });

  final String? title;
  final String? description;
  final EagamiSize size;
  final EmptyStateHeadingLevel headingLevel;
  final Widget? media;   // icon or illustration slot
  final Widget? actions; // follow-up button row
}
```

Use `headingLevel` to fit the title into the surrounding document outline.

### 5.29 Divider

```dart
enum DividerOrientation { horizontal, vertical }

class EagamiDivider extends StatelessWidget {
  const EagamiDivider({
    super.key,
    this.orientation = DividerOrientation.horizontal,
    this.label, // optional centred label (e.g. "or")
  });

  final DividerOrientation orientation;
  final String? label;
}
```

### 5.30 Tooltip

```dart
enum TooltipPosition { top, bottom, left, right }

// Apply via a wrapper widget (the equivalent of [eaTooltip] in Angular).
class EagamiTooltip extends StatelessWidget {
  const EagamiTooltip({
    super.key,
    required this.message,
    required this.child,
    this.position = TooltipPosition.top,
  });

  final String message;
  final Widget child;
  final TooltipPosition position;
}
```

**Behaviour:**
- Show on hover and focus; hide on leave, blur, or Escape.
- Suppress hover-triggered tooltips on touch-only devices (touch taps fire `mouseenter` but never `mouseleave`, leaving tooltips latched open). Re-attach pointer listeners reactively when hover capability changes (Bluetooth pointer connects, DevTools mobile mode toggles off, etc.).
- Wire `aria-describedby` on the host element by appending to any existing tokens (not overwriting).

### 5.31 Toast

```dart
enum ToastVariant { defaultVariant, success, warning, error, info }

class Toast {
  const Toast({
    required this.id,
    required this.message,
    required this.variant,
    required this.duration, // ms; 0 means manual dismiss only
  });
  final int id;
  final String message;
  final ToastVariant variant;
  final int duration;
}

class ToastOptions {
  const ToastOptions({this.variant = ToastVariant.defaultVariant, this.duration = 4000});
  final ToastVariant variant;
  final int duration;
}

/// Application-wide notification controller. Drive it from a ChangeNotifier /
/// Provider / Riverpod, then render the active list with `EagamiToastOutlet`.
class ToastService extends ChangeNotifier {
  int show(String message, {ToastOptions options = const ToastOptions()});
  int success(String message, {int duration = 4000});
  int error(String message, {int duration = 4000});
  int warning(String message, {int duration = 4000});
  int info(String message, {int duration = 4000});
  void dismiss(int id);
  void clear();
}

class EagamiToastOutlet extends StatelessWidget {
  const EagamiToastOutlet({super.key});
}
```

**Behaviour:**
- Place a single `EagamiToastOutlet` once near the root of the app so toasts created from anywhere are surfaced.
- `error` and `warning` variants render with `role: alert`; other variants use `role: status`.
- Honour reduced motion by degrading the slide-in to an opacity-only fade (the horizontal translate can trip vestibular sensitivity).
- Dismiss button accessible name comes from the locale's `toast.dismiss`.

### 5.32 Eagami wordmark

```dart
/// 1: "eagami", 2: "handcrafted by eagami" overline + "eagami",
/// 3: "eagami design system", 4: same as 3 plus a tagline.
enum EagamiWordmarkVariant { v1, v2, v3, v4 }
enum EagamiWordmarkLayout { stacked, inline }

class EagamiWordmark extends StatelessWidget {
  const EagamiWordmark({
    super.key,
    this.variant = EagamiWordmarkVariant.v1,
    this.layout = EagamiWordmarkLayout.stacked,
    this.size = 32, // pixels, continuous (not preset bucket)
  });

  final EagamiWordmarkVariant variant;
  final EagamiWordmarkLayout layout;
  final double size;
}
```

The brand name itself stays untranslated. Only the overline ("handcrafted by") and the tagline ("elegant web design") follow the active locale.

### 5.33 Icons

The upstream library ships an SVG icon set covering core utility, semantic, navigation, household, sports, and brand-mark categories. Each is exported as its own component (e.g. `<ea-icon-bell />`). For Flutter:

- Treat each icon as an `IconData`-equivalent constant (use Flutter's `Icon` widget with a custom font, or render each SVG via `flutter_svg`).
- Default sizing is `1em × 1em` so the icon scales to the inherited font size when placed inside buttons without an explicit size.
- For the brand icons (`Github`, `Apple`, `Facebook`, `XTwitter`, `Microsoft`, `Google`), render in `currentColor` by default so they inherit surrounding text colour, with an opt-in `brand: true` flag that paints them in the official brand colour. **Apple's logo is the strictest trademark of the set** and is deprecated in the upstream library for v2.0.0 removal; source the asset directly from Apple for any "Sign in with Apple" use case.
- The icon set is derived from Feather Icons (Cole Bemis, MIT). Brand icons are governed by trademark, not the MIT licence; consult each platform's brand guidelines before redistributing.

### 5.34 Icon button

There is no dedicated `EagamiIconButton` widget in the current library. To render an icon-only button, use `EagamiButton` with `variant: ButtonVariant.ghost` and an icon child, and supply `ariaLabel` so the action is announced verbally.

---

## 6. Internationalization

Eagami UI ships full i18n. Every built-in user-facing string (ARIA labels, placeholders, empty states, pagination labels, dismiss buttons, etc.) is provided in five locales and can be overridden per-string. A Flutter consumer should replicate the same surface so the design system stays consistent across both stacks.

### 6.1 Supported locales

```dart
/// BCP 47 locale tags supported out of the box.
enum EagamiLocale {
  en,    // English (default / fallback)
  frFR,  // French (France)
  el,    // Greek
  pl,    // Polish
  esES,  // Spanish (Spain)
}

/// Ordered list, useful for language switchers.
const List<EagamiLocale> kEagamiLocales = [
  EagamiLocale.en,
  EagamiLocale.frFR,
  EagamiLocale.el,
  EagamiLocale.pl,
  EagamiLocale.esES,
];
```

### 6.2 Message dictionary

Every user-facing string in the library is grouped by component. Parameterized strings are functions so each locale controls its own word order and pluralisation.

```dart
class EagamiMessages {
  const EagamiMessages({
    required this.alert,
    required this.autocomplete,
    required this.avatarEditor,
    required this.breadcrumbs,
    required this.codeInput,
    required this.dataTable,
    required this.datePicker,
    required this.dialog,
    required this.drawer,
    required this.dropdown,
    required this.input,
    required this.menu,
    required this.paginator,
    required this.progressBar,
    required this.spinner,
    required this.tag,
    required this.toast,
    required this.wordmark,
  });

  final AlertMessages alert;             // { dismiss }
  final AutocompleteMessages autocomplete; // { empty }
  final AvatarEditorMessages avatarEditor; // { upload, dropzone, canvas, change, revert, zoomOut, zoom, zoomIn, remove }
  final BreadcrumbsMessages breadcrumbs; // { label }
  final CodeInputMessages codeInput;     // { groupLabel(length), digitLabel(index, length) }
  final DataTableMessages dataTable;     // { noData }
  final DatePickerMessages datePicker;   // { placeholder, clear, previousYear, previousMonth, nextMonth, nextYear, today }
  final DialogMessages dialog;           // { close }
  final DrawerMessages drawer;           // { close }
  final DropdownMessages dropdown;       // { placeholder }
  final InputMessages input;             // { showPassword, hidePassword }
  final MenuMessages menu;               // { label }
  final PaginatorMessages paginator;     // { label, rowsPerPage, range(start, end, total), previousPage, nextPage }
  final ProgressBarMessages progressBar; // { label }
  final SpinnerMessages spinner;         // { label }
  final TagMessages tag;                 // { remove }
  final ToastMessages toast;             // { dismiss }
  final WordmarkMessages wordmark;       // { overline, tagline }
}
```

The English baseline (which acts as the fallback for any missing key) reads:

```dart
const EagamiMessages kEagamiEnglish = EagamiMessages(
  alert:         AlertMessages(dismiss: 'Dismiss'),
  autocomplete:  AutocompleteMessages(empty: 'No results'),
  avatarEditor:  AvatarEditorMessages(
    upload: 'Upload image',
    dropzone: 'Drop image or click to upload',
    canvas: 'Image preview, drag or use arrow keys to pan, slider to zoom',
    change: 'Change photo',
    revert: 'Revert to original',
    zoomOut: 'Zoom out',
    zoom: 'Zoom',
    zoomIn: 'Zoom in',
    remove: 'Remove image',
  ),
  breadcrumbs:   BreadcrumbsMessages(label: 'Breadcrumb'),
  codeInput:     CodeInputMessages(
    groupLabel: (length) => 'Verification code, $length digits',
    digitLabel: (index, length) => 'Digit $index of $length',
  ),
  dataTable:     DataTableMessages(noData: 'No data available'),
  datePicker:    DatePickerMessages(
    placeholder: 'Select date…',
    clear: 'Clear date',
    previousYear: 'Previous year',
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    nextYear: 'Next year',
    today: 'Today',
  ),
  dialog:        DialogMessages(close: 'Close dialog'),
  drawer:        DrawerMessages(close: 'Close panel'),
  dropdown:      DropdownMessages(placeholder: 'Select…'),
  input:         InputMessages(showPassword: 'Show password', hidePassword: 'Hide password'),
  menu:          MenuMessages(label: 'Menu'),
  paginator:     PaginatorMessages(
    label: 'Pagination',
    rowsPerPage: 'Rows per page:',
    range: (start, end, total) => '$start–$end of $total',
    previousPage: 'Previous page',
    nextPage: 'Next page',
  ),
  progressBar:   ProgressBarMessages(label: 'Progress'),
  spinner:       SpinnerMessages(label: 'Loading'),
  tag:           TagMessages(remove: 'Remove'),
  toast:         ToastMessages(dismiss: 'Dismiss'),
  wordmark:      WordmarkMessages(
    overline: 'handcrafted by',
    tagline: 'elegant web design',
  ),
);
```

Add `kEagamiFrench`, `kEagamiGreek`, `kEagamiPolish`, `kEagamiSpanish` constants that translate every key. **Use the upstream `packages/ui/src/lib/i18n/messages/*.ts` files as the source of truth for each translation** so wording stays in lockstep across stacks.

### 6.3 Runtime service

Expose a `ChangeNotifier` (or Riverpod `StateNotifier` / Provider, whichever matches the host app's state convention) so locale changes propagate to every consuming widget reactively:

```dart
class EagamiI18n extends ChangeNotifier {
  EagamiI18n({EagamiLocale initial = EagamiLocale.en, EagamiMessagesOverride? overrides})
      : _locale = initial,
        _overrides = overrides;

  EagamiLocale _locale;
  final EagamiMessagesOverride? _overrides;

  EagamiLocale get locale => _locale;
  EagamiMessages get messages {
    final base = _dictionaries[_locale] ?? kEagamiEnglish;
    return _overrides == null ? base : _applyOverrides(base, _overrides);
  }

  void setLocale(EagamiLocale next) {
    if (_dictionaries.containsKey(next)) {
      _locale = next;
    } else {
      _locale = EagamiLocale.en; // unknown locale → fall back to English
    }
    notifyListeners();
  }

  static const Map<EagamiLocale, EagamiMessages> _dictionaries = {
    EagamiLocale.en: kEagamiEnglish,
    EagamiLocale.frFR: kEagamiFrench,
    EagamiLocale.el: kEagamiGreek,
    EagamiLocale.pl: kEagamiPolish,
    EagamiLocale.esES: kEagamiSpanish,
  };
}
```

Provide the instance through whichever scoping mechanism the host app already uses (`InheritedNotifier`, `Provider.value`, Riverpod, etc.) and read it through a context extension:

```dart
extension EagamiI18nContext on BuildContext {
  EagamiI18n get eagamiI18n => /* read from the chosen scope */;
  EagamiMessages get eagamiMessages => eagamiI18n.messages;
}
```

Every widget that surfaces a built-in string should read it from `context.eagamiMessages` so a locale change rebuilds it.

### 6.4 Per-string overrides

`EagamiMessagesOverride` is a deep-partial of `EagamiMessages` (each component group is optional, each key within a group is optional). Apply overrides on top of the active locale's base dictionary:

```dart
// Replace just one string for the whole app.
EagamiI18n(
  initial: EagamiLocale.en,
  overrides: EagamiMessagesOverride(
    autocomplete: AutocompleteMessagesPartial(empty: 'Nothing matches that yet'),
  ),
);
```

Component-level inputs (`emptyMessage` on Autocomplete, `placeholder` on Dropdown / DatePicker, `noDataText` on DataTable, `ariaLabel` on Menu / Breadcrumbs, `removeLabel` on Tag, `label` on Spinner / ProgressBar) take precedence over the global dictionary when supplied.

### 6.5 French spacing helper

French typography requires "espace fine insécable" (narrow non-breaking space, U+202F) before high punctuation (`?` `!` `:` `;` `»`) and after `«`. The upstream library exports `frenchSpacing(text)`, an opt-in helper that performs that substitution. The library does **not** auto-apply it to anything; the component renders whatever string it receives. Apply it to consumer-supplied content (user input, CMS strings, etc.) you want correctly formatted for a French audience.

```dart
const _spaceBeforeHighPunct = r' ([!?:;»])';
const _spaceAfterOpenGuillemet = r'(«) ';

/// Replaces regular spaces with U+202F (narrow non-breaking space) in the
/// positions where standard French typography requires "espace fine insécable":
/// before `!` `?` `:` `;` `»`, and after `«`.
///
/// Opt-in. The Eagami UI library does not apply this automatically. Use it on
/// consumer-supplied French content you control. Do NOT apply it to URLs,
/// CSS, JSON, code, or other technical strings where these characters have
/// non-prose meaning. The function is idempotent.
String frenchSpacing(String text) {
  return text
      .replaceAllMapped(RegExp(_spaceBeforeHighPunct), (m) => ' ${m[1]}')
      .replaceAllMapped(RegExp(_spaceAfterOpenGuillemet), (m) => '${m[1]} ');
}

// Examples:
//   frenchSpacing('Lignes par page :');     // → 'Lignes par page :'
//   frenchSpacing("Qu'est-ce que c'est ?"); // → "Qu'est-ce que c'est ?"
//   frenchSpacing('Il a dit « bonjour ».'); // → 'Il a dit « bonjour ».'
```

The bundled French dictionary already uses U+202F where appropriate (e.g. `Lignes par page :` in `paginator.rowsPerPage`); do the same in any custom French translations you add so labels cannot wrap punctuation onto its own line.

### 6.6 Date picker locale handling

`EagamiDatePicker.locale` is optional. When unset, the picker uses the active `EagamiI18n` locale for both the displayed value (`short` / `medium` / `long` via `intl`'s `DateFormat`) and the weekday/month labels in the calendar grid.

---

## 7. Accessibility requirements

- **Semantics:** Every interactive widget must supply a `Semantics` label (either via the widget itself or a wrapping `Semantics`). Icon-only buttons must expose their action verbally via `ariaLabel`.
- **Live regions:**
  - Errors must be announced (`Semantics(liveRegion: true)` on the error message line).
  - `EagamiProgressBar` exposes `aria-busy: true` while `indeterminate: true`.
  - `EagamiAlert` and `Toast` use `role: alert` for `error` / `warning` (interrupting) and `role: status` for other variants (polite). Do not use `role: alert` for routine non-urgent messages.
- **Contrast:** Token combinations are pre-tested for WCAG AA:
  - Body text (`textPrimary` on `surfaceBase`): ≥ 4.5:1.
  - Large text (`h1`–`h4` on `surfaceBase`): ≥ 3:1.
  - `textLink` and `textLinkHover` meet AA in both light and dark schemes, with a perceptible rest→hover delta.
  - Never combine `textTertiary` with `surfaceMuted` for body text.
- **Touch targets:** 44×44 logical pixels minimum. The `md` and `lg` sizes satisfy this; `sm` is for dense secondary contexts only.
- **Focus order:** Must match visual reading order. Use `FocusTraversalGroup` and `FocusTraversalOrder` where needed.
- **Form fields:** Labels must be associated with inputs (pass `label` to `EagamiInput`, not a separate `Text` widget). `EagamiCodeInput` must mark every digit `aria-invalid` when the group has an error. Group controls (`EagamiRadioGroup`, `EagamiSegmented`, `EagamiCheckbox`, `EagamiSwitch`) must wire `aria-labelledby` to their rendered label and `aria-required`/`aria-invalid` to the host.
- **Dropdown / autocomplete / select:** The trigger must expose `aria-haspopup`, `aria-expanded`, `aria-controls`, `aria-required`, `aria-invalid`, and `aria-describedby` (for hint/error). When a listbox option is highlighted, mirror it on the trigger via `aria-activedescendant` so screen readers announce the highlighted option as the user arrows through.
- **Modals (dialog, drawer):** Derive `aria-labelledby` from the slotted header when no explicit `aria-label` is supplied; restore focus to the previously focused element on close.
- **Tabs:** Tab panels are keyboard-focusable and linked to their tab via `aria-controls` / `aria-labelledby`.
- **Tooltip:** Wire `aria-describedby` on the host by appending to any existing tokens (do not overwrite hint / error references). Dismiss on Escape. Suppress hover-triggered tooltips on touch-only devices to avoid the "sticky hover" pattern; reactively re-attach pointer listeners when hover capability returns.
- **Tables:** Use native table semantics with `scope="col"` headers. Sortable headers use `aria-sort`, not invalid composite roles.
- **Date picker:** Calendar grid receives focus on open; do not advertise the popover as `aria-modal`.
- **Reduced motion:** Use `context.eagamiDuration()` or the library's motion tokens. Toasts degrade their slide-in to an opacity-only fade; spinners slow rather than freeze.

---

## 8. Sync checklist

When regenerating this file from the upstream Angular library, verify in order:

1. `version` in frontmatter matches `packages/ui/package.json` `version`.
2. Every hex in § 2.1 matches `packages/ui/src/styles/tokens/_colors.scss` primitives (primary and secondary palettes were re-tuned in 1.0.2; check those carefully).
3. Every semantic token in § 2.2 matches the light/dark definitions in `_colors.scss`, including the dark-mode `surfaceElevated` (neutral-800), `textLink` (primary-300), and `*Subtle`/`*Muted` re-tints.
4. Spacing scale in § 2.3 matches `_spacing.scss` (only the 10-value whitelist).
5. Typography composites in § 2.5 match the `--text-*` tokens in `_typography.scss`.
6. Radius/border-width values in § 2.6 match `_shape.scss`.
7. Shadow values in § 2.7 match `_elevation.scss` for both light and dark mode (dark uses white-at-low-alpha with tighter geometry on `xl` / `2xl`).
8. Motion durations and curves in § 2.8 match `_motion.scss`.
9. Every `Color(0x…)` literal in § 3.2 matches the corresponding hex in § 2.
10. Component API conventions in § 5 match the Angular component `input()` / `output()` / `model()` signatures in `packages/ui/src/lib/<component>/<component>.component.ts`. Particular regressions to watch for:
    - All form controls take `errorMsg` (not `error`); the `status` enum was removed in 1.0.0.
    - Card uses `header` / `footer` slots (not `eaCardHeader` / `eaCardFooter` directives) since 1.0.0.
    - `Autocomplete`, `Dropdown`, and `Segmented` all consume the shared `SelectOption` type.
    - Standardised output names: `changed`, `sorted`, `clicked`, `removed`, `cropStateChanged`, `errored` (past tense).
    - `Tag` has no `primary` variant; use `Badge` for brand chips.
    - Menu is opened via the `eaMenuTrigger` directive on the host element (not the `slot="trigger"` pattern); mirror with a `trigger:` parameter in Flutter.
    - The `EagamiSize` enum is `sm | md | lg` (not `small | medium | large`); `EagamiAvatar` is the only component with its own five-bucket size scale.
11. i18n surface in § 6 matches `packages/ui/src/lib/i18n/`:
    - `EagamiLocale` enum matches `i18n.types.ts`.
    - `EagamiMessages` shape (group keys, per-group keys, function signatures for parameterised strings) matches `i18n.types.ts`.
    - English baseline strings in § 6.2 match `messages/en.ts`.
    - The supported-locale list and the French spacing helper match `messages/index.ts` and `french-spacing.ts`.
12. `last-synced` date in frontmatter updated to today.

**For AI agents performing the sync:** diff this file's tables and code blocks against the SCSS and TypeScript source of truth and report any discrepancies before editing Dart code. Do not regenerate blindly.
