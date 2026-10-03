import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { BREADCRUMBS_KNOBS } from './breadcrumbs.component.knobs';

const sampleItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Computers', href: '/products/electronics/computers' },
  { label: 'Laptops', href: '/products/electronics/computers/laptops' },
  { label: 'MacBook Pro' },
];

const meta: Meta<BreadcrumbsComponent> = {
  title: 'Components/Breadcrumbs',
  component: BreadcrumbsComponent,
  tags: ['autodocs'],
  render: args => {
    // `width` is a demo knob that sizes the container, not an input
    const { width, ...inputs }: Record<string, unknown> = args;
    return {
      props: { ...inputs, width },
      template: `<div [style.max-width.px]="width || null"><ea-breadcrumbs ${argsToTemplate(inputs)}></ea-breadcrumbs></div>`,
    };
  },
  argTypes: BREADCRUMBS_KNOBS.argTypes,
  args: {
    ...BREADCRUMBS_KNOBS.args,
    items: sampleItems,
  },
};

export default meta;
type Story = StoryObj<BreadcrumbsComponent>;

export const Playground: Story = {};

export const MaxItems: Story = {
  args: { maxItems: 3 },
};

export const NarrowContainer: Story = {
  render: args => ({
    props: args,
    template: `<div class="sb-breadcrumbs-narrow"><ea-breadcrumbs [items]="items"></ea-breadcrumbs></div>`,
    styles: ['.sb-breadcrumbs-narrow { max-width: 20rem; }'],
  }),
};

export const Scrolling: Story = {
  render: args => ({
    props: args,
    template: `<div class="sb-breadcrumbs-narrow"><ea-breadcrumbs [items]="items" overflow="scroll"></ea-breadcrumbs></div>`,
    styles: ['.sb-breadcrumbs-narrow { max-width: 20rem; }'],
  }),
};
