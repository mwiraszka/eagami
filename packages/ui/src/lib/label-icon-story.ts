import { LABEL_ICON_SLUGS } from '../playground-knobs';
import { CalendarIconComponent } from './icons/calendar.component';
import { ContrastIconComponent } from './icons/contrast.component';
import { DropletIconComponent } from './icons/droplet.component';
import { MailIconComponent } from './icons/mail.component';
import { SunIconComponent } from './icons/sun.component';
import { UserIconComponent } from './icons/user.component';

/**
 * Storybook control for the `labelIcon` input every labelled field carries.
 * The input takes a component class, which the shared plain-data knobs cannot
 * hold, so the slug-to-class mapping lives here for the stories to spread on
 * top of their knob argTypes; the website resolves the same slugs through
 * `iconComponentForSlug` instead.
 */
export const LABEL_ICON_STORY_ARGTYPE = {
  control: 'select' as const,
  options: ['none', ...LABEL_ICON_SLUGS],
  mapping: {
    none: undefined,
    sun: SunIconComponent,
    contrast: ContrastIconComponent,
    droplet: DropletIconComponent,
    user: UserIconComponent,
    mail: MailIconComponent,
    calendar: CalendarIconComponent,
  },
};
