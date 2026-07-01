import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { HeartIconComponent } from '../icons/heart.component';
import { RatingComponent } from './rating.component';
import { RATING_KNOBS } from './rating.component.knobs';

const meta: Meta<RatingComponent> = {
  title: 'Components/Rating',
  component: RatingComponent,
  tags: ['autodocs'],
  parameters: {
    docs: { story: { height: '8rem' } },
  },
  render: args => ({
    props: args,
    template: `<ea-rating ${argsToTemplate(args)}></ea-rating>`,
  }),
  argTypes: RATING_KNOBS.argTypes,
  args: RATING_KNOBS.args,
};

export default meta;
type Story = StoryObj<RatingComponent>;

export const Default: Story = {
  args: { value: 3 },
};

export const Sizes: Story = {
  // Literal size attributes per instance; a shared `size` arg would force all three rows to one value
  render: () => ({
    template: `
      <div class="story-stack">
        <ea-rating size="xs" label="Extra small" [value]="3"></ea-rating>
        <ea-rating size="sm" label="Small" [value]="3"></ea-rating>
        <ea-rating size="md" label="Medium" [value]="3"></ea-rating>
        <ea-rating size="lg" label="Large" [value]="3"></ea-rating>
        <ea-rating size="xl" label="Extra large" [value]="3"></ea-rating>
      </div>
    `,
    props: { value: 3 },
  }),
};

export const CustomIcon: Story = {
  // `halfIconClass` is omitted because this story doesn't enable `allowHalf`
  render: () => ({
    template: `<ea-rating label="Pick a heart" [value]="4" [iconClass]="HeartIconComponent"></ea-rating>`,
    props: { HeartIconComponent },
  }),
};
