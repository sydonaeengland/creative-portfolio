import { motion } from 'framer-motion';

// Loading screen — one confident move: the wordmark reveals via a tight
// clip-path wipe, each line in sequence, with a single thin underline
// as the only secondary accent. Clean gradient background, nothing else
// competing for attention. Plays on every full page load — see
// useLoader() in App.jsx.

const EASE_SHARP = [0.83, 0, 0.17, 1];
const EASE_OUT = [0.16, 1, 0.3, 1];

const LINE_VARIANTS = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: (i) => ({
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.7, ease: EASE_SHARP, delay: 0.15 + i * 0.22 },
  }),
};

export default function LoadingScreen({ phase }) {
  // phase: 'in' (wordmark wipes in) | 'converge' (hold) | 'out' (wipe away)
  const leaving = phase === 'out';

  return (
    <motion.div
      className="loading-screen purple-field"
      initial={{ opacity: 1 }}
      animate={leaving ? { opacity: 0, transition: { duration: 0.55, ease: EASE_OUT } } : { opacity: 1 }}
    >
      <div className="loading-mark">
        <div className="loading-mark-line-wrap">
          <motion.span
            className="loading-mark-line display"
            custom={0}
            variants={LINE_VARIANTS}
            initial="hidden"
            animate="visible"
          >
            SYDONAE
          </motion.span>
        </div>
        <div className="loading-mark-line-wrap">
          <motion.span
            className="loading-mark-line display"
            custom={1}
            variants={LINE_VARIANTS}
            initial="hidden"
            animate="visible"
          >
            ENGLAND
          </motion.span>
        </div>

        <motion.div
          className="loading-mark-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1, transition: { duration: 0.5, ease: EASE_SHARP, delay: 0.75 } }}
        />
      </div>
    </motion.div>
  );
}
