import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import App from './App.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
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
