import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { TimelineComponent, type TimelineItem } from './timeline.component';
import { TIMELINE_KNOBS } from './timeline.component.knobs';

const SAMPLE_ITEMS: TimelineItem[] = [
  {
    heading: 'Order placed',
    time: '09:24',
    description: 'Payment confirmed and receipt sent.',
    color: 'success',
  },
  {
    heading: 'Packed',
    time: '11:02',
    description: 'Items picked and boxed at the warehouse.',
  },
  {
    heading: 'Out for delivery',
    time: '14:47',
    description: 'The courier is on the way.',
    current: true,
  },
  {
    heading: 'Delivered',
    description: 'Estimated by end of day.',
    color: 'default',
  },
];

const meta: Meta<TimelineComponent> = {
  title: 'Components/Timeline',
  component: TimelineComponent,
  tags: ['autodocs'],
  render: args => ({
    props: { ...args, items: SAMPLE_ITEMS },
    template: `<ea-timeline ${argsToTemplate(args)} [items]="items"></ea-timeline>`,
  }),
  argTypes: TIMELINE_KNOBS.argTypes,
  args: TIMELINE_KNOBS.args,
};

export default meta;
type Story = StoryObj<TimelineComponent>;

export const Playground: Story = {};
