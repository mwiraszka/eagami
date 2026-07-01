import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

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

export const Playground: Story = {};
