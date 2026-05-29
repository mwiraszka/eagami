import { hexToOklch, oklchToHex } from './oklch';
import {
  DEFAULT_PALETTE_ROLES,
  type DerivedPalette,
  type EagamiPaletteConfig,
  type ModePalette,
  type PaletteConfig,
  type PaletteRoles,
  type PaletteShade,
} from './palette.types';

/**
 * Target OKLCH lightness per shade. Mirrors the library's hand-tuned scale.
 * Chroma is tapered at the extremes so 50/100 don't read washed-out and
 * 800/900 don't go inky.
 */
const SHADE_LIGHTNESS: Record<PaletteShade, number> = {
  '50': 0.97,
  '100': 0.93,
  '200': 0.85,
  '300': 0.75,
  '400': 0.65,
  '500': 0.55,
  '600': 0.45,
  '700': 0.35,
  '800': 0.27,
  '900': 0.18,
};

const SHADE_CHROMA_SCALE: Record<PaletteShade, number> = {
  '50': 0.25,
  '100': 0.4,
  '200': 0.55,
  '300': 0.75,
  '400': 0.9,
  '500': 1,
  '600': 1,
  '700': 0.9,
  '800': 0.75,
  '900': 0.55,
};

const ALL_SHADES: readonly PaletteShade[] = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
];

function derivePaletteScale(config: PaletteConfig): Record<PaletteShade, string> {
  const { h, c } = hexToOklch(config.base);
  const out = {} as Record<PaletteShade, string>;
  for (const shade of ALL_SHADES) {
    const override = config.overrides?.[shade];
    if (override) {
      out[shade] = override;
      continue;
    }
    out[shade] = oklchToHex({
      l: SHADE_LIGHTNESS[shade],
      c: c * SHADE_CHROMA_SCALE[shade],
      h,
    });
  }
  return out;
}

function emitFamily(
  family: 'primary' | 'secondary',
  scale: Record<PaletteShade, string>,
  roles: PaletteRoles,
  light: DerivedPalette,
  dark: DerivedPalette,
): void {
  const prefix = `--color-${family}`;
  const brandPrefix = family === 'primary' ? '--color-brand' : '--color-brand-secondary';

  for (const shade of ALL_SHADES) {
    light[`${prefix}-${shade}`] = scale[shade];
    dark[`${prefix}-${shade}`] = scale[shade];
  }

  light[`${brandPrefix}-default`] = scale[roles.surfaceLight];
  light[`${brandPrefix}-hover`] = scale[roles.surfaceHoverLight];
  light[`${brandPrefix}-active`] = scale[roles.surfaceActiveLight];
  dark[`${brandPrefix}-default`] = scale[roles.surfaceDark];
  dark[`${brandPrefix}-hover`] = scale[roles.surfaceHoverDark];
  dark[`${brandPrefix}-active`] = scale[roles.surfaceActiveDark];

  if (family === 'primary') {
    light['--color-brand-text'] = scale[roles.textLight];
    dark['--color-brand-text'] = scale[roles.textDark];
    light['--color-brand-subtle'] = scale[roles.subtleLight];
    light['--color-brand-muted'] = scale[roles.mutedLight];
  }
}

export function derivePalette(config: EagamiPaletteConfig): ModePalette {
  const light: DerivedPalette = {};
  const dark: DerivedPalette = {};

  if (config.primary) {
    const scale = derivePaletteScale(config.primary);
    const roles: PaletteRoles = { ...DEFAULT_PALETTE_ROLES, ...config.primary.roles };
    emitFamily('primary', scale, roles, light, dark);
  }
  if (config.secondary) {
    const scale = derivePaletteScale(config.secondary);
    const roles: PaletteRoles = { ...DEFAULT_PALETTE_ROLES, ...config.secondary.roles };
    emitFamily('secondary', scale, roles, light, dark);
  }

  return { light, dark };
}
