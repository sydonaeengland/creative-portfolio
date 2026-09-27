import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import Placeholder from './Placeholder.jsx';
import { DESIGN_PROJECTS } from '../data/designProjects.js';

export default function DesignPreview() {
  return (
    <section className="design-preview">
      <Reveal as="p" className="design-preview-label">
        <span className="design-preview-label-num">01</span> / DESIGN
      </Reveal>

      <div className="design-preview-top">
        <Reveal as="h2" className="design-preview-headline display">
          <span className="headline-line">POSTERS, SYSTEMS,</span>
          <span className="headline-line purple">CAMPAIGN VISUALS.</span>
        </Reveal>

        <Reveal as="div" delay={0.1}>
          <Link to="/design" className="design-preview-cta">
            <span className="design-preview-cta-circle"><span className="arrow">↗</span></span>
            VIEW ALL DESIGN
          </Link>
        </Reveal>
      </div>

      <div className="design-preview-grid">
        {DESIGN_PROJECTS.slice(0, 5).map((p, i) => (
          <Reveal as="div" className="design-preview-card" key={p.id} delay={i * 0.05}>
            <Link to="/design">
              <div className="design-preview-frame">
                <Placeholder label={p.label} src={p.image} alt={p.label} />
                <span className="design-preview-hover">VIEW ↗</span>
              </div>
              <div className="design-preview-meta">
                <span className="title">{p.title}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
