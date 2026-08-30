import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE } from '../label-icon-story';
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
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
    weekStartsOn: {
      control: 'select',
      options: [0, 1],
    },
  },
  args: {
    ...DATE_PICKER_KNOBS.args,
    labelIcon: 'none',
    weekStartsOn: 1,
  },
};

export default meta;
type Story = StoryObj<DatePickerComponent>;

export const Playground: Story = {};
