import type { ButtonAlign, ButtonSize, ButtonVariant } from './button.component';

export interface ButtonClassState {
  variant: ButtonVariant;
  size: ButtonSize;
  align: ButtonAlign;
  fullWidth: boolean;
  uppercase: boolean;
  loading: boolean;
  disabled: boolean;
}

/**
 * Modifier classes for the `.ea-button` box, shared by `ea-button` and
 * `a[eaButtonLink]` so both forms are painted by the one stylesheet.
 */
export function buttonClasses(state: ButtonClassState): Record<string, boolean> {
  return {
    [`ea-button--${state.variant}`]: true,
    [`ea-button--${state.size}`]: true,
    [`ea-button--align-${state.align}`]: state.align !== 'center',
    'ea-button--full-width': state.fullWidth,
    'ea-button--uppercase': state.uppercase,
    'ea-button--loading': state.loading,
    'ea-button--disabled': state.disabled,
  };
}
