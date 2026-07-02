import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { EagamiWordmarkComponent } from './eagami-wordmark.component';
import { EAGAMI_WORDMARK_KNOBS } from './eagami-wordmark.component.knobs';

const meta: Meta<EagamiWordmarkComponent> = {
  title: 'Components/Eagami Wordmark',
  component: EagamiWordmarkComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-eagami-wordmark ${argsToTemplate(args)}></ea-eagami-wordmark>`,
  }),
  argTypes: EAGAMI_WORDMARK_KNOBS.argTypes,
  args: EAGAMI_WORDMARK_KNOBS.args,
};

export default meta;
type Story = StoryObj<EagamiWordmarkComponent>;

export const Playground: Story = {};
