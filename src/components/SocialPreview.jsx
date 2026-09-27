import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

const KEYWORDS = ['Brand Identity', 'Content Calendars', 'Grid Planning', 'Community'];

export default function SocialPreview() {
  return (
    <section className="design-preview social-preview">
      <Reveal as="p" className="design-preview-label">
        <span className="design-preview-label-num">04</span> / SOCIAL MEDIA
      </Reveal>

      <div className="design-preview-top">
        <Reveal as="h2" className="design-preview-headline display">
          <span className="headline-line">NOT JUST POSTING,</span>
          <span className="headline-line purple">RUNNING THE PAGE.</span>
        </Reveal>

        <Reveal as="div" delay={0.1}>
          <Link to="/social" className="design-preview-cta">
            <span className="design-preview-cta-circle"><span className="arrow">↗</span></span>
            VIEW SOCIAL MEDIA
          </Link>
        </Reveal>
      </div>

      <Reveal as="p" className="design-preview-summary" delay={0.05}>
        Full ownership of the feed: content calendars, grid planning and
        captions built to keep each page's voice consistent from post to
        post, not just filling space between campaigns.
      </Reveal>

      <Reveal as="ul" className="social-keywords" delay={0.1}>
        {KEYWORDS.map((k) => <li key={k}>{k}</li>)}
      </Reveal>
    </section>
  );
}
