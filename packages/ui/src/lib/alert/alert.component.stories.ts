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

export const StaticText: Story = {
  render: () => ({
    template: `
      <ea-alert variant="warning" live="off">
        Scheduled maintenance runs every Sunday from 02:00 to 04:00 UTC.
      </ea-alert>
    `,
  }),
};
