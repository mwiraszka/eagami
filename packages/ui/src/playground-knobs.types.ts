/**
 * Shape of the playground knob metadata shared between a component's Storybook
 * story and the website's interactive component playground. Plain data only:
 * no `@storybook/*` or component imports, so the website can consume it across
 * the package boundary without pulling either into its bundle.
 */
export type KnobArgValue = string | number | boolean;

/**
 * Gates a knob on another knob's value. The website disables the control while
 * the condition is unmet (e.g. `showPasswordToggle` only applies when
 * `type === 'password'`); Storybook reads the same field to hide the control.
 */
export interface KnobCondition {
  arg: string;
  eq: KnobArgValue;
}

export interface KnobArgType {
  /** How the website renders the control; mirrors Storybook's `control` field. */
  control?: 'select' | 'boolean' | 'text' | 'number' | 'color';
  /** Allowed values for a `select` control. */
  options?: readonly string[];
  /** Marks an event arg (Storybook action); the website skips these as knobs. */
  action?: string;
  /** CSS custom property a `color` control writes, e.g. `--ea-button-background-color`. */
  cssVar?: string;
  /** Lower bound for a `number` control; the value is clamped to it. */
  min?: number;
  /** Upper bound for a `number` control; the value is clamped to it. */
  max?: number;
  /** Step increment for a `number` control. */
  step?: number;
  /** Maximum character count for a `number` control, which also sizes its width. */
  maxLength?: number;
  /** Conditionally gate this knob on another knob's value. */
  if?: KnobCondition;
  /** Demo-only control (e.g. a validation trigger); excluded from the generated code snippet. */
  demoOnly?: boolean;
}

export interface ComponentKnobs {
  /** Per-input control hints, keyed by the component's input name. */
  argTypes: Readonly<Record<string, KnobArgType>>;
  /** Initial demo values the playground starts from, keyed by input name. */
  args: Readonly<Record<string, KnobArgValue>>;
}
