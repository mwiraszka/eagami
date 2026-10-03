import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE } from '../../label-icon-story';
import { DATE_PICKER_WEEKDAY_KNOBS, parseDateListKnob } from '../../playground-knobs';
import { DatePickerComponent } from './date-picker.component';
import { DATE_PICKER_KNOBS } from './date-picker.component.knobs';

// The weekday toggles and the date text are demo knobs, not inputs: they are read
// into the two list inputs and kept out of the generated bindings
const DEMO_KNOBS = new Set<string>([...DATE_PICKER_WEEKDAY_KNOBS, 'disabledDates']);

const meta: Meta<DatePickerComponent> = {
  title: 'Components/Date Picker',
  component: DatePickerComponent,
  tags: ['autodocs'],
  parameters: {
    docs: { story: { height: '30rem' } },
  },
  render: args => {
    const knobs: Record<string, unknown> = args;
    const inputs = Object.fromEntries(
      Object.entries(knobs).filter(([name]) => !DEMO_KNOBS.has(name)),
    );
    return {
      props: {
        ...inputs,
        disabledWeekdays: DATE_PICKER_WEEKDAY_KNOBS.flatMap((knob, day) =>
          knobs[knob] ? [day] : [],
        ),
        disabledDates: parseDateListKnob(String(knobs['disabledDates'] ?? '')),
      },
      template: `<ea-date-picker ${argsToTemplate(inputs)} [disabledWeekdays]="disabledWeekdays" [disabledDates]="disabledDates" class="story-narrow"></ea-date-picker>`,
    };
  },
  argTypes: {
    ...DATE_PICKER_KNOBS.argTypes,
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
    weekStartsOn: {
      ...DATE_PICKER_KNOBS.argTypes['weekStartsOn'],
      mapping: { Sunday: 0, Monday: 1 },
    },
  },
  args: DATE_PICKER_KNOBS.args,
};

export default meta;
type Story = StoryObj<DatePickerComponent>;

export const Playground: Story = {};

export const WeekendsDisabled: Story = {
  render: () => ({
    template: `<ea-date-picker label="Delivery date" [disabledWeekdays]="[0, 6]" class="story-narrow"></ea-date-picker>`,
  }),
};
