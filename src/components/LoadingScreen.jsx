import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// First-visit loading screen: a silhouette figure at work, cycling through
// the four disciplines the site showcases — camera up (photo), sketching on
// a tablet (design), phone with social icons (social), clapperboard/scrub
// (video) — before the scene dissolves into the wordmark. Shown once per
// session — see the sessionStorage check in App.jsx.

const EASE_OUT = [0.16, 1, 0.3, 1];

const BEATS = [
  { key: 'photo', label: 'PHOTOGRAPHY' },
  { key: 'design', label: 'DESIGN' },
  { key: 'social', label: 'SOCIAL' },
  { key: 'video', label: 'VIDEO EDITING' },
];

const RING_VARIANTS = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1, ease: EASE_OUT, delay: 0.05 } },
};

const propVariants = {
  enter: { opacity: 0, scale: 0.7, rotate: -8, y: 10 },
  center: { opacity: 1, scale: 1, rotate: 0, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
  exit: { opacity: 0, scale: 0.7, rotate: 8, y: -10, transition: { duration: 0.25, ease: [0.65, 0, 0.35, 1] } },
};

/* ---- prop illustrations, one per beat ---- */
function CameraProp() {
  return (
    <motion.svg key="photo" width="72" height="72" viewBox="0 0 72 72" fill="none" variants={propVariants} initial="enter" animate="center" exit="exit">
      <rect x="14" y="26" width="44" height="32" rx="4" stroke="#fff" strokeWidth="2.2" />
      <path d="M26 26l4-7h12l4 7" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="36" cy="42" r="10" stroke="#fff" strokeWidth="2.2" />
      <circle cx="36" cy="42" r="4" fill="#fff" />
      <circle cx="50" cy="32" r="1.6" fill="#fff" />
    </motion.svg>
  );
}
function DesignProp() {
  return (
    <motion.svg key="design" width="72" height="72" viewBox="0 0 72 72" fill="none" variants={propVariants} initial="enter" animate="center" exit="exit">
      <rect x="10" y="16" width="52" height="38" rx="3" stroke="#fff" strokeWidth="2.2" />
      <path d="M20 46l5.5-1.5 15-15a3 3 0 0 0-4.3-4.3l-15 15L20 46z" fill="#fff" />
      <line x1="10" y1="60" x2="62" y2="60" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </motion.svg>
  );
}
function SocialProp() {
  return (
    <motion.svg key="social" width="72" height="72" viewBox="0 0 72 72" fill="none" variants={propVariants} initial="enter" animate="center" exit="exit">
      <rect x="22" y="8" width="28" height="56" rx="6" stroke="#fff" strokeWidth="2.2" />
      <line x1="30" y1="16" x2="42" y2="16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="36" cy="56" r="2" fill="#fff" />
      <path d="M32 30l-4 4 4 4M40 30l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="36" cy="34" r="1.6" fill="#fff" />
    </motion.svg>
  );
}
function VideoProp() {
  return (
    <motion.svg key="video" width="72" height="72" viewBox="0 0 72 72" fill="none" variants={propVariants} initial="enter" animate="center" exit="exit">
      <rect x="10" y="22" width="52" height="34" rx="3" stroke="#fff" strokeWidth="2.2" />
      <path d="M10 30h52" stroke="#fff" strokeWidth="2.2" />
      <path d="M18 22l4-8h6l-3 8M34 22l4-8h6l-3 8" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
      <path d="M30 38l12 6-12 6V38z" fill="#fff" />
    </motion.svg>
  );
}
const PROP_BY_KEY = { photo: CameraProp, design: DesignProp, social: SocialProp, video: VideoProp };

/* ---- the figure: a seated silhouette, arms adjust slightly per beat ---- */
function Figure() {
  return (
    <svg width="220" height="200" viewBox="0 0 220 200" fill="none" style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)' }}>
      {/* desk/surface */}
      <line x1="20" y1="176" x2="200" y2="176" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
      {/* seated silhouette */}
      <path
        d="M110 60c11 0 20 9 20 20 0 8-4 15-11 18l3 10c14 4 24 16 24 31v25c0 6-5 11-11 11H85c-6 0-11-5-11-11v-25c0-15 10-27 24-31l3-10c-7-3-11-10-11-18 0-11 9-20 20-20z"
        fill="rgba(255,255,255,0.14)"
      />
      {/* subtle arm gesture line for a bit of "at work" life */}
      <path d="M75 130c-8 6-12 14-12 22" stroke="rgba(255,255,255,0.14)" strokeWidth="10" strokeLinecap="round" />
      <path d="M145 130c8 6 12 14 12 22" stroke="rgba(255,255,255,0.14)" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}

export default function LoadingScreen({ phase }) {
  // phase: 'in' (scene cycling through beats) | 'converge' (dissolve to mark) | 'out' (wipe away)
  const [beatIndex, setBeatIndex] = useState(0);

  useEffect(() => {
    if (phase !== 'in') return undefined;
    const interval = setInterval(() => {
      setBeatIndex((i) => (i + 1) % BEATS.length);
    }, 480);
    return () => clearInterval(interval);
  }, [phase]);

  const beat = BEATS[beatIndex];
  const Prop = PROP_BY_KEY[beat.key];

  return (
    <motion.div
      className="loading-screen purple-field"
      initial={{ opacity: 1 }}
      animate={phase === 'out' ? { opacity: 0, transition: { duration: 0.6, ease: EASE_OUT } } : { opacity: 1 }}
    >
      <motion.div className="loading-backdrop-ring" variants={RING_VARIANTS} initial="hidden" animate="visible" />

      <motion.div
        className="loading-scene"
        animate={
          phase === 'converge'
            ? { scale: 0.7, opacity: 0, transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }
            : { scale: 1, opacity: 1 }
        }
      >
        <motion.div
          className="loading-scene-figure"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Figure />
          <div className="loading-scene-prop">
            <AnimatePresence mode="wait">
              {phase === 'in' && <Prop />}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="loading-scene-label">
          <AnimatePresence mode="wait">
            {phase === 'in' && (
              <motion.span
                key={beat.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.15 } }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
              >
                {beat.label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        className="loading-mark"
        initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
        animate={
          phase !== 'in'
            ? { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE_OUT, delay: 0.1 } }
            : { opacity: 0, scale: 0.7, filter: 'blur(8px)' }
        }
      >
        <span className="loading-mark-line display">SYDONAE</span>
        <span className="loading-mark-line display">ENGLAND</span>
      </motion.div>

      <div className="loading-progress-track">
        <motion.div
          className="loading-progress-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase === 'in' ? 0.75 : 1 }}
          transition={{ duration: phase === 'in' ? 1.9 : 0.4, ease: EASE_OUT }}
        />
      </div>
    </motion.div>
  );
}
