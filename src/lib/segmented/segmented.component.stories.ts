import { Meta, StoryObj, argsToTemplate } from '@storybook/angular';

import { SegmentedComponent, SelectOption } from './segmented.component';

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
