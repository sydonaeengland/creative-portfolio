# The Creative Archive — Sydonae England / SyDigitalStudios

A multi-page portfolio site built with **React + Vite + React Router +
Framer Motion**.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Testing

End-to-end tests are written with **Playwright**, covering navigation, page
content, galleries/lightboxes, and media integrity (no broken image/video
requests) across every route.

```bash
npm run test:e2e       # run the full suite headlessly
npm run test:e2e:ui    # run interactively in Playwright's UI mode
```

The config (`playwright.config.ts`) automatically starts the Vite dev server
before running tests, so you don't need `npm run dev` running separately.
Specs live in `tests/`:

- `navigation.spec.ts` — every route loads without console errors; nav links
  (desktop + mobile menu) navigate correctly
- `home.spec.ts` — hero/about content, preview sections, contact links, footer
- `footer-and-next-archive.spec.ts` — the "Next Archive" link cycles correctly
  through all sections; footer renders on every page
- `photography-album.spec.ts` — album cards, category routing, lightbox
  open/close/navigate (click + keyboard), invalid-slug redirect
- `design-page.spec.ts` — category groups render, lightbox behavior
- `video-and-social.spec.ts` — video groups/playback elements, social stats,
  carousel
- `asset-integrity.spec.ts` — no 404s on any image/video request; every
  rendered `<img>` actually decodes

## Structure

```
src/
  main.jsx                    — app entry
  App.jsx                     — routes + shared layout
  components/
    Nav.jsx                     — desktop nav + mobile fullscreen menu
    PageFade.jsx                 — per-page mount/unmount fade
    Reveal.jsx                    — scroll-triggered reveal wrapper
    Placeholder.jsx                — labeled placeholder block (swap `src` for real media)
    RawFinalToggle.jsx              — the RAW / FINAL signature interaction
    VideoCard.jsx                    — video-editing-language card w/ hover scrub
    JustifiedGallery.jsx, VideoJustifiedGallery.jsx — Flickr-style justified rows
    NextArchive.jsx                   — "NEXT ARCHIVE" footer link (auto-advances)
    Footer.jsx                         — micro footer
  data/
    routes.js                  — central nav/section registry (00–04)
    designProjects.js           — Design page project data
    photographyProjects.js       — Photography page/album project data
    milestones.js                 — Journey page milestones
  pages/
    Home.jsx, Journey.jsx, Design.jsx, Photography.jsx,
    PhotographyAlbum.jsx, VideoEditing.jsx, Social.jsx
  styles/
    global.css                  — tokens, typography, nav, RAW/FINAL toggle, etc.
    home.css, journey.css, design.css, photography.css,
    videoEditing.css, social.css, contact.css   — per-page styles

public/assets/             — real media (served as-is, referenced by URL)
  graphics/                   — design work
  photography/                 — photography
  video/                         — video clips

tests/                     — Playwright end-to-end tests (see Testing below)
```

## Swapping in real media

`<Placeholder label="..." src={...} />` renders a labeled placeholder block
until you pass `src` (a path under `public/assets/...`), at which point it
renders the real image. Drop files into `public/assets/graphics`,
`public/assets/photography`, or `public/assets/video`, then update the
relevant data file (`designProjects.js`, `photographyProjects.js`, etc.) or
page component with the new `src`.

## RAW / FINAL toggle

```jsx
<RawFinalToggle
  raw={<Placeholder label="Sketch" />}
  final={<Placeholder label="Final" src="/assets/graphics/final.png" />}
/>
```
