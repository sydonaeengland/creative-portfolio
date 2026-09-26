import { motion } from 'framer-motion';

// First-visit loading screen: four tool icons (design, photo, video, social)
// draw in with a stagger, then converge into the SYD° mark before the
// screen fades away. Shown once per session — see the sessionStorage
// check in App.jsx.

const ICON_VARIANTS = {
  hidden: { opacity: 0, scale: 0.6, y: 16 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.12 },
  }),
  converge: {
    scale: 0.4,
    opacity: 0,
    transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] },
  },
};

const PATH_VARIANTS = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
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
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
      <span>{label}</span>
    </motion.div>
  );
}

export default function LoadingScreen({ phase }) {
  // phase: 'in' (icons drawing) | 'converge' (merging to mark) | 'out' (fading)
  const iconAnim = phase === 'in' ? 'visible' : phase === 'converge' ? 'converge' : 'visible';

  return (
    <motion.div
      className="loading-screen purple-field"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'out' ? 0 : 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="loading-icons">
        <Icon label="DESIGN" custom={0} animate={iconAnim}>
          {/* pen tool */}
          <motion.path d="M4 20l3.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L3 19" variants={PATH_VARIANTS} initial="hidden" animate="visible" />
          <motion.path d="M13.5 6.5l4 4" variants={PATH_VARIANTS} initial="hidden" animate="visible" />
        </Icon>
        <Icon label="PHOTO" custom={1} animate={iconAnim}>
          {/* aperture / camera */}
          <motion.circle cx="12" cy="12" r="8.5" variants={PATH_VARIANTS} initial="hidden" animate="visible" />
          <motion.circle cx="12" cy="12" r="3" variants={PATH_VARIANTS} initial="hidden" animate="visible" />
        </Icon>
        <Icon label="VIDEO" custom={2} animate={iconAnim}>
          {/* play / timeline */}
          <motion.rect x="3" y="5" width="18" height="14" rx="2" variants={PATH_VARIANTS} initial="hidden" animate="visible" />
          <motion.path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" variants={PATH_VARIANTS} initial="hidden" animate="visible" />
        </Icon>
        <Icon label="SOCIAL" custom={3} animate={iconAnim}>
          {/* chat bubble */}
          <motion.path d="M4 5h16v11H8l-4 4V5z" variants={PATH_VARIANTS} initial="hidden" animate="visible" />
        </Icon>
      </div>

      <motion.div
        className="loading-mark display"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: phase !== 'in' ? 1 : 0, scale: phase !== 'in' ? 1 : 0.8 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        SYD°
      </motion.div>
    </motion.div>
  );
}
