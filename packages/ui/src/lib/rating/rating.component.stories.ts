import { Meta, StoryObj, argsToTemplate } from '@storybook/angular';

import { HeartIconComponent } from '../icons/heart.component';
import { RatingComponent } from './rating.component';

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
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    max: { control: { type: 'number', min: 1, max: 10 } },
    hoverChanged: { action: 'hoverChanged' },
  },
  args: {
    label: 'Rate your experience',
    value: 3,
    max: 5,
    size: 'md',
    allowHalf: false,
    readonly: false,
    disabled: false,
    required: false,
    clearable: true,
  },
};

export default meta;
type Story = StoryObj<RatingComponent>;

export const Default: Story = {};

export const AllowHalf: Story = {
  args: {
    label: 'Allow half steps',
    value: 3.5,
    allowHalf: true,
    hint: 'Click the left or right half of a star to set a half-step value.',
  },
};

export const Sizes: Story = {
  // `props: args` + `argsToTemplate` would bind every <ea-rating> to the same
  // top-level `size` arg, so all three rows would render at the default `md`.
  // Use literal attribute strings instead so each instance gets its own size.
  render: () => ({
    template: `
      <div class="story-stack">
        <ea-rating size="sm" label="Small" [value]="3"></ea-rating>
        <ea-rating size="md" label="Medium" [value]="3"></ea-rating>
        <ea-rating size="lg" label="Large" [value]="3"></ea-rating>
      </div>
    `,
    props: { value: 3 },
  }),
};

export const Readonly: Story = {
  args: {
    label: 'Read-only',
    value: 4,
    readonly: true,
    hint: 'Display-only — clicking or keyboard input does not change the value.',
  },
};

export const WithError: Story = {
  args: {
    label: 'How was your experience?',
    value: 0,
    required: true,
    errorMsg: 'A rating is required',
  },
};

export const NumberOfStars: Story = {
  args: {
    label: 'Rate it',
    max: 10,
    value: 7,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Locked rating',
    value: 3,
    disabled: true,
  },
};

export const CustomIcon: Story = {
  // Demonstrates the `iconClass` input: pass any standalone component class
  // (here `HeartIconComponent`) and every star renders an instance of it. For
  // half-step rendering with a custom icon, pair this with `halfIconClass` —
  // omitted here because this story doesn't enable `allowHalf`.
  render: () => ({
    template: `<ea-rating label="Pick a heart" [value]="4" [iconClass]="HeartIconComponent"></ea-rating>`,
    props: { HeartIconComponent },
  }),
};
