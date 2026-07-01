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

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack story-stack--md">
        <ea-checkbox size="xs" label="Extra small checkbox"></ea-checkbox>
        <ea-checkbox size="sm" label="Small checkbox"></ea-checkbox>
        <ea-checkbox size="md" label="Medium checkbox"></ea-checkbox>
        <ea-checkbox size="lg" label="Large checkbox"></ea-checkbox>
        <ea-checkbox size="xl" label="Extra large checkbox"></ea-checkbox>
      </div>
    `,
  }),
};
