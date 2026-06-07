import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { SearchIconComponent } from '../icons/search.component';
import { InputComponent } from './input.component';
import { INPUT_KNOBS } from './input.component.knobs';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-input ${argsToTemplate(args)} class="story-narrow"></ea-input>`,
  }),
  argTypes: INPUT_KNOBS.argTypes,
  args: INPUT_KNOBS.args,
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: 'Helpful guidance goes here.',
  },
};

export const WithError: Story = {
  args: {
    errorMsg: 'This field is required.',
  },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Password: Story = {
  args: { type: 'password' },
};

export const PasswordNoToggle: Story = {
  args: { type: 'password', showPasswordToggle: false },
};

export const WithIcon: Story = {
  args: { icon: SearchIconComponent, placeholder: 'Search' },
  render: args => ({
    props: args,
    template: `<ea-input [icon]="icon" placeholder="Search" class="story-narrow"></ea-input>`,
  }),
};

export const Clearable: Story = {
  args: { clearable: true, value: 'Sample text' },
};

export const WithAutocomplete: Story = {
  args: { autocomplete: 'email' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ReadOnly: Story = {
  args: {
    readonly: true,
  },
};

export const Required: Story = {
  args: { required: true },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack story-narrow">
        <ea-input size="xs" label="Extra small" placeholder="Extra small input"></ea-input>
        <ea-input size="sm" label="Small" placeholder="Small input"></ea-input>
        <ea-input size="md" label="Medium" placeholder="Medium input"></ea-input>
        <ea-input size="lg" label="Large" placeholder="Large input"></ea-input>
        <ea-input size="xl" label="Extra large" placeholder="Extra large input"></ea-input>
      </div>
    `,
  }),
};

export const Number: Story = {
  // Bounded number fields auto-narrow to the widest value they can hold, block
  // the scroll-wheel and `e`, and clamp to [min, max] on blur.
  render: () => ({
    template: `
      <div class="story-stack story-narrow">
        <ea-input type="number" label="Variant" [min]="1" [max]="3" [maxLength]="1" [value]="'1'"></ea-input>
        <ea-input type="number" label="Quantity" [min]="0" [max]="999" [maxLength]="3" [value]="'12'"></ea-input>
        <ea-input type="number" label="Amount" [min]="-1000000" [max]="1000000" [maxLength]="8" [value]="'1000'"></ea-input>
      </div>
    `,
  }),
};
