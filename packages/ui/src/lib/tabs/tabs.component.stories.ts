import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';

import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';
import { TABS_KNOBS } from './tabs.component.knobs';

const meta: Meta<TabsComponent> = {
  title: 'Components/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [TabComponent] })],
  argTypes: TABS_KNOBS.argTypes,
  args: {
    ...TABS_KNOBS.args,
    activeTab: 'account',
  },
};

export default meta;
type Story = StoryObj<TabsComponent>;

export const Playground: Story = {
  render: args => ({
    props: args,
    template: `
      <ea-tabs variant="${args['variant']}" size="${args['size']}" activeTab="${args['activeTab']}">
        <ea-tab value="account" label="Account">Account settings content</ea-tab>
        <ea-tab value="security" label="Security">Security settings content</ea-tab>
        <ea-tab value="notifications" label="Notifications">Notification preferences content</ea-tab>
      </ea-tabs>
    `,
  }),
};

export const InteractionTest: Story = {
  ...Playground,
  tags: ['!autodocs'],
  parameters: { chromatic: { disableSnapshot: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const account = canvas.getByRole('tab', { name: 'Account' });
    const security = canvas.getByRole('tab', { name: 'Security' });
    await expect(account).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(security);

    await expect(security).toHaveAttribute('aria-selected', 'true');
    await expect(account).toHaveAttribute('aria-selected', 'false');

    await userEvent.keyboard('{ArrowRight}');
    const notifications = canvas.getByRole('tab', { name: 'Notifications' });
    await expect(notifications).toHaveAttribute('aria-selected', 'true');
    await expect(notifications).toHaveFocus();
  },
};
