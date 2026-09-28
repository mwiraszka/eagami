import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { CardComponent } from './card.component';
import { CARD_KNOBS } from './card.component.knobs';

type CardStoryArgs = CardComponent & {
  headerText: string;
  bodyText: string;
  footerText: string;
};

const meta: Meta<CardStoryArgs> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `
      <ea-card ${argsToTemplate(args, { exclude: ['headerText', 'bodyText', 'footerText'] })} class="story-narrow">
        @if (headerText) {
          <span slot="header">{{ headerText }}</span>
        }
        {{ bodyText }}
        @if (footerText) {
          <span slot="footer">{{ footerText }}</span>
        }
      </ea-card>
    `,
  }),
  argTypes: CARD_KNOBS.argTypes,
  args: CARD_KNOBS.args,
};

export default meta;
type Story = StoryObj<CardStoryArgs>;

export const Playground: Story = {};
