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

function useFirstVisitLoader() {
  const [phase, setPhase] = useState(() => {
    try {
      return sessionStorage.getItem('archiveVisited') ? 'done' : 'in';
    } catch {
      return 'done';
    }
  });

  useEffect(() => {
    if (phase === 'done') return;
    try { sessionStorage.setItem('archiveVisited', '1'); } catch {}

    const toConverge = setTimeout(() => setPhase('converge'), 1450);
    const toOut = setTimeout(() => setPhase('out'), 2050);
    const toDone = setTimeout(() => setPhase('done'), 2650);
    return () => { clearTimeout(toConverge); clearTimeout(toOut); clearTimeout(toDone); };
  }, [phase]);

  return phase;
}

export default function App() {
  const location = useLocation();
  const isPurplePage = PURPLE_PAGES.has(location.pathname);
  const loaderPhase = useFirstVisitLoader();

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
