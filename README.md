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
- `src/components/`: shared booking buttons and compact audience rows.
- `src/motion/useSiteMotion.ts`: pointer-relative button pressure and ink, reveals and cleanup, with reusable spatial helpers.
- `src/styles/`: approved Boundry design and responsive styles.
- `public/assets/`: local font, original illustrations, favicon and the next-chapter film (MP4/WebM plus poster).
- `index.html`, `public/robots.txt`, `public/sitemap.xml`: metadata and search indexing.
- `vercel.json`: Vercel framework and build configuration.

## Deployment

Vercel imports this repository, runs `npm run build`, and serves `dist/`. Pushes to `main` deploy to production; other branches can produce previews. DNS remains managed by GoDaddy. `tryboundry.com` is the primary hostname; `www.tryboundry.com` redirects to it.

All contact buttons open the approved Calendly booking page. The backing link opens Entrepreneur First. This app does not collect form submissions or require API keys, a database or private environment variables. Illustrations are conceptual; no customer claims are implied.

Animations respect reduced-motion and coarse-pointer preferences. Audience examples are always visible, with no hover requirement. The React motion hook cleans up listeners, observers and generated visual layers on unmount.

## Next-chapter film

The silent, footage-led film moves from archival industry through connected computing to physical and digital AI. It closes with “Insurance for what comes next.” Its editable HyperFrames project is `../boundry-next-chapter-film/`; earlier projects remain available in the workspace. Footage provenance is recorded in [MEDIA-SOURCES.md](MEDIA-SOURCES.md).

The website expects native 1920 × 1080 exports named `boundry-next-chapter.webm` and `boundry-next-chapter.mp4`, with `boundry-next-chapter-poster.webp`. The frame uses a 16:9 ratio. Earlier assets remain for already-open pages.

The video plays silently when visible, pauses offscreen or in hidden tabs, and preserves manual pause. Reduced-motion visitors see a still and can choose to play. Playback failures retain the still. `NextChapterVideo` in `src/App.tsx` owns this behavior.

## Positioning and page structure

The selected “The next chapter” direction leads with **Insurance for a world built with AI.** Physical and digital AI have equal standing. The four audience categories are Robotics & Physical AI, AI Software & Agents, AI Hardware & Infrastructure, and Drones.

The five page sections are the centred editorial hero; belief and history film; three assessment steps; audience examples alongside technical credentials; and a closing conversation invitation with customer and insurer-partner routes. The original paper, butter, lilac and coral colour values are preserved.

The Why Boundry panel connects AI/cybersecurity PhD research funded by Cisco with engineering experience at AWS. These are user-supplied team backgrounds. The site makes no ongoing-monitoring promise or claim to guaranteed cover, certification, insurance capacity or completed customer outcomes.
