import type { KnobState, KnobValue, PlaygroundKnob } from './knob';

export interface GeneratedSnippet {
  markup: string;
  css: string;
}

function attribute(name: string, value: KnobValue): string {
  // Booleans and numbers are property bindings; strings render as plain
  // attributes, matching how the templates are authored across the library.
  return typeof value === 'string' ? `${name}="${value}"` : `[${name}]="${value}"`;
}

/** `search` -> `SearchIconComponent`, matching the library's icon class names. */
function iconComponentName(slug: string): string {
  const pascal = slug
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  return `${pascal}IconComponent`;
}

/**
 * Builds the Angular template (and any CSS custom-property overrides) for the
 * component as currently configured. Only knobs whose value differs from the
 * component default are emitted, so the snippet stays minimal and copy-ready.
 */
/**
 * Extra markup a host page can fold into the snippet for components whose
 * configuration isn't a flat knob: `childMarkup` is projected as the element's
 * children (e.g. `<ea-accordion-item>`s), `extraAttributes` are merged onto the
 * tag (e.g. a built `[options]` binding).
 */
export interface SnippetExtras {
  childMarkup?: string;
  extraAttributes?: readonly string[];
}

export function generateSnippet(
  selector: string,
  isDirective: boolean,
  knobs: PlaygroundKnob[],
  state: KnobState,
  extras: SnippetExtras = {},
): GeneratedSnippet {
  const attributes: string[] = [];
  const cssLines: string[] = [];
  let content = '';

  for (const knob of knobs) {
    const value = state[knob.name];
    // Demo-only controls (e.g. a validation trigger) drive the live preview but
    // are not real component bindings, so they never appear in the snippet.
    if (knob.demoOnly) {
      continue;
    }
    // Projected text content always renders, even at its default, since the
    // element would otherwise be empty.
    if (knob.control === 'content') {
      content = value == null ? '' : String(value);
      continue;
    }
    // An empty optional value (e.g. a cleared number knob) is "unset" and should
    // not appear in the snippet.
    if (value === '' || value == null) {
      continue;
    }
    if (value === knob.default) {
      continue;
    }
    if (knob.control === 'icon') {
      attributes.push(`[${knob.name}]="${iconComponentName(String(value))}"`);
      continue;
    }
    if (knob.control === 'color' && knob.cssVar) {
      cssLines.push(`  ${knob.cssVar}: ${value};`);
      continue;
    }
    attributes.push(attribute(knob.name, value));
  }

  if (extras.extraAttributes?.length) {
    attributes.push(...extras.extraAttributes);
  }
  const childMarkup = extras.childMarkup ?? '';

  const openTag = (attrs: string[]): string =>
    attrs.length === 0
      ? selector
      : attrs.length === 1
        ? `${selector} ${attrs[0]}`
        : `${selector}\n  ${attrs.join('\n  ')}`;

  let markup: string;
  if (isDirective) {
    // When an attribute already carries the directive's own selector (e.g. the
    // `eaTooltip` input on the `[eaTooltip]` directive), don't repeat the bare
    // selector alongside it.
    const carriesSelector = attributes.some(
      attr => attr.startsWith(`${selector}=`) || attr.startsWith(`[${selector}]=`),
    );
    const parts = carriesSelector ? attributes : [selector, ...attributes];
    // Wrap each attribute onto its own line for multi-attribute hosts, matching
    // how the element components render; keep single-attribute hosts on one line.
    markup =
      parts.length <= 1
        ? `<div ${parts.join(' ')}></div>`
        : `<div\n  ${parts.join('\n  ')}>\n</div>`;
  } else if (childMarkup) {
    const indented = childMarkup
      .split('\n')
      .map(line => (line ? `  ${line}` : line))
      .join('\n');
    markup = `<${openTag(attributes)}>\n${indented}\n</${selector}>`;
  } else if (content) {
    markup = `<${openTag(attributes)}>${content}</${selector}>`;
  } else if (attributes.length === 0) {
    markup = `<${selector} />`;
  } else if (attributes.length === 1) {
    markup = `<${selector} ${attributes[0]} />`;
  } else {
    markup = `<${selector}\n  ${attributes.join('\n  ')} />`;
  }

  const css = cssLines.length ? `${selector} {\n${cssLines.join('\n')}\n}` : '';
  return { markup, css };
}
