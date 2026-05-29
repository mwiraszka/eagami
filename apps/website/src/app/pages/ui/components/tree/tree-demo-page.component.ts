import { TreeComponent, type TreeNode } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

import { UiComponentDemoLayoutComponent } from '../_layout/ui-component-demo-layout.component';

@Component({
  selector: 'web-tree-demo-page',
  templateUrl: './tree-demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TreeComponent, UiComponentDemoLayoutComponent],
})
export class TreeDemoPageComponent {
  protected readonly messages = inject(WebI18nService).messages;

  // File paths are universal proper nouns, so this stays untranslated
  protected readonly fileTree: TreeNode[] = [
    {
      id: 'src',
      label: 'src',
      children: [
        {
          id: 'app',
          label: 'app',
          children: [
            { id: 'app.component.ts', label: 'app.component.ts' },
            { id: 'app.component.html', label: 'app.component.html' },
            { id: 'app.routes.ts', label: 'app.routes.ts' },
          ],
        },
        {
          id: 'assets',
          label: 'assets',
          children: [
            { id: 'logo.svg', label: 'logo.svg' },
            { id: 'favicon.ico', label: 'favicon.ico' },
          ],
        },
        { id: 'main.ts', label: 'main.ts' },
        { id: 'index.html', label: 'index.html' },
      ],
    },
    { id: 'package.json', label: 'package.json' },
    { id: 'tsconfig.json', label: 'tsconfig.json' },
  ];

  // Role names stay in English as a generic example; consumers supply localised data
  protected readonly orgChart: TreeNode[] = [
    {
      id: 'ceo',
      label: 'CEO',
      children: [
        {
          id: 'cto',
          label: 'CTO',
          children: [
            { id: 'eng-mgr', label: 'Engineering Manager' },
            { id: 'principal', label: 'Principal Engineer' },
          ],
        },
        {
          id: 'cfo',
          label: 'CFO',
          children: [
            { id: 'controller', label: 'Controller' },
            { id: 'finance-lead', label: 'Finance Lead (vacant)', disabled: true },
          ],
        },
      ],
    },
  ];
}
