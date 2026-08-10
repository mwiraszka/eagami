import type { SelectOption, SelectOptionGroup } from './select-option';
import {
  filterGroups,
  flattenGroups,
  isGrouped,
  limitGroups,
  toGroups,
  toRenderedGroups,
} from './select-option-list';

const FLAT: SelectOption[] = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
];

const GROUPS: SelectOptionGroup[] = [
  { label: 'Recently used', options: [{ value: 'b', label: 'Beta' }] },
  { options: FLAT },
];

describe('select-option-list', () => {
  describe('isGrouped', () => {
    it('tells a group list apart from a flat one', () => {
      expect(isGrouped(GROUPS)).toBe(true);
      expect(isGrouped(FLAT)).toBe(false);
    });

    it('treats an empty list as flat', () => {
      expect(isGrouped([])).toBe(false);
    });
  });

  describe('toGroups', () => {
    it('wraps a flat list in a single unlabelled group', () => {
      const groups = toGroups(FLAT);

      expect(groups).toEqual([{ options: FLAT }]);
    });

    it('passes a group list through untouched', () => {
      expect(toGroups(GROUPS)).toBe(GROUPS);
    });

    it('returns no groups for an empty list', () => {
      expect(toGroups([])).toEqual([]);
    });
  });

  describe('filterGroups', () => {
    it('drops a group once every one of its options filters out', () => {
      const kept = filterGroups(GROUPS, option => option.value === 'a');

      expect(kept).toEqual([
        { label: undefined, options: [{ value: 'a', label: 'Alpha' }] },
      ]);
    });
  });

  describe('limitGroups', () => {
    it('caps the total option count across groups', () => {
      const limited = limitGroups(GROUPS, 2);

      expect(flattenGroups(limited).map(o => o.value)).toEqual(['b', 'a']);
      expect(limited).toHaveLength(2);
    });

    it('drops every group once the cap is spent', () => {
      const limited = limitGroups(GROUPS, 1);

      expect(limited).toHaveLength(1);
    });

    it('returns nothing for a cap of zero', () => {
      expect(limitGroups(GROUPS, 0)).toEqual([]);
    });
  });

  describe('toRenderedGroups', () => {
    it('numbers options across groups, counting options alone', () => {
      const rendered = toRenderedGroups(GROUPS);

      expect(rendered.flatMap(group => group.options.map(entry => entry.index))).toEqual([
        0, 1, 2,
      ]);
    });

    it('rules an unlabelled group off from the one before it', () => {
      const rendered = toRenderedGroups(GROUPS);

      expect(rendered.map(group => group.rule)).toEqual([false, true]);
    });

    it('never rules off the first group', () => {
      const rendered = toRenderedGroups([{ options: FLAT }]);

      expect(rendered[0].rule).toBe(false);
    });

    it('leaves a labelled group to its heading instead of a rule', () => {
      const rendered = toRenderedGroups([
        { label: 'One', options: [FLAT[0]] },
        { label: 'Two', options: [FLAT[1]] },
      ]);

      expect(rendered.map(group => group.rule)).toEqual([false, false]);
    });
  });
});
