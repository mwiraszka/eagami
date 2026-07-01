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

export const Default: Story = {
  args: { value: 40 },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack">
        <ea-slider size="xs" label="Extra small" [value]="20" [showValue]="true" />
        <ea-slider size="sm" label="Small" [value]="30" [showValue]="true" />
        <ea-slider size="md" label="Medium" [value]="50" [showValue]="true" />
        <ea-slider size="lg" label="Large" [value]="70" [showValue]="true" />
        <ea-slider size="xl" label="Extra large" [value]="80" [showValue]="true" />
      </div>
    `,
  }),
};
