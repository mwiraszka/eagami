import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { CardComponent } from './card.component';
import { CARD_KNOBS } from './card.component.knobs';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `
      <ea-card ${argsToTemplate(args)} class="story-narrow">
        <span slot="header">Card Title</span>
        This is the card body content. It can contain any text or elements.
        <span slot="footer">Footer</span>
      </ea-card>
    `,
  }),
  argTypes: CARD_KNOBS.argTypes,
  args: CARD_KNOBS.args,
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="story-card-grid">
        <ea-card variant="elevated">
          <span slot="header">Elevated</span>
          Card with shadow elevation.
        </ea-card>
        <ea-card variant="outlined">
          <span slot="header">Outlined</span>
          Card with border outline.
        </ea-card>
        <ea-card variant="filled">
          <span slot="header">Filled</span>
          Card with subtle background.
        </ea-card>
      </div>
    `,
  }),
};
