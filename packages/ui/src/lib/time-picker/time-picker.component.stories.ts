import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { TimePickerComponent } from './time-picker.component';
import { TIME_PICKER_KNOBS } from './time-picker.component.knobs';

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
    ...TIME_PICKER_KNOBS.argTypes,
    minuteStep: {
      control: { type: 'number', min: 1, max: 30, step: 1 },
    },
    secondStep: {
      control: { type: 'number', min: 1, max: 30, step: 1 },
    },
  },
  args: {
    ...TIME_PICKER_KNOBS.args,
    secondStep: 1,
  },
};

export default meta;
type Story = StoryObj<TimePickerComponent>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack story-narrow">
        <ea-time-picker size="xs" label="Extra small" placeholder="Select…"></ea-time-picker>
        <ea-time-picker size="sm" label="Small" placeholder="Select…"></ea-time-picker>
        <ea-time-picker size="md" label="Medium" placeholder="Select…"></ea-time-picker>
        <ea-time-picker size="lg" label="Large" placeholder="Select…"></ea-time-picker>
        <ea-time-picker size="xl" label="Extra large" placeholder="Select…"></ea-time-picker>
      </div>
    `,
  }),
};
