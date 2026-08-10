import type { SelectOption, SelectOptionGroup, SelectOptions } from './select-option';

/** An option paired with its position in the flattened option list. */
export interface IndexedOption {
  option: SelectOption;
  index: number;
}

/** A group ready to render, with headings and rules kept out of the index maths. */
export interface RenderedGroup {
  label: string | undefined;
  /** Whether a rule renders above this group, in place of a heading. */
  rule: boolean;
  options: IndexedOption[];
}

/** Whether the consumer supplied groups rather than a flat option list. */
export function isGrouped(
  options: SelectOptions,
): options is readonly SelectOptionGroup[] {
  const first = options[0];
  return first !== undefined && 'options' in first;
}

/** Normalizes either accepted shape to groups; a flat list becomes one unlabelled group. */
export function toGroups(options: SelectOptions): readonly SelectOptionGroup[] {
  if (isGrouped(options)) {
    return options;
  }
  return options.length > 0 ? [{ options: [...options] }] : [];
}

/** Drops every option failing `keep`, then every group left empty. */
export function filterGroups(
  groups: readonly SelectOptionGroup[],
  keep: (option: SelectOption) => boolean,
): SelectOptionGroup[] {
  const kept: SelectOptionGroup[] = [];
  for (const group of groups) {
    const options = group.options.filter(keep);
    if (options.length > 0) {
      kept.push({ label: group.label, options });
    }
  }
  return kept;
}

/** Trims the groups down to at most `max` options in total, dropping any left empty. */
export function limitGroups(
  groups: readonly SelectOptionGroup[],
  max: number,
): SelectOptionGroup[] {
  const limited: SelectOptionGroup[] = [];
  let remaining = max;
  for (const group of groups) {
    if (remaining <= 0) {
      break;
    }
    const options = group.options.slice(0, remaining);
    remaining -= options.length;
    limited.push({ label: group.label, options });
  }
  return limited;
}

/** Flattens groups back into a single option list, in the order they were given. */
export function flattenGroups(groups: readonly SelectOptionGroup[]): SelectOption[] {
  return groups.flatMap(group => group.options);
}

/**
 * Pairs every option with its index into the flattened list, so keyboard
 * navigation and selection count options alone while the template still renders
 * the headings and rules that sit between them.
 */
export function toRenderedGroups(groups: readonly SelectOptionGroup[]): RenderedGroup[] {
  let index = 0;
  return groups.map((group, position) => ({
    label: group.label,
    rule: position > 0 && !group.label,
    options: group.options.map(option => ({ option, index: index++ })),
  }));
}
