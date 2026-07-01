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

export const Default: Story = {
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

// Tab-level `disabled` is not reachable through the Tabs controls, so this stays.
export const WithDisabledTab: Story = {
  render: () => ({
    template: `
      <ea-tabs activeTab="general">
        <ea-tab value="general" label="General">General settings</ea-tab>
        <ea-tab value="billing" label="Billing">Billing details</ea-tab>
        <ea-tab value="admin" label="Admin" [disabled]="true">Admin panel</ea-tab>
      </ea-tabs>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="story-stack story-stack--lg">
        <ea-tabs size="xs" activeTab="a">
          <ea-tab value="a" label="Extra small A">Extra small A content</ea-tab>
          <ea-tab value="b" label="Extra small B">Extra small B content</ea-tab>
        </ea-tabs>
        <ea-tabs size="sm" activeTab="a">
          <ea-tab value="a" label="Small A">Small A content</ea-tab>
          <ea-tab value="b" label="Small B">Small B content</ea-tab>
        </ea-tabs>
        <ea-tabs size="md" activeTab="a">
          <ea-tab value="a" label="Medium A">Medium A content</ea-tab>
          <ea-tab value="b" label="Medium B">Medium B content</ea-tab>
        </ea-tabs>
        <ea-tabs size="lg" activeTab="a">
          <ea-tab value="a" label="Large A">Large A content</ea-tab>
          <ea-tab value="b" label="Large B">Large B content</ea-tab>
        </ea-tabs>
        <ea-tabs size="xl" activeTab="a">
          <ea-tab value="a" label="Extra large A">Extra large A content</ea-tab>
          <ea-tab value="b" label="Extra large B">Extra large B content</ea-tab>
        </ea-tabs>
      </div>
    `,
  }),
};
