import { hexToOklch, oklchToHex } from './oklch';
import {
  DEFAULT_PALETTE_ROLES,
  DerivedPalette,
  EagamiPaletteConfig,
  PaletteConfig,
  PaletteRoles,
  PaletteShade,
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

function paletteToCustomProperties(
  family: 'primary' | 'secondary',
  scale: Record<PaletteShade, string>,
  roles: PaletteRoles,
): DerivedPalette {
  const prefix = `--color-${family}`;
  const brandPrefix = family === 'primary' ? '--color-brand' : '--color-brand-secondary';

  const out: DerivedPalette = {};

  for (const shade of ALL_SHADES) {
    out[`${prefix}-${shade}`] = scale[shade];
  }

  out[`${brandPrefix}-default`] = scale[roles.surfaceLight];
  out[`${brandPrefix}-hover`] = scale[roles.surfaceHoverLight];
  out[`${brandPrefix}-active`] = scale[roles.surfaceActiveLight];
  if (family === 'primary') {
    out[`--color-brand-text`] = scale[roles.textLight];
    out[`--color-brand-subtle`] = scale[roles.subtleLight];
    out[`--color-brand-muted`] = scale[roles.mutedLight];
  }

  return out;
}

export function derivePalette(config: EagamiPaletteConfig): DerivedPalette {
  const out: DerivedPalette = {};
  if (config.primary) {
    const scale = derivePaletteScale(config.primary);
    const roles: PaletteRoles = { ...DEFAULT_PALETTE_ROLES, ...config.primary.roles };
    Object.assign(out, paletteToCustomProperties('primary', scale, roles));
  }
  if (config.secondary) {
    const scale = derivePaletteScale(config.secondary);
    const roles: PaletteRoles = { ...DEFAULT_PALETTE_ROLES, ...config.secondary.roles };
    Object.assign(out, paletteToCustomProperties('secondary', scale, roles));
  }
  return out;
}
