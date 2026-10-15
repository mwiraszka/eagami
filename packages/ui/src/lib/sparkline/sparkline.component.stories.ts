import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { SparklineComponent } from './sparkline.component';
import { SPARKLINE_KNOBS } from './sparkline.component.knobs';

const DATA = [12, 18, 15, 22, 19, 27, 24, 31, 28, 35, 33, 41];

const meta: Meta<SparklineComponent> = {
  title: 'Components/Sparkline',
  component: SparklineComponent,
  tags: ['autodocs'],
  render: args => ({
    props: { ...args, data: DATA },
    template: `<ea-sparkline ${argsToTemplate(args)} [data]="data" />`,
  }),
  argTypes: SPARKLINE_KNOBS.argTypes,
  args: SPARKLINE_KNOBS.args,
};

export default meta;
type Story = StoryObj<SparklineComponent>;

export const Playground: Story = {};

export const Line: Story = { args: { variant: 'line', markers: 'extremes' } };

export const Bars: Story = {
  render: args => ({
    props: { ...args, data: [4, -2, 6, 3, -5, 8, 7, -1, 9, 5] },
    template: `<ea-sparkline ${argsToTemplate(args)} [data]="data" />`,
  }),
  args: { variant: 'bar' },
};

export const WithGaps: Story = {
  render: args => ({
    props: { ...args, data: [8, 11, null, 14, 12, null, null, 18, 21] },
    template: `<ea-sparkline ${argsToTemplate(args)} [data]="data" />`,
  }),
  args: { variant: 'line', curve: 'linear' },
};

export const EveryMarker: Story = { args: { variant: 'line', markers: 'all' } };

export const StartAtZero: Story = { args: { startAtZero: true } };

export const Empty: Story = {
  render: args => ({
    props: args,
    template: `<ea-sparkline ${argsToTemplate(args)} />`,
  }),
};
