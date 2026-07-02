import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { BREADCRUMBS_KNOBS } from './breadcrumbs.component.knobs';

const sampleItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Laptops', href: '/products/laptops' },
  { label: 'MacBook Pro' },
];

const meta: Meta<BreadcrumbsComponent> = {
  title: 'Components/Breadcrumbs',
  component: BreadcrumbsComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-breadcrumbs ${argsToTemplate(args)}></ea-breadcrumbs>`,
  }),
  argTypes: BREADCRUMBS_KNOBS.argTypes,
  args: {
    ...BREADCRUMBS_KNOBS.args,
    items: sampleItems,
  },
};

export default meta;
type Story = StoryObj<BreadcrumbsComponent>;

export const Playground: Story = {};
