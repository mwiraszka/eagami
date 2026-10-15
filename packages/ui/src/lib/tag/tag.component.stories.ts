import { type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';

import { GlobeIconComponent } from '../icons/globe.component';
import { MoonIconComponent } from '../icons/moon.component';
import { StarIconComponent } from '../icons/star.component';
import { TagIconComponent } from '../icons/tag.component';
import { TagComponent } from './tag.component';
import { TAG_KNOBS } from './tag.component.knobs';

// The icon input takes a component class, which plain-data knobs cannot hold,
// so the story maps slugs to classes itself
const TAG_ICONS = {
  none: undefined,
  tag: TagIconComponent,
  star: StarIconComponent,
  moon: MoonIconComponent,
  globe: GlobeIconComponent,
};

const meta: Meta<TagComponent> = {
  title: 'Components/Tag',
  component: TagComponent,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ea-tag ${argsToTemplate(args)}>TypeScript</ea-tag>`,
  }),
  argTypes: {
    ...TAG_KNOBS.argTypes,
    icon: {
      control: 'select' as const,
      options: Object.keys(TAG_ICONS),
      mapping: TAG_ICONS,
    },
  },
  args: TAG_KNOBS.args,
};

export default meta;
type Story = StoryObj<TagComponent>;

export const Playground: Story = {};

export const WithIcons: Story = {
  render: () => ({
    props: TAG_ICONS,
    template: `
      <div class="story-row">
        <ea-tag [icon]="star" variant="warning">Featured</ea-tag>
        <ea-tag [icon]="moon">Dark mode</ea-tag>
        <ea-tag [icon]="globe" variant="info">Multilingual</ea-tag>
        <ea-tag [icon]="tag" [removable]="true">Category</ea-tag>
      </div>
    `,
  }),
};

export const ThemeColor: Story = {
  render: () => ({
    template: `
      <ea-tag color="var(--color-brand-default)" ink="var(--color-neutral-0)">Brand</ea-tag>
    `,
  }),
};
