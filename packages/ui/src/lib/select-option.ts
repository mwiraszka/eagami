/**
 * Common option shape used by single-select form controls
 * (autocomplete, dropdown, segmented).
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * A section of a select-like option list. A group carrying a `label` renders a
 * non-interactive heading above its options; one without renders as a rule
 * separating it from the section before it.
 */
export interface SelectOptionGroup {
  label?: string;
  options: SelectOption[];
}

/** Option list accepted by select-like controls: flat, or split into groups. */
export type SelectOptions = readonly SelectOption[] | readonly SelectOptionGroup[];
