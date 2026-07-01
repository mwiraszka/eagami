import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { AlertComponent } from './alert.component';
import { ALERT_KNOBS } from './alert.component.knobs';

const meta: Meta<AlertComponent> = {
  title: 'Components/Alert',
  component: AlertComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-alert ${argsToTemplate(args)}>This is an alert message.</ea-alert>`,
  }),
  argTypes: ALERT_KNOBS.argTypes,
  args: ALERT_KNOBS.args,
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const Playground: Story = {};
