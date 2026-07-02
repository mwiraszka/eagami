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

export const Playground: Story = {};
