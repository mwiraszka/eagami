import { Routes } from '@angular/router';

import { UI_COMPONENTS } from '@app/data/ui-components';

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
        path: 'components',
        pathMatch: 'full',
        redirectTo: () => `components/${UI_COMPONENTS[0].slug}`,
      },
      {
        path: 'components/accordion',
        loadComponent: () =>
          import('./pages/ui/components/accordion/accordion-demo-page.component').then(
            c => c.AccordionDemoPageComponent,
          ),
      },
      {
        path: 'components/alert',
        loadComponent: () =>
          import('./pages/ui/components/alert/alert-demo-page.component').then(
            c => c.AlertDemoPageComponent,
          ),
      },
      {
        path: 'components/autocomplete',
        loadComponent: () =>
          import('./pages/ui/components/autocomplete/autocomplete-demo-page.component').then(
            c => c.AutocompleteDemoPageComponent,
          ),
      },
      {
        path: 'components/avatar',
        loadComponent: () =>
          import('./pages/ui/components/avatar/avatar-demo-page.component').then(
            c => c.AvatarDemoPageComponent,
          ),
      },
      {
        path: 'components/avatar-editor',
        loadComponent: () =>
          import('./pages/ui/components/avatar-editor/avatar-editor-demo-page.component').then(
            c => c.AvatarEditorDemoPageComponent,
          ),
      },
      {
        path: 'components/badge',
        loadComponent: () =>
          import('./pages/ui/components/badge/badge-demo-page.component').then(
            c => c.BadgeDemoPageComponent,
          ),
      },
      {
        path: 'components/breadcrumbs',
        loadComponent: () =>
          import('./pages/ui/components/breadcrumbs/breadcrumbs-demo-page.component').then(
            c => c.BreadcrumbsDemoPageComponent,
          ),
      },
      {
        path: 'components/button',
        loadComponent: () =>
          import('./pages/ui/components/button/button-demo-page.component').then(
            c => c.ButtonDemoPageComponent,
          ),
      },
      {
        path: 'components/card',
        loadComponent: () =>
          import('./pages/ui/components/card/card-demo-page.component').then(
            c => c.CardDemoPageComponent,
          ),
      },
      {
        path: 'components/checkbox',
        loadComponent: () =>
          import('./pages/ui/components/checkbox/checkbox-demo-page.component').then(
            c => c.CheckboxDemoPageComponent,
          ),
      },
      {
        path: 'components/code-input',
        loadComponent: () =>
          import('./pages/ui/components/code-input/code-input-demo-page.component').then(
            c => c.CodeInputDemoPageComponent,
          ),
      },
      {
        path: 'components/color-picker',
        loadComponent: () =>
          import('./pages/ui/components/color-picker/color-picker-demo-page.component').then(
            c => c.ColorPickerDemoPageComponent,
          ),
      },
      {
        path: 'components/data-table',
        loadComponent: () =>
          import('./pages/ui/components/data-table/data-table-demo-page.component').then(
            c => c.DataTableDemoPageComponent,
          ),
      },
      {
        path: 'components/date-picker',
        loadComponent: () =>
          import('./pages/ui/components/date-picker/date-picker-demo-page.component').then(
            c => c.DatePickerDemoPageComponent,
          ),
      },
      {
        path: 'components/dialog',
        loadComponent: () =>
          import('./pages/ui/components/dialog/dialog-demo-page.component').then(
            c => c.DialogDemoPageComponent,
          ),
      },
      {
        path: 'components/divider',
        loadComponent: () =>
          import('./pages/ui/components/divider/divider-demo-page.component').then(
            c => c.DividerDemoPageComponent,
          ),
      },
      {
        path: 'components/drawer',
        loadComponent: () =>
          import('./pages/ui/components/drawer/drawer-demo-page.component').then(
            c => c.DrawerDemoPageComponent,
          ),
      },
      {
        path: 'components/dropdown',
        loadComponent: () =>
          import('./pages/ui/components/dropdown/dropdown-demo-page.component').then(
            c => c.DropdownDemoPageComponent,
          ),
      },
      {
        path: 'components/eagami-wordmark',
        loadComponent: () =>
          import('./pages/ui/components/eagami-wordmark/eagami-wordmark-demo-page.component').then(
            c => c.EagamiWordmarkDemoPageComponent,
          ),
      },
      {
        path: 'components/empty-state',
        loadComponent: () =>
          import('./pages/ui/components/empty-state/empty-state-demo-page.component').then(
            c => c.EmptyStateDemoPageComponent,
          ),
      },
      {
        path: 'components/file-uploader',
        loadComponent: () =>
          import('./pages/ui/components/file-uploader/file-uploader-demo-page.component').then(
            c => c.FileUploaderDemoPageComponent,
          ),
      },
      {
        path: 'components/input',
        loadComponent: () =>
          import('./pages/ui/components/input/input-demo-page.component').then(
            c => c.InputDemoPageComponent,
          ),
      },
      {
        path: 'components/menu',
        loadComponent: () =>
          import('./pages/ui/components/menu/menu-demo-page.component').then(
            c => c.MenuDemoPageComponent,
          ),
      },
      {
        path: 'components/multi-select',
        loadComponent: () =>
          import('./pages/ui/components/multi-select/multi-select-demo-page.component').then(
            c => c.MultiSelectDemoPageComponent,
          ),
      },
      {
        path: 'components/paginator',
        loadComponent: () =>
          import('./pages/ui/components/paginator/paginator-demo-page.component').then(
            c => c.PaginatorDemoPageComponent,
          ),
      },
      {
        path: 'components/popover',
        loadComponent: () =>
          import('./pages/ui/components/popover/popover-demo-page.component').then(
            c => c.PopoverDemoPageComponent,
          ),
      },
      {
        path: 'components/progress-bar',
        loadComponent: () =>
          import('./pages/ui/components/progress-bar/progress-bar-demo-page.component').then(
            c => c.ProgressBarDemoPageComponent,
          ),
      },
      {
        path: 'components/radio',
        loadComponent: () =>
          import('./pages/ui/components/radio/radio-demo-page.component').then(
            c => c.RadioDemoPageComponent,
          ),
      },
      {
        path: 'components/range-slider',
        loadComponent: () =>
          import('./pages/ui/components/range-slider/range-slider-demo-page.component').then(
            c => c.RangeSliderDemoPageComponent,
          ),
      },
      {
        path: 'components/rating',
        loadComponent: () =>
          import('./pages/ui/components/rating/rating-demo-page.component').then(
            c => c.RatingDemoPageComponent,
          ),
      },
      {
        path: 'components/segmented',
        loadComponent: () =>
          import('./pages/ui/components/segmented/segmented-demo-page.component').then(
            c => c.SegmentedDemoPageComponent,
          ),
      },
      {
        path: 'components/skeleton',
        loadComponent: () =>
          import('./pages/ui/components/skeleton/skeleton-demo-page.component').then(
            c => c.SkeletonDemoPageComponent,
          ),
      },
      {
        path: 'components/slider',
        loadComponent: () =>
          import('./pages/ui/components/slider/slider-demo-page.component').then(
            c => c.SliderDemoPageComponent,
          ),
      },
      {
        path: 'components/spinner',
        loadComponent: () =>
          import('./pages/ui/components/spinner/spinner-demo-page.component').then(
            c => c.SpinnerDemoPageComponent,
          ),
      },
      {
        path: 'components/stepper',
        loadComponent: () =>
          import('./pages/ui/components/stepper/stepper-demo-page.component').then(
            c => c.StepperDemoPageComponent,
          ),
      },
      {
        path: 'components/switch',
        loadComponent: () =>
          import('./pages/ui/components/switch/switch-demo-page.component').then(
            c => c.SwitchDemoPageComponent,
          ),
      },
      {
        path: 'components/tabs',
        loadComponent: () =>
          import('./pages/ui/components/tabs/tabs-demo-page.component').then(
            c => c.TabsDemoPageComponent,
          ),
      },
      {
        path: 'components/tag',
        loadComponent: () =>
          import('./pages/ui/components/tag/tag-demo-page.component').then(
            c => c.TagDemoPageComponent,
          ),
      },
      {
        path: 'components/textarea',
        loadComponent: () =>
          import('./pages/ui/components/textarea/textarea-demo-page.component').then(
            c => c.TextareaDemoPageComponent,
          ),
      },
      {
        path: 'components/time-picker',
        loadComponent: () =>
          import('./pages/ui/components/time-picker/time-picker-demo-page.component').then(
            c => c.TimePickerDemoPageComponent,
          ),
      },
      {
        path: 'components/toast',
        loadComponent: () =>
          import('./pages/ui/components/toast/toast-demo-page.component').then(
            c => c.ToastDemoPageComponent,
          ),
      },
      {
        path: 'components/tooltip',
        loadComponent: () =>
          import('./pages/ui/components/tooltip/tooltip-demo-page.component').then(
            c => c.TooltipDemoPageComponent,
          ),
      },
      {
        path: 'components/transfer-list',
        loadComponent: () =>
          import('./pages/ui/components/transfer-list/transfer-list-demo-page.component').then(
            c => c.TransferListDemoPageComponent,
          ),
      },
      {
        path: 'components/tree',
        loadComponent: () =>
          import('./pages/ui/components/tree/tree-demo-page.component').then(
            c => c.TreeDemoPageComponent,
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
