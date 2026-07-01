import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

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
  argTypes: SLIDER_KNOBS.argTypes,
  args: SLIDER_KNOBS.args,
};

export default meta;
type Story = StoryObj<SliderComponent>;

export const Playground: Story = {
  args: { value: 40 },
};
