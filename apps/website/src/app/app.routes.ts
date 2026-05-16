import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home-page.component').then(c => c.HomePageComponent),
    pathMatch: 'full',
  },
  {
    path: 'ui',
    loadComponent: () =>
      import('./pages/ui/ui-shell/ui-shell.component').then(c => c.UiShellComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/ui/ui-index/ui-index-page.component').then(
            c => c.UiIndexPageComponent,
          ),
        pathMatch: 'full',
      },
      {
        path: 'design-tokens',
        loadComponent: () =>
          import('./pages/ui/ui-tokens/ui-tokens-page.component').then(
            c => c.UiTokensPageComponent,
          ),
      },
      {
        path: 'setup',
        loadComponent: () =>
          import('./pages/ui/ui-setup/ui-setup-page.component').then(
            c => c.UiSetupPageComponent,
          ),
      },
      {
        path: 'icons',
        loadComponent: () =>
          import('./pages/ui/ui-icons/ui-icons-page.component').then(
            c => c.UiIconsPageComponent,
          ),
      },
      {
        path: 'i18n',
        loadComponent: () =>
          import('./pages/ui/ui-i18n/ui-i18n-page.component').then(
            c => c.UiI18nPageComponent,
          ),
      },
      {
        path: 'components/:slug',
        loadComponent: () =>
          import('./pages/ui/ui-component/ui-component-page.component').then(
            c => c.UiComponentPageComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found-page.component').then(
        c => c.NotFoundPageComponent,
      ),
  },
];
