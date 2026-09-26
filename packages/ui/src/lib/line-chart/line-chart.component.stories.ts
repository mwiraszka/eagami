import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { type ChartSeries } from '../chart/chart';
import { LineChartComponent, type LineChartTick } from './line-chart.component';
import { LINE_CHART_KNOBS } from './line-chart.component.knobs';

const LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

// Irregularly spaced readings along a 0-100 scale, labelled by regular ticks every 10
const X_VALUES = [0, 3, 11, 14, 22, 31, 33, 40, 52, 57, 61, 70, 74, 83, 88, 96, 100];
const READINGS: ChartSeries[] = [
  {
    name: 'Reading',
    data: [42, 45, 44, 51, 49, 55, 58, 54, 61, 66, 63, 70, 68, 74, 79, 77, 82],
  },
];
const READING_LABELS = X_VALUES.map((_, i) => `Reading ${i + 1}`);
const X_TICKS: LineChartTick[] = Array.from({ length: 11 }, (_, i) => ({
  value: i * 10,
  label: String(i * 10),
}));

const meta: Meta<LineChartComponent> = {
  title: 'Components/Line Chart',
  component: LineChartComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
      labels: READING_LABELS,
      series: READINGS,
      xValues: X_VALUES,
      xTicks: X_TICKS,
    },
    template: `<ea-line-chart ${argsToTemplate(args)} [labels]="labels" [series]="series" [xValues]="xValues" [xTicks]="xTicks" />`,
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
