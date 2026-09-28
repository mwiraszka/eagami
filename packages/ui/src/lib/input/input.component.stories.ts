import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE } from '../../label-icon-story';
import { InputComponent } from './input.component';
import { INPUT_KNOBS } from './input.component.knobs';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-input ${argsToTemplate(args)} class="story-narrow"></ea-input>`,
  }),
  argTypes: {
    ...INPUT_KNOBS.argTypes,
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
  },
  args: INPUT_KNOBS.args,
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Playground: Story = {};

export const WithLabelHelp: Story = {
  args: {
    label: 'Phone number',
    labelHelp: 'We only use it when we cannot reach you by email.',
    type: 'tel',
    placeholder: '555-123-1234',
  },
};
