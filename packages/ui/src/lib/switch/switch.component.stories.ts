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

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack">
        <ea-switch size="xs" label="Extra small" />
        <ea-switch size="sm" label="Small" />
        <ea-switch size="md" label="Medium" />
        <ea-switch size="lg" label="Large" />
        <ea-switch size="xl" label="Extra large" />
      </div>
    `,
  }),
};
