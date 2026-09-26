import { Link, useLocation } from 'react-router-dom';
import { nextSection } from '../data/routes.js';

export default function NextArchive() {
  const location = useLocation();
  const next = nextSection(location.pathname);

  return (
    <Link to={next.path} className="next-archive bulge-hover" style={{ display: 'block' }}>
      <span className="eyebrow">NEXT ARCHIVE</span><br />
      <span className="headline display">
        {next.num} {next.full.toUpperCase()} <span className="arrow">→</span>
      </span>
    </Link>
  );
}
