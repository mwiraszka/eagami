import { IconComponentType } from './icon-category';

/**
 * Casing overrides for icons whose canonical brand or acronym name doesn't
 * match a naive `slug -> Title Case` derivation. Add new entries here so every
 * consumer (the reference page, the sandbox, downstream catalogues) renders
 * the same label.
 */
const DISPLAY_NAME_OVERRIDES: Record<string, string> = {
  codepen: 'CodePen',
  codesandbox: 'CodeSandbox',
  cpu: 'CPU',
  github: 'GitHub',
  'github-2': 'GitHub 2',
  gitlab: 'GitLab',
  linkedin: 'LinkedIn',
  'linkedin-2': 'LinkedIn 2',
  mongodb: 'MongoDB',
  npm: 'npm',
  paypal: 'PayPal',
  rss: 'RSS',
  tv: 'TV',
  'x-twitter': 'X (Twitter)',
  youtube: 'YouTube',
  'youtube-2': 'YouTube 2',
};

/**
 * Resolves an icon's human-readable display name. Pass the component class
 * (`iconDisplayName(GithubIconComponent)` -> `'GitHub'`) or its slug
 * (`iconDisplayName('github')` -> `'GitHub'`). Falls back to a generic
 * `slug -> Title Case` derivation when no override is defined.
 */
export function iconDisplayName(iconOrSlug: IconComponentType | string): string {
  const slug = typeof iconOrSlug === 'string' ? iconOrSlug : iconOrSlug.slug;
  return DISPLAY_NAME_OVERRIDES[slug] ?? toTitleCase(slug);
}

function toTitleCase(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
