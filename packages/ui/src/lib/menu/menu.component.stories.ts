import type { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent } from '../button/button.component';
import { MenuItemComponent } from './menu-item.component';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { MenuComponent } from './menu.component';
import { MENU_KNOBS } from './menu.component.knobs';

const meta: Meta<MenuComponent> = {
  title: 'Components/Menu',
  component: MenuComponent,
  tags: ['autodocs'],
  parameters: {
    docs: { story: { height: '20rem' } },
  },
  argTypes: { ...MENU_KNOBS.argTypes },
  args: { ...MENU_KNOBS.args },
};

export default meta;
type Story = StoryObj<MenuComponent>;

export const Playground: Story = {
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [MenuComponent, MenuTriggerDirective, MenuItemComponent, ButtonComponent],
    },
    template: `
      <ea-button [eaMenuTrigger]="m" variant="secondary">Actions</ea-button>
      <ea-menu #m [placement]="placement" [disabled]="disabled">
        <ea-menu-item>Edit</ea-menu-item>
        <ea-menu-item>Duplicate</ea-menu-item>
        <ea-menu-item>Archive</ea-menu-item>
        <ea-menu-item variant="danger">Delete</ea-menu-item>
      </ea-menu>
    `,
  }),
};
