import type { WebMessages } from '@app/i18n/web-messages.types';

/** Off-site destinations referenced from more than one place. */
export const REPO_URL = 'https://github.com/mwiraszka/eagami';
export const PACKAGE_URL = 'https://www.npmjs.com/package/@eagami/ui';
export const MIGRATION_URL = `${REPO_URL}/blob/main/packages/ui/MIGRATION.md`;
export const CHANGELOG_URL = `${REPO_URL}/blob/main/packages/ui/CHANGELOG.md`;

export interface IntegrationLink {
  href: string;
  labelKey: keyof WebMessages['ui']['integrations'];
}

/** Self-contained guides and the token export, served from the site's own assets. */
export const INTEGRATION_LINKS: ReadonlyArray<IntegrationLink> = [
  { href: '/assets/eagami-ui-react.md', labelKey: 'reactLink' },
  { href: '/assets/eagami-ui-flutter.md', labelKey: 'flutterLink' },
  { href: '/assets/eagami-ui-tokens.json', labelKey: 'tokensLink' },
];
