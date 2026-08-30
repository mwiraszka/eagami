import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { LABEL_ICON_STORY_ARGTYPE, LABEL_ICON_STORY_NONE } from '../label-icon-story';
import { AutocompleteComponent } from './autocomplete.component';
import { AUTOCOMPLETE_KNOBS } from './autocomplete.component.knobs';

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'br', label: 'Brazil' },
  { value: 'ar', label: 'Argentina' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'pl', label: 'Poland' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'South Korea' },
  { value: 'cn', label: 'China' },
  { value: 'in', label: 'India' },
  { value: 'au', label: 'Australia' },
  { value: 'nz', label: 'New Zealand' },
];

const meta: Meta<AutocompleteComponent> = {
  title: 'Components/Autocomplete',
  component: AutocompleteComponent,
  tags: ['autodocs'],
  parameters: {
    // Sized to fit the trigger plus the 15rem max-height suggestion list
    docs: { story: { height: '22rem' } },
  },
  render: args => ({
    props: args,
    template: `<ea-autocomplete ${argsToTemplate(args)} class="story-narrow"></ea-autocomplete>`,
  }),
  argTypes: {
    ...AUTOCOMPLETE_KNOBS.argTypes,
    labelIcon: LABEL_ICON_STORY_ARGTYPE,
    selected: { action: 'selected' },
    changed: { action: 'changed' },
  },
  args: {
    ...AUTOCOMPLETE_KNOBS.args,
    labelIcon: LABEL_ICON_STORY_NONE,
    label: 'Country',
    options: countries,
  },
};

export default meta;
type Story = StoryObj<AutocompleteComponent>;

export const Playground: Story = {};

export const Grouped: Story = {
  args: {
    options: [
      { label: 'Recently used', options: countries.slice(0, 2) },
      { label: 'All countries', options: countries },
    ],
  },
};

export const GroupedWithoutHeadings: Story = {
  args: {
    options: [{ options: countries.slice(0, 2) }, { options: countries }],
  },
};
