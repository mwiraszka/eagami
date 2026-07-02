import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

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

export const Playground: Story = {
  args: { value: 3 },
};
