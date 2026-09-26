import { motion } from 'framer-motion';

// Loading screen: a sleek abstract "cooking up" sequence — bars build,
// a ring sweeps, fragments assemble into a mark, all sharp geometry and
// confident motion. No literal objects/characters. Plays on every full
// page load — see useLoader() in App.jsx.

const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_SHARP = [0.83, 0, 0.17, 1];

const RING_VARIANTS = {
  hidden: { scale: 0, opacity: 0, rotate: -90 },
  visible: { scale: 1, opacity: 1, rotate: 0, transition: { duration: 1.1, ease: EASE_OUT, delay: 0.05 } },
};

// Four bars that build up like a stacking/assembling sequence — the
// "cooking up" read — each with its own height/timing, then a sweeping
// scan-line crosses them, then they collapse into the mark.
const BARS = [
  { h: 38, delay: 0.05 },
  { h: 64, delay: 0.15 },
  { h: 50, delay: 0.25 },
  { h: 76, delay: 0.35 },
  { h: 44, delay: 0.45 },
];

function BuildBars({ phase }) {
  const converge = phase === 'converge' || phase === 'out';
  return (
    <div className="loading-bars">
      {BARS.map((b, i) => (
        <motion.div
          key={i}
          className="loading-bar"
          initial={{ scaleY: 0 }}
          animate={
            converge
              ? { scaleY: 0, transition: { duration: 0.35, ease: EASE_SHARP, delay: i * 0.03 } }
              : { scaleY: 1, transition: { duration: 0.5, ease: EASE_SHARP, delay: b.delay } }
          }
          style={{ height: b.h }}
        />
      ))}
      <motion.div
        className="loading-scanline"
        initial={{ x: '-120%', opacity: 0 }}
        animate={
          converge
            ? { opacity: 0 }
            : { x: '120%', opacity: [0, 1, 1, 0], transition: { duration: 1.1, ease: 'easeInOut', delay: 0.75, repeat: Infinity, repeatDelay: 0.4 } }
        }
      />
    </div>
  );
}

// Orbiting fragments — small squares/dashes that swing around the ring,
// reinforcing "assembling" without being literal icons.
const FRAGMENTS = [
  { angle: 0, delay: 0.2 },
  { angle: 72, delay: 0.32 },
  { angle: 144, delay: 0.44 },
  { angle: 216, delay: 0.56 },
  { angle: 288, delay: 0.68 },
];

function OrbitFragments({ phase }) {
  const converge = phase === 'converge' || phase === 'out';
  return (
    <div className="loading-orbit">
      {FRAGMENTS.map((f, i) => (
        <motion.span
          key={i}
          className="loading-fragment"
          style={{ '--angle': `${f.angle}deg` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            converge
              ? { opacity: 0, scale: 0, transition: { duration: 0.3, ease: EASE_SHARP, delay: i * 0.02 } }
              : { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 18, delay: f.delay } }
          }
        >
          <motion.span
            className="loading-fragment-dot"
            animate={converge ? {} : { rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
        </motion.span>
      ))}
    </div>
  );
}

export default function LoadingScreen({ phase }) {
  // phase: 'in' (bars build + orbit assembles) | 'converge' (collapse) | 'out' (wipe away)
  return (
    <motion.div
      className="loading-screen purple-field"
      initial={{ opacity: 1 }}
      animate={phase === 'out' ? { opacity: 0, transition: { duration: 0.6, ease: EASE_OUT } } : { opacity: 1 }}
    >
      <motion.div className="loading-backdrop-ring" variants={RING_VARIANTS} initial="hidden" animate="visible" />

      <div className="loading-stage">
        <div className="loading-orbit-wrap">
          <OrbitFragments phase={phase} />
          <BuildBars phase={phase} />
        </div>
      </div>

      <motion.div
        className="loading-mark"
        initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE_OUT, delay: 0.7 } }}
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
