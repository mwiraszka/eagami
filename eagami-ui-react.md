---
title: 'Eagami UI: React Integration'
version: 1.3.0
source: '@eagami/ui@1.3.0 (https://github.com/mwiraszka/eagami)'
last-synced: 2026-05-17
audience: human developers and AI coding agents
purpose: >
  Single-file specification for applying the Eagami UI design tokens and
  component conventions to a React/TypeScript codebase without depending on
  the upstream Angular library. Copy this file into the consuming project's
  docs/ directory. When building or modifying UI in that project, follow
  every rule below and use only the tokens listed here.
---

# Eagami UI: React Integration

This document is the complete, self-contained specification for porting the Eagami UI design system to a React project. It contains:

1. Mandatory design rules
2. Full token set (values)
3. Ready-to-paste setup (CSS custom properties + TypeScript constants)
4. Usage patterns (do / don't)
5. Component API conventions
6. Internationalization (i18n) parity
7. Accessibility requirements
8. Sync checklist

**For AI agents:** When building or modifying UI in this project, follow every rule in section 1 and use only the tokens in section 2 (accessed via the CSS file in section 3.1 or the TypeScript module in section 3.2). Do not introduce arbitrary color, spacing, or typography values. If a required token is missing, request an upstream addition rather than hard-coding. The `RULE:` markers below identify invariants that must always hold.

---

## Table of contents

1. [Design rules](#1-design-rules)
2. [Tokens](#2-tokens)
3. [Setup](#3-setup)
4. [Usage patterns](#4-usage-patterns)
5. [Component API conventions](#5-component-api-conventions)
6. [Internationalization](#6-internationalization)
7. [Accessibility requirements](#7-accessibility-requirements)
8. [Sync checklist](#8-sync-checklist)

---

## 1. Design rules

### 1.1 Spacing scale

**RULE:** All padding, margin, and gap values must be drawn from this scale:

`1, 2, 4, 8, 12, 16, 24, 32, 48, 64` (pixels)

Arbitrary values (5, 10, 20, 100, etc.) are forbidden. Prefer the CSS custom properties (`var(--space-1)`, `var(--stack-md)`) or the TypeScript constants (`spacing.s4`, `spacing.stackMd`) over numeric literals.

### 1.2 Colors

**RULE:** Never hard-code color literals (hex, `rgb()`, `rgba()`, `hsl()`, named colors) in component styles. All colors come from CSS custom properties.

- Use **semantic tokens** (`var(--color-text-primary)`, `var(--color-bg-base)`, `var(--color-border-default)`), not primitives (`var(--color-neutral-900)`).
- Tokens adapt automatically via the `prefers-color-scheme` media query. The library also honors an explicit `<html data-theme="light">` or `<html data-theme="dark">` override (see section 3.4).
- Never call `rgba()` on raw palette colors. Use the provided subtle/muted tokens for translucent fills.
- If a required semantic token is missing, add it upstream rather than falling back to primitives.

### 1.3 Focus indicators

**RULE:** Every focusable element must render a visible keyboard focus indicator.

- Use `box-shadow: var(--shadow-focus-ring);` on `:focus-visible`.
- Never set `outline: none` without replacing the indicator.
- Custom interactive components must handle focus state explicitly.

### 1.4 Motion and reduced motion

**RULE:** Use the provided motion tokens for all transitions and animations. The motion tokens automatically respect `prefers-reduced-motion`.

- Durations: `var(--duration-fast)`, `var(--duration-normal)`, `var(--duration-slow)`, `var(--duration-slower)`
- Easings: `var(--ease-in)`, `var(--ease-out)`, `var(--ease-in-out)`, `var(--ease-spring)`
- Composite transitions: `var(--transition-colors)`, `var(--transition-shadow)`, `var(--transition-transform)`, `var(--transition-opacity)`

Never use literal `200ms` / `ease-in-out` in CSS.

### 1.5 Typography

**RULE:** Use the composite text-style tokens (`--text-body-md-*`, `--text-h1-*`) rather than ad-hoc combinations of `font-size` + `font-weight`.

Do not compose styles from raw `--font-size-*` / `--font-weight-*` tokens unless creating a new composite. If a role is missing, add a composite token upstream.

### 1.6 Interactive element sizing

**RULE:** All tappable targets must be at least 44x44 pixels. Use the component size tokens (`sm` / `md` / `lg`), which are calibrated to meet this (except `sm`, which is reserved for non-tappable or secondary contexts).

### 1.7 Component API shape

**RULE:** React components that mirror Eagami components must preserve these prop shapes so behavior is predictable across Angular and React:

| Prop                 | Type                              | Notes                                                                                  |
| -------------------- | --------------------------------- | -------------------------------------------------------------------------------------- |
| `variant`            | union literal                     | Matches the Angular variant (e.g. `'primary' \| 'secondary' \| 'ghost' \| 'danger'`).  |
| `size`               | `'sm' \| 'md' \| 'lg'`            | Default `'md'`.                                                                        |
| `disabled`           | `boolean`                         | Default `false`.                                                                       |
| `readOnly`           | `boolean`                         | Where applicable (form controls).                                                      |
| `required`           | `boolean`                         | Where applicable (form controls).                                                      |
| `loading`            | `boolean`                         | Where applicable.                                                                      |
| `fullWidth`          | `boolean`                         | Where applicable.                                                                      |
| `hint` / `errorMsg`  | `string`                          | Form-field helper and error text. `errorMsg` drives the error visual state.            |
| `value` / `onChange` | controlled pattern                | Pair `value: T` with `onChange: (value: T) => void`.                                   |
| event outputs        | past-tense names                  | Mirror Angular: `clicked`, `changed`, `selected`, `dismissed`, `removed`, `sorted`.    |

See section 5 for per-component specifics.

---

## 2. Tokens

All values below mirror the CSS custom properties in `packages/ui/src/styles/tokens/*.scss` in the upstream Angular library. Do not edit these tables in isolation; regenerate this file when upstream tokens change (see section 8).

### 2.1 Colors, primitive palette

Use these only if a semantic token is not available. Adding a new semantic is almost always the right move.

#### Primary (brand)

The primary ramp is a single hue (H=205, S=50) varying only by lightness.

| Token                  | Hex       |
| ---------------------- | --------- |
| `--color-primary-50`   | `#ECF3F9` |
| `--color-primary-100`  | `#D1E3F0` |
| `--color-primary-200`  | `#ABCBE3` |
| `--color-primary-300`  | `#7DAFD4` |
| `--color-primary-400`  | `#4B91C3` |
| `--color-primary-500`  | `#3674A1` |
| `--color-primary-600`  | `#2A5B7E` |
| `--color-primary-700`  | `#204560` |
| `--color-primary-800`  | `#162F41` |
| `--color-primary-900`  | `#0D1C26` |

#### Secondary

The secondary ramp is a single hue (H=264, S=25) varying only by lightness.

| Token                   | Hex       |
| ----------------------- | --------- |
| `--color-secondary-50`  | `#F2EFF5` |
| `--color-secondary-100` | `#DFD9E8` |
| `--color-secondary-200` | `#C4B9D5` |
| `--color-secondary-300` | `#A493BE` |
| `--color-secondary-400` | `#8169A5` |
| `--color-secondary-500` | `#665086` |
| `--color-secondary-600` | `#503F69` |
| `--color-secondary-700` | `#3D3050` |
| `--color-secondary-800` | `#292136` |
| `--color-secondary-900` | `#181320` |

#### Neutral

| Token                 | Hex       |
| --------------------- | --------- |
| `--color-neutral-0`   | `#FFFFFF` |
| `--color-neutral-50`  | `#F9FAFB` |
| `--color-neutral-100` | `#F3F4F6` |
| `--color-neutral-200` | `#E5E7EB` |
| `--color-neutral-300` | `#D1D5DB` |
| `--color-neutral-400` | `#9CA3AF` |
| `--color-neutral-500` | `#6B7280` |
| `--color-neutral-600` | `#4B5563` |
| `--color-neutral-700` | `#374151` |
| `--color-neutral-800` | `#1F2937` |
| `--color-neutral-900` | `#111827` |
| `--color-neutral-950` | `#030712` |

#### Feedback

| Token                 | Hex       |     | Token                 | Hex       |
| --------------------- | --------- | --- | --------------------- | --------- |
| `--color-success-50`  | `#F0FDF4` |     | `--color-warning-50`  | `#FFFBEB` |
| `--color-success-100` | `#DCFCE7` |     | `--color-warning-100` | `#FEF3C7` |
| `--color-success-200` | `#BBF7D0` |     | `--color-warning-200` | `#FDE68A` |
| `--color-success-500` | `#22C55E` |     | `--color-warning-500` | `#F59E0B` |
| `--color-success-600` | `#16A34A` |     | `--color-warning-600` | `#D97706` |
| `--color-success-700` | `#15803D` |     | `--color-warning-700` | `#B45309` |
| `--color-error-50`    | `#FEF2F2` |     | `--color-info-50`     | `#ECFEFF` |
| `--color-error-100`   | `#FEE2E2` |     | `--color-info-100`    | `#CFFAFE` |
| `--color-error-200`   | `#FECACA` |     | `--color-info-200`    | `#A5F3FC` |
| `--color-error-500`   | `#EF4444` |     | `--color-info-500`    | `#06B6D4` |
| `--color-error-600`   | `#DC2626` |     | `--color-info-600`    | `#0891B2` |
| `--color-error-700`   | `#B91C1C` |     | `--color-info-700`    | `#0E7490` |

### 2.2 Colors, semantic (light / dark)

In light mode (default) and dark mode (`@media (prefers-color-scheme: dark)`, or `<html data-theme="dark">`):

| Semantic token                       | Light ref               | Dark ref                       |
| ------------------------------------ | ----------------------- | ------------------------------ |
| `--color-text-primary`               | `--color-neutral-900`   | `--color-neutral-50`           |
| `--color-text-secondary`             | `--color-neutral-600`   | `--color-neutral-400`          |
| `--color-text-tertiary`              | `--color-neutral-400`   | `--color-neutral-500`          |
| `--color-text-disabled`              | `--color-neutral-300`   | `--color-neutral-700`          |
| `--color-text-inverse`               | `--color-neutral-0`     | `--color-neutral-900`          |
| `--color-text-link`                  | `--color-primary-600`   | `--color-primary-300`          |
| `--color-text-link-hover`            | `--color-primary-800`   | `--color-primary-100`          |
| `--color-bg-base`                    | `--color-neutral-0`     | `--color-neutral-950`          |
| `--color-bg-subtle`                  | `--color-neutral-50`    | `--color-neutral-900`          |
| `--color-bg-elevated`                | `--color-neutral-0`     | `--color-neutral-800`          |
| `--color-bg-muted`                   | `--color-neutral-100`   | `--color-neutral-700`          |
| `--color-bg-overlay`                 | `rgba(0,0,0,0.5)`       | `rgba(0,0,0,0.5)`              |
| `--color-border-default`             | `--color-neutral-200`   | `--color-neutral-700`          |
| `--color-border-strong`              | `--color-neutral-400`   | `--color-neutral-500`          |
| `--color-border-focus`               | `--color-primary-500`   | `--color-primary-500`          |
| `--color-brand-default`              | `--color-primary-600`   | `--color-primary-400`          |
| `--color-brand-hover`                | `--color-primary-700`   | `--color-primary-300`          |
| `--color-brand-active`               | `--color-primary-800`   | `--color-primary-200`          |
| `--color-brand-subtle`               | `--color-primary-50`    | `rgba(75, 145, 195, 0.1)`      |
| `--color-brand-muted`                | `--color-primary-100`   | `rgba(75, 145, 195, 0.2)`      |
| `--color-brand-secondary-default`    | `--color-secondary-500` | `--color-secondary-500`        |
| `--color-brand-secondary-hover`      | `--color-secondary-600` | `--color-secondary-600`        |
| `--color-brand-secondary-active`     | `--color-secondary-700` | `--color-secondary-700`        |
| `--color-brand-secondary-subtle`     | `--color-secondary-50`  | `--color-secondary-50`         |
| `--color-brand-secondary-muted`      | `--color-secondary-100` | `--color-secondary-100`        |
| `--color-success-default`            | `--color-success-600`   | `--color-success-600`          |
| `--color-success-subtle`             | `--color-success-50`    | `rgba(34, 197, 94, 0.15)`      |
| `--color-success-muted`              | `--color-success-100`   | `rgba(34, 197, 94, 0.25)`      |
| `--color-warning-default`            | `--color-warning-600`   | `--color-warning-600`          |
| `--color-warning-subtle`             | `--color-warning-50`    | `rgba(245, 158, 11, 0.15)`     |
| `--color-warning-muted`              | `--color-warning-100`   | `rgba(245, 158, 11, 0.25)`     |
| `--color-error-default`              | `--color-error-600`     | `--color-error-600`            |
| `--color-error-subtle`               | `--color-error-50`      | `rgba(239, 68, 68, 0.15)`      |
| `--color-error-muted`                | `--color-error-100`     | `rgba(239, 68, 68, 0.25)`      |
| `--color-info-default`               | `--color-info-600`      | `--color-info-600`             |
| `--color-info-subtle`                | `--color-info-50`       | `rgba(6, 182, 212, 0.15)`      |
| `--color-info-muted`                 | `--color-info-100`      | `rgba(6, 182, 212, 0.25)`      |

In dark mode the background hierarchy steps from darkest page to lightest hover surface: `bg-base` (950) -> `bg-subtle` (900) -> `bg-elevated` (800) -> `bg-muted` (700). Elevation is conveyed through surface lightness rather than drop shadows, so `bg-muted` sits *above* `bg-elevated` to keep hover states inside elevated surfaces readable.

### 2.3 Spacing, base scale

| Token       | Value (px) |
| ----------- | ---------- |
| `--space-0` | 0          |
| `--space-1` | 4          |
| `--space-2` | 8          |
| `--space-3` | 12         |
| `--space-4` | 16         |
| `--space-6` | 24         |
| `--space-8` | 32         |
| `--space-12`| 48         |
| `--space-16`| 64         |

Only these values are permitted (see section 1.1). The upstream SCSS defines additional values (`--space-0-5`, `--space-1-5`, `--space-5`, `--space-7`, `--space-9`, `--space-10`, `--space-11`, `--space-14`, `--space-20`, `--space-24`, `--space-32`) for internal library use; consumers should not use them.

### 2.4 Spacing, semantic

**Inset (component padding, vertical horizontal):**

| Token        | Value                              |
| ------------ | ---------------------------------- |
| `--inset-xs` | `var(--space-1) var(--space-2)`   (4px 8px)  |
| `--inset-sm` | `var(--space-1-5) var(--space-3)` (6px 12px) |
| `--inset-md` | `var(--space-2) var(--space-4)`   (8px 16px) |
| `--inset-lg` | `var(--space-3) var(--space-6)`   (12px 24px)|
| `--inset-xl` | `var(--space-4) var(--space-8)`   (16px 32px)|

**Stack (vertical gap):**

| Token          | Value |
| -------------- | ----- |
| `--stack-2xs`  | 4px   |
| `--stack-xs`   | 8px   |
| `--stack-sm`   | 12px  |
| `--stack-md`   | 16px  |
| `--stack-lg`   | 24px  |
| `--stack-xl`   | 32px  |
| `--stack-2xl`  | 48px  |

**Inline (horizontal gap):**

| Token          | Value |
| -------------- | ----- |
| `--inline-2xs` | 4px   |
| `--inline-xs`  | 8px   |
| `--inline-sm`  | 12px  |
| `--inline-md`  | 16px  |
| `--inline-lg`  | 24px  |

### 2.5 Typography

**Font families:**

| Token                  | Stack                                                       |
| ---------------------- | ----------------------------------------------------------- |
| `--font-family-sans`   | DM Sans, Segoe UI, system-ui, -apple-system, sans-serif     |
| `--font-family-brand`  | Syne, DM Sans, system-ui, sans-serif                        |
| `--font-family-serif`  | Georgia, Times New Roman, serif                             |
| `--font-family-mono`   | JetBrains Mono, Fira Code, Cascadia Code, monospace         |

Load fonts via `<link>` to Google Fonts or self-hosted via `@font-face`.

**Font sizes (rem, base 16px):**

| Token               | rem     | px  |
| ------------------- | ------- | --- |
| `--font-size-2xs`   | 0.625   | 10  |
| `--font-size-xs`    | 0.75    | 12  |
| `--font-size-sm`    | 0.875   | 14  |
| `--font-size-md`    | 1.0     | 16  |
| `--font-size-lg`    | 1.125   | 18  |
| `--font-size-xl`    | 1.25    | 20  |
| `--font-size-2xl`   | 1.5     | 24  |
| `--font-size-3xl`   | 1.875   | 30  |
| `--font-size-4xl`   | 2.25    | 36  |
| `--font-size-5xl`   | 3.0     | 48  |

**Font weights:** `regular` 400, `medium` 500, `semibold` 600, `bold` 700, `extrabold` 800.

**Line heights:** `none` 1, `tight` 1.25, `snug` 1.375, `normal` 1.5, `relaxed` 1.625, `loose` 2.

**Letter spacing:** `tighter` -0.05em, `tight` -0.025em, `normal` 0, `wide` 0.025em, `wider` 0.05em, `widest` 0.1em.

**Composite text styles** (use these in components):

Each role exposes three custom properties: `size`, `weight`, `lh`.

| Role          | Size        | Weight  | LH      |
| ------------- | ----------- | ------- | ------- |
| `display`     | 5xl         | bold    | tight   |
| `h1`          | 4xl         | bold    | tight   |
| `h2`          | 3xl         | semibold| snug    |
| `h3`          | 2xl         | semibold| snug    |
| `h4`          | xl          | semibold| snug    |
| `body-lg`     | lg          | regular | relaxed |
| `body-md`     | md          | regular | normal  |
| `body-sm`     | sm          | regular | normal  |
| `label-lg`    | md          | medium  | tight   |
| `label-md`    | sm          | medium  | tight   |
| `label-sm`    | xs          | medium  | tight   |
| `helper`      | xs          | regular | normal  |
| `code`        | sm          | regular | normal  (+ mono family) |

Usage example:

```css
.title {
  font-size: var(--text-h2-size);
  font-weight: var(--text-h2-weight);
  line-height: var(--text-h2-lh);
}
```

### 2.6 Shape

**Border radius:**

| Token            | Value   |
| ---------------- | ------- |
| `--radius-none`  | 0       |
| `--radius-xs`    | 2px     |
| `--radius-sm`    | 4px     |
| `--radius-md`    | 6px     |
| `--radius-lg`    | 8px     |
| `--radius-xl`    | 12px    |
| `--radius-2xl`   | 16px    |
| `--radius-3xl`   | 24px    |
| `--radius-full`  | 9999px  |

**Border width:**

| Token                   | Value |
| ----------------------- | ----- |
| `--border-width-none`   | 0     |
| `--border-width-thin`   | 1px   |
| `--border-width-medium` | 2px   |
| `--border-width-thick`  | 4px   |

### 2.7 Elevation

**Shadows (light mode):**

| Token                         | Value                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| `--shadow-none`               | `none`                                                                                   |
| `--shadow-xs`                 | `0 1px 2px 0 rgba(0,0,0,0.05)`                                                            |
| `--shadow-sm`                 | `0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)`                             |
| `--shadow-md`                 | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)`                          |
| `--shadow-lg`                 | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)`                        |
| `--shadow-xl`                 | `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)`                       |
| `--shadow-2xl`                | `0 25px 50px -12px rgba(0,0,0,0.25)`                                                      |
| `--shadow-inner`              | `inset 0 2px 4px 0 rgba(0,0,0,0.05)`                                                      |
| `--shadow-focus-ring`         | `0 0 0 3px rgba(59,130,246,0.45)`                                                         |
| `--shadow-focus-ring-error`   | `0 0 0 3px var(--color-error-200)`                                                        |
| `--shadow-focus-ring-success` | `0 0 0 3px var(--color-success-200)`                                                      |

**Shadows (dark mode):** black drop shadows vanish against the near-black `bg-base`, so dark mode swaps to white-at-low-alpha values. `xs` through `lg` use the light geometry; `xl` and `2xl` use tighter offset/blur and lower alpha so the lighter fade does not bloom into a halo.

| Token         | Dark value                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| `--shadow-xs` | `0 1px 2px 0 rgba(255,255,255,0.04)`                                                                    |
| `--shadow-sm` | `0 1px 3px 0 rgba(255,255,255,0.05), 0 1px 2px -1px rgba(255,255,255,0.04)`                              |
| `--shadow-md` | `0 4px 6px -1px rgba(255,255,255,0.06), 0 2px 4px -2px rgba(255,255,255,0.04)`                           |
| `--shadow-lg` | `0 8px 12px -2px rgba(255,255,255,0.08), 0 3px 5px -3px rgba(255,255,255,0.05)`                          |
| `--shadow-xl` | `0 12px 18px -4px rgba(255,255,255,0.05), 0 5px 8px -4px rgba(255,255,255,0.03)`                         |
| `--shadow-2xl`| `0 16px 28px -8px rgba(255,255,255,0.06)`                                                                |

**Z-index:**

| Token               | Value |
| ------------------- | ----- |
| `--z-index-base`    | 0     |
| `--z-index-raised`  | 10    |
| `--z-index-dropdown`| 100   |
| `--z-index-sticky`  | 200   |
| `--z-index-overlay` | 300   |
| `--z-index-modal`   | 400   |
| `--z-index-popover` | 500   |
| `--z-index-toast`   | 600   |
| `--z-index-tooltip` | 700   |

### 2.8 Motion

**Durations:**

| Token                | Value  |
| -------------------- | ------ |
| `--duration-instant` | 0ms    |
| `--duration-fast`    | 100ms  |
| `--duration-normal`  | 200ms  |
| `--duration-slow`    | 300ms  |
| `--duration-slower`  | 500ms  |

Under `@media (prefers-reduced-motion: reduce)`, all non-instant durations collapse to 0ms automatically.

**Easings:**

| Token             | Value                                |
| ----------------- | ------------------------------------ |
| `--ease-linear`   | `linear`                             |
| `--ease-in`       | `cubic-bezier(0.4, 0, 1, 1)`         |
| `--ease-out`      | `cubic-bezier(0, 0, 0.2, 1)`         |
| `--ease-in-out`   | `cubic-bezier(0.4, 0, 0.2, 1)`       |
| `--ease-spring`   | `cubic-bezier(0.34, 1.56, 0.64, 1)`  |

**Composite transitions:**

| Token                    | Value                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `--transition-colors`    | color, background-color, border-color, fill, `fast` `ease-out`                       |
| `--transition-shadow`    | box-shadow, `fast` `ease-out`                                                        |
| `--transition-transform` | transform, `normal` `ease-spring`                                                    |
| `--transition-opacity`   | opacity, `normal` `ease-out`                                                         |
| `--transition-all`       | all, `normal` `ease-in-out`                                                          |

---

## 3. Setup

### 3.1 CSS custom properties

Copy the block below to `src/styles/eagami-tokens.css` in the consuming project and import it once from your root (`main.tsx` / `_app.tsx` / `layout.tsx`).

```css
/* ---------------------------------------------------------------------------
 * Eagami UI: CSS Tokens
 * Sync source: @eagami/ui@1.3.0 (packages/ui/src/styles/tokens/*.scss)
 * Do not edit by hand; regenerate from the upstream SCSS.
 * ------------------------------------------------------------------------- */

:root {
  /* Primitive palette: primary (H=205, S=50) */
  --color-primary-50: #ecf3f9;
  --color-primary-100: #d1e3f0;
  --color-primary-200: #abcbe3;
  --color-primary-300: #7dafd4;
  --color-primary-400: #4b91c3;
  --color-primary-500: #3674a1;
  --color-primary-600: #2a5b7e;
  --color-primary-700: #204560;
  --color-primary-800: #162f41;
  --color-primary-900: #0d1c26;

  /* Primitive palette: secondary (H=264, S=25) */
  --color-secondary-50: #f2eff5;
  --color-secondary-100: #dfd9e8;
  --color-secondary-200: #c4b9d5;
  --color-secondary-300: #a493be;
  --color-secondary-400: #8169a5;
  --color-secondary-500: #665086;
  --color-secondary-600: #503f69;
  --color-secondary-700: #3d3050;
  --color-secondary-800: #292136;
  --color-secondary-900: #181320;

  /* Primitive palette: neutral */
  --color-neutral-0: #ffffff;
  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-200: #e5e7eb;
  --color-neutral-300: #d1d5db;
  --color-neutral-400: #9ca3af;
  --color-neutral-500: #6b7280;
  --color-neutral-600: #4b5563;
  --color-neutral-700: #374151;
  --color-neutral-800: #1f2937;
  --color-neutral-900: #111827;
  --color-neutral-950: #030712;

  /* Primitive palette: feedback */
  --color-success-50: #f0fdf4;
  --color-success-100: #dcfce7;
  --color-success-200: #bbf7d0;
  --color-success-500: #22c55e;
  --color-success-600: #16a34a;
  --color-success-700: #15803d;
  --color-warning-50: #fffbeb;
  --color-warning-100: #fef3c7;
  --color-warning-200: #fde68a;
  --color-warning-500: #f59e0b;
  --color-warning-600: #d97706;
  --color-warning-700: #b45309;
  --color-error-50: #fef2f2;
  --color-error-100: #fee2e2;
  --color-error-200: #fecaca;
  --color-error-500: #ef4444;
  --color-error-600: #dc2626;
  --color-error-700: #b91c1c;
  --color-info-50: #ecfeff;
  --color-info-100: #cffafe;
  --color-info-200: #a5f3fc;
  --color-info-500: #06b6d4;
  --color-info-600: #0891b2;
  --color-info-700: #0e7490;

  /* Semantic: text */
  --color-text-primary: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-600);
  --color-text-tertiary: var(--color-neutral-400);
  --color-text-disabled: var(--color-neutral-300);
  --color-text-inverse: var(--color-neutral-0);
  --color-text-link: var(--color-primary-600);
  --color-text-link-hover: var(--color-primary-800);

  /* Semantic: background */
  --color-bg-base: var(--color-neutral-0);
  --color-bg-subtle: var(--color-neutral-50);
  --color-bg-elevated: var(--color-neutral-0);
  --color-bg-muted: var(--color-neutral-100);
  --color-bg-overlay: rgba(0, 0, 0, 0.5);

  /* Semantic: border */
  --color-border-default: var(--color-neutral-200);
  --color-border-strong: var(--color-neutral-400);
  --color-border-focus: var(--color-primary-500);

  /* Semantic: brand */
  --color-brand-default: var(--color-primary-600);
  --color-brand-hover: var(--color-primary-700);
  --color-brand-active: var(--color-primary-800);
  --color-brand-subtle: var(--color-primary-50);
  --color-brand-muted: var(--color-primary-100);
  --color-brand-secondary-default: var(--color-secondary-500);
  --color-brand-secondary-hover: var(--color-secondary-600);
  --color-brand-secondary-active: var(--color-secondary-700);
  --color-brand-secondary-subtle: var(--color-secondary-50);
  --color-brand-secondary-muted: var(--color-secondary-100);

  /* Semantic: feedback */
  --color-success-default: var(--color-success-600);
  --color-success-subtle: var(--color-success-50);
  --color-success-muted: var(--color-success-100);
  --color-warning-default: var(--color-warning-600);
  --color-warning-subtle: var(--color-warning-50);
  --color-warning-muted: var(--color-warning-100);
  --color-error-default: var(--color-error-600);
  --color-error-subtle: var(--color-error-50);
  --color-error-muted: var(--color-error-100);
  --color-info-default: var(--color-info-600);
  --color-info-subtle: var(--color-info-50);
  --color-info-muted: var(--color-info-100);

  /* Spacing: base scale (whitelist only) */
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Spacing: semantic insets */
  --inset-xs: 0.25rem 0.5rem;
  --inset-sm: 0.375rem 0.75rem;
  --inset-md: 0.5rem 1rem;
  --inset-lg: 0.75rem 1.5rem;
  --inset-xl: 1rem 2rem;

  /* Spacing: stack */
  --stack-2xs: 0.25rem;
  --stack-xs: 0.5rem;
  --stack-sm: 0.75rem;
  --stack-md: 1rem;
  --stack-lg: 1.5rem;
  --stack-xl: 2rem;
  --stack-2xl: 3rem;

  /* Spacing: inline */
  --inline-2xs: 0.25rem;
  --inline-xs: 0.5rem;
  --inline-sm: 0.75rem;
  --inline-md: 1rem;
  --inline-lg: 1.5rem;

  /* Typography: families */
  --font-family-sans: 'DM Sans', 'Segoe UI', system-ui, -apple-system, sans-serif;
  --font-family-brand: 'Syne', 'DM Sans', system-ui, sans-serif;
  --font-family-serif: 'Georgia', 'Times New Roman', serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;

  /* Typography: sizes */
  --font-size-2xs: 0.625rem;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;

  /* Typography: weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* Typography: line heights */
  --line-height-none: 1;
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;

  /* Typography: composite text styles */
  --text-display-size: var(--font-size-5xl);
  --text-display-weight: var(--font-weight-bold);
  --text-display-lh: var(--line-height-tight);
  --text-h1-size: var(--font-size-4xl);
  --text-h1-weight: var(--font-weight-bold);
  --text-h1-lh: var(--line-height-tight);
  --text-h2-size: var(--font-size-3xl);
  --text-h2-weight: var(--font-weight-semibold);
  --text-h2-lh: var(--line-height-snug);
  --text-h3-size: var(--font-size-2xl);
  --text-h3-weight: var(--font-weight-semibold);
  --text-h3-lh: var(--line-height-snug);
  --text-h4-size: var(--font-size-xl);
  --text-h4-weight: var(--font-weight-semibold);
  --text-h4-lh: var(--line-height-snug);
  --text-body-lg-size: var(--font-size-lg);
  --text-body-lg-weight: var(--font-weight-regular);
  --text-body-lg-lh: var(--line-height-relaxed);
  --text-body-md-size: var(--font-size-md);
  --text-body-md-weight: var(--font-weight-regular);
  --text-body-md-lh: var(--line-height-normal);
  --text-body-sm-size: var(--font-size-sm);
  --text-body-sm-weight: var(--font-weight-regular);
  --text-body-sm-lh: var(--line-height-normal);
  --text-label-lg-size: var(--font-size-md);
  --text-label-lg-weight: var(--font-weight-medium);
  --text-label-lg-lh: var(--line-height-tight);
  --text-label-md-size: var(--font-size-sm);
  --text-label-md-weight: var(--font-weight-medium);
  --text-label-md-lh: var(--line-height-tight);
  --text-label-sm-size: var(--font-size-xs);
  --text-label-sm-weight: var(--font-weight-medium);
  --text-label-sm-lh: var(--line-height-tight);
  --text-helper-size: var(--font-size-xs);
  --text-helper-weight: var(--font-weight-regular);
  --text-helper-lh: var(--line-height-normal);
  --text-code-size: var(--font-size-sm);
  --text-code-weight: var(--font-weight-regular);
  --text-code-family: var(--font-family-mono);

  /* Shape: radius */
  --radius-none: 0;
  --radius-xs: 0.125rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;

  /* Shape: border widths */
  --border-width-none: 0;
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 4px;

  /* Elevation: shadows (light) */
  --shadow-none: none;
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  --shadow-focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.45);
  --shadow-focus-ring-error: 0 0 0 3px var(--color-error-200);
  --shadow-focus-ring-success: 0 0 0 3px var(--color-success-200);

  /* Elevation: z-index */
  --z-index-base: 0;
  --z-index-raised: 10;
  --z-index-dropdown: 100;
  --z-index-sticky: 200;
  --z-index-overlay: 300;
  --z-index-modal: 400;
  --z-index-popover: 500;
  --z-index-toast: 600;
  --z-index-tooltip: 700;

  /* Motion: durations */
  --duration-instant: 0ms;
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;

  /* Motion: easings */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Motion: composite transitions */
  --transition-colors:
    color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    fill var(--duration-fast) var(--ease-out);
  --transition-shadow: box-shadow var(--duration-fast) var(--ease-out);
  --transition-transform: transform var(--duration-normal) var(--ease-spring);
  --transition-opacity: opacity var(--duration-normal) var(--ease-out);
  --transition-all: all var(--duration-normal) var(--ease-in-out);
}

/* Dark-mode overrides: applied automatically when the OS prefers dark,
 * unless the consumer forces light via <html data-theme="light">. To
 * force dark regardless of OS, set <html data-theme="dark">. */
@mixin-eagami-dark-tokens {
  /* (Read by the two selectors below; expand inline if your tool
   * pipeline cannot use SCSS-style mixins.) */
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --color-text-primary: var(--color-neutral-50);
    --color-text-secondary: var(--color-neutral-400);
    --color-text-tertiary: var(--color-neutral-500);
    --color-text-disabled: var(--color-neutral-700);
    --color-text-inverse: var(--color-neutral-900);
    --color-text-link: var(--color-primary-300);
    --color-text-link-hover: var(--color-primary-100);

    --color-bg-base: var(--color-neutral-950);
    --color-bg-subtle: var(--color-neutral-900);
    --color-bg-elevated: var(--color-neutral-800);
    --color-bg-muted: var(--color-neutral-700);

    --color-border-default: var(--color-neutral-700);
    --color-border-strong: var(--color-neutral-500);

    --color-brand-default: var(--color-primary-400);
    --color-brand-hover: var(--color-primary-300);
    --color-brand-active: var(--color-primary-200);
    --color-brand-subtle: rgba(75, 145, 195, 0.1);
    --color-brand-muted: rgba(75, 145, 195, 0.2);

    --color-success-subtle: rgba(34, 197, 94, 0.15);
    --color-success-muted: rgba(34, 197, 94, 0.25);
    --color-warning-subtle: rgba(245, 158, 11, 0.15);
    --color-warning-muted: rgba(245, 158, 11, 0.25);
    --color-error-subtle: rgba(239, 68, 68, 0.15);
    --color-error-muted: rgba(239, 68, 68, 0.25);
    --color-info-subtle: rgba(6, 182, 212, 0.15);
    --color-info-muted: rgba(6, 182, 212, 0.25);

    --shadow-xs: 0 1px 2px 0 rgba(255, 255, 255, 0.04);
    --shadow-sm: 0 1px 3px 0 rgba(255, 255, 255, 0.05), 0 1px 2px -1px rgba(255, 255, 255, 0.04);
    --shadow-md: 0 4px 6px -1px rgba(255, 255, 255, 0.06), 0 2px 4px -2px rgba(255, 255, 255, 0.04);
    --shadow-lg: 0 8px 12px -2px rgba(255, 255, 255, 0.08), 0 3px 5px -3px rgba(255, 255, 255, 0.05);
    --shadow-xl: 0 12px 18px -4px rgba(255, 255, 255, 0.05), 0 5px 8px -4px rgba(255, 255, 255, 0.03);
    --shadow-2xl: 0 16px 28px -8px rgba(255, 255, 255, 0.06);
  }
}

:root[data-theme='dark'] {
  color-scheme: dark;
  --color-text-primary: var(--color-neutral-50);
  --color-text-secondary: var(--color-neutral-400);
  --color-text-tertiary: var(--color-neutral-500);
  --color-text-disabled: var(--color-neutral-700);
  --color-text-inverse: var(--color-neutral-900);
  --color-text-link: var(--color-primary-300);
  --color-text-link-hover: var(--color-primary-100);

  --color-bg-base: var(--color-neutral-950);
  --color-bg-subtle: var(--color-neutral-900);
  --color-bg-elevated: var(--color-neutral-800);
  --color-bg-muted: var(--color-neutral-700);

  --color-border-default: var(--color-neutral-700);
  --color-border-strong: var(--color-neutral-500);

  --color-brand-default: var(--color-primary-400);
  --color-brand-hover: var(--color-primary-300);
  --color-brand-active: var(--color-primary-200);
  --color-brand-subtle: rgba(75, 145, 195, 0.1);
  --color-brand-muted: rgba(75, 145, 195, 0.2);

  --color-success-subtle: rgba(34, 197, 94, 0.15);
  --color-success-muted: rgba(34, 197, 94, 0.25);
  --color-warning-subtle: rgba(245, 158, 11, 0.15);
  --color-warning-muted: rgba(245, 158, 11, 0.25);
  --color-error-subtle: rgba(239, 68, 68, 0.15);
  --color-error-muted: rgba(239, 68, 68, 0.25);
  --color-info-subtle: rgba(6, 182, 212, 0.15);
  --color-info-muted: rgba(6, 182, 212, 0.25);

  --shadow-xs: 0 1px 2px 0 rgba(255, 255, 255, 0.04);
  --shadow-sm: 0 1px 3px 0 rgba(255, 255, 255, 0.05), 0 1px 2px -1px rgba(255, 255, 255, 0.04);
  --shadow-md: 0 4px 6px -1px rgba(255, 255, 255, 0.06), 0 2px 4px -2px rgba(255, 255, 255, 0.04);
  --shadow-lg: 0 8px 12px -2px rgba(255, 255, 255, 0.08), 0 3px 5px -3px rgba(255, 255, 255, 0.05);
  --shadow-xl: 0 12px 18px -4px rgba(255, 255, 255, 0.05), 0 5px 8px -4px rgba(255, 255, 255, 0.03);
  --shadow-2xl: 0 16px 28px -8px rgba(255, 255, 255, 0.06);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-normal: 0ms;
    --duration-slow: 0ms;
    --duration-slower: 0ms;
  }
}
```

> The block above duplicates the dark-mode declarations across the `@media` and `[data-theme='dark']` selectors to match the upstream SCSS, which uses a `@mixin` to share them. Keep the two lists identical when you edit.

### 3.2 TypeScript constants module

For JS access (CSS-in-JS, Tailwind config, runtime theming), create `src/theme/eagami-tokens.ts`. This mirrors the primitive palette; prefer reading CSS vars at runtime via `getComputedStyle` for semantic tokens (which change with theme).

```ts
/**
 * Eagami UI: TypeScript tokens
 * Sync source: @eagami/ui@1.3.0
 */

export const palette = {
  primary: {
    50: '#ecf3f9', 100: '#d1e3f0', 200: '#abcbe3', 300: '#7dafd4', 400: '#4b91c3',
    500: '#3674a1', 600: '#2a5b7e', 700: '#204560', 800: '#162f41', 900: '#0d1c26',
  },
  secondary: {
    50: '#f2eff5', 100: '#dfd9e8', 200: '#c4b9d5', 300: '#a493be', 400: '#8169a5',
    500: '#665086', 600: '#503f69', 700: '#3d3050', 800: '#292136', 900: '#181320',
  },
  neutral: {
    0: '#ffffff', 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db',
    400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937',
    900: '#111827', 950: '#030712',
  },
  success: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 500: '#22c55e', 600: '#16a34a', 700: '#15803d' },
  warning: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 500: '#f59e0b', 600: '#d97706', 700: '#b45309' },
  error:   { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c' },
  info:    { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490' },
} as const;

export const spacing = {
  s0: 0, s1: 4, s2: 8, s3: 12, s4: 16, s6: 24, s8: 32, s12: 48, s16: 64,
  stack: { xxs: 4, xs: 8, sm: 12, md: 16, lg: 24, xl: 32, xxl: 48 },
  inline: { xxs: 4, xs: 8, sm: 12, md: 16, lg: 24 },
} as const;

export const radius = {
  none: 0, xs: 2, sm: 4, md: 6, lg: 8, xl: 12, xxl: 16, xxxl: 24, full: 9999,
} as const;

export const borderWidth = { none: 0, thin: 1, medium: 2, thick: 4 } as const;

export const duration = {
  instant: 0, fast: 100, normal: 200, slow: 300, slower: 500,
} as const;

export const easing = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export const zIndex = {
  base: 0, raised: 10, dropdown: 100, sticky: 200, overlay: 300,
  modal: 400, popover: 500, toast: 600, tooltip: 700,
} as const;

/**
 * Read a semantic color token at runtime. Use this when you need the current
 * resolved value in JS (e.g. for Canvas rendering). For everything else, prefer
 * CSS `var(--color-...)` references.
 */
export function readCssToken(name: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
```

### 3.3 Importing tokens in the root

```tsx
// app/layout.tsx (Next.js) or main.tsx (Vite) or _app.tsx (pages router)
import './styles/eagami-tokens.css';

// then import your app entry as usual
```

### 3.4 Manual dark mode override

The token block in section 3.1 already supports both `@media (prefers-color-scheme: dark)` and an explicit `<html data-theme="...">` override. Apply the override at runtime:

```ts
type Theme = 'light' | 'dark' | 'auto';

export function setTheme(theme: Theme): void {
  if (theme === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
```

`data-theme="light"` forces light mode even when the OS prefers dark. `data-theme="dark"` forces dark regardless of OS. Removing the attribute defers to `prefers-color-scheme`.

---

## 4. Usage patterns

### 4.1 Do

```tsx
// Button.tsx
import styles from './Button.module.css';

export function Button({ children, variant = 'primary', size = 'md', ...rest }: Props) {
  return (
    <button
      className={`${styles.root} ${styles[variant]} ${styles[size]}`}
      {...rest}
    >
      {children}
    </button>
  );
}
```

```css
/* Button.module.css */
.root {
  padding: var(--inset-md);
  font-size: var(--text-label-md-size);
  font-weight: var(--text-label-md-weight);
  line-height: var(--text-label-md-lh);
  border: var(--border-width-thin) solid transparent;
  border-radius: var(--radius-md);
  transition: var(--transition-colors), var(--transition-shadow);
  cursor: pointer;
}
.root:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus-ring);
}
.primary {
  background: var(--color-brand-default);
  color: var(--color-text-inverse);
}
.primary:hover {
  background: var(--color-brand-hover);
}
.primary:active {
  background: var(--color-brand-active);
}
.sm { padding: var(--inset-sm); font-size: var(--text-label-sm-size); }
.lg { padding: var(--inset-lg); font-size: var(--text-label-lg-size); }
```

### 4.2 Don't

```css
/* WRONG: hard-coded colors, spacing, typography, transition */
.root {
  padding: 10px 15px;                    /* not on the scale, use --inset-md */
  background: #2a5b7e;                   /* use var(--color-brand-default) */
  color: white;                          /* use var(--color-text-inverse) */
  border-radius: 5px;                    /* not a radius token */
  font-size: 15px;                       /* use --text-label-md-size */
  transition: all 200ms ease-in-out;     /* use var(--transition-colors) */
}
.root:focus {
  outline: 2px solid blue;               /* use box-shadow: var(--shadow-focus-ring) on :focus-visible */
}
```

### 4.3 With CSS-in-JS (styled-components / emotion)

CSS variables work transparently:

```tsx
import styled from 'styled-components';

const Card = styled.article`
  padding: var(--inset-lg);
  background: var(--color-bg-elevated);
  border: var(--border-width-thin) solid var(--color-border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
`;
```

For JS-side values (e.g. prop-derived), import from `eagami-tokens.ts`:

```tsx
import { spacing } from '@/theme/eagami-tokens';

const Stack = styled.div<{ gap?: keyof typeof spacing.stack }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap = 'md' }) => spacing.stack[gap]}px;
`;
```

### 4.4 With Tailwind

Extend `tailwind.config.js` using the CSS variables:

```js
// tailwind.config.js
import { palette, spacing, radius } from './src/theme/eagami-tokens';

export default {
  theme: {
    colors: {
      ...palette,
      text: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        tertiary: 'var(--color-text-tertiary)',
        disabled: 'var(--color-text-disabled)',
        inverse: 'var(--color-text-inverse)',
        link: 'var(--color-text-link)',
      },
      bg: {
        base: 'var(--color-bg-base)',
        subtle: 'var(--color-bg-subtle)',
        elevated: 'var(--color-bg-elevated)',
        muted: 'var(--color-bg-muted)',
      },
      border: {
        DEFAULT: 'var(--color-border-default)',
        strong: 'var(--color-border-strong)',
      },
      brand: {
        DEFAULT: 'var(--color-brand-default)',
        hover: 'var(--color-brand-hover)',
        active: 'var(--color-brand-active)',
        subtle: 'var(--color-brand-subtle)',
        muted: 'var(--color-brand-muted)',
      },
    },
    spacing: {
      0: '0', 1: '4px', 2: '8px', 3: '12px', 4: '16px',
      6: '24px', 8: '32px', 12: '48px', 16: '64px',
    },
    borderRadius: {
      none: '0', xs: '2px', sm: '4px', md: '6px', lg: '8px',
      xl: '12px', '2xl': '16px', '3xl': '24px', full: '9999px',
    },
    boxShadow: {
      xs: 'var(--shadow-xs)',
      sm: 'var(--shadow-sm)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
      xl: 'var(--shadow-xl)',
      '2xl': 'var(--shadow-2xl)',
      focus: 'var(--shadow-focus-ring)',
    },
    extend: {
      darkMode: ['class', '[data-theme="dark"]'],
    },
  },
};
```

**Keep the Tailwind config's spacing table in sync with section 2.3.** Tailwind's default scale includes values (5, 7, 9, 10, 11, 14, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96) that violate the Eagami scale. Either override the entire `spacing` key (as above) or configure a lint rule to prevent forbidden keys.

---

## 5. Component API conventions

When building React components that mirror Eagami components, preserve the prop names, variant literals, defaults, and past-tense event names below. Inputs default to `undefined` unless noted.

### 5.1 Button

```ts
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';
type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant;        // default 'primary'
  size?: Size;                    // default 'md'
  type?: ButtonType;              // default 'button'
  disabled?: boolean;             // default false
  loading?: boolean;              // default false
  fullWidth?: boolean;            // default false
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // 'clicked' upstream
}
```

**Behavior:**
- `loading` shows a spinner and disables the button but preserves width (`visibility: hidden` on the children, spinner positioned absolutely).
- `fullWidth` sets `width: 100%`.
- Hover: background shifts to `--color-brand-hover` / `--color-brand-active`.
- Native `disabled` is authoritative; do not add `aria-disabled`.

### 5.2 Input

```ts
type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'prefix'> {
  label?: string;
  placeholder?: string;
  hint?: string;
  errorMsg?: string;              // setting this puts the input in the error visual state
  type?: InputType;               // default 'text'
  size?: Size;                    // default 'md'
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;          // emits string, not the event
  onFocus?: (e: React.FocusEvent) => void;     // mirrors `focused`
  onBlur?: (e: React.FocusEvent) => void;      // mirrors `blurred`
  prefix?: React.ReactNode;       // icon/element rendered inside the input, left
  suffix?: React.ReactNode;       // icon/element rendered inside the input, right
}
```

Note: there is no `status` prop and no `success` visual state. The error state is driven solely by `errorMsg`. The password-visibility toggle (when `type === 'password'`) must be keyboard-reachable, with an accessible name driven by the `input.showPassword` / `input.hidePassword` i18n strings (see section 6).

### 5.3 Textarea

Mirrors `Input` but renders a `<textarea>`. Same `label` / `hint` / `errorMsg` / `size` / `disabled` / `readOnly` / `required` / `value` / `onChange(value: string)` / `onFocus` / `onBlur` props. Add `rows?: number` and `autoResize?: boolean`.

### 5.4 Checkbox

```ts
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  hint?: string;
  errorMsg?: string;
  size?: Size;
  disabled?: boolean;
  required?: boolean;
  indeterminate?: boolean;
}
```

### 5.5 Switch

```ts
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  hint?: string;
  errorMsg?: string;
  size?: Size;
  disabled?: boolean;
  required?: boolean;
  'aria-label'?: string;          // required when label is omitted
}
```

### 5.6 Radio group

```ts
interface RadioGroupProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  name?: string;
  label?: string;
  hint?: string;
  errorMsg?: string;
  size?: Size;
  orientation?: 'vertical' | 'horizontal'; // default 'vertical'
  disabled?: boolean;
  required?: boolean;
  id?: string;
  children: React.ReactNode;      // expects <Radio> children
}

interface RadioProps<T extends string> {
  value: T;
  label?: string;
  disabled?: boolean;
}
```

Vertically centre the label against the radio circle.

### 5.7 Card

```ts
type CardVariant = 'elevated' | 'outlined' | 'filled';
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface CardProps {
  variant?: CardVariant;          // default 'elevated'
  padding?: CardPadding;          // default 'md'
  fullWidth?: boolean;
  headerDivider?: boolean;        // renders a divider between header and body
  header?: React.ReactNode;       // slotted via a `header` prop, not children
  footer?: React.ReactNode;       // slotted via a `footer` prop, not children
  children: React.ReactNode;
}
```

The `elevated` variant uses `--color-bg-elevated` for the surface and adds a hairline border. Shadows alone cannot define elevation in dark mode, so the border carries the edge while the shadow plus the `bg-elevated` step convey depth.

### 5.8 Dialog

```ts
type DialogSize = 'sm' | 'md' | 'lg' | 'full';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: DialogSize;              // default 'md'
  closeOnBackdrop?: boolean;      // default true
  closeOnEscape?: boolean;        // default true
  showClose?: boolean;            // default true
  id?: string;                    // exposed for external aria-labelledby/aria-controls
  'aria-label'?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}
```

Build on the native `<dialog>` element with `showModal()` to inherit focus trap and inert backdrop. When the dialog closes, return focus to the element that opened it. When no `aria-label` is provided, derive `aria-labelledby` from the slotted header.

### 5.9 Drawer

```ts
type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: DrawerPosition;      // default 'right'
  size?: DrawerSize;              // default 'md'
  closeOnBackdrop?: boolean;      // default true
  closeOnEscape?: boolean;        // default true
  showClose?: boolean;            // default true
  id?: string;
  'aria-label'?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  onOpened?: () => void;
  onClosed?: () => void;
}
```

Same `<dialog>`-based construction and focus-restore behavior as Dialog.

### 5.10 SelectOption

The same `SelectOption` shape is reused by every single-select control in the system (Dropdown, Autocomplete, Segmented). Define it once and import it.

```ts
interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  disabled?: boolean;
}
```

### 5.11 Dropdown

```ts
interface DropdownProps<T extends string> {
  options: SelectOption<T>[];
  value: T | '';
  onChange: (value: T) => void;   // mirrors `changed`
  label?: string;
  placeholder?: string;
  hint?: string;
  errorMsg?: string;
  size?: Size;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  id?: string;
}
```

**Keyboard:** ArrowUp/Down to navigate, Enter/Space to select, Escape to close. The trigger must expose `aria-controls`, `aria-activedescendant`, `aria-haspopup="listbox"`, and `aria-invalid` / `aria-describedby` when error/hint are set. Position the listbox with `position: fixed` anchored to the trigger so it escapes overflow-hidden ancestors, and allow it to grow wider than the trigger.

### 5.12 Autocomplete

```ts
interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;      // text changes, mirrors `changed`
  onSelected?: (option: SelectOption) => void; // mirrors `selected`
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  hint?: string;
  errorMsg?: string;
  emptyMessage?: string;                  // default uses i18n autocomplete.empty
  minLength?: number;                     // default 0
  maxResults?: number;                    // default 10
  size?: Size;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  id?: string;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
}
```

The input must declare `aria-haspopup="listbox"` and `aria-autocomplete="list"`.

### 5.13 Segmented

```ts
interface SegmentedProps<T extends string> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  hint?: string;
  errorMsg?: string;
  size?: Size;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  'aria-label'?: string;
  id?: string;
}
```

Arrow-key navigation across segments. Selected segment uses an elevated "pill" with `--shadow-sm`.

### 5.14 Slider

```ts
interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;                   // default 0
  max?: number;                   // default 100
  step?: number;                  // default 1
  label?: string;
  hint?: string;
  errorMsg?: string;
  size?: Size;
  disabled?: boolean;
  required?: boolean;
  showValue?: boolean;            // default false
  showMinMaxLabels?: boolean;     // default false
  formatValue?: (value: number) => string;
  'aria-label'?: string;
  id?: string;
}
```

Keyboard: arrows, PageUp/PageDown, Home/End. Pointer drag.

### 5.15 DatePicker

```ts
type DatePickerFormat = 'short' | 'medium' | 'long';
type DatePickerWeekStart = 0 | 1;

interface DatePickerProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
  label?: string;
  placeholder?: string;
  hint?: string;
  errorMsg?: string;
  size?: Size;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  minDate?: Date | null;
  maxDate?: Date | null;
  format?: DatePickerFormat;      // default 'medium'
  weekStartsOn?: DatePickerWeekStart; // default 1 (Monday)
  locale?: string;                // overrides the EagamiI18nProvider locale
  id?: string;
}
```

Calendar grid receives focus on open. Keyboard: arrows, PageUp/PageDown, Home/End, Enter, Escape. The clear button must be a sibling of the trigger, not nested inside it.

### 5.16 CodeInput

```ts
interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onCompleted?: (value: string) => void;
  length?: number;                // default 6
  label?: string;
  placeholder?: string;
  hint?: string;
  errorMsg?: string;
  size?: Size;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  id?: string;
}
```

Each digit slot is an individual `<input>`. The group needs an accessible name derived from `codeInput.groupLabel(length)` (see section 6); each digit gets `codeInput.digitLabel(index, length)` and reflects `aria-invalid` when the group has an error.

### 5.17 DataTable

```ts
type DataTableDensity = 'compact' | 'comfortable' | 'spacious';
type DataTableSortDirection = 'asc' | 'desc' | null;

interface DataTableColumn<T = Record<string, unknown>> {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  cell?: (row: T) => React.ReactNode;
}

interface DataTableSortState {
  column: string;
  direction: DataTableSortDirection;
}

interface DataTableProps<T = Record<string, unknown>> {
  columns: DataTableColumn<T>[];  // required
  data: T[];                      // required
  trackBy?: keyof T;
  density?: DataTableDensity;     // default 'comfortable'
  stickyHeader?: boolean;
  striped?: boolean;
  hoverable?: boolean;            // default true
  bordered?: boolean;
  noDataText?: string;            // default uses i18n dataTable.noData
  sort?: DataTableSortState;
  onSortChange?: (sort: DataTableSortState) => void; // mirrors `sorted`
  children?: React.ReactNode;     // optional <Paginator/> footer slot
}
```

Use native `<table>` semantics with `scope="col"` headers; sortable headers use the implicit `<th>` role plus `aria-sort`. Horizontal scrolling must wrap only the table itself so a slotted paginator stays outside the scrolled coordinate space.

### 5.18 Paginator

```ts
type PaginatorAlign = 'left' | 'center' | 'right';

interface PaginatorState {
  page: number;
  pageSize: number;
}

interface PaginatorProps {
  total: number;                          // total row count
  page: number;
  pageSize: number;
  onChange: (state: PaginatorState) => void;
  pageSizeOptions?: number[];             // default [10, 25, 50, 100]
  showPageSizeSelector?: boolean;         // default true
  showRangeLabel?: boolean;               // default true
  align?: PaginatorAlign;                 // default 'right'
  disabled?: boolean;
}
```

### 5.19 Tabs

```ts
type TabsVariant = 'underline' | 'filled';

interface TabsProps {
  activeTab: string;
  onChange: (id: string) => void;
  variant?: TabsVariant;          // default 'underline'
  size?: Size;
  children: React.ReactNode;      // <Tab id="..." label="..."> children
}

interface TabProps {
  id: string;
  label: string;
  disabled?: boolean;
  children?: React.ReactNode;     // panel content
}
```

Each panel is linked to its tab button via `aria-controls` / `aria-labelledby` and is keyboard-focusable.

### 5.20 Accordion

```ts
interface AccordionProps {
  allowMultiple?: boolean;        // default false
  children: React.ReactNode;      // <AccordionItem> children
}

interface AccordionItemProps {
  id: string;
  title: React.ReactNode;
  expanded?: boolean;             // controlled
  onChange?: (expanded: boolean) => void;
  disabled?: boolean;
  children: React.ReactNode;
}
```

Trigger and panel must be linked via `aria-controls` / `aria-labelledby`.

### 5.21 Breadcrumbs

```ts
type BreadcrumbsSeparator = 'chevron' | 'slash';

interface BreadcrumbItem {
  label: string;
  href?: string;
  disabled?: boolean;
}

interface BreadcrumbClickEvent {
  item: BreadcrumbItem;
  index: number;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: BreadcrumbsSeparator; // default 'chevron'
  onClick?: (event: BreadcrumbClickEvent) => void; // mirrors `clicked`
  'aria-label'?: string;          // default uses i18n breadcrumbs.label
}
```

The last item is rendered as the current page automatically.

### 5.22 Menu (with MenuTrigger)

Unlike most components, the menu trigger is a separate concern. Apply a `MenuTrigger` wrapper / hook to your own button rather than passing it via children. The trigger receives `aria-haspopup`, `aria-expanded`, `aria-controls`. The popup uses `position: fixed` so it escapes overflow-clipping ancestors.

```ts
type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

interface MenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placement?: MenuPlacement;      // default 'bottom-start'
  disabled?: boolean;
  id?: string;
  'aria-label'?: string;
  children: React.ReactNode;      // <MenuItem> children
}

interface MenuItemProps {
  disabled?: boolean;
  onClick?: () => void;           // mirrors `clicked`
  children: React.ReactNode;
}
```

Roving keyboard navigation across items: arrow keys, Home/End, focus the first item on open.

### 5.23 Alert

```ts
type AlertVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface AlertProps {
  variant?: AlertVariant;         // default 'default'
  dismissible?: boolean;          // default false
  visible?: boolean;              // controlled visibility; default true
  onDismiss?: () => void;
  children: React.ReactNode;
}
```

The decorative status icon is hidden from assistive technology. `error` and `warning` variants use `role="alert"`; the others use `role="status"` with a polite live region.

### 5.24 Toast

```ts
type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
  duration: number;
}

interface ToastOptions {
  variant?: ToastVariant;
  duration?: number;              // default 4000 ms
}

// One <ToastOutlet /> must be mounted somewhere in the tree.
interface ToastApi {
  show(message: string, options?: ToastOptions): number;
  success(message: string, duration?: number): number;
  error(message: string, duration?: number): number;
  warning(message: string, duration?: number): number;
  info(message: string, duration?: number): number;
  dismiss(id: number): void;
}

// Recommended API:
//   const toast = useToast();
//   toast.success('Saved');
```

The slide-in animation degrades to an opacity-only fade under `prefers-reduced-motion`. In dark mode, the colored variants must stack the tint over an opaque `--color-bg-elevated` base so they do not bleed through underlying page content. Use the lighter `*-200` text shade in dark mode for legibility.

### 5.25 Tooltip

```ts
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: React.ReactNode;
  position?: TooltipPosition;     // default 'top'
  children: React.ReactElement;   // the trigger element
}
```

The popover uses `role="tooltip"` and dismisses on Escape. Append to (do not overwrite) the trigger's `aria-describedby`. Suppress hover-triggered tooltips on touch devices via a `(hover: hover)` media query subscription; keep focus/blur listeners always attached.

### 5.26 Tag

```ts
type TagVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface TagProps {
  variant?: TagVariant;           // default 'default'
  size?: Size;
  removable?: boolean;            // default false
  disabled?: boolean;
  removeLabel?: string;           // per-tag override for the remove-button accessible name
  onRemove?: () => void;          // mirrors `removed`
  children: React.ReactNode;
}
```

There is no `primary` variant; tags are reserved for semantic statuses. For brand-coloured chips, use `Badge` or a styled element.

### 5.27 Badge

```ts
type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: Size;
  children: React.ReactNode;
}
```

### 5.28 Avatar

```ts
interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;              // used as the accessible name when `alt` is empty
  size?: Size | number;
  shape?: 'circle' | 'square';
}
```

### 5.29 AvatarEditor

```ts
type AvatarEditorShape = 'circle' | 'square';

interface AvatarEditorCropState {
  x: number;
  y: number;
  zoom: number;
}

interface AvatarEditorCropEvent {
  blob: Blob;
  dataUrl: string;
  state: AvatarEditorCropState;
}

interface AvatarEditorProps {
  shape?: AvatarEditorShape;      // default 'circle'
  canvasSize?: number;            // default 200 (px)
  currentSrc?: string;
  loading?: boolean;
  accept?: string;                // default 'image/*'
  maxFileSize?: number;           // default 5 * 1024 * 1024
  minZoom?: number;               // default 1
  maxZoom?: number;               // default 3
  exportQuality?: number;         // default 0.92
  exportType?: string;            // default 'image/png'
  cropState?: AvatarEditorCropState | null;
  onCropped?: (e: AvatarEditorCropEvent) => void;
  onFileSelected?: (file: File) => void;
  onRemoved?: () => void;
  onErrored?: (message: string) => void;
  onCropStateChanged?: (state: AvatarEditorCropState) => void;
}
```

Canvas is keyboard-pannable (arrow keys, Shift for larger steps; `+`/`-` to zoom) and exposes a descriptive `aria-label`. The "Change photo" hover overlay picks white or black ink based on the loaded photo's average luminance, not the active theme.

### 5.30 EmptyState

```ts
type EmptyStateHeadingLevel = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface EmptyStateProps {
  title?: string;
  description?: string;
  size?: Size;
  headingLevel?: EmptyStateHeadingLevel; // default 'h2'
  media?: React.ReactNode;        // icon, illustration, etc.
  actions?: React.ReactNode;      // CTA buttons
}
```

### 5.31 Skeleton

```ts
type SkeletonVariant = 'text' | 'circle' | 'rect';

interface SkeletonProps {
  variant?: SkeletonVariant;      // default 'text'
  width?: string;                 // CSS length, e.g. '12rem' or '100%'
  height?: string;
  animated?: boolean;             // default true
}
```

### 5.32 ProgressBar, Spinner, Divider, EagamiWordmark

- **ProgressBar:** `value: number`, `max?: number = 100`, `label?: string` (default `undefined`), `indeterminate?: boolean`. Exposes `aria-busy` while indeterminate.
- **Spinner:** `size?: Size`. Honors `prefers-reduced-motion` by slowing the spin rather than disabling it.
- **Divider:** `orientation?: 'horizontal' | 'vertical'`, `label?: string`.
- **EagamiWordmark:** `variant?: 1 | 2 | 3 | 4` (numeric, maps to four text options internally), `layout?: 'stacked' | 'inline'`, `size?: number` (CSS pixel value for continuous scaling). Use for branded eagami pages only.

### 5.33 Icon

The library ships 100 single-color icons (Feather-derived, MIT). In React, expose them as named components in an `eagami-icons` module, each accepting:

```ts
interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number | string;         // default 24
  color?: string;                 // default 'currentColor'
}
```

Single-color brand icons (`GithubIcon`, `FacebookIcon`, `XTwitterIcon`, `MicrosoftIcon`, `GoogleIcon`) default to `currentColor` so they inherit surrounding text color. Pass `brand` to opt back in to the original brand color. `AppleIcon` is deprecated and will be removed in a future major; consumers needing it should source the asset directly from Apple per their brand guidelines.

The full icon set: `AlertCircle`, `AlertTriangle`, `Archive`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `ArrowUp`, `AtSign`, `BarChart`, `Bell`, `Bookmark`, `Briefcase`, `Calendar`, `Camera`, `Check`, `CheckCircle`, `ChevronDown`, `ChevronLeft`, `ChevronRight`, `ChevronUp`, `ChevronsUpDown`, `Clipboard`, `Clock`, `Cloud`, `Copy`, `CreditCard`, `DollarSign`, `Download`, `Eagami` (brand mark), `ExternalLink`, `Eye`, `EyeOff`, `File`, `Filter`, `Flag`, `Folder`, `Gift`, `Globe`, `Hash`, `Heart`, `HelpCircle`, `Home`, `Image`, `Inbox`, `Info`, `Link`, `List`, `Loader`, `Lock`, `LogIn`, `LogOut`, `Mail`, `MapPin`, `Maximize`, `Menu`, `Mic`, `Minimize`, `Minus`, `Monitor`, `Moon`, `MoreHorizontal`, `Package`, `Paperclip`, `Pause`, `Pencil`, `Phone`, `Play`, `Plus`, `Printer`, `RefreshCw`, `RotateCcw`, `Save`, `Search`, `Send`, `Settings`, `Share`, `Shield`, `ShoppingCart`, `Smartphone`, `Star`, `Sun`, `ThumbsDown`, `ThumbsUp`, `Trash`, `TrendingUp`, `Unlock`, `Upload`, `User`, `Users`, `Video`, `Volume2`, `Wifi`, `X`, `XCircle`, `Zap`. Brand icons: `Apple` (deprecated), `Facebook`, `Github`, `Google`, `Microsoft`, `XTwitter`.

---

## 6. Internationalization

The Angular library ships built-in strings (ARIA labels, placeholders, empty states, default labels) in five locales and exposes a runtime API to switch and override them. A faithful React port must replicate the same shape so consumer code is transferable.

### 6.1 Supported locales

```ts
export type EagamiLocale = 'en' | 'fr-FR' | 'el' | 'pl' | 'es-ES';

export const EAGAMI_LOCALES: readonly EagamiLocale[] = [
  'en', 'fr-FR', 'el', 'pl', 'es-ES',
];
```

English is the default and fallback for unknown locales or missing keys.

### 6.2 Message dictionary shape

Every user-facing string baked into the library lives in this interface. Parameterized strings are functions so each locale controls its own word order and pluralization.

```ts
export interface EagamiMessages {
  alert: { dismiss: string };
  autocomplete: { empty: string };
  avatarEditor: {
    upload: string;
    dropzone: string;
    canvas: string;
    change: string;
    revert: string;
    zoomOut: string;
    zoom: string;
    zoomIn: string;
    remove: string;
  };
  breadcrumbs: { label: string };
  codeInput: {
    groupLabel: (length: number) => string;
    digitLabel: (index: number, length: number) => string;
  };
  dataTable: { noData: string };
  datePicker: {
    placeholder: string;
    clear: string;
    previousYear: string;
    previousMonth: string;
    nextMonth: string;
    nextYear: string;
    today: string;
  };
  dialog: { close: string };
  drawer: { close: string };
  dropdown: { placeholder: string };
  input: { showPassword: string; hidePassword: string };
  menu: { label: string };
  paginator: {
    label: string;
    rowsPerPage: string;
    range: (start: number, end: number, total: number) => string;
    previousPage: string;
    nextPage: string;
  };
  progressBar: { label: string };
  spinner: { label: string };
  tag: { remove: string };
  toast: { dismiss: string };
  wordmark: { overline: string; tagline: string };
}

export type EagamiMessagesOverride = {
  [G in keyof EagamiMessages]?: Partial<EagamiMessages[G]>;
};

export interface EagamiI18nConfig {
  locale?: EagamiLocale;                  // default 'en'
  messages?: EagamiMessagesOverride;      // shallow-merged per group over the base
}
```

Ship a `messages` directory with one file per locale (`en.ts`, `fr-FR.ts`, `el.ts`, `pl.ts`, `es-ES.ts`) plus an `index.ts` that exports the keyed lookup map `EAGAMI_MESSAGES: Record<EagamiLocale, EagamiMessages>`.

### 6.3 Provider and hook

```tsx
// EagamiI18nProvider.tsx
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { EagamiI18nConfig, EagamiLocale, EagamiMessages, EagamiMessagesOverride } from './i18n.types';
import { EAGAMI_MESSAGES, en } from './messages';

interface EagamiI18nContextValue {
  locale: EagamiLocale;
  messages: EagamiMessages;
  setLocale: (locale: EagamiLocale) => void;
}

const EagamiI18nContext = createContext<EagamiI18nContextValue | null>(null);

function applyOverrides(base: EagamiMessages, overrides: EagamiMessagesOverride): EagamiMessages {
  const merged = {} as EagamiMessages;
  for (const key of Object.keys(base) as (keyof EagamiMessages)[]) {
    merged[key] = { ...base[key], ...(overrides[key] ?? {}) } as EagamiMessages[never];
  }
  return merged;
}

export function EagamiI18nProvider({
  config = {},
  children,
}: {
  config?: EagamiI18nConfig;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<EagamiLocale>(config.locale ?? 'en');

  const setLocale = useCallback((next: EagamiLocale) => {
    setLocaleState(EAGAMI_MESSAGES[next] ? next : 'en');
  }, []);

  const messages = useMemo(() => {
    const base = EAGAMI_MESSAGES[locale] ?? en;
    return config.messages ? applyOverrides(base, config.messages) : base;
  }, [locale, config.messages]);

  const value = useMemo<EagamiI18nContextValue>(
    () => ({ locale, messages, setLocale }),
    [locale, messages, setLocale],
  );

  return <EagamiI18nContext.Provider value={value}>{children}</EagamiI18nContext.Provider>;
}

export function useEagamiI18n(): EagamiI18nContextValue {
  const ctx = useContext(EagamiI18nContext);
  if (!ctx) {
    // Library components must work without a provider; fall back silently.
    return { locale: 'en', messages: en, setLocale: () => {} };
  }
  return ctx;
}
```

### 6.4 Configuring the app

```tsx
// main.tsx
import { createRoot } from 'react-dom/client';
import { EagamiI18nProvider } from './theme/EagamiI18nProvider';
import App from './App';
import './styles/eagami-tokens.css';

createRoot(document.getElementById('root')!).render(
  <EagamiI18nProvider config={{ locale: 'fr-FR' }}>
    <App />
  </EagamiI18nProvider>,
);
```

### 6.5 Switching locale at runtime

```tsx
function LocaleSwitcher() {
  const { locale, setLocale } = useEagamiI18n();
  return (
    <Segmented
      value={locale}
      onChange={setLocale}
      options={[
        { value: 'en', label: 'EN' },
        { value: 'fr-FR', label: 'FR' },
        { value: 'el', label: 'EL' },
        { value: 'pl', label: 'PL' },
        { value: 'es-ES', label: 'ES' },
      ]}
    />
  );
}
```

Changing the locale rerenders every consumer of `useEagamiI18n()`, so all built-in strings flip together.

### 6.6 Overriding individual strings

```tsx
<EagamiI18nProvider
  config={{
    locale: 'en',
    messages: {
      paginator: { rowsPerPage: 'Items per page' },
      input: { showPassword: 'Reveal secret' },
    },
  }}
>
  <App />
</EagamiI18nProvider>
```

For one-off overrides at a single call site, accept an explicit prop on the component (`emptyMessage`, `placeholder`, `noDataText`, `removeLabel`, `aria-label`, etc.) and let it win over the i18n value.

### 6.7 Consuming messages inside a component

```tsx
function CloseButton() {
  const { messages } = useEagamiI18n();
  return (
    <IconButton aria-label={messages.dialog.close} onClick={...}>
      <X />
    </IconButton>
  );
}
```

### 6.8 Locale-aware DatePicker formatting

When `locale` is omitted on `DatePicker`, fall back to the active `EagamiI18nProvider` locale and pass it to `Intl.DateTimeFormat` for the visible date label.

```ts
const { locale } = useEagamiI18n();
const formatter = new Intl.DateTimeFormat(props.locale ?? locale, { dateStyle: 'medium' });
```

### 6.9 French spacing helper

French typography requires a narrow non-breaking space (U+202F) before `?` `!` `:` `;` `»` and after `«`. Provide an opt-in helper for consumer-supplied content (user input, CMS strings) destined for a French audience. The library never auto-applies this to inputs; the bundled French messages already contain U+202F.

```ts
const SPACE_BEFORE_HIGH_PUNCT = / ([!?:;»])/g;
const SPACE_AFTER_OPEN_GUILLEMET = /(«) /g;

/**
 * Replace regular ASCII spaces with U+202F where French typography requires
 * "espace fine insécable": before ! ? : ; », and after «. Idempotent.
 *
 * Do not apply to URLs, CSS, JSON, code snippets, or other strings where `:`
 * or `?` carry non-prose meaning.
 *
 * @example
 *   frenchSpacing('Lignes par page :');        // 'Lignes par page :'
 *   frenchSpacing("Qu'est-ce que c'est ?");    // "Qu'est-ce que c'est ?"
 *   frenchSpacing('Il a dit « bonjour ».');    // 'Il a dit « bonjour ».'
 */
export function frenchSpacing(text: string): string {
  return text
    .replace(SPACE_BEFORE_HIGH_PUNCT, ' $1')
    .replace(SPACE_AFTER_OPEN_GUILLEMET, '$1 ');
}
```

---

## 7. Accessibility requirements

- **Semantics:** Use the right element. Buttons are `<button>`, links are `<a href>`, form fields use `<input>` / `<textarea>` / `<select>` with associated `<label>`. Icon-only buttons require `aria-label`.
- **Contrast:** Token combinations pre-tested for WCAG AA:
  - Body text (`--color-text-primary` on `--color-bg-base`): at least 4.5:1.
  - Large text (h1-h4) on `--color-bg-base`: at least 3:1.
  - Links (`--color-text-link` and `--color-text-link-hover`) meet AA against `--color-bg-base` in both light and dark mode, and the rest-to-hover delta is perceptible.
  - Never combine `--color-text-tertiary` with `--color-bg-muted` for body text.
- **Touch targets:** 44x44 px minimum. The `md` and `lg` sizes satisfy this; `sm` is for non-tappable or secondary contexts only.
- **Focus management:** Modal/drawer open -> focus moves inside; close -> focus returns to the element that opened it. Use `inert` on background content while a modal is open.
- **Keyboard:** Every interaction reachable without a mouse. Custom components must implement the standard key conventions (see section 5 notes).
- **Form fields:** Labels must be associated via `htmlFor` / `id` (or by wrapping). Errors must be announced (`aria-invalid` + `aria-describedby` pointing to the error message). Required custom controls must expose `aria-required`.
- **Live regions:** Scope `role="alert"` to `error` and `warning` variants of Alert and Toast. Non-urgent variants use `role="status"` with a polite live region.
- **Tooltips:** Use `role="tooltip"`, append to (do not overwrite) the trigger's `aria-describedby`, dismiss on Escape, and suppress on touch devices via a `(hover: hover)` media query subscription.
- **Reduced motion:** Rely on the provided `--duration-*` tokens; they collapse to 0ms automatically. Do not use literal `200ms` values. Animations that cannot collapse to instant (Spinner, Toast slide-in) must degrade gracefully (slower spin, opacity-only fade).
- **Internationalization:** All built-in ARIA strings come from the i18n dictionary (see section 6). Never hard-code English ARIA values inside a component.

---

## 8. Sync checklist

When regenerating this file from the upstream Angular library, verify in order:

1. `version` in frontmatter matches the upstream `packages/ui/package.json` version.
2. Every hex in section 2.1 matches `packages/ui/src/styles/tokens/_colors.scss` primitives.
3. Every semantic token in section 2.2 matches the light and dark definitions in `_colors.scss`.
4. Spacing scale in section 2.3 matches `_spacing.scss` (only the whitelist).
5. Typography composites in section 2.5 match the `--text-*` tokens in `_typography.scss`.
6. Radius / border-width values in section 2.6 match `_shape.scss`.
7. Shadow values (light and dark) in section 2.7 match `_elevation.scss`.
8. Motion durations and easings in section 2.8 match `_motion.scss`.
9. The CSS block in section 3.1 matches section 2 exactly (including the dark-mode duplication note).
10. The TypeScript constants in section 3.2 match section 2 exactly.
11. Component API conventions in section 5 match the Angular component signatures in `packages/ui/src/lib/**/*.component.ts`. Cross-check every input, output, type, default, and the past-tense event names (`clicked`, `changed`, `sorted`, `removed`, etc.).
12. The component inventory in section 5 covers every export in `packages/ui/src/public-api.ts`.
13. The i18n shape in section 6 matches `packages/ui/src/lib/i18n/i18n.types.ts`, and the list of locales matches `EAGAMI_LOCALES`.
14. The icon list in section 5.33 matches the icon exports in `public-api.ts`.
15. `last-synced` date in frontmatter updated to today.

**For AI agents performing the sync:** diff this file's tables against the SCSS and TS source of truth and report any discrepancies before editing the CSS or TS blocks. Do not regenerate blindly.
