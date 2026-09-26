# The Creative Archive — Syd / SyDigitalStudios

A multi-page portfolio site (plain HTML/CSS/JS, no build step, no dependencies
beyond Google Fonts). Open `index.html` in a browser, or serve the folder with
any static server.

## Structure

```
index.html          00 — Home (hero, parallax, handoff)
journey.html         01 — Journey (winding timeline, 2020–2026)
design.html           02 — Design (poster wall + case studies)
photography.html       03 — Photography (calm/cinematic layouts)
motion.html              04 — Motion (video grid, hover-scrub)
social.html                05 — Social (campaign case studies, phone mockups)
contact.html                  06 — Contact (purple bookend)

css/base.css     — tokens, typography, nav, cursor, transitions, RAW/FINAL toggle
css/<page>.css   — per-page styles
js/main.js       — cursor, mobile menu, page transitions, scroll reveal,
                   RAW/FINAL toggle logic, video in-view/hover-scrub
```

## Swapping in real media

Every placeholder is a `<div class="ph" data-ph="LABEL">` (or `.ph-dark` on
dark backgrounds). Replace with a real `<img>`/`<video>` and drop the `.ph`
class, or set the label div as a background behind your media during
development. Video cards on the Motion page expect a `<video>` element with
`data-autoplay-inview` to get the "plays only when in view, only one at a
time" behavior, and a wrapping `[data-scrub]` for hover-scrub.

## RAW / FINAL toggle

Reusable pattern — wrap a toggle + stage in a shared container with
`data-rf-group`:

```html
<div data-rf-group>
  <div class="rf-toggle" data-state="final">
    <span class="side raw">Raw</span>
    <button class="rf-switch"></button>
    <span class="side final">Final</span>
  </div>
  <div class="rf-stage" data-rf-stage>
    <div class="rf-asset" data-rf="raw">...</div>
    <div class="rf-asset is-visible" data-rf="final">...</div>
  </div>
</div>
```

`js/main.js` wires the click behavior automatically on page load.
