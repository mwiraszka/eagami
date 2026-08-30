import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { ContrastIconComponent } from '../icons/contrast.component';
import { DropletIconComponent } from '../icons/droplet.component';
import { SunIconComponent } from '../icons/sun.component';
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
    // The input takes a component class, which the shared plain-data knobs
    // cannot hold, so the slug-to-class mapping lives here
    icon: {
      control: 'select',
      options: ['none', 'sun', 'contrast', 'droplet'],
      mapping: {
        none: undefined,
        sun: SunIconComponent,
        contrast: ContrastIconComponent,
        droplet: DropletIconComponent,
      },
    },
  },
  args: { ...SLIDER_KNOBS.args, icon: 'none' },
};

export default meta;
type Story = StoryObj<SliderComponent>;

export const Playground: Story = {
  args: { value: 40 },
};
