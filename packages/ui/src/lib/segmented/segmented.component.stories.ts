import { Meta, StoryObj, argsToTemplate } from '@storybook/angular';

import { SelectOption } from '../select-option';
import { SegmentedComponent } from './segmented.component';

const viewOptions: SelectOption[] = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'kanban', label: 'Kanban' },
];

const meta: Meta<SegmentedComponent> = {
  title: 'Components/Segmented',
  component: SegmentedComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-segmented ${argsToTemplate(args)} />`,
  }),
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    changed: { action: 'changed' },
  },
  args: {
    options: viewOptions,
    size: 'md',
    value: 'list',
    fullWidth: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<SegmentedComponent>;

export const Default: Story = {};

export const FullWidth: Story = {
  args: { fullWidth: true },
};

export const TwoOptions: Story = {
  args: {
    options: [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
    ],
    value: 'light',
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise', disabled: true },
    ],
    value: 'free',
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const WithLabel: Story = {
  args: { label: 'View' },
};

export const Required: Story = {
  args: { label: 'Theme', required: true },
};

export const WithHint: Story = {
  args: { label: 'View', hint: 'Switch how items are displayed' },
};

export const WithError: Story = {
  args: { label: 'Layout', errorMsg: 'Layout selection is required' },
};

export const AllSizes: Story = {
  render: () => ({
    props: { viewOptions },
    template: `
      <div class="story-stack">
        <ea-segmented size="sm" [options]="viewOptions" value="list" />
        <ea-segmented size="md" [options]="viewOptions" value="list" />
        <ea-segmented size="lg" [options]="viewOptions" value="list" />
      </div>
    `,
  }),
};

// When the options exceed the available width the control wraps onto multiple
// rows rather than overflowing. The `.story-narrow` frame (max-width 360px)
// forces the wrap so the behaviour is visible in the canvas regardless of
// viewport width.
export const Wrapping: Story = {
  render: () => ({
    props: {
      monthOptions: [
        { value: 'jan', label: 'January' },
        { value: 'feb', label: 'February' },
        { value: 'mar', label: 'March' },
        { value: 'apr', label: 'April' },
        { value: 'may', label: 'May' },
        { value: 'jun', label: 'June' },
        { value: 'jul', label: 'July' },
        { value: 'aug', label: 'August' },
        { value: 'sep', label: 'September' },
        { value: 'oct', label: 'October' },
        { value: 'nov', label: 'November' },
        { value: 'dec', label: 'December' },
      ],
    },
    template: `
      <div class="story-narrow">
        <ea-segmented [options]="monthOptions" value="jan" />
      </div>
    `,
  }),
};
