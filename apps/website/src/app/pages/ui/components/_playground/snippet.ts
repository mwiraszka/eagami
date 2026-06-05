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

/**
 * Builds the Angular template (and any CSS custom-property overrides) for the
 * component as currently configured. Only knobs whose value differs from the
 * component default are emitted, so the snippet stays minimal and copy-ready.
 */
export function generateSnippet(
  selector: string,
  isDirective: boolean,
  knobs: PlaygroundKnob[],
  state: KnobState,
): GeneratedSnippet {
  const attributes: string[] = [];
  const cssLines: string[] = [];

  for (const knob of knobs) {
    const value = state[knob.name];
    if (value === knob.default) {
      continue;
    }
    if (knob.control === 'color' && knob.cssVar) {
      cssLines.push(`  ${knob.cssVar}: ${value};`);
      continue;
    }
    attributes.push(attribute(knob.name, value));
  }

  let markup: string;
  if (isDirective) {
    markup = `<div ${[selector, ...attributes].join(' ')}></div>`;
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
