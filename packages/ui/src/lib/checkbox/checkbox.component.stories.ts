import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { CheckboxComponent } from './checkbox.component';
import { CHECKBOX_KNOBS } from './checkbox.component.knobs';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-checkbox ${argsToTemplate(args)}></ea-checkbox>`,
  }),
  argTypes: CHECKBOX_KNOBS.argTypes,
  args: CHECKBOX_KNOBS.args,
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

export const Required: Story = {
  args: { required: true },
};

export const WithHint: Story = {
  args: { hint: 'You can opt out anytime' },
};

export const WithError: Story = {
  args: { errorMsg: 'You must accept the terms to continue' },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack story-stack--md">
        <ea-checkbox size="sm" label="Small checkbox"></ea-checkbox>
        <ea-checkbox size="md" label="Medium checkbox"></ea-checkbox>
        <ea-checkbox size="lg" label="Large checkbox"></ea-checkbox>
      </div>
    `,
  }),
};
