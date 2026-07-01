import type { Meta, StoryObj } from '@storybook/angular';

import { RadioGroupComponent } from './radio-group.component';
import { RadioComponent } from './radio.component';
import { RADIO_KNOBS } from './radio.component.knobs';

const meta: Meta<RadioGroupComponent> = {
  title: 'Components/Radio',
  component: RadioGroupComponent,
  tags: ['autodocs'],
  argTypes: RADIO_KNOBS.argTypes,
  args: RADIO_KNOBS.args,
};

export default meta;
type Story = StoryObj<RadioGroupComponent>;

export const Default: Story = {
  render: args => ({
    props: args,
    moduleMetadata: { imports: [RadioGroupComponent, RadioComponent] },
    template: `
      <ea-radio-group [size]="size" [orientation]="orientation" [disabled]="disabled">
        <ea-radio value="apple" label="Apple"></ea-radio>
        <ea-radio value="banana" label="Banana"></ea-radio>
        <ea-radio value="cherry" label="Cherry"></ea-radio>
      </ea-radio-group>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    moduleMetadata: { imports: [RadioGroupComponent, RadioComponent] },
    template: `
      <div class="story-row story-row--xl">
        <ea-radio-group size="xs" value="a">
          <ea-radio value="a" label="XS A"></ea-radio>
          <ea-radio value="b" label="XS B"></ea-radio>
        </ea-radio-group>
        <ea-radio-group size="sm" value="a">
          <ea-radio value="a" label="Small A"></ea-radio>
          <ea-radio value="b" label="Small B"></ea-radio>
        </ea-radio-group>
        <ea-radio-group size="md" value="a">
          <ea-radio value="a" label="Medium A"></ea-radio>
          <ea-radio value="b" label="Medium B"></ea-radio>
        </ea-radio-group>
        <ea-radio-group size="lg" value="a">
          <ea-radio value="a" label="Large A"></ea-radio>
          <ea-radio value="b" label="Large B"></ea-radio>
        </ea-radio-group>
        <ea-radio-group size="xl" value="a">
          <ea-radio value="a" label="XL A"></ea-radio>
          <ea-radio value="b" label="XL B"></ea-radio>
        </ea-radio-group>
      </div>
    `,
  }),
};
