import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';

import { CheckIconComponent } from '../icons/check.component';
import { LockIconComponent } from '../icons/lock.component';
import { MoonIconComponent } from '../icons/moon.component';
import { SunIconComponent } from '../icons/sun.component';
import { UnlockIconComponent } from '../icons/unlock.component';
import { XIconComponent } from '../icons/x.component';
import { SwitchComponent } from './switch.component';
import { SWITCH_KNOBS } from './switch.component.knobs';

// The thumb icon inputs take component classes, which plain-data knobs cannot
// hold, so the story maps slugs to classes itself
const THUMB_ICONS = {
  none: undefined,
  check: CheckIconComponent,
  x: XIconComponent,
  sun: SunIconComponent,
  moon: MoonIconComponent,
  lock: LockIconComponent,
  unlock: UnlockIconComponent,
};

const THUMB_ICON_ARGTYPE = {
  control: 'select' as const,
  options: Object.keys(THUMB_ICONS),
  mapping: THUMB_ICONS,
};

const meta: Meta<SwitchComponent> = {
  title: 'Components/Switch',
  component: SwitchComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-switch ${argsToTemplate(args)} />`,
  }),
  argTypes: {
    ...SWITCH_KNOBS.argTypes,
    onIcon: THUMB_ICON_ARGTYPE,
    offIcon: THUMB_ICON_ARGTYPE,
  },
  args: SWITCH_KNOBS.args,
};

export default meta;
type Story = StoryObj<SwitchComponent>;

export const Playground: Story = {};

export const Variants: Story = {
  render: args => ({
    props: args,
    template: `
      <div class="story-stack">
        <ea-switch label="Default" [size]="size" />
        <ea-switch label="Default" [size]="size" [checked]="true" />
        <ea-switch label="Success" variant="success" [size]="size" />
        <ea-switch label="Success" variant="success" [size]="size" [checked]="true" />
        <ea-switch label="Warning" variant="warning" [size]="size" />
        <ea-switch label="Warning" variant="warning" [size]="size" [checked]="true" />
        <ea-switch label="Error" variant="error" [size]="size" />
        <ea-switch label="Error" variant="error" [size]="size" [checked]="true" />
        <ea-switch label="Info" variant="info" [size]="size" />
        <ea-switch label="Info" variant="info" [size]="size" [checked]="true" />
      </div>
    `,
  }),
};

export const WarningWithThumbIcons: Story = {
  render: () => ({
    props: { onIcon: CheckIconComponent, offIcon: XIconComponent },
    template: `
      <div class="story-stack">
        <ea-switch
          label="Automatic backups"
          variant="warning"
          [onIcon]="onIcon"
          [offIcon]="offIcon" />
        <ea-switch
          label="Automatic backups"
          variant="warning"
          [checked]="true"
          [onIcon]="onIcon"
          [offIcon]="offIcon" />
      </div>
    `,
  }),
};

export const ThumbIconsAcrossSizes: Story = {
  render: () => ({
    props: { onIcon: CheckIconComponent, offIcon: XIconComponent },
    template: `
      <div class="story-stack">
        @for (size of ['2xs', 'xs', 'sm', 'md', 'lg', 'xl']; track size) {
          <ea-switch
            [label]="size"
            [size]="size"
            [checked]="true"
            [onIcon]="onIcon"
            [offIcon]="offIcon" />
          <ea-switch
            [label]="size"
            [size]="size"
            [onIcon]="onIcon"
            [offIcon]="offIcon" />
        }
      </div>
    `,
  }),
};

export const InteractionTest: Story = {
  tags: ['!autodocs'],
  parameters: { chromatic: { disableSnapshot: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch', { name: /toggle me/i });
    await expect(toggle).not.toBeChecked();

    await userEvent.click(toggle);

    await expect(toggle).toBeChecked();
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
  },
};
