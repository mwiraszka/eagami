import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { type ChartSeries } from '../chart/chart';
import { LineChartComponent } from './line-chart.component';
import { LINE_CHART_KNOBS } from './line-chart.component.knobs';

const LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

const SERIES: ChartSeries[] = [
  { name: 'Visitors', data: [1200, 1850, 1640, 2310, 2780, 2520, 3140, 3480] },
  { name: 'Sign-ups', data: [320, 410, 520, 480, 690, 740, 810, 960] },
];

const meta: Meta<LineChartComponent> = {
  title: 'Components/Line Chart',
  component: LineChartComponent,
  tags: ['autodocs'],
  render: args => ({
    props: { ...args, labels: LABELS, series: SERIES },
    template: `<ea-line-chart ${argsToTemplate(args)} [labels]="labels" [series]="series" />`,
  }),
  argTypes: LINE_CHART_KNOBS.argTypes,
  args: LINE_CHART_KNOBS.args,
};

export default meta;
type Story = StoryObj<LineChartComponent>;

export const Playground: Story = {};

export const WithGaps: Story = {
  render: args => ({
    props: {
      ...args,
      labels: LABELS,
      series: [{ name: 'Temperature', data: [4, 6, null, 12, 15, null, 21, 19] }],
    },
    template: `<ea-line-chart ${argsToTemplate(args)} [labels]="labels" [series]="series" />`,
  }),
};

export const Empty: Story = {
  render: args => ({
    props: args,
    template: `<ea-line-chart ${argsToTemplate(args)} />`,
  }),
};
