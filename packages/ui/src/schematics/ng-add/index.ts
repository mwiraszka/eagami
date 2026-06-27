import { type JsonValue, type workspaces } from '@angular-devkit/core';
import {
  type Rule,
  type SchematicContext,
  SchematicsException,
  type Tree,
  chain,
} from '@angular-devkit/schematics';
import { getWorkspace, updateWorkspace } from '@schematics/angular/utility/workspace';

import { type Schema } from './schema';
import {
  type StyleEntry,
  resolveIndexPath,
  withEagamiFonts,
  withEagamiStyle,
} from './utils';

export function ngAdd(options: Schema): Rule {
  return chain([registerStylesheet(options), registerFonts(options), logNextSteps()]);
}

function registerStylesheet(options: Schema): Rule {
  return updateWorkspace(workspace => {
    const { project } = findProject(workspace, options.project);
    const build = project.targets.get('build');
    if (!build) {
      throw new SchematicsException(
        'No "build" target found; cannot register the Eagami UI stylesheet.',
      );
    }

    build.options ??= {};
    const existing = build.options['styles'];
    const styles = Array.isArray(existing) ? (existing as StyleEntry[]) : [];
    build.options['styles'] = withEagamiStyle(styles) as JsonValue;
  });
}

function registerFonts(options: Schema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(tree);
    const { name, project } = findProject(workspace, options.project);
    const indexPath = resolveIndexPath(project.targets.get('build')?.options?.['index']);
    if (!indexPath) {
      context.logger.warn(
        `No index.html found for project "${name}"; add the Eagami UI fonts manually.`,
      );
      return;
    }

    const current = tree.read(indexPath);
    if (!current) {
      context.logger.warn(
        `Could not read "${indexPath}"; add the Eagami UI fonts manually.`,
      );
      return;
    }

    const html = current.toString('utf-8');
    const updated = withEagamiFonts(html);
    if (updated !== html) {
      tree.overwrite(indexPath, updated);
    }
  };
}

function logNextSteps(): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info(
      'Eagami UI is set up: the global stylesheet and fonts are registered.',
    );
    context.logger.info(
      'Optional: call provideEagamiUi() in app.config.ts for a custom brand palette or extra locales.',
    );
  };
}

function findProject(
  workspace: workspaces.WorkspaceDefinition,
  name: string | undefined,
): { name: string; project: workspaces.ProjectDefinition } {
  if (name) {
    const project = workspace.projects.get(name);
    if (!project) {
      throw new SchematicsException(`Project "${name}" not found in the workspace.`);
    }
    return { name, project };
  }

  for (const [projectName, project] of workspace.projects) {
    if (project.extensions['projectType'] === 'application') {
      return { name: projectName, project };
    }
  }

  throw new SchematicsException('No application project found to set up Eagami UI.');
}
