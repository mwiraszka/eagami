import { Directive, HostBinding, type Type, input } from '@angular/core';

/**
 * Primary classification for an icon component. Every icon ships with a single
 * `category` (read off the component's `static readonly category` field) plus
 * a separate `static readonly isBrand` flag for whether it also depicts a
 * recognisable brand mark.
 *
 * `feather`: derived from the upstream Feather Icons set (MIT). Uses Feather's
 *            canonical slug and design.
 * `eagami`:  original Eagami UI design (the brand mark, the basic shape set,
 *            household icons, and the brand-filled variants of icons that
 *            also exist as Feather outlines).
 */
export type IconCategory = 'feather' | 'eagami';

/**
 * Shape of the static metadata that every `ea-icon-*` component carries
 * alongside its template. Read these fields directly off the component class
 * (e.g. `GithubIconComponent.tags`) to build catalogues, search indices, or
 * documentation tables without pulling in any other icon as a transitive
 * dependency.
 */
export interface IconMeta {
  readonly slug: string;
  readonly category: IconCategory;
  /** True when the icon depicts a recognisable third-party or Eagami brand mark. */
  readonly isBrand?: boolean;
  readonly tags: ReadonlyArray<string>;
}

/** An icon component class augmented with its static metadata. */
export type IconComponentType = Type<unknown> & IconMeta;

/**
 * Abstract base class for every `ea-icon-*` component. Provides the shared
 * host bindings that make icons render as inline-flex 1em squares, so
 * individual icon components don't need to repeat the `host: { style: '...' }`
 * config in their `@Component` decorator. Brand icons with their own host
 * bindings (e.g. a colour binding tied to a `brand` input) layer those onto
 * this base via additional `@HostBinding` getters.
 *
 * Feather-derived icons read the `strokeWidth` input via `[attr.stroke-width]`
 * in their SVG template, so consumers can thin or thicken any icon at the
 * call site (e.g. `<ea-icon-star [strokeWidth]="1.5" />`). Subclasses can
 * change the default by setting `static override readonly defaultStrokeWidth`,
 * used by icons whose dense paths read better at a different default
 * (e.g. camera, upload at 1.5).
 */
@Directive()
export abstract class IconComponentBase {
  @HostBinding('style.display') readonly display = 'inline-flex';
  @HostBinding('style.width') readonly width = '1em';
  @HostBinding('style.height') readonly height = '1em';

  static readonly defaultStrokeWidth: number = 2;

  readonly strokeWidth = input<number>(
    (this.constructor as typeof IconComponentBase).defaultStrokeWidth,
  );
}
