import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { BellIconComponent } from '../icons/bell.component';
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

export const Default: Story = {};

export const WithCustomIcon: Story = {
  args: { variant: 'info', icon: BellIconComponent },
  render: args => ({
    props: args,
    template: `<ea-alert ${argsToTemplate(args)}>A new version is available</ea-alert>`,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="story-stack story-stack--md story-medium">
        <ea-alert variant="default">Default alert message</ea-alert>
        <ea-alert variant="success">Success alert message</ea-alert>
        <ea-alert variant="warning">Warning alert message</ea-alert>
        <ea-alert variant="error">Error alert message</ea-alert>
        <ea-alert variant="info">Info alert message</ea-alert>
      </div>
    `,
  }),
};
