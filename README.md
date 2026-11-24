# Boundry

React + TypeScript website for https://tryboundry.com, built with Vite and deployed through Vercel from the private `ik-14/boundry-web` GitHub repository.

## Development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

`npm run build` checks TypeScript and creates `dist/`. `npm run preview` serves the production build locally.

## Source

- `src/App.tsx`: page sections and content.
- `src/components/`: shared booking buttons and interactive technology cards.
- `src/motion/useSiteMotion.ts`: pointer-relative button pressure and ink, collage parallax, card lighting, reveals and cleanup.
- `src/styles/`: approved Boundry design and responsive styles.
- `public/assets/`: local font, original illustrations and favicon.
- `index.html`, `public/robots.txt`, `public/sitemap.xml`: metadata and search indexing.
- `vercel.json`: Vercel framework and build configuration.

## Deployment

Vercel imports this repository, runs `npm run build`, and serves `dist/`. Pushes to `main` deploy to production; other branches can produce previews. DNS remains managed by GoDaddy. `tryboundry.com` is the primary hostname; `www.tryboundry.com` redirects to it.

All contact buttons open the approved Calendly booking page. The backing link opens Entrepreneur First. This app does not collect form submissions or require API keys, a database or private environment variables. Illustrations are conceptual; no customer claims are implied.

Animations respect reduced-motion and coarse-pointer preferences. Card details work through mouse, keyboard and touch. The React motion hook cleans up listeners, observers and generated visual layers on unmount.
