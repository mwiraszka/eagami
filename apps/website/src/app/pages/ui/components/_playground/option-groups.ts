import {
  type SelectOption,
  type SelectOptionGroup,
  type SelectOptions,
  isGrouped,
} from '@eagami/ui';

/** The option-group knobs shared by the select-like demos. */
export interface OptionGroupState {
  groupedOptions: boolean;
  firstGroup: string;
  firstGroupLabel: string;
  secondGroup: string;
  secondGroupLabel: string;
}

// Demo-editable free text is escaped before going into a snippet's
// single-quoted literals
export function quoted(text: string): string {
  return `'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function optionLiteral(option: SelectOption): string {
  return `{ value: ${quoted(option.value)}, label: ${quoted(option.label)} }`;
}

function groupLiteral(group: SelectOptionGroup): string {
  const options = `options: [${group.options.map(optionLiteral).join(', ')}]`;
  return group.label ? `{ label: ${quoted(group.label)}, ${options} }` : `{ ${options} }`;
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
  const literal = isGrouped(options)
    ? options.map(groupLiteral).join(', ')
    : options.map(optionLiteral).join(', ');
  return `[options]="[${literal}]"`;
}
