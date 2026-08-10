import type { SelectOption, SelectOptionGroup, SelectOptions } from '@eagami/ui';

/** The option-group knobs shared by the select-like demos. */
export interface OptionGroupState {
  groupedOptions: boolean;
  firstGroup: string;
  firstGroupLabel: string;
  secondGroup: string;
  secondGroupLabel: string;
}

function isGroupList(options: SelectOptions): options is readonly SelectOptionGroup[] {
  const first = options[0];
  return first !== undefined && 'options' in first;
}

function optionLiteral(option: SelectOption): string {
  return `{ value: '${option.value}', label: '${option.label}' }`;
}

function groupLiteral(group: SelectOptionGroup): string {
  const options = `options: [${group.options.map(optionLiteral).join(', ')}]`;
  return group.label ? `{ label: '${group.label}', ${options} }` : `{ ${options} }`;
}

/**
 * Splits a demo's option list into the two sections its group knobs describe.
 * A group set to anything other than `heading` gives up its label, which is
 * what leaves the second group a rule and the first group nothing at all.
 */
export function demoOptionGroups(
  options: readonly SelectOption[],
  state: OptionGroupState,
): SelectOptionGroup[] {
  return [
    {
      label: state.firstGroup === 'heading' ? state.firstGroupLabel : undefined,
      options: options.slice(0, 2),
    },
    {
      label: state.secondGroup === 'heading' ? state.secondGroupLabel : undefined,
      options: options.slice(2),
    },
  ];
}

/** The `[options]` binding for the generated snippet, mirroring the live one. */
export function optionsAttribute(options: SelectOptions): string {
  const literal = isGroupList(options)
    ? options.map(groupLiteral).join(', ')
    : options.map(optionLiteral).join(', ');
  return `[options]="[${literal}]"`;
}
