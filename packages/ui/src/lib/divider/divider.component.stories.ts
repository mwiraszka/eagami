import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { DividerComponent } from './divider.component';
import { DIVIDER_KNOBS } from './divider.component.knobs';

const meta: Meta<DividerComponent> = {
  title: 'Components/Divider',
  component: DividerComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-divider ${argsToTemplate(args)} />`,
  }),
  argTypes: DIVIDER_KNOBS.argTypes,
  args: DIVIDER_KNOBS.args,
};

export default meta;
type Story = StoryObj<DividerComponent>;

export const Playground: Story = {};
