import { bootstrapApplication } from '@angular/platform-browser';
import { provideEagamiUi } from '@eagami/ui';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    // Change either hex and the whole app re-themes: the library derives a
    // full, accessibility-checked palette from each brand color.
    provideEagamiUi({
      palette: {
        primary: { base: '#2563eb' },
        secondary: { base: '#f97316' },
      },
    }),
  ],
}).catch(err => console.error(err));
