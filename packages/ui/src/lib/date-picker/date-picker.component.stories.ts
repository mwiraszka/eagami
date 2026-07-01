import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { DatePickerComponent } from './date-picker.component';
import { DATE_PICKER_KNOBS } from './date-picker.component.knobs';

const meta: Meta<DatePickerComponent> = {
  title: 'Components/Date Picker',
  component: DatePickerComponent,
  tags: ['autodocs'],
  parameters: {
    docs: { story: { height: '30rem' } },
  },
  render: args => ({
    props: args,
    template: `<ea-date-picker ${argsToTemplate(args)} class="story-narrow"></ea-date-picker>`,
  }),
  argTypes: {
    ...DATE_PICKER_KNOBS.argTypes,
    weekStartsOn: {
      control: 'select',
      options: [0, 1],
    },
  },
  args: {
    ...DATE_PICKER_KNOBS.args,
    weekStartsOn: 1,
  },
};

export default meta;
type Story = StoryObj<DatePickerComponent>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack story-narrow">
        <ea-date-picker size="xs" label="Extra small" placeholder="Select…"></ea-date-picker>
        <ea-date-picker size="sm" label="Small" placeholder="Select…"></ea-date-picker>
        <ea-date-picker size="md" label="Medium" placeholder="Select…"></ea-date-picker>
        <ea-date-picker size="lg" label="Large" placeholder="Select…"></ea-date-picker>
        <ea-date-picker size="xl" label="Extra large" placeholder="Select…"></ea-date-picker>
      </div>
    `,
  }),
};
