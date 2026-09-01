import type { Meta, StoryObj } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE } from '../../label-icon-story';
import { RadioGroupComponent } from './radio-group.component';
import { RadioComponent } from './radio.component';
import { RADIO_KNOBS } from './radio.component.knobs';

const meta: Meta<RadioGroupComponent> = {
  title: 'Components/Radio',
  component: RadioGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    ...RADIO_KNOBS.argTypes,
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
  },
  args: RADIO_KNOBS.args,
};

export default meta;
type Story = StoryObj<RadioGroupComponent>;

export const Playground: Story = {
  render: args => ({
    props: args,
    moduleMetadata: { imports: [RadioGroupComponent, RadioComponent] },
    template: `
      <ea-radio-group [label]="label" [labelIcon]="labelIcon" [size]="size" [orientation]="orientation" [disabled]="disabled">
        <ea-radio value="apple" label="Apple"></ea-radio>
        <ea-radio value="banana" label="Banana"></ea-radio>
        <ea-radio value="cherry" label="Cherry"></ea-radio>
      </ea-radio-group>
    `,
  }),
};
