import type { Meta, StoryObj } from '@storybook/angular';

import { type DataTableColumn, DataTableComponent } from './data-table.component';
import { DATA_TABLE_KNOBS } from './data-table.component.knobs';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  admin: string;
  posts: number;
}

const sampleData: User[] = [
  { id: 1, firstName: 'Alice', lastName: 'Johnson', admin: '', posts: 847 },
  { id: 2, firstName: 'René', lastName: 'Dupont', admin: '✓', posts: 12 },
  { id: 3, firstName: 'Charlie', lastName: 'García', admin: '', posts: 503 },
  { id: 4, firstName: 'Diana', lastName: 'Müller', admin: '', posts: 1291 },
  { id: 5, firstName: 'Zoë', lastName: 'Davis', admin: '', posts: 68 },
  { id: 6, firstName: 'Frank', lastName: 'Østergaard', admin: '✓', posts: 245 },
  { id: 7, firstName: 'Chloé', lastName: 'Lefèvre', admin: '', posts: 1034 },
  { id: 8, firstName: 'Søren', lastName: 'Berg', admin: '', posts: 4 },
];

const columns: DataTableColumn<User>[] = [
  { key: 'id', label: 'ID', sortable: true, width: '60px', align: 'center' },
  { key: 'firstName', label: 'First Name', sortable: true },
  { key: 'lastName', label: 'Last Name', sortable: true },
  { key: 'admin', label: 'Admin', sortable: true, align: 'center' },
  {
    key: 'posts',
    label: 'Posts',
    sortable: true,
    align: 'right',
    format: v => (v as number).toLocaleString('en-US'),
  },
];

const meta: Meta<DataTableComponent<User>> = {
  title: 'Components/Data Table',
  component: DataTableComponent,
  tags: ['autodocs'],
  argTypes: DATA_TABLE_KNOBS.argTypes,
  args: {
    ...DATA_TABLE_KNOBS.args,
    columns,
    data: sampleData,
    noDataText: 'No data available',
  },
};

export default meta;
type Story = StoryObj<DataTableComponent<User>>;

export const Playground: Story = {};
