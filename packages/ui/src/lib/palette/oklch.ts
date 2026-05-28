/**
 * sRGB to OKLCH conversion. OKLCH is used over HSL so derived palettes keep
 * their chroma at darker shades. Follows Björn Ottosson's matrices,
 * https://bottosson.github.io/posts/oklab/.
 */

export interface Oklch {
  /** Lightness, 0–1. */
  l: number;
  /** Chroma, 0 to ~0.4 in sRGB gamut. */
  c: number;
  /** Hue, 0–360 degrees. */
  h: number;
}

export interface Rgb {
  /** 0–255. */
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): Rgb {
  const normalized = hex.replace('#', '').trim();
  if (normalized.length !== 6) {
    throw new Error(`Invalid hex colour "${hex}", expected #RRGGBB`);
  }
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const channel = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  const hex = (n: number) => channel(n).toString(16).padStart(2, '0');
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

interface Oklab {
  l: number;
  a: number;
  b: number;
}

function linearRgbToOklab(r: number, g: number, b: number): Oklab {
  const l1 = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m1 = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s1 = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l2 = Math.cbrt(l1);
  const m2 = Math.cbrt(m1);
  const s2 = Math.cbrt(s1);

  return {
    l: 0.2104542553 * l2 + 0.793617785 * m2 - 0.0040720468 * s2,
    a: 1.9779984951 * l2 - 2.428592205 * m2 + 0.4505937099 * s2,
    b: 0.0259040371 * l2 + 0.7827717662 * m2 - 0.808675766 * s2,
  };
}

function oklabToLinearRgb({ l, a, b }: Oklab): Rgb {
  const lCbrt = l + 0.3963377774 * a + 0.2158037573 * b;
  const mCbrt = l - 0.1055613458 * a - 0.0638541728 * b;
  const sCbrt = l - 0.0894841775 * a - 1.291485548 * b;

  const lLin = lCbrt ** 3;
  const mLin = mCbrt ** 3;
  const sLin = sCbrt ** 3;

  const r = 4.0767416621 * lLin - 3.3077115913 * mLin + 0.2309699292 * sLin;
  const g = -1.2684380046 * lLin + 2.6097574011 * mLin - 0.3413193965 * sLin;
  const bb = -0.0041960863 * lLin - 0.7034186147 * mLin + 1.707614701 * sLin;

  return { r, g, b: bb };
}

function oklabToOklch({ l, a, b }: Oklab): Oklch {
  const c = Math.hypot(a, b);
  const h = c < 1e-6 ? 0 : (Math.atan2(b, a) * 180) / Math.PI;
  return { l, c, h: (h + 360) % 360 };
}

function oklchToOklab({ l, c, h }: Oklch): Oklab {
  const hRad = (h * Math.PI) / 180;
  return { l, a: c * Math.cos(hRad), b: c * Math.sin(hRad) };
}

export function hexToOklch(hex: string): Oklch {
  const { r, g, b } = hexToRgb(hex);
  const lab = linearRgbToOklab(
    srgbToLinear(r / 255),
    srgbToLinear(g / 255),
    srgbToLinear(b / 255),
  );
  return oklabToOklch(lab);
}

export function oklchToHex(oklch: Oklch): string {
  const lab = oklchToOklab(oklch);
  const linRgb = oklabToLinearRgb(lab);
  return rgbToHex({
    r: linearToSrgb(linRgb.r) * 255,
    g: linearToSrgb(linRgb.g) * 255,
    b: linearToSrgb(linRgb.b) * 255,
  });
}
