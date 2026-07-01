import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { SwitchComponent } from './switch.component';
import { SWITCH_KNOBS } from './switch.component.knobs';

const meta: Meta<SwitchComponent> = {
  title: 'Components/Switch',
  component: SwitchComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-switch ${argsToTemplate(args)} />`,
  }),
  argTypes: SWITCH_KNOBS.argTypes,
  args: SWITCH_KNOBS.args,
};

export default meta;
type Story = StoryObj<SwitchComponent>;

export const Playground: Story = {};
