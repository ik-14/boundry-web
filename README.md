# Boundry

React + TypeScript website for https://tryboundry.com, built with Vite and deployed through Vercel from the private `ik-14/boundry-web` GitHub repository.

## Development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

`npm run build` checks TypeScript, bundles the client and renders complete HTML for all six pages plus a custom 404 into `dist/`. `npm run preview` serves the production build locally. `npm run lint` checks the source.

## Source

- `src/App.tsx`: shared page shell, homepage and route selection.
- `src/pages/`: sector guide template and insurer partnership page.
- `src/data/sectors.ts`: original sector copy, possible coverage scenarios, evidence and primary sources.
- `src/components/`: shared navigation, booking buttons and linked tactile audience cards.
- `src/motion/useSiteMotion.ts`: pointer-relative button pressure and ink, reveals and cleanup, with reusable spatial helpers.
- `src/styles/`: approved Boundry design and responsive styles.
- `public/assets/`: local font, original illustrations, favicon and the AI in motion film (MP4/WebM plus poster).
- `src/routes.ts`, `src/prerender.tsx`, `scripts/prerender.mjs`: page metadata, complete HTML generation and sitemap generation.
- `index.html`, `public/robots.txt`: shared document template and search indexing.
- `vercel.json`: Vercel framework and build configuration.

## Deployment

Vercel imports this repository, runs `npm run build`, and serves `dist/`. Pushes to `main` deploy to production; other branches can produce previews. DNS remains managed by GoDaddy. `tryboundry.com` is the primary hostname; `www.tryboundry.com` redirects to it.

All contact buttons open the approved Calendly booking page. The backing link opens Entrepreneur First. This app does not collect form submissions or require API keys, a database or private environment variables. Illustrations are conceptual; no customer claims are implied.

Animations respect reduced-motion and coarse-pointer preferences. Audience cards have spring tilt, cursor lighting and layered geometric diagrams. Each card is now a keyboard-accessible link to its sector guide. The approach cards lift with accent sweeps, the hero has a staggered entrance and subtle parallax, and the credentials panel has a responsive coral ring. Audience text is always visible, with no hover requirement. The React motion hook cleans up listeners, observers and generated visual layers on unmount.

## AI in motion film

The silent, original procedural animation introduces physical and digital AI, the new risks they create, and the work of understanding risk to make the case for cover. It closes with “Insurance for what comes next.” Its editable HyperFrames project is `../boundry-ai-in-motion-film/`. The Kimi K3 HyperFrames remake informed the motion style only; no footage from that reference is used. Media provenance, including the superseded footage-led film, is recorded in [MEDIA-SOURCES.md](MEDIA-SOURCES.md).

The website expects 14.5-second, native 1920 × 1080 exports named `boundry-ai-in-motion.webm` and `boundry-ai-in-motion.mp4`, with `boundry-ai-in-motion-poster.webp`. The frame uses a 16:9 ratio. Earlier assets remain for already-open pages.

The video plays silently when visible, pauses offscreen or in hidden tabs, and preserves manual pause. Reduced-motion visitors see a still and can choose to play. Playback failures retain the still. `AiInMotionVideo` in `src/App.tsx` owns this behavior.

## Positioning and page structure

The selected “The next chapter” direction leads with **Insurance for a world built with AI.** Physical and digital AI have equal standing. The four audience categories are Robotics & Physical AI, AI Software & Agents, Drones & Autonomous Systems, and Hardware & AI Infrastructure. A “Something else” invitation keeps the conversation open without adding unvalidated sectors.

The five page sections are the centred editorial hero; belief and AI animation; three assessment steps; audience examples alongside technical credentials; and a closing conversation invitation with customer and insurer-partner routes. The original paper, butter, lilac and coral colour values are preserved.

The Why Boundry panel connects AI/cybersecurity PhD research funded by Cisco with engineering experience at AWS. These are user-supplied team backgrounds. The site makes no ongoing-monitoring promise or claim to guaranteed cover, certification, insurance capacity or completed customer outcomes.

## Sector guides and insurer partnerships

| URL | Purpose |
| --- | --- |
| `/sectors/robotics` | Robotics and physical AI deployment risks |
| `/sectors/ai-software` | Agent permissions, technology liability, cyber and performance questions |
| `/sectors/drones-autonomy` | Distinct aviation, vehicle and software exposures |
| `/sectors/hardware-infrastructure` | Products, equipment and technology exposures |
| `/for-insurers` | Sourcing opportunities, technical assessment and appetite matching |

The sector template connects concrete loss scenarios to cover worth exploring, explains what a generic submission may miss, and identifies useful technical evidence. Native disclosures reveal coverage detail and primary-source reading. These are educational examples, not coverage recommendations or insurer partnerships. The insurer page makes no claim to delegated underwriting authority or established premium flow.

Pages use normal document links for predictable back/forward navigation and work without client routing. Vercel `cleanUrls` serves the generated `.html` files at the URLs above; unknown paths receive `404.html`. Every page has its own canonical URL, description and Open Graph metadata. The sitemap is generated from the same route list during the build.
