import { motion } from 'framer-motion';

// Loading screen: colorful tool objects (camera + lens, phone, ruler, a
// Canva-style icon) float and drift into place around the wordmark, each
// with its own gentle orbit/rotation, before the whole scene dissolves.
// Plays on every full page load — see useLoader() in App.jsx.

const EASE_OUT = [0.16, 1, 0.3, 1];

const RING_VARIANTS = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1, ease: EASE_OUT, delay: 0.05 } },
};

// Each floating object: entrance spring + a continuous small drift/rotate
// loop, converging (shrinking away) when the scene wraps up.
function FloatingObject({ children, x, y, size, delay, driftRange = 10, rotateRange = 6, duration = 3.2, phase }) {
  const converge = phase === 'converge' || phase === 'out';
  return (
    <motion.div
      className="loading-float"
      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, width: size, height: size }}
      initial={{ opacity: 0, scale: 0.3, x: 0, y: 30, rotate: -20 }}
      animate={
        converge
          ? { opacity: 0, scale: 0.3, transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] } }
          : {
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: { type: 'spring', stiffness: 220, damping: 14, delay },
            }
      }
    >
      <motion.div
        animate={
          converge
            ? {}
            : {
                y: [0, -driftRange, 0, driftRange * 0.6, 0],
                rotate: [0, rotateRange, 0, -rotateRange, 0],
              }
        }
        transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ---- colorful object illustrations ---- */
function CameraObj() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="20" width="52" height="34" rx="6" fill="#1a1a1f" />
      <path d="M20 20l3.5-6h17l3.5 6" fill="#1a1a1f" />
      <circle cx="32" cy="37" r="12" fill="#fff" />
      <circle cx="32" cy="37" r="9.5" fill="#6B21E8" />
      <circle cx="32" cy="37" r="4" fill="#1a1a1f" />
      <circle cx="47" cy="27" r="2" fill="#FFC857" />
      <rect x="6" y="20" width="10" height="6" rx="2" fill="#FFC857" />
    </svg>
  );
}
function LensObj() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="26" fill="#1a1a1f" />
      <circle cx="32" cy="32" r="20" fill="#2c2c34" />
      <circle cx="32" cy="32" r="13" fill="#9B6AF5" />
      <circle cx="32" cy="32" r="6" fill="#1a1a1f" />
      <circle cx="26" cy="26" r="3" fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}
function PhoneObj() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 48 64" fill="none">
      <rect x="2" y="2" width="44" height="60" rx="9" fill="#1a1a1f" />
      <rect x="6" y="8" width="36" height="48" rx="3" fill="#fff" />
      <rect x="10" y="14" width="28" height="16" rx="2" fill="#6B21E8" />
      <circle cx="16" cy="40" r="3" fill="#FF6B6B" />
      <circle cx="24" cy="40" r="3" fill="#FFC857" />
      <circle cx="32" cy="40" r="3" fill="#4ECDC4" />
      <rect x="10" y="47" width="28" height="3" rx="1.5" fill="#e6e0f5" />
    </svg>
  );
}
function RulerObj() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 72 32" fill="none">
      <rect x="2" y="4" width="68" height="24" rx="3" fill="#FFC857" />
      {[10, 18, 26, 34, 42, 50, 58, 66].map((x, i) => (
        <line key={x} x1={x} y1="4" x2={x} y2={i % 2 === 0 ? 14 : 10} stroke="#1a1a1f" strokeWidth="1.4" />
      ))}
      <rect x="2" y="4" width="68" height="24" rx="3" stroke="#1a1a1f" strokeWidth="1.6" />
    </svg>
  );
}
function CanvaObj() {
  // A Canva-style "C" swirl mark, in original colors — not the trademarked logo.
  return (
    <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" fill="#00C4CC" />
      <path
        d="M44 22c-3.5-3.6-8-5.6-13-5.6-10 0-17.6 8-17.6 18s7.6 17.6 17.4 17.6c5 0 9.3-1.8 12.8-5.1l-4.4-4.7c-2.2 2-4.9 3.1-8 3.1-6.3 0-11.2-5-11.2-11 0-6.1 4.8-11 11-11 3.3 0 6.1 1.3 8.2 3.4L44 22z"
        fill="#fff"
      />
    </svg>
  );
}
function PenObj() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none">
      <path d="M8 40l4-13 21-21a4.2 4.2 0 0 1 6 6L18 33l-13 4z" fill="#4ECDC4" />
      <path d="M27 10l6 6" stroke="#1a1a1f" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M8 40l4-13 9 9-13 4z" fill="#FF6B6B" />
    </svg>
  );
}

const OBJECTS = [
  { Obj: CameraObj, x: -120, y: -50, size: 62, delay: 0.05, duration: 3.1 },
  { Obj: LensObj, x: 110, y: -70, size: 46, delay: 0.16, duration: 3.6 },
  { Obj: PhoneObj, x: 128, y: 40, size: 40, delay: 0.28, duration: 2.9 },
  { Obj: RulerObj, x: -128, y: 55, size: 60, delay: 0.4, duration: 3.4 },
  { Obj: CanvaObj, x: -50, y: -110, size: 40, delay: 0.5, duration: 3.0 },
  { Obj: PenObj, x: 55, y: 108, size: 44, delay: 0.62, duration: 3.3 },
];

export default function LoadingScreen({ phase }) {
  // phase: 'in' (objects float in + drift) | 'converge' (shrink away) | 'out' (wipe away)
  return (
    <motion.div
      className="loading-screen purple-field"
      initial={{ opacity: 1 }}
      animate={phase === 'out' ? { opacity: 0, transition: { duration: 0.6, ease: EASE_OUT } } : { opacity: 1 }}
    >
      <motion.div className="loading-backdrop-ring" variants={RING_VARIANTS} initial="hidden" animate="visible" />

      <div className="loading-float-field">
        {OBJECTS.map(({ Obj, x, y, size, delay, duration }, i) => (
          <FloatingObject key={i} x={x} y={y} size={size} delay={delay} duration={duration} phase={phase}>
            <Obj />
          </FloatingObject>
        ))}
      </div>

      <motion.div
        className="loading-mark"
        initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
        animate={
          phase !== 'in'
            ? { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE_OUT, delay: 0.1 } }
            : { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE_OUT, delay: 0.5 } }
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
