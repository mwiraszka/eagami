import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE, LABEL_ICON_STORY_NONE } from '../label-icon-story';
import { SliderComponent } from './slider.component';
import { SLIDER_KNOBS } from './slider.component.knobs';

const meta: Meta<SliderComponent> = {
  title: 'Components/Slider',
  component: SliderComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-slider ${argsToTemplate(args)} />`,
  }),
  argTypes: {
    ...SLIDER_KNOBS.argTypes,
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
  },
  args: { ...SLIDER_KNOBS.args, labelIcon: LABEL_ICON_STORY_NONE },
};

export default meta;
type Story = StoryObj<SliderComponent>;

export const Playground: Story = {
  args: { value: 40 },
};
