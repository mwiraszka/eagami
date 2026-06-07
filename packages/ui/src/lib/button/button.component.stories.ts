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

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Danger: Story = {
  args: { variant: 'danger' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
};

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

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-row">
        <ea-button size="xs">Extra small</ea-button>
        <ea-button size="sm">Small</ea-button>
        <ea-button size="md">Medium</ea-button>
        <ea-button size="lg">Large</ea-button>
        <ea-button size="xl">Extra large</ea-button>
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
