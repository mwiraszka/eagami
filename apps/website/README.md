<h1 align="center">eagami.com</h1>

<p align="center">
  <img src="src/assets/icons/android-chrome-192x192.png" alt="eagami logo" width="150" height="150" />
</p>

The marketing site for the eagami brand and live documentation surface for [Eagami UI](../../packages/ui/) (the [`@eagami/ui`](https://www.npmjs.com/package/@eagami/ui) component library). Lives at [eagami.com](https://eagami.com).

## Running locally

From the monorepo root:

```bash
pnpm install
pnpm ui build      # build the library once so the website can resolve @eagami/ui
pnpm start         # serve the website on http://localhost:4200
```

For active library work, run `pnpm ui watch` in a second terminal so source edits flow into the running website without a manual rebuild.

## Deployment

Deployed to Vercel. Production deploys fire automatically when changes to `apps/website/**` land on `main` (see [`.github/workflows/website-production.yaml`](../../.github/workflows/website-production.yaml)). Vercel-specific config lives in [`vercel.json`](vercel.json); Vercel's "Root Directory" must be set to `apps/website` in the project dashboard.

See [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for branch naming, commit, and PR conventions.
