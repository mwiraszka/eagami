import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { CodeInputComponent } from './code-input.component';
import { CODE_INPUT_KNOBS } from './code-input.component.knobs';

const meta: Meta<CodeInputComponent> = {
  title: 'Components/Code Input',
  component: CodeInputComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-code-input ${argsToTemplate(args)}></ea-code-input>`,
  }),
  argTypes: CODE_INPUT_KNOBS.argTypes,
  args: CODE_INPUT_KNOBS.args,
};

export default meta;
type Story = StoryObj<CodeInputComponent>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: 'Check your email for the 6-digit code',
  },
};

export const WithError: Story = {
  args: {
    errorMsg: 'Invalid verification code',
  },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const FourDigit: Story = {
  args: { length: 4 },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Required: Story = {
  args: { required: true },
};

export const Prefilled: Story = {
  args: {
    value: '123456',
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack story-stack--lg">
        <ea-code-input size="xs" label="Extra small"></ea-code-input>
        <ea-code-input size="sm" label="Small"></ea-code-input>
        <ea-code-input size="md" label="Medium"></ea-code-input>
        <ea-code-input size="lg" label="Large"></ea-code-input>
        <ea-code-input size="xl" label="Extra large"></ea-code-input>
      </div>
    `,
  }),
};
