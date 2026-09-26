import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import Home from './pages/Home.jsx';
import Journey from './pages/Journey.jsx';
import Design from './pages/Design.jsx';
import Photography from './pages/Photography.jsx';
import VideoEditing from './pages/VideoEditing.jsx';
import Social from './pages/Social.jsx';
import Contact from './pages/Contact.jsx';

const PURPLE_PAGES = new Set(['/', '/contact']);

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
    const toConverge = setTimeout(() => setPhase('converge'), 2150);
    const toOut = setTimeout(() => setPhase('out'), 2750);
    const toDone = setTimeout(() => setPhase('done'), 3350);
    return () => { clearTimeout(toConverge); clearTimeout(toOut); clearTimeout(toDone); };
  }, []);

  return phase;
}

export default function App() {
  const location = useLocation();
  const isPurplePage = PURPLE_PAGES.has(location.pathname);
  const loaderPhase = useLoader();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={isPurplePage ? 'on-purple-page' : ''}>
      {loaderPhase !== 'done' && <LoadingScreen phase={loaderPhase} />}
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/design" element={<Design />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/video-editing" element={<VideoEditing />} />
          <Route path="/social" element={<Social />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
