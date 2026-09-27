import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SECTIONS } from '../data/routes.js';

function isCurrent(location, path) {
  const [pathname, hash] = path.split('#');
  if (hash) return location.pathname === (pathname || '/') && location.hash === `#${hash}`;
  return location.pathname === path;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className="site-nav">
        <Link to="/" className="nav-mark">SYDONAE ENGLAND</Link>
        <ul className="nav-list">
          {SECTIONS.map((s) => (
            <li key={s.path}>
              <Link to={s.path} className={isCurrent(location, s.path) ? 'is-current' : ''}>
                <span className="n">{s.num}</span>{s.short}
              </Link>
            </li>
          ))}
        </ul>
        <button className="nav-toggle" onClick={() => setOpen(true)} aria-label="Open menu">
          MENU <span>+</span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu purple-field"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            <button className="mobile-menu-close" onClick={() => setOpen(false)}>CLOSE ×</button>
            <ul className="mobile-menu-list">
              {SECTIONS.map((s) => (
                <li key={s.path}>
                  <Link to={s.path}><span className="n">{s.num}</span>{s.full}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
