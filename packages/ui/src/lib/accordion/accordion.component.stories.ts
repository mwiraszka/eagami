import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';

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

export const Playground: Story = {
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

export const InteractionTest: Story = {
  ...Playground,
  tags: ['!autodocs'],
  parameters: { chromatic: { disableSnapshot: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /how do i install it/i });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);

    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(
      canvas.getByRole('region', { name: /how do i install it/i }),
    ).toBeVisible();
  },
};
