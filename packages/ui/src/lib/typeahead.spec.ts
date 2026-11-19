import { TestBed } from '@angular/core/testing';

import { Typeahead, isTypedCharacter } from './typeahead';

describe('isTypedCharacter', () => {
  it('accepts a printable character', () => {
    expect(isTypedCharacter(new KeyboardEvent('keydown', { key: 'a' }))).toBe(true);
  });

  it('rejects named keys', () => {
    expect(isTypedCharacter(new KeyboardEvent('keydown', { key: 'Enter' }))).toBe(false);
  });

  it('rejects characters typed with ctrl, meta, or alt', () => {
    expect(
      isTypedCharacter(new KeyboardEvent('keydown', { key: 'a', ctrlKey: true })),
    ).toBe(false);
    expect(
      isTypedCharacter(new KeyboardEvent('keydown', { key: 'a', metaKey: true })),
    ).toBe(false);
    expect(
      isTypedCharacter(new KeyboardEvent('keydown', { key: 'a', altKey: true })),
    ).toBe(false);
  });
});

describe('Typeahead', () => {
  const labels = ['Apple', 'Banana', 'Blueberry', 'Cherry'];
  let typeahead: Typeahead;

  function key(value: string): KeyboardEvent {
    return new KeyboardEvent('keydown', { key: value });
  }

  beforeEach(() => {
    vi.useFakeTimers();
    typeahead = TestBed.runInInjectionContext(() => new Typeahead());
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('finds the next label after the current item that starts with a typed letter', () => {
    expect(typeahead.match('b', labels, 0)).toBe(1);
  });

  it('moves on to the next match when the same letter is typed again later', () => {
    typeahead.match('b', labels, 0);
    vi.advanceTimersByTime(500);

    expect(typeahead.match('b', labels, 1)).toBe(2);
  });

  it('wraps past the end of the list', () => {
    expect(typeahead.match('a', labels, 3)).toBe(0);
  });

  it('comes back to the current item when it is the only match', () => {
    expect(typeahead.match('c', labels, 3)).toBe(3);
  });

  it('starts at the current item when asked to include it', () => {
    expect(typeahead.match('b', labels, 1, true)).toBe(1);
  });

  it('starts at the first item when nothing is current', () => {
    expect(typeahead.match('a', labels, -1)).toBe(0);
  });

  it('narrows to a longer match as characters arrive in quick succession', () => {
    expect(typeahead.match('b', labels, 0)).toBe(1);

    expect(typeahead.match('l', labels, 1)).toBe(2);
  });

  it('keeps the current item while it still matches the growing query', () => {
    typeahead.match('b', labels, 0);

    expect(typeahead.match('a', labels, 1)).toBe(1);
  });

  it('starts a new query once the typing pauses', () => {
    typeahead.match('b', labels, 0);
    vi.advanceTimersByTime(500);

    expect(typeahead.match('c', labels, 1)).toBe(3);
  });

  it('starts a new query after a reset', () => {
    typeahead.match('b', labels, 0);
    typeahead.reset();

    expect(typeahead.match('c', labels, 1)).toBe(3);
  });

  it('skips null labels', () => {
    expect(typeahead.match('b', ['Apple', null, 'Blueberry'], 0)).toBe(2);
  });

  it('returns -1 when no label matches', () => {
    expect(typeahead.match('z', labels, 0)).toBe(-1);
    expect(typeahead.match('a', [], -1)).toBe(-1);
  });

  it('matches labels regardless of case and diacritics', () => {
    expect(typeahead.match('L', ['Apple', 'Łódka'], 0)).toBe(1);
  });

  it('accepts Space only while a query is in progress', () => {
    expect(typeahead.accepts(key(' '))).toBe(false);

    typeahead.match('b', labels, 0);

    expect(typeahead.accepts(key(' '))).toBe(true);

    vi.advanceTimersByTime(500);

    expect(typeahead.accepts(key(' '))).toBe(false);
  });

  it('accepts typed characters but not named keys or shortcuts', () => {
    expect(typeahead.accepts(key('b'))).toBe(true);
    expect(typeahead.accepts(key('ArrowDown'))).toBe(false);
    expect(
      typeahead.accepts(new KeyboardEvent('keydown', { key: 'b', ctrlKey: true })),
    ).toBe(false);
  });
});
