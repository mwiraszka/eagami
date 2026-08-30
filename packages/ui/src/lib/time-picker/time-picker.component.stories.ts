import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE } from '../label-icon-story';
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
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
    minuteStep: {
      control: { type: 'number', min: 1, max: 30, step: 1 },
    },
    secondStep: {
      control: { type: 'number', min: 1, max: 30, step: 1 },
    },
  },
  args: {
    ...TIME_PICKER_KNOBS.args,
    labelIcon: 'none',
    secondStep: 1,
  },
};

export default meta;
type Story = StoryObj<TimePickerComponent>;

export const Playground: Story = {};
