import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { TimePickerComponent } from './time-picker.component';

const meta: Meta<TimePickerComponent> = {
  title: 'Components/Time Picker',
  component: TimePickerComponent,
  tags: ['autodocs'],
  parameters: {
    docs: { story: { height: '22rem' } },
  },
  render: args => ({
    props: args,
    template: `<ea-time-picker ${argsToTemplate(args)} class="story-narrow"></ea-time-picker>`,
  }),
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    format: {
      control: 'select',
      options: ['12h', '24h'],
    },
    minuteStep: {
      control: { type: 'number', min: 1, max: 30, step: 1 },
    },
    secondStep: {
      control: { type: 'number', min: 1, max: 30, step: 1 },
    },
    changed: { action: 'changed' },
  },
  args: {
    label: 'Time',
    placeholder: 'Select time…',
    size: 'md',
    format: '24h',
    includeSeconds: false,
    minuteStep: 1,
    secondStep: 1,
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<TimePickerComponent>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: 'Hours and minutes, 24-hour clock.',
  },
};

export const WithError: Story = {
  args: {
    errorMsg: 'This field is required.',
  },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithInitialValue: Story = {
  args: { value: '09:30' },
};

export const TwelveHourFormat: Story = {
  args: { format: '12h' },
};

export const WithSeconds: Story = {
  args: { includeSeconds: true },
};

export const QuarterHourSteps: Story = {
  args: { minuteStep: 15 },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack story-narrow">
        <ea-time-picker size="sm" label="Small" placeholder="Select…"></ea-time-picker>
        <ea-time-picker size="md" label="Medium" placeholder="Select…"></ea-time-picker>
        <ea-time-picker size="lg" label="Large" placeholder="Select…"></ea-time-picker>
      </div>
    `,
  }),
};
