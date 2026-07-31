// Elements that carry their own interactive semantics, so ARIA state applies
// to them directly rather than to a wrapper around them.
const INTERACTIVE_SELECTOR =
  'button, a[href], input, select, textarea, summary, [role]:not([role="none"]):not([role="presentation"])';

/**
 * Resolves the element that should carry ARIA state a directive applies to its
 * host. A component wrapper such as `<ea-button>` is a roleless custom element,
 * so attributes left on it are never announced; they belong on the interactive
 * element the component renders inside. Falls back to the host when it exposes
 * no inner control.
 */
export function resolveAriaTarget(host: HTMLElement): HTMLElement {
  if (host.matches(INTERACTIVE_SELECTOR)) {
    return host;
  }
  return host.querySelector<HTMLElement>(INTERACTIVE_SELECTOR) ?? host;
}
