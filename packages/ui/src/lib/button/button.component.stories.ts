import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { ButtonComponent } from './button.component';
import { BUTTON_KNOBS } from './button.component.knobs';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-button ${argsToTemplate(args)}>Button</ea-button>`,
  }),
  argTypes: BUTTON_KNOBS.argTypes,
  args: BUTTON_KNOBS.args,
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Playground: Story = {};
