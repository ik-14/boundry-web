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
- `public/assets/`: local font, original illustrations, favicon and the 14-second risk-intelligence film (MP4/WebM plus poster).
- `index.html`, `public/robots.txt`, `public/sitemap.xml`: metadata and search indexing.
- `vercel.json`: Vercel framework and build configuration.

## Deployment

Vercel imports this repository, runs `npm run build`, and serves `dist/`. Pushes to `main` deploy to production; other branches can produce previews. DNS remains managed by GoDaddy. `tryboundry.com` is the primary hostname; `www.tryboundry.com` redirects to it.

All contact buttons open the approved Calendly booking page. The backing link opens Entrepreneur First. This app does not collect form submissions or require API keys, a database or private environment variables. Illustrations are conceptual; no customer claims are implied.

Animations respect reduced-motion and coarse-pointer preferences. Card details work through mouse, keyboard and touch. The React motion hook cleans up listeners, observers and generated visual layers on unmount.

## Risk-intelligence film

The 14-second silent film turns an autonomous robot deployment, operating context, safety evidence and technical expertise into an illustrative risk profile. It connects exposure, safeguards and open questions to coverage decisions. Its editable Hyperframes project is `../boundry-risk-intelligence-loop/`; the earlier composition remains in `../boundry-homepage-loop/`.

The master is rendered natively at 2880 × 2160, 30 fps. Website exports use `boundry-risk-intelligence-2160p.webm` with an MP4 fallback and a matching lossless `boundry-risk-intelligence-poster-2160p.webp` still. Versioned filenames avoid stale cached video. Earlier assets remain for already-open pages.

The video plays silently when visible, pauses offscreen or in hidden tabs, and preserves manual pause. Reduced-motion visitors see the final risk-profile still and can choose to play. Playback failures retain the still. `InsuranceCaseVideo` in `src/App.tsx` owns this behavior.

## Positioning

The homepage presents insurance and risk intelligence for autonomous systems, includes a worked warehouse-robot assessment and a Why Boundry section connecting AI/cybersecurity PhD research funded by Cisco with engineering experience at AWS. It makes no ongoing-monitoring promise. All credentials are founder-supplied; the sample assessment and technology imagery are illustrative.
