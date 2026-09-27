import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PageFade from '../components/PageFade.jsx';
import JustifiedGallery from '../components/JustifiedGallery.jsx';
import Lightbox from '../components/Lightbox.jsx';
import Footer from '../components/Footer.jsx';
import { PHOTOGRAPHY_PROJECTS, groupPhotographyByCategory, slugifyCategory } from '../data/photographyProjects.js';
import '../styles/photography.css';

// Computed once at module scope (not per render) so JustifiedGallery always
// gets the same array reference for its `items` prop per category —
// otherwise a fresh array every render (e.g. from the lightbox's own state
// changes) makes it think the items changed and replay its whole
// load/layout sequence, which showed up as the gallery visibly resetting
// on every next/prev click.
const PHOTOGRAPHY_GROUPS = groupPhotographyByCategory(PHOTOGRAPHY_PROJECTS);

export default function PhotographyAlbum() {
  const { category: slug } = useParams();
  const [activeIndex, setActiveIndex] = useState(null);

  const groups = PHOTOGRAPHY_GROUPS;
  const match = groups.find(([category]) => slugifyCategory(category) === slug);

  const projects = match ? match[1] : [];
  const active = activeIndex !== null ? projects[activeIndex] : null;

  // Kept around (not cleared on close) so the closing fade still has an
  // image/nav to show instead of going blank mid-transition.
  const [lastActive, setLastActive] = useState(null);
  useEffect(() => {
    if (active) setLastActive(active);
  }, [active]);

  const showPrev = () => setActiveIndex((i) => (i > 0 ? i - 1 : projects.length - 1));
  const showNext = () => setActiveIndex((i) => (i < projects.length - 1 ? i + 1 : 0));

  // Preload every full-size image up front so stepping through the
  // lightbox never shows a blank/loading frame mid-navigation.
  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
  }, [projects]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, projects.length]);

  if (!match) return <Navigate to="/photography" replace />;

  const [category] = match;

  return (
    <PageFade>
      <section className="album-header">
        <Link to="/photography" className="album-back">← BACK TO ALBUMS</Link>
        <h1 className="album-header-title display">{category}</h1>
        <p className="album-header-count">{projects.length} photos</p>
      </section>

      <section className="poster-wall">
        <JustifiedGallery items={projects} onSelect={(item) => setActiveIndex(projects.findIndex((p) => p.id === item.id))} />
      </section>

      <Footer />

      <Lightbox open={!!active} onClose={() => setActiveIndex(null)}>
        {lastActive && (
          <>
            <button className="lightbox-close" onClick={() => setActiveIndex(null)}>CLOSE ×</button>
            {projects.length > 1 && (
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
            {projects.length > 1 && (
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
