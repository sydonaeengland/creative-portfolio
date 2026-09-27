import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Loading screen — calm but alive: letters settle in one by one, a rule
// draws itself, and the disciplines cycle underneath instead of sitting
// static. Still no rapid clip-path wipes or scaling/strobe-risk motion —
// everything here is a gentle translate/opacity, and prefers-reduced-motion
// (global.css) removes it entirely.
const EASE = [0.16, 1, 0.3, 1];

const WORDS = ['SYDONAE', 'ENGLAND'];
const DISCIPLINES = ['DESIGN', 'PHOTOGRAPHY', 'VIDEO', 'SOCIAL MEDIA'];

function AnimatedWord({ word, delayStart }) {
  return (
    <span className="loading-mark-line display" aria-label={word}>
      {word.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="loading-letter"
          initial={{ opacity: 0, y: '0.6em' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            ease: EASE,
            delay: delayStart + i * 0.035,
          }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function LoadingScreen({ phase }) {
  // phase: 'in' (wordmark fades in) | 'converge' (hold) | 'out' (fades away)
  const leaving = phase === 'out';
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % DISCIPLINES.length);
    }, 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="loading-screen purple-field"
      initial={{ opacity: 0 }}
      animate={leaving ? { opacity: 0 } : { opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="loading-orb" aria-hidden="true" />

      <div className="loading-mark">
        <AnimatedWord word={WORDS[0]} delayStart={0.1} />
        <AnimatedWord word={WORDS[1]} delayStart={0.35} />

        <motion.div
          className="loading-mark-rule"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
        />

        <div className="loading-mark-tagline">
          <span className="loading-mark-tagline-prefix">What I do —</span>
          <span className="loading-mark-tagline-cycle">
            <AnimatePresence mode="wait">
              <motion.span
                key={DISCIPLINES[wordIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {DISCIPLINES[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
