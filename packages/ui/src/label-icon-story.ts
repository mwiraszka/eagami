import { ICONS } from './lib/icons/icons-catalogue';
import { LABEL_ICON_SLUGS } from './playground-knobs';

/**
 * Storybook control for the `labelIcon` input every labelled field carries.
 * The input takes a component class, which the shared plain-data knobs cannot
 * hold, so the slug-to-class mapping lives here for the stories to spread on
 * top of their knob argTypes; the website resolves the same slugs through
 * `iconComponentForSlug` instead. Stories leave the arg unset, matching the
 * input's own `undefined` default.
 */
export const LABEL_ICON_STORY_ARGTYPE = {
  control: 'select' as const,
  options: ['none', ...LABEL_ICON_SLUGS],
  mapping: Object.fromEntries([
    ['none', undefined],
    ...LABEL_ICON_SLUGS.map(slug => [slug, ICONS.find(icon => icon.slug === slug)]),
  ]),
};
