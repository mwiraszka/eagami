import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

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
