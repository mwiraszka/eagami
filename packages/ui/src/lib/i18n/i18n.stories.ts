import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { AlertComponent } from '../alert/alert.component';
import { ButtonComponent } from '../button/button.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { InputComponent } from '../input/input.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { SpinnerComponent } from '../spinner/spinner.component';

/**
 * Every Eagami UI component ships its built-in strings — ARIA labels,
 * placeholders, empty states — in English, French (France), Greek, Polish, and
 * Spanish (Spain). Pick a language from the **Locale** toolbar control above to
 * see each story re-render in that language.
 *
 * In an app, call `provideEagamiUi({ locale })` once at bootstrap, or inject
 * `EagamiI18nService` and call `setLocale()` to switch at runtime. Individual
 * strings can still be overridden per-instance via component inputs, or
 * globally via `provideEagamiUi({ messages })`.
 */
const meta: Meta = {
  title: 'Foundations/Internationalization',
  // `component` is unused by the stories themselves (each variant builds its
  // own template), but Storybook's docs runtime calls `extractArgTypes` for
  // every loaded story and crashes with "Invalid component undefined" if the
  // meta has none. Pointing at any imported component is enough to satisfy
  // the extractor without affecting what renders.
  component: SpinnerComponent,
  decorators: [
    moduleMetadata({
      imports: [
        AlertComponent,
        ButtonComponent,
        DatePickerComponent,
        DropdownComponent,
        InputComponent,
        PaginatorComponent,
        SpinnerComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Built-in component strings localized across English, French, Greek, ' +
          'Polish, and Spanish. Use the Locale toolbar control to switch languages.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * A cross-section of components whose built-in strings localize. Flip the
 * Locale toolbar control and watch the dropdown placeholder, password toggle,
 * date picker, paginator, and spinner all follow.
 */
export const Showcase: Story = {
  render: () => ({
    props: {
      dropdownOptions: [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
      ],
    },
    template: `
      <div class="story-stack story-stack--md story-medium">
        <ea-dropdown [options]="dropdownOptions" label="Dropdown" />
        <ea-input type="password" label="Password" [showPasswordToggle]="true" />
        <ea-date-picker label="Date picker" />
        <ea-paginator [totalItems]="120" [page]="2" />
        <ea-spinner />
        <ea-alert variant="info" [dismissible]="true">
          The dismiss button's label is localized too.
        </ea-alert>
      </div>
    `,
  }),
};
