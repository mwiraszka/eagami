<h1 align="center">eagami.com</h1>

<p align="center">
  <img src="src/assets/icons/android-chrome-192x192.png" alt="eagami logo" width="150" height="150" />
</p>

The marketing site for the eagami brand and live documentation surface for [Eagami UI](../../packages/ui/) (the [`@eagami/ui`](https://www.npmjs.com/package/@eagami/ui) component library). Lives at [eagami.com](https://eagami.com).

## Running locally

From the monorepo root:

```bash
pnpm install
pnpm site          # serve the website on http://localhost:4444
```

The website resolves `@eagami/ui` straight from the library source, so edits under `packages/ui/src/**` flow into the running dev server with no separate build. Use `pnpm dev` to run the website and Storybook side by side.

## Deployment

Deployed to Vercel. Production deploys fire automatically when changes to `apps/website/**` land on `main` (see [`.github/workflows/website-production.yaml`](../../.github/workflows/website-production.yaml)). Vercel-specific config lives in [`vercel.json`](vercel.json); Vercel's "Root Directory" must be set to `apps/website` in the project dashboard.

See [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for branch naming, commit, and PR conventions.
