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

## Structure

```
src/
  main.jsx              — app entry
  App.jsx                — routes + shared layout
  components/
    Nav.jsx                — desktop nav + mobile fullscreen menu
    PageFade.jsx            — per-page mount/unmount fade
    Reveal.jsx               — scroll-triggered reveal wrapper
    Placeholder.jsx           — labeled placeholder block (swap `src` for real media)
    RawFinalToggle.jsx         — the RAW / FINAL signature interaction
    VideoCard.jsx                — video-editing-language card w/ hover scrub
    NextArchive.jsx                — "NEXT ARCHIVE" footer link (auto-advances)
    Footer.jsx                      — micro footer
  data/
    routes.js              — central nav/section registry (00–06)
    designProjects.js       — Design page project data
  pages/
    Home.jsx, Journey.jsx, Design.jsx, Photography.jsx,
    VideoEditing.jsx, Social.jsx, Contact.jsx
  styles/
    global.css              — tokens, typography, nav, RAW/FINAL toggle, etc.
    home.css, journey.css, design.css, photography.css,
    videoEditing.css, social.css, contact.css   — per-page styles

public/assets/           — real media (served as-is, referenced by URL)
  img/graphics/             — real graphic design work
  img/photography/           — real photography (swap placeholders in here)
  video/graphics/, video/photography/  — same split for video

legacy-html/              — the original static HTML/CSS/JS version, kept for
                             reference. Not part of the live build.
```

## Swapping in real media

`<Placeholder label="..." src={...} />` renders a labeled placeholder block
until you pass `src` (a path under `public/assets/...`), at which point it
renders the real image. Drop files into `public/assets/img/graphics` or
`public/assets/img/photography`, then update the relevant page/data file's
`src`.

## RAW / FINAL toggle

```jsx
<RawFinalToggle
  raw={<Placeholder label="Sketch" />}
  final={<Placeholder label="Final" src="/assets/img/graphics/final.png" />}
/>
```
