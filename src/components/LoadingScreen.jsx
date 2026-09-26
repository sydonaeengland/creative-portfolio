import { motion } from 'framer-motion';

// First-visit loading screen: four tool icons (design, photo, video, social)
// sweep in with spring overshoot, hold, then converge into the wordmark
// before the whole screen wipes away. Shown once per session — see the
// sessionStorage check in App.jsx.

const EASE_OUT = [0.16, 1, 0.3, 1];

const RING_VARIANTS = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_OUT, delay: 0.05 },
  },
};

const ICON_VARIANTS = {
  hidden: (i) => ({
    opacity: 0,
    scale: 0.3,
    rotate: i % 2 === 0 ? -60 : 60,
    y: 30,
  }),
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 16,
      mass: 0.9,
      delay: 0.35 + i * 0.11,
    },
  }),
  converge: {
    scale: 0,
    opacity: 0,
    rotate: 90,
    transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
  },
};

const PATH_VARIANTS = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.55, ease: 'easeInOut', delay: 0.1 },
  },
};

const LABEL_VARIANTS = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.55 } },
};

function Icon({ children, label, custom, animate }) {
  return (
    <motion.div
      className="loading-icon"
      custom={custom}
      variants={ICON_VARIANTS}
      initial="hidden"
      animate={animate}
    >
      <span className="loading-icon-ring" />
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
      <motion.span variants={LABEL_VARIANTS} initial="hidden" animate={animate === 'visible' ? 'visible' : 'hidden'}>
        {label}
      </motion.span>
    </motion.div>
  );
}

export default function LoadingScreen({ phase }) {
  // phase: 'in' (icons sweeping in) | 'converge' (collapsing to mark) | 'out' (wipe away)
  const iconAnim = phase === 'converge' ? 'converge' : 'visible';

  return (
    <motion.div
      className="loading-screen purple-field"
      initial={{ opacity: 1 }}
      animate={phase === 'out' ? { opacity: 0, transition: { duration: 0.6, ease: EASE_OUT } } : { opacity: 1 }}
    >
      {/* subtle expanding ring behind everything for depth */}
      <motion.div className="loading-backdrop-ring" variants={RING_VARIANTS} initial="hidden" animate="visible" />

      <div className="loading-icons">
        <Icon label="DESIGN" custom={0} animate={iconAnim}>
          <motion.path d="M4 20l3.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L3 19" variants={PATH_VARIANTS} initial="hidden" animate="visible" />
          <motion.path d="M13.5 6.5l4 4" variants={PATH_VARIANTS} initial="hidden" animate="visible" />
        </Icon>
        <Icon label="PHOTO" custom={1} animate={iconAnim}>
          <motion.circle cx="12" cy="12" r="8.5" variants={PATH_VARIANTS} initial="hidden" animate="visible" />
          <motion.circle cx="12" cy="12" r="3" variants={PATH_VARIANTS} initial="hidden" animate="visible" />
        </Icon>
        <Icon label="VIDEO" custom={2} animate={iconAnim}>
          <motion.rect x="3" y="5" width="18" height="14" rx="2" variants={PATH_VARIANTS} initial="hidden" animate="visible" />
          <motion.path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" variants={PATH_VARIANTS} initial="hidden" animate="visible" />
        </Icon>
        <Icon label="SOCIAL" custom={3} animate={iconAnim}>
          <motion.path d="M4 5h16v11H8l-4 4V5z" variants={PATH_VARIANTS} initial="hidden" animate="visible" />
        </Icon>
      </div>

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
          animate={{ scaleX: phase === 'in' ? 0.7 : 1 }}
          transition={{ duration: phase === 'in' ? 0.9 : 0.4, ease: EASE_OUT }}
        />
      </div>
    </motion.div>
  );
}
