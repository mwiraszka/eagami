import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { PieChartComponent, type PieChartSlice } from './pie-chart.component';
import { PIE_CHART_KNOBS } from './pie-chart.component.knobs';

const DATA: PieChartSlice[] = [
  { label: 'Desktop', value: 5480 },
  { label: 'Mobile', value: 3920 },
  { label: 'Tablet', value: 1140 },
  { label: 'Other', value: 460 },
];

const meta: Meta<PieChartComponent> = {
  title: 'Components/Pie Chart',
  component: PieChartComponent,
  tags: ['autodocs'],
  render: args => ({
    props: { ...args, data: DATA },
    template: `<ea-pie-chart ${argsToTemplate(args)} [data]="data" />`,
  }),
  argTypes: PIE_CHART_KNOBS.argTypes,
  args: PIE_CHART_KNOBS.args,
};

export default meta;
type Story = StoryObj<PieChartComponent>;

export const Playground: Story = {};

export const Donut: Story = { args: { variant: 'donut' } };

export const SingleSlice: Story = {
  render: args => ({
    props: { ...args, data: [{ label: 'Complete', value: 1 }] },
    template: `<ea-pie-chart ${argsToTemplate(args)} [data]="data" />`,
  }),
};

export const Empty: Story = {
  render: args => ({
    props: args,
    template: `<ea-pie-chart ${argsToTemplate(args)} />`,
  }),
};
