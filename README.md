# eagami

Monorepo for [eagami](https://eagami.com), housing the eagami UI Angular component library and the eagami.com website that documents and showcases it.

| Path | Package | What it is |
|---|---|---|
| [`packages/ui/`](packages/ui/) | [`@eagami/ui`](https://www.npmjs.com/package/@eagami/ui) | eagami UI, the Angular component library, published to npm |
| [`apps/website/`](apps/website/) | `eagami-website` | eagami.com, the marketing site and live documentation for eagami UI, deployed to Vercel |

## Getting started

```bash
pnpm install                                  # install everything
pnpm --filter @eagami/ui build                # build the library (required before the website can resolve @eagami/ui)
pnpm --filter eagami-website start            # serve the website on http://localhost:4200
```

Cross-cutting work (a library change that needs to show up in the website) is smoothest with a watching library build in a second terminal:

```bash
pnpm --filter @eagami/ui watch
```

Convenience aliases at the monorepo root:

- `pnpm ui <script>` runs `pnpm --filter @eagami/ui <script>`
- `pnpm website <script>` runs `pnpm --filter eagami-website <script>`

## Layout

```
.
├── packages/
│   └── ui/                  # @eagami/ui Angular library (publishable)
├── apps/
│   └── website/             # eagami.com (Vercel)
├── .github/workflows/
│   ├── ui-ci.yml            # lint/test/build the library on touching changes
│   ├── ui-publish.yml       # publish to npm + GitHub release on merging ui-vX.Y.Z branches
│   ├── website-preview.yaml # Vercel preview on touching changes to apps/website
│   └── website-production.yaml
├── pnpm-workspace.yaml      # packages/* + apps/*
├── package.json             # private monorepo root (overrides, packageManager, root scripts)
├── CLAUDE.md                # monorepo conventions for Claude Code
├── design-system-flutter.md # design-token integration guide for Flutter projects
└── design-system-react.md   # design-token integration guide for React projects
```

## Conventions

- Branch names carry a package prefix: `ui-vX.Y.Z` for library work, `website-vX.Y.Z` for website work
- A single PR targets a single package
- Each package has its own `CHANGELOG.md` and its own `version` field
- Merging a `ui-v*` PR publishes to npm and tags a GitHub release; merging a `website-v*` PR deploys to Vercel

See [`CLAUDE.md`](CLAUDE.md) for the full set of monorepo rules.

## License

The library (`packages/ui/`) is MIT-licensed. See [`LICENSE`](LICENSE). The website (`apps/website/`) is private and unlicensed.
