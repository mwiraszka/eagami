import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';

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

export const InteractionTest: Story = {
  tags: ['!autodocs'],
  parameters: { chromatic: { disableSnapshot: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch', { name: /toggle me/i });
    await expect(toggle).not.toBeChecked();

    await userEvent.click(toggle);

    await expect(toggle).toBeChecked();
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
  },
};
