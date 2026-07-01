import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

import { AccordionItemComponent } from './accordion-item.component';
import { AccordionComponent } from './accordion.component';
import { ACCORDION_KNOBS } from './accordion.component.knobs';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [AccordionItemComponent] })],
  argTypes: ACCORDION_KNOBS.argTypes,
  args: ACCORDION_KNOBS.args,
};

export default meta;
type Story = StoryObj<AccordionComponent>;

export const Default: Story = {
  render: args => ({
    props: args,
    template: `
      <ea-accordion [multi]="multi" class="story-medium">
        <ea-accordion-item value="what" label="What is @eagami/ui?">
          A lightweight, accessible Angular component library built on CSS custom properties.
        </ea-accordion-item>
        <ea-accordion-item value="install" label="How do I install it?">
          Run npm install @eagami/ui or pnpm add @eagami/ui, then add the global stylesheet.
        </ea-accordion-item>
        <ea-accordion-item value="theme" label="Can I customize the theme?">
          Yes — override any CSS custom property on :root or scope overrides to individual components.
        </ea-accordion-item>
      </ea-accordion>
    `,
  }),
};

export const WithDisabledItem: Story = {
  render: () => ({
    template: `
      <ea-accordion class="story-medium">
        <ea-accordion-item value="active" label="Active Section">
          This section can be toggled.
        </ea-accordion-item>
        <ea-accordion-item value="disabled" label="Disabled Section" [disabled]="true">
          This content is not reachable.
        </ea-accordion-item>
        <ea-accordion-item value="another" label="Another Section">
          This section also works.
        </ea-accordion-item>
      </ea-accordion>
    `,
  }),
};
