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
        <ea-input size="sm" label="Small" placeholder="Small input"></ea-input>
        <ea-input size="md" label="Medium" placeholder="Medium input"></ea-input>
        <ea-input size="lg" label="Large" placeholder="Large input"></ea-input>
      </div>
    `,
  }),
};
