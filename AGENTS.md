# Henry's Cocktail Bar — Project Guide

Server-rendered marketing site for Henry's Cocktail Bar.

## Stack

- **SvelteKit 2** + **Svelte 5** (runes: `$state`, `$props`, `$derived`)
- **Vite** dev/build, **pnpm** package manager
- TypeScript, strict mode
- Vanilla scoped CSS (global tokens in `src/app.css`)

## Commands

- `pnpm dev` — start the dev server
- `pnpm build` — production SSR build (output in `build/`)
- `pnpm preview` — run the production build locally
- `pnpm check` — `svelte-kit sync` + `svelte-check` type checks

## Structure

- `src/app.html` — HTML shell; `data-theme="%theme%"` is replaced server-side
- `src/app.css` — global styles + theme tokens (`:root` light, `[data-theme="dark"]`)
- `src/hooks.server.ts` — reads the `theme` cookie and renders the correct theme (no flash)
- `src/lib/theme.ts` — theme type + cookie persistence helper
- `src/lib/components/` — `InstagramLink`, `ThemeToggle`, `FlipCard`
- `src/routes/` — `+layout.svelte` (chrome), `+page.svelte` (home)
- `static/` — favicons, logo/room SVG masks, custom cursor

## Theming

Theme is persisted in a `theme` cookie so the server renders the right colors on first
paint. `hooks.server.ts` resolves the cookie and swaps the `data-theme` placeholder in
`app.html`. `ThemeToggle` flips `document.documentElement.dataset.theme` and re-sets the
cookie on click. Light is the default; only `dark` is stored explicitly.

## Animations

The future menu page uses CSS 3D flips. `src/lib/components/FlipCard.svelte` is the
reusable primitive (`perspective` + `transform-style: preserve-3d` + `rotateY`), with
`front`/`back` snippet props and a `flipped` boolean. It respects
`prefers-reduced-motion`. No animation libraries — pure CSS.

## Deployment

- **Host:** Netlify, via `@sveltejs/adapter-netlify` (SSR).
- **Build:** `pnpm build` → output in `build/`; the adapter wires up Netlify functions
  for SSR automatically.
- **Config:** `netlify.toml` at the repo root (`command = "pnpm build"`, `publish = "build"`).
- **Site id:** `7b56937e-b255-4d86-bbdc-903f2c2e9ae5` (see `.netlify/state.json`).
