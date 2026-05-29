import { RenderMode, type ServerRoute } from '@angular/ssr';

import { UI_COMPONENTS } from './data/ui-components';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'ui/components/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      UI_COMPONENTS.map(component => ({ slug: component.slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
