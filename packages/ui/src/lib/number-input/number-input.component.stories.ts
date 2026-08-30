import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE, LABEL_ICON_STORY_NONE } from '../label-icon-story';
import { NumberInputComponent } from './number-input.component';
import { NUMBER_INPUT_KNOBS } from './number-input.component.knobs';

const meta: Meta<NumberInputComponent> = {
  title: 'Components/Number Input',
  component: NumberInputComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-number-input ${argsToTemplate(args)} class="story-narrow"></ea-number-input>`,
  }),
  argTypes: {
    ...NUMBER_INPUT_KNOBS.argTypes,
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
  },
  args: { ...NUMBER_INPUT_KNOBS.args, labelIcon: LABEL_ICON_STORY_NONE },
};

export default meta;
type Story = StoryObj<NumberInputComponent>;

export const Playground: Story = {};
