import { frenchSpacing } from './french-spacing';

const NBSP = ' ';

describe('frenchSpacing', () => {
  it('inserts U+202F before a colon', () => {
    const result = frenchSpacing('Lignes par page :');

    expect(result).toBe(`Lignes par page${NBSP}:`);
  });

  it('inserts U+202F before a question mark', () => {
    const result = frenchSpacing("Qu'est-ce que c'est ?");

    expect(result).toBe(`Qu'est-ce que c'est${NBSP}?`);
  });

  it('inserts U+202F before exclamation and semicolon', () => {
    const result = frenchSpacing('Attention ! Voici ; la fin.');

    expect(result).toBe(`Attention${NBSP}! Voici${NBSP}; la fin.`);
  });

  it('handles guillemets on both sides', () => {
    const result = frenchSpacing('Il a dit « bonjour ».');

    expect(result).toBe(`Il a dit «${NBSP}bonjour${NBSP}».`);
  });

  it('is idempotent — running twice produces the same output as once', () => {
    const input = "Voici un test : qu'en penses-tu ?";
    const once = frenchSpacing(input);
    const twice = frenchSpacing(once);

    expect(twice).toBe(once);
  });

  it('leaves text without space-before-punctuation untouched', () => {
    const input = 'Aucun changement nécessaire.';

    expect(frenchSpacing(input)).toBe(input);
  });

  it('leaves punctuation that has no preceding space alone', () => {
    const input = 'http://example.com:8080 and a:b';

    expect(frenchSpacing(input)).toBe(input);
  });

  it('handles multiple punctuation marks in one string', () => {
    const result = frenchSpacing('Salut ! Comment vas-tu ? Bien : merci.');

    expect(result).toBe(`Salut${NBSP}! Comment vas-tu${NBSP}? Bien${NBSP}: merci.`);
  });

  it('returns an empty string unchanged', () => {
    expect(frenchSpacing('')).toBe('');
  });
});
