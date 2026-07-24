// Excludes U+202F and U+00A0 so the substitution is idempotent
const SPACE_BEFORE_HIGH_PUNCT = / ([!?:;»])/g;

const SPACE_AFTER_OPEN_GUILLEMET = /(«) /g;

/**
 * Replaces regular spaces with U+202F (narrow non-breaking space) in the
 * positions where standard French typography requires "espace fine insécable":
 * before `!` `?` `:` `;` `»`, and after `«`. This is what publishers like the
 * Imprimerie nationale and most French press follow, and it prevents the
 * punctuation from wrapping onto its own line.
 *
 * Opt-in: the library does not auto-apply this to anything. Components render
 * whatever string they receive. Apply this to consumer-supplied content (user
 * input, content from your CMS, etc.) that you want to format correctly for a
 * French audience. The function is idempotent: already-converted text passes
 * through unchanged.
 *
 * Do not apply it to URLs, CSS, JSON, code snippets, or other technical
 * strings where `:` or `?` have non-prose meaning.
 *
 * @example
 * frenchSpacing('Lignes par page :');
 * // returns 'Lignes par page\u202F:'
 *
 * frenchSpacing("Qu'est-ce que c'est ?");
 * // returns "Qu'est-ce que c'est\u202F?"
 *
 * frenchSpacing('Il a dit « bonjour ».');
 * // returns 'Il a dit «\u202Fbonjour\u202F».'
 */
export function frenchSpacing(text: string): string {
  return text
    .replace(SPACE_BEFORE_HIGH_PUNCT, ' $1')
    .replace(SPACE_AFTER_OPEN_GUILLEMET, '$1 ');
}
