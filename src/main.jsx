import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import App from './App.jsx';
import './styles/global.css';

// GitHub Pages has no server-side routing, so a hard refresh on a deep
// link (e.g. /creative-portfolio/design) 404s. public/404.html stashes
// the intended URL and bounces to the site root; this restores it via
// history.replaceState before React Router reads the location.
if (sessionStorage.redirect) {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  const url = new URL(redirect);
  if (url.pathname + url.search + url.hash !== location.pathname + location.search + location.hash) {
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/creative-portfolio">
      {/* reducedMotion="user" makes every Framer Motion animation in the
          app respect the OS-level prefers-reduced-motion setting, not just
          plain CSS transitions — important for anyone with a
          photosensitivity or vestibular disorder. */}
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </BrowserRouter>
  </React.StrictMode>
);
