// Pure, dependency-free transforms for the ng-add schematic. Kept separate from
// index.ts (which pulls in @angular-devkit) so the unit tests compile under the
// Angular test build without dragging Node-only schematics APIs into the bundle.

export type StyleEntry = string | { input?: string };

export const EAGAMI_STYLE_PATH = 'node_modules/@eagami/ui/src/styles/eagami-ui.scss';

export const EAGAMI_FONT_LINKS: readonly string[] = [
  '<link rel="preconnect" href="https://fonts.googleapis.com" />',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Syne:wght@400;500;600;700&display=swap" />',
];

// Unique to our Google Fonts request, so it doubles as the idempotency marker
const FONT_MARKER = 'family=DM+Sans';

export function styleEntryMatches(entry: StyleEntry, path: string): boolean {
  return typeof entry === 'string' ? entry === path : entry.input === path;
}

export function withEagamiStyle(styles: StyleEntry[]): StyleEntry[] {
  if (styles.some(style => styleEntryMatches(style, EAGAMI_STYLE_PATH))) {
    return styles;
  }
  return [EAGAMI_STYLE_PATH, ...styles];
}

export function hasEagamiFonts(html: string): boolean {
  return html.includes(FONT_MARKER);
}

export function withEagamiFonts(html: string): string {
  if (hasEagamiFonts(html)) {
    return html;
  }
  const block = EAGAMI_FONT_LINKS.map(link => `    ${link}`).join('\n');
  const headClose = /([ \t]*)<\/head>/i;
  if (headClose.test(html)) {
    return html.replace(headClose, `${block}\n$1</head>`);
  }
  return `${block}\n${html}`;
}

// The build target's `index` option is either a path string or a { input, output } object
export function resolveIndexPath(index: unknown): string | undefined {
  if (typeof index === 'string') {
    return index;
  }
  if (index !== null && typeof index === 'object' && 'input' in index) {
    const input = (index as { input?: unknown }).input;
    return typeof input === 'string' ? input : undefined;
  }
  return undefined;
}
