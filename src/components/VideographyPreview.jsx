import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

export default function VideographyPreview() {
  return (
    <section className="design-preview videography-preview">
      <Reveal as="p" className="design-preview-label">
        <span className="design-preview-label-num">03</span> / VIDEOGRAPHY
      </Reveal>

      <div className="design-preview-top">
        <Reveal as="h2" className="design-preview-headline display">
          <span className="headline-line">CUT TO MATCH</span>
          <span className="headline-line purple">THE ENERGY.</span>
        </Reveal>

        <Reveal as="div" delay={0.1}>
          <Link to="/video-editing" className="design-preview-cta">
            <span className="design-preview-cta-circle"><span className="arrow">↗</span></span>
            VIEW ALL VIDEOGRAPHY
          </Link>
        </Reveal>
      </div>

      <Reveal as="div" delay={0.1}>
        <Link to="/video-editing" className="see-videos-block">
          <span className="see-videos-noise" aria-hidden="true" />
          <span className="see-videos-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </span>
          <span className="see-videos-text">SEE VIDEOS</span>
          <span className="arrow">↗</span>
        </Link>
      </Reveal>
    </section>
  );
}
