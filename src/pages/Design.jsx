import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageFade from '../components/PageFade.jsx';
import Reveal from '../components/Reveal.jsx';
import Placeholder from '../components/Placeholder.jsx';
import JustifiedGallery from '../components/JustifiedGallery.jsx';
import Lightbox from '../components/Lightbox.jsx';
import NextArchive from '../components/NextArchive.jsx';
import Footer from '../components/Footer.jsx';
import { DESIGN_PROJECTS } from '../data/designProjects.js';
import '../styles/design.css';

const EASE = [0.16, 1, 0.3, 1];

const CATEGORY_ORDER = ['Sports Graphics', 'UWI Computing', 'ICHS', 'Lifestyle & Listings'];

// Each category gets a distinct visual treatment so sections don't repeat
// the same layout: justified rows (edge-to-edge, no crop), a uniform grid
// (identical tiles), or masonry columns (natural size, columns of varying
// height).
const CATEGORY_LAYOUT = {
  'Sports Graphics': 'justified',
  'UWI Computing': 'grid',
  'ICHS': 'grid',
  'Lifestyle & Listings': 'grid',
};

function groupByCategory(projects) {
  const groups = new Map();
  for (const p of projects) {
    const key = p.category || 'More Work';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p);
  }
  const ordered = [...CATEGORY_ORDER, ...[...groups.keys()].filter((k) => !CATEGORY_ORDER.includes(k))];
  return ordered.filter((k) => groups.has(k)).map((k) => [k, groups.get(k)]);
}

// Computed once at module scope (not per render) so JustifiedGallery always
// receives the same array references for its `items` prop — otherwise a
// new reference on every render (e.g. from the lightbox's own state
// changes) makes it think the items changed and replay its whole
// load/layout sequence, which is why the gallery below the lightbox used
// to visibly reset on every next/prev click.
const DESIGN_GROUPS = groupByCategory(DESIGN_PROJECTS);

export default function Design() {
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const groups = DESIGN_GROUPS;
  const activeProjects = activeGroup ? (groups.find(([c]) => c === activeGroup) || [])[1] : null;
  const active = activeProjects && activeIndex !== null ? activeProjects[activeIndex] : null;

  // Kept around (not cleared on close) so the closing fade still has an
  // image/nav to show instead of going blank mid-transition.
  const [lastActive, setLastActive] = useState(null);
  const [lastActiveProjects, setLastActiveProjects] = useState([]);
  useEffect(() => {
    if (active) {
      setLastActive(active);
      setLastActiveProjects(activeProjects);
    }
  }, [active, activeProjects]);

  const openItem = (category, projects, item) => {
    setActiveGroup(category);
    setActiveIndex(projects.findIndex((p) => p.id === item.id));
  };
  const closeItem = () => { setActiveGroup(null); setActiveIndex(null); };
  const showPrev = () => setActiveIndex((i) => (i > 0 ? i - 1 : activeProjects.length - 1));
  const showNext = () => setActiveIndex((i) => (i < activeProjects.length - 1 ? i + 1 : 0));

  // Preload every full-size image up front so stepping through the
  // lightbox never shows a blank/loading frame mid-navigation.
  useEffect(() => {
    DESIGN_PROJECTS.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeItem();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, activeProjects]);

  return (
    <PageFade>
      <section className="design-hero on-purple">
        <div className="design-hero-gradient" aria-hidden="true" />
        <div className="design-hero-noise" aria-hidden="true" />
        <svg className="design-hero-lines" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="design-hero-line design-hero-line-1"
            d="M -50 750 C 220 660, 360 860, 600 720 S 960 560, 1080 640"
            fill="none"
          />
          <path
            className="design-hero-line design-hero-line-2"
            d="M 150 -40 C 300 200, 120 340, 360 440 S 600 540, 520 760"
            fill="none"
          />
        </svg>
        <div className="design-hero-watermark" aria-hidden="true">01</div>

        <div className="design-hero-panel">
          <motion.h1
            className="design-hero-title display"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            DESIGN
          </motion.h1>
          <motion.p
            className="design-hero-copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          >
            Posters, campaign systems, event graphics, brand collateral, design
            built to be looked at twice.
          </motion.p>
          <motion.ul
            className="design-hero-tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {CATEGORY_ORDER.map((c) => <li key={c}>{c}</li>)}
          </motion.ul>
        </div>

        <div className="design-hero-collage">
          <motion.div
            className="design-hero-tile design-hero-tile-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            style={{ backgroundImage: "url('/creative-portfolio/assets/graphics/dare-to-dream-kick4urheart-under10-champions.png')" }}
          />
          <motion.div
            className="design-hero-tile design-hero-tile-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            style={{ backgroundImage: "url('/creative-portfolio/assets/graphics/uwi-computing-meet-the-exec-sydonae-england.png')" }}
          />
          <motion.div
            className="design-hero-tile design-hero-tile-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
            style={{ backgroundImage: "url('/creative-portfolio/assets/graphics/dreamscape-villa-summer-bookings-cover.png')" }}
          />
          <div className="design-hero-scrim" aria-hidden="true" />
          <motion.span
            className="design-hero-collage-caption"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            A FEW FROM THE COLLECTION
          </motion.span>
        </div>
      </section>

      <section className="poster-wall">
        {groups.map(([category, projects]) => {
          const layout = CATEGORY_LAYOUT[category] || 'grid';
          return (
            <div className="poster-group" key={category}>
              <Reveal as="h2" className="poster-group-title">{category}</Reveal>

              {layout === 'justified' && (
                <JustifiedGallery items={projects} onSelect={(item) => openItem(category, projects, item)} />
              )}

              {layout === 'grid' && (
                <div
                  className={[
                    'poster-grid',
                    'poster-grid--even',
                    category === 'ICHS' ? 'poster-grid--square' : '',
                    category === 'Lifestyle & Listings' ? 'poster-grid--one-row' : '',
                  ].join(' ').trim()}
                >
                  {projects.map((p, i) => (
                    <Reveal
                      key={p.id}
                      as="article"
                      className="poster-card"
                      variant="scale"
                      delay={(i % 5) * 0.06}
                    >
                      <button
                        type="button"
                        className="frame"
                        onClick={() => openItem(category, projects, p)}
                      >
                        <Placeholder label={p.label} src={p.image} alt={p.label} />
                        <span className="poster-card-hover">VIEW ↗</span>
                      </button>
                    </Reveal>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </section>

      <NextArchive />
      <Footer />

      <Lightbox open={!!active} onClose={closeItem}>
        {lastActive && (
          <>
            <button className="lightbox-close" onClick={closeItem}>CLOSE ×</button>
            {lastActiveProjects.length > 1 && (
              <button
                className="lightbox-nav lightbox-prev"
                onClick={(e) => { e.stopPropagation(); showPrev(); }}
                aria-label="Previous photo"
              >
                ‹
              </button>
            )}
            <div className="lightbox-frame" onClick={(e) => e.stopPropagation()}>
              <img src={lastActive.image} alt={lastActive.label} />
            </div>
            {lastActiveProjects.length > 1 && (
              <button
                className="lightbox-nav lightbox-next"
                onClick={(e) => { e.stopPropagation(); showNext(); }}
                aria-label="Next photo"
              >
                ›
              </button>
            )}
          </>
        )}
      </Lightbox>
    </PageFade>
  );
}
