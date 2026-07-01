import type { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent } from '../button/button.component';
import { TooltipDirective } from './tooltip.directive';
import { TOOLTIP_KNOBS } from './tooltip.directive.knobs';

const meta: Meta<TooltipDirective> = {
  title: 'Components/Tooltip',
  component: TooltipDirective,
  tags: ['autodocs'],
  argTypes: TOOLTIP_KNOBS.argTypes,
  args: TOOLTIP_KNOBS.args,
};

export default meta;
type Story = StoryObj<TooltipDirective>;

export const Playground: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ButtonComponent, TooltipDirective],
    },
    template: `
      <div style="display: flex; justify-content: center; padding: 64px;">
        <ea-button eaTooltip="This is a tooltip" variant="secondary">Hover me</ea-button>
      </div>
    `,
  }),
};
