import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE } from '../label-icon-story';
import { RangeSliderComponent } from './range-slider.component';
import { RANGE_SLIDER_KNOBS } from './range-slider.component.knobs';

const meta: Meta<RangeSliderComponent> = {
  title: 'Components/Range Slider',
  component: RangeSliderComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-range-slider ${argsToTemplate(args)} />`,
  }),
  argTypes: {
    ...RANGE_SLIDER_KNOBS.argTypes,
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
  },
  args: { ...RANGE_SLIDER_KNOBS.args, labelIcon: 'none' },
};

export default meta;
type Story = StoryObj<RangeSliderComponent>;

export const Playground: Story = {
  args: { value: [20, 80] },
};
