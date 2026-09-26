import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { type ChartSeries } from '../chart/chart';
import { BarChartComponent } from './bar-chart.component';
import { BAR_CHART_KNOBS } from './bar-chart.component.knobs';

const LABELS = ['Q1', 'Q2', 'Q3', 'Q4'];

const SERIES: ChartSeries[] = [
  { name: 'Hardware', data: [42, 58, 51, 67] },
  { name: 'Software', data: [28, 35, 47, 52] },
  { name: 'Services', data: [15, 19, 22, 30] },
];

const meta: Meta<BarChartComponent> = {
  title: 'Components/Bar Chart',
  component: BarChartComponent,
  tags: ['autodocs'],
  render: args => ({
    props: { ...args, labels: LABELS, series: SERIES },
    template: `<ea-bar-chart ${argsToTemplate(args)} [labels]="labels" [series]="series" />`,
  }),
  argTypes: BAR_CHART_KNOBS.argTypes,
  args: BAR_CHART_KNOBS.args,
};

export default meta;
type Story = StoryObj<BarChartComponent>;

export const Playground: Story = {};

export const Stacked: Story = { args: { stacked: true, showValues: true } };

export const Horizontal: Story = { args: { orientation: 'horizontal' } };

export const NegativeValues: Story = {
  render: args => ({
    props: {
      ...args,
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      series: [{ name: 'Net change', data: [12, -8, 5, -14, 9] }],
    },
    template: `<ea-bar-chart ${argsToTemplate(args)} [labels]="labels" [series]="series" />`,
  }),
  args: { showValues: true },
};

export const Empty: Story = {
  render: args => ({
    props: args,
    template: `<ea-bar-chart ${argsToTemplate(args)} />`,
  }),
};
