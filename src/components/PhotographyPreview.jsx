import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import Placeholder from './Placeholder.jsx';
import { PHOTOGRAPHY_PROJECTS } from '../data/photographyProjects.js';

// A deliberate mix — portrait, team photo, action — rather than five near-
// identical match-day shots in a row.
const PREVIEW_IDS = ['portrait-braids', 'portrait-wynlee', 'match-day-14', 'tournament-03', 'portrait-athlete'];
const PREVIEW_ITEMS = PREVIEW_IDS
  .map((id) => PHOTOGRAPHY_PROJECTS.find((p) => p.id === id))
  .filter(Boolean);

export default function PhotographyPreview() {
  return (
    <section className="design-preview photography-preview">
      <Reveal as="p" className="design-preview-label">
        <span className="design-preview-label-num">02</span> / PHOTOGRAPHY
      </Reveal>

      <div className="design-preview-top">
        <Reveal as="h2" className="design-preview-headline display">
          <span className="headline-line">MOMENTS, CAUGHT</span>
          <span className="headline-line purple">MID-MOTION.</span>
        </Reveal>

        <Reveal as="div" delay={0.1}>
          <Link to="/photography" className="design-preview-cta">
            <span className="design-preview-cta-circle"><span className="arrow">↗</span></span>
            VIEW ALL PHOTOGRAPHY
          </Link>
        </Reveal>
      </div>

      <div className="design-preview-grid">
        {PREVIEW_ITEMS.map((p, i) => (
          <Reveal as="div" className="design-preview-card" key={p.id} delay={i * 0.05}>
            <Link to="/photography">
              <div className="design-preview-frame">
                <Placeholder label={p.label} src={p.image} alt={p.label} />
                <span className="design-preview-hover">VIEW ↗</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
