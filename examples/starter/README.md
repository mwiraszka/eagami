# Eagami UI starter

A minimal Angular app wired up with [`@eagami/ui`](https://www.npmjs.com/package/@eagami/ui): the global stylesheet, the fonts, and `provideEagamiUi` with a custom brand palette.

## Try it instantly

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mwiraszka/eagami/tree/main/examples/starter)

## Run it locally

```bash
npm install
npm start
```

Then open http://localhost:4200.

## What to try

- Open `src/main.ts` and change the `primary` or `secondary` hex passed to `provideEagamiUi`. Reload and the whole app re-themes from those two colors.
- Import another component from `@eagami/ui` into `src/app/app.component.ts` and drop it in the template.

Full component reference and live demos at [eagami.com/ui](https://eagami.com/ui).
