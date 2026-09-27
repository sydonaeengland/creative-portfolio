import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import BackToTop from './components/BackToTop.jsx';
import Home from './pages/Home.jsx';
import Journey from './pages/Journey.jsx';
import Design from './pages/Design.jsx';
import Photography from './pages/Photography.jsx';
import PhotographyAlbum from './pages/PhotographyAlbum.jsx';
import VideoEditing from './pages/VideoEditing.jsx';
import Social from './pages/Social.jsx';

const PURPLE_PAGES = new Set(['/']);

function useLoader() {
  // Plays on every full page load/reload (not just first visit) — no
  // sessionStorage gate. Client-side route navigation within the app
  // does NOT remount App, so it still won't replay on every Link click.
  const [phase, setPhase] = useState('in');

  // Runs once on mount only — NOT on every `phase` change. The timers below
  // already advance phase in sequence; re-running this effect per phase
  // change (via a [phase] dependency) stacked duplicate timer chains and
  // made the loader appear to loop/re-trigger.
  useEffect(() => {
    const toConverge = setTimeout(() => setPhase('converge'), 700);
    const toOut = setTimeout(() => setPhase('out'), 1000);
    const toDone = setTimeout(() => setPhase('done'), 1600);
    return () => { clearTimeout(toConverge); clearTimeout(toOut); clearTimeout(toDone); };
  }, []);

  return phase;
}

export default function App() {
  const location = useLocation();
  const isPurplePage = PURPLE_PAGES.has(location.pathname);
  const loaderPhase = useLoader();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  // Page content mounts as soon as the loader starts wiping away ('out'),
  // not after it's fully gone ('done') — the loader is still covering the
  // screen for its own 0.5s exit fade, so the two cross-fade instead of
  // hard-cutting (which showed a flash of the white body background for
  // one frame between the loader unmounting and the page fading in).
  const showLoader = loaderPhase !== 'done';
  const showPage = loaderPhase === 'out' || loaderPhase === 'done';

  return (
    <div className={isPurplePage ? 'on-purple-page' : ''}>
      <AnimatePresence>
        {showLoader && <LoadingScreen key="loader" phase={loaderPhase} />}
      </AnimatePresence>
      <Nav />
      {showPage && (
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/design" element={<Design />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/photography/:category" element={<PhotographyAlbum />} />
          <Route path="/video-editing" element={<VideoEditing />} />
          <Route path="/social" element={<Social />} />
        </Routes>
      )}
      {showPage && <BackToTop />}
    </div>
  );
}
