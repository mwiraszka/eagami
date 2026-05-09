/**
 * Common option shape used by single-select form controls
 * (autocomplete, dropdown, segmented).
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
