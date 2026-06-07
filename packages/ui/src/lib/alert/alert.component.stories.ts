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

export const Success: Story = {
  args: { variant: 'success' },
  render: args => ({
    props: args,
    template: `<ea-alert ${argsToTemplate(args)}>Your changes have been saved</ea-alert>`,
  }),
};

export const Warning: Story = {
  args: { variant: 'warning' },
  render: args => ({
    props: args,
    template: `<ea-alert ${argsToTemplate(args)}>Your trial expires in 3 days</ea-alert>`,
  }),
};

export const Error: Story = {
  args: { variant: 'error' },
  render: args => ({
    props: args,
    template: `<ea-alert ${argsToTemplate(args)}>Something went wrong. Please try again</ea-alert>`,
  }),
};

export const Info: Story = {
  args: { variant: 'info' },
  render: args => ({
    props: args,
    template: `<ea-alert ${argsToTemplate(args)}>A new version is available</ea-alert>`,
  }),
};

export const Dismissible: Story = {
  args: { dismissible: true },
  render: args => ({
    props: args,
    template: `<ea-alert ${argsToTemplate(args)}>This alert can be dismissed</ea-alert>`,
  }),
};

export const WithCustomIcon: Story = {
  args: { variant: 'info', icon: BellIconComponent },
  render: args => ({
    props: args,
    template: `<ea-alert ${argsToTemplate(args)}>A new version is available</ea-alert>`,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack story-stack--md story-medium">
        <ea-alert size="xs" variant="info">Extra small alert message</ea-alert>
        <ea-alert size="sm" variant="info">Small alert message</ea-alert>
        <ea-alert size="md" variant="info">Medium alert message</ea-alert>
        <ea-alert size="lg" variant="info">Large alert message</ea-alert>
        <ea-alert size="xl" variant="info">Extra large alert message</ea-alert>
      </div>
    `,
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
