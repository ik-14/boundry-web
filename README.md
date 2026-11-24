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
- `public/assets/`: local font, original illustrations, favicon and the 14-second insurance-case film (MP4/WebM plus poster).
- `index.html`, `public/robots.txt`, `public/sitemap.xml`: metadata and search indexing.
- `vercel.json`: Vercel framework and build configuration.

## Deployment

Vercel imports this repository, runs `npm run build`, and serves `dist/`. Pushes to `main` deploy to production; other branches can produce previews. DNS remains managed by GoDaddy. `tryboundry.com` is the primary hostname; `www.tryboundry.com` redirects to it.

All contact buttons open the approved Calendly booking page. The backing link opens Entrepreneur First. This app does not collect form submissions or require API keys, a database or private environment variables. Illustrations are conceptual; no customer claims are implied.

Animations respect reduced-motion and coarse-pointer preferences. Card details work through mouse, keyboard and touch. The React motion hook cleans up listeners, observers and generated visual layers on unmount.

## Insurance-case film

The explanatory film follows the risk-picture introduction and precedes the sector details; the hero keeps its original collage. Its editable Hyperframes source is in `../boundry-homepage-loop/`.

The film plays silently when visible, pauses offscreen or in hidden tabs, and preserves manual pause. Reduced-motion visitors see the final insurance-case still and can choose to play. Playback failures retain the still. `InsuranceCaseVideo` in `src/App.tsx` owns this behavior.
