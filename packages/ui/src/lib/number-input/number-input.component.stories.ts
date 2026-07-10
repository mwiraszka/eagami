import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { NumberInputComponent } from './number-input.component';
import { NUMBER_INPUT_KNOBS } from './number-input.component.knobs';

const meta: Meta<NumberInputComponent> = {
  title: 'Components/Number Input',
  component: NumberInputComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-number-input ${argsToTemplate(args)} class="story-narrow"></ea-number-input>`,
  }),
  argTypes: NUMBER_INPUT_KNOBS.argTypes,
  args: NUMBER_INPUT_KNOBS.args,
};

export default meta;
type Story = StoryObj<NumberInputComponent>;

export const Playground: Story = {};
