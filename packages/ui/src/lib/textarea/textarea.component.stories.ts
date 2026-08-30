import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE } from '../label-icon-story';
import { TextareaComponent } from './textarea.component';
import { TEXTAREA_KNOBS } from './textarea.component.knobs';

const meta: Meta<TextareaComponent> = {
  title: 'Components/Textarea',
  component: TextareaComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-textarea ${argsToTemplate(args)} class="story-narrow"></ea-textarea>`,
  }),
  argTypes: {
    ...TEXTAREA_KNOBS.argTypes,
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
  },
  args: { ...TEXTAREA_KNOBS.args, labelIcon: 'none' },
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Playground: Story = {};
