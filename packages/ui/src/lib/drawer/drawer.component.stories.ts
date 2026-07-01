import type { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent } from '../button/button.component';
import { DrawerComponent } from './drawer.component';
import { DRAWER_KNOBS } from './drawer.component.knobs';

const meta: Meta<DrawerComponent> = {
  title: 'Components/Drawer',
  component: DrawerComponent,
  tags: ['autodocs'],
  argTypes: { ...DRAWER_KNOBS.argTypes },
  args: { ...DRAWER_KNOBS.args },
};

export default meta;
type Story = StoryObj<DrawerComponent>;

// A single controllable story: position, size, mode, animation, and showClose are
// all reachable through the controls, so there is no need for hardcoded variants.
export const Default: Story = {
  // `open` is an arg so it survives control changes; otherwise re-running render
  // would reset a local flag and close the drawer whenever a knob (e.g. position)
  // changes, hiding the effect being demonstrated.
  args: { open: true },
  argTypes: { open: { control: 'boolean' } },
  render: args => ({
    props: { ...args },
    moduleMetadata: { imports: [DrawerComponent, ButtonComponent] },
    template: `
      <ea-button (clicked)="open = true">Open Drawer</ea-button>
      <ea-drawer
        [(open)]="open"
        [mode]="mode"
        [position]="position"
        [size]="size"
        [closeOnBackdrop]="closeOnBackdrop"
        [closeOnEscape]="closeOnEscape"
        [animation]="animation"
        [showClose]="showClose">
        <span slot="header">Drawer Title</span>
        <p>This is the drawer body content. Drawers slide in from the edge of the screen.</p>
        <div slot="footer">
          <ea-button variant="secondary" (clicked)="open = false">
            Cancel
          </ea-button>
          <ea-button (clicked)="open = false">
            Save
          </ea-button>
        </div>
      </ea-drawer>
    `,
  }),
};
