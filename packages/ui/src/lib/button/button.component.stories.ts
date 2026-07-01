import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { CheckIconComponent } from '../icons/check.component';
import { ButtonComponent } from './button.component';
import { BUTTON_KNOBS } from './button.component.knobs';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-button ${argsToTemplate(args)}>Button</ea-button>`,
  }),
  argTypes: BUTTON_KNOBS.argTypes,
  args: BUTTON_KNOBS.args,
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="story-row">
        <ea-button variant="primary">Primary</ea-button>
        <ea-button variant="secondary">Secondary</ea-button>
        <ea-button variant="ghost">Ghost</ea-button>
        <ea-button variant="danger">Danger</ea-button>
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  render: () => ({
    props: { icon: CheckIconComponent },
    template: `<ea-button [icon]="icon">Confirm</ea-button>`,
  }),
};
