import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';

import { CalendarDaysIconComponent } from '../icons/calendar-days.component';
import { MapPinIconComponent } from '../icons/map-pin.component';
import { MoonIconComponent } from '../icons/moon.component';
import { StarIconComponent } from '../icons/star.component';
import { ToggleChipComponent } from './toggle-chip.component';
import { TOGGLE_CHIP_KNOBS } from './toggle-chip.component.knobs';

type ToggleChipStoryArgs = ToggleChipComponent & { label: string };

// The icon input takes a component class, which plain-data knobs cannot hold,
// so the story maps slugs to classes itself
const CHIP_ICONS = {
  none: undefined,
  moon: MoonIconComponent,
  calendarDays: CalendarDaysIconComponent,
  star: StarIconComponent,
  mapPin: MapPinIconComponent,
};

const meta: Meta<ToggleChipStoryArgs> = {
  title: 'Components/Toggle Chip',
  component: ToggleChipComponent,
  tags: ['autodocs'],
  render: ({ label, ...args }) => ({
    props: { ...args, label },
    template: `<ea-toggle-chip ${argsToTemplate(args)}>{{ label }}</ea-toggle-chip>`,
  }),
  argTypes: {
    ...TOGGLE_CHIP_KNOBS.argTypes,
    icon: {
      control: 'select' as const,
      options: Object.keys(CHIP_ICONS),
      mapping: CHIP_ICONS,
    },
  },
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
    props: CHIP_ICONS,
    template: `
      <div class="story-row">
        <ea-toggle-chip [icon]="moon" [selected]="true">Dark mode</ea-toggle-chip>
        <ea-toggle-chip [icon]="calendarDays">Events</ea-toggle-chip>
        <ea-toggle-chip [icon]="star">Reviews</ea-toggle-chip>
        <ea-toggle-chip [icon]="mapPin" aria-label="Show on map" />
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
    props: CHIP_ICONS,
    template: `
      <div
        class="story-row"
        dir="rtl">
        <ea-toggle-chip [icon]="moon" [selected]="true">الوضع الداكن</ea-toggle-chip>
        <ea-toggle-chip [icon]="star">المراجعات</ea-toggle-chip>
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
