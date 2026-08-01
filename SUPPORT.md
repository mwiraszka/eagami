# Support

How `@eagami/ui` is versioned, supported, and where to get help.

## Getting help

- **Documentation:** [eagami.com/ui](https://eagami.com/ui) has live demos, the full API reference, and setup guides.
- **Questions and discussion:** open a [GitHub Discussion](https://github.com/mwiraszka/eagami/discussions).
- **Bugs and feature requests:** open a [GitHub Issue](https://github.com/mwiraszka/eagami/issues/new/choose) using the provided templates.
- **Security issues:** do not open a public issue. Follow the process in [SECURITY.md](SECURITY.md).

## Versioning

The library follows [Semantic Versioning](https://semver.org):

- **MAJOR** (`X.0.0`): a breaking change to the public API (a removed or renamed input, output, selector, exported symbol, or CSS custom property; a changed default that alters rendered output).
- **MINOR** (`0.X.0`): new, backward-compatible surface (a new component, input, output, token, or locale).
- **PATCH** (`0.0.X`): backward-compatible bug fixes and internal changes.

The public API is everything exported from the package entry point, the documented CSS custom properties, and each component's documented inputs, outputs, and selector. Anything not documented as public (internal classes, private fields, undocumented DOM structure) may change in any release.

## Stability

Eagami UI moved quickly through its first releases while the component set and API surface were taking shape. As that surface stabilizes, breaking changes are becoming rare: they are batched into infrequent, clearly documented major releases rather than shipped piecemeal, so upgrading stays predictable.

Every breaking change is:

1. Listed under a `### Changed` → `**Breaking:**` entry at the top of the release's [changelog](packages/ui/CHANGELOG.md) section.
2. Preceded, wherever practical, by a deprecation period in which the old API keeps working (see below).
3. Accompanied by migration notes in [MIGRATION.md](packages/ui/MIGRATION.md) for larger transitions.

## Supported versions

Fixes and security patches target the latest minor of the latest major. Because the library is young, only the current major is actively supported: older majors are end-of-life on release of the next major (see [SECURITY.md](SECURITY.md)).

| Version | Supported |
| ------- | --------- |
| `5.x`   | Active    |
| `< 5.0` | Upgrade recommended |

## Deprecation policy

When an API is going away, it is first marked deprecated rather than removed:

- Deprecated inputs, outputs, and exports carry an `@deprecated` JSDoc tag naming the replacement.
- The deprecation is noted in the changelog for the release that introduces it.
- The API keeps working for at least one subsequent minor release before removal in a later major, giving consumers a window to migrate.

## Release cadence

- **Patches** ship as fixes land.
- **Minors** ship regularly as new components and inputs are added.
- **Majors** are deliberately infrequent and batch breaking changes together, so integrators face migration work rarely and predictably rather than release to release.

Every release is published to npm with [provenance](https://docs.npmjs.com/generating-provenance-statements) and tagged with a GitHub release carrying the changelog entry as its notes.
