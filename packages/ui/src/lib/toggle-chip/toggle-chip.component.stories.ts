import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';

import { CalendarDaysIconComponent } from '../icons/calendar-days.component';
import { MapPinIconComponent } from '../icons/map-pin.component';
import { MoonIconComponent } from '../icons/moon.component';
import { StarIconComponent } from '../icons/star.component';
import { ToggleChipComponent } from './toggle-chip.component';
import { TOGGLE_CHIP_KNOBS } from './toggle-chip.component.knobs';

type ToggleChipStoryArgs = ToggleChipComponent & { label: string };

const ICONS = {
  imports: [
    CalendarDaysIconComponent,
    MapPinIconComponent,
    MoonIconComponent,
    StarIconComponent,
  ],
};

const meta: Meta<ToggleChipStoryArgs> = {
  title: 'Components/Toggle Chip',
  component: ToggleChipComponent,
  tags: ['autodocs'],
  render: ({ label, ...args }) => ({
    props: { ...args, label },
    template: `<ea-toggle-chip ${argsToTemplate(args)}>{{ label }}</ea-toggle-chip>`,
  }),
  argTypes: TOGGLE_CHIP_KNOBS.argTypes,
  args: TOGGLE_CHIP_KNOBS.args,
};

export default meta;
type Story = StoryObj<ToggleChipStoryArgs>;

export const Playground: Story = {};

export const States: Story = {
  render: () => ({
    template: `
      <div class="story-row">
        <ea-toggle-chip>Off</ea-toggle-chip>
        <ea-toggle-chip [selected]="true">On</ea-toggle-chip>
        <ea-toggle-chip [disabled]="true">Disabled</ea-toggle-chip>
        <ea-toggle-chip [selected]="true" [disabled]="true">Disabled on</ea-toggle-chip>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    moduleMetadata: ICONS,
    template: `
      <div class="story-row">
        <ea-toggle-chip [selected]="true"><ea-icon-moon /> Dark mode</ea-toggle-chip>
        <ea-toggle-chip><ea-icon-calendar-days /> Events</ea-toggle-chip>
        <ea-toggle-chip><ea-icon-star /> Reviews</ea-toggle-chip>
        <ea-toggle-chip aria-label="Show on map"><ea-icon-map-pin /></ea-toggle-chip>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack">
        @for (size of ['2xs', 'xs', 'sm', 'md', 'lg', 'xl']; track size) {
          <div class="story-row">
            <ea-toggle-chip [size]="size">{{ size }}</ea-toggle-chip>
            <ea-toggle-chip [size]="size" [selected]="true">{{ size }} on</ea-toggle-chip>
          </div>
        }
      </div>
    `,
  }),
};

export const Rtl: Story = {
  render: () => ({
    moduleMetadata: ICONS,
    template: `
      <div
        class="story-row"
        dir="rtl">
        <ea-toggle-chip [selected]="true"><ea-icon-moon /> الوضع الداكن</ea-toggle-chip>
        <ea-toggle-chip><ea-icon-star /> المراجعات</ea-toggle-chip>
      </div>
    `,
  }),
};

export const InteractionTest: Story = {
  tags: ['!autodocs'],
  parameters: { chromatic: { disableSnapshot: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole('button', { name: /dark mode/i });
    await expect(chip).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(chip);

    await expect(chip).toHaveAttribute('aria-pressed', 'true');
  },
};
