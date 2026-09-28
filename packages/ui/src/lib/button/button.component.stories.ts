import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { BellIconComponent } from '../icons/bell.component';
import { HomeIconComponent } from '../icons/home.component';
import { SettingsIconComponent } from '../icons/settings.component';
import { UserIconComponent } from '../icons/user.component';
import { ButtonLinkComponent } from './button-link.component';
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

export const Playground: Story = {};

const LIST_ICONS = {
  homeIcon: HomeIconComponent,
  userIcon: UserIconComponent,
  bellIcon: BellIconComponent,
  settingsIcon: SettingsIconComponent,
};

export const ListRows: Story = {
  render: () => ({
    props: LIST_ICONS,
    moduleMetadata: {
      imports: [ButtonComponent],
    },
    template: `
      <div class="sb-button-columns">
        <div class="sb-button-list">
          <ea-button variant="ghost" align="start" [fullWidth]="true" [icon]="homeIcon">Home</ea-button>
          <ea-button variant="ghost" align="start" [fullWidth]="true" [icon]="userIcon">Profile</ea-button>
          <ea-button variant="ghost" align="start" [fullWidth]="true" [icon]="bellIcon">Notifications</ea-button>
          <ea-button variant="ghost" align="end" [fullWidth]="true" [icon]="settingsIcon">Settings</ea-button>
        </div>
        <div class="sb-button-list" dir="rtl">
          <ea-button variant="ghost" align="start" [fullWidth]="true" [icon]="homeIcon">الرئيسية</ea-button>
          <ea-button variant="ghost" align="start" [fullWidth]="true" [icon]="userIcon">الملف الشخصي</ea-button>
          <ea-button variant="ghost" align="start" [fullWidth]="true" [icon]="bellIcon">الإشعارات</ea-button>
          <ea-button variant="ghost" align="end" [fullWidth]="true" [icon]="settingsIcon">الإعدادات</ea-button>
        </div>
      </div>
    `,
    styles: [
      `
        .sb-button-columns {
          display: flex;
          flex-wrap: wrap;
          gap: 32px;
        }

        .sb-button-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 280px;
        }
      `,
    ],
  }),
};

export const TextLink: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ButtonComponent],
    },
    template: `
      <p class="sb-button-prose">
        Forgot your password?
        <ea-button variant="link">Reset it</ea-button>
        and we will email you a link.
      </p>
      <div class="sb-button-row">
        <ea-button variant="link" size="sm">Small</ea-button>
        <ea-button variant="link" size="lg">Large</ea-button>
        <ea-button variant="link" [disabled]="true">Disabled</ea-button>
      </div>
    `,
    styles: [
      `
        .sb-button-prose {
          margin: 0 0 16px;
          font-family: var(--font-family-sans);
          color: var(--color-text-primary);
        }

        .sb-button-row {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 16px;
        }
      `,
    ],
  }),
};

export const LinkMode: Story = {
  render: () => ({
    props: LIST_ICONS,
    moduleMetadata: {
      imports: [ButtonLinkComponent],
    },
    template: `
      <div class="sb-button-row">
        <a eaButtonLink href="https://eagami.com/ui" target="_blank" rel="noopener noreferrer">Primary</a>
        <a eaButtonLink variant="secondary" href="https://eagami.com/ui" target="_blank" rel="noopener noreferrer">Secondary</a>
        <a eaButtonLink variant="ghost" [icon]="homeIcon" href="https://eagami.com/ui" target="_blank" rel="noopener noreferrer">Ghost</a>
        <a eaButtonLink variant="link" href="https://eagami.com/ui" target="_blank" rel="noopener noreferrer">Text link</a>
        <a eaButtonLink [disabled]="true" href="https://eagami.com/ui" target="_blank" rel="noopener noreferrer">Disabled</a>
      </div>
      <div class="sb-button-list">
        <a eaButtonLink variant="ghost" align="start" [fullWidth]="true" [icon]="userIcon" href="https://eagami.com/ui" target="_blank" rel="noopener noreferrer">Profile</a>
        <a eaButtonLink variant="ghost" align="start" [fullWidth]="true" [icon]="settingsIcon" href="https://eagami.com/ui" target="_blank" rel="noopener noreferrer">Settings</a>
      </div>
    `,
    styles: [
      `
        .sb-button-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .sb-button-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 280px;
        }
      `,
    ],
  }),
};
