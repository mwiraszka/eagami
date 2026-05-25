/** Public types for the eagami palette provider API. */

/** The 10 derived shade positions, matching the library's existing scale. */
export type PaletteShade =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

/**
 * Which shade backs each semantic role. Defaults match the library's
 * hand-tuned palette so passing only `base` produces behaviour
 * indistinguishable from the un-themed library.
 */
export interface PaletteRoles {
  /** `--color-brand-default` in light mode. */
  surfaceLight: PaletteShade;
  /** `--color-brand-default` in dark mode. */
  surfaceDark: PaletteShade;
  /** `--color-brand-hover` in light mode. */
  surfaceHoverLight: PaletteShade;
  /** `--color-brand-hover` in dark mode. */
  surfaceHoverDark: PaletteShade;
  /** `--color-brand-active` in light mode. */
  surfaceActiveLight: PaletteShade;
  /** `--color-brand-active` in dark mode. */
  surfaceActiveDark: PaletteShade;
  /** `--color-brand-text` in light mode. */
  textLight: PaletteShade;
  /** `--color-brand-text` in dark mode. */
  textDark: PaletteShade;
  /** `--color-brand-subtle` in light mode. */
  subtleLight: PaletteShade;
  /** `--color-brand-muted` in light mode. */
  mutedLight: PaletteShade;
}

export const DEFAULT_PALETTE_ROLES: PaletteRoles = {
  surfaceLight: '600',
  surfaceDark: '400',
  surfaceHoverLight: '700',
  surfaceHoverDark: '300',
  surfaceActiveLight: '800',
  surfaceActiveDark: '200',
  textLight: '700',
  textDark: '300',
  subtleLight: '50',
  mutedLight: '100',
};

export interface PaletteConfig {
  /** Anchor hex (`#RRGGBB`). The library derives the full 50–900 scale from
   * this point in OKLCH space, holding hue and chroma roughly constant while
   * stepping lightness. */
  base: string;

  /** Pin individual shades to specific hex values, bypassing derivation for
   * those slots. */
  overrides?: Partial<Record<PaletteShade, string>>;

  /** Remap semantic roles onto different shades. Most consumers leave this
   * unset and accept the defaults. */
  roles?: Partial<PaletteRoles>;
}

/** Top-level palette config accepted by `provideEagamiUi`. */
export interface EagamiPaletteConfig {
  primary?: PaletteConfig;
  secondary?: PaletteConfig;
}

/** Flat CSS-custom-property name to value map produced by `derivePalette`. */
export type DerivedPalette = Record<string, string>;
