import { motion } from 'framer-motion';

// Loading screen: a premium flat-illustration character at her desk —
// Black woman, curly hair, working — with her tools (camera, phone,
// design pen, ruler) appearing around her as she works. Plays on every
// full page load — see useLoader() in App.jsx.

const EASE_OUT = [0.16, 1, 0.3, 1];

const RING_VARIANTS = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1, ease: EASE_OUT, delay: 0.05 } },
};

/* ---- desk + character, flat illustration style ---- */
function Character({ phase }) {
  const settled = phase !== 'in-early';
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* desk surface */}
      <rect x="20" y="230" width="280" height="14" rx="3" fill="#3A1A8C" />
      <rect x="34" y="244" width="14" height="40" fill="#2c1370" />
      <rect x="272" y="244" width="14" height="40" fill="#2c1370" />

      {/* laptop on desk */}
      <g>
        <rect x="118" y="196" width="84" height="52" rx="4" fill="#1a1a1f" />
        <rect x="123" y="200" width="74" height="42" rx="2" fill="#9B6AF5" />
        <rect x="108" y="248" width="104" height="7" rx="2" fill="#2c1370" />
      </g>

      {/* chair back */}
      <rect x="126" y="120" width="68" height="90" rx="16" fill="#2c1370" opacity="0.5" />

      {/* --- character --- */}
      {/* body / top */}
      <path d="M118 236c0-30 19-50 42-50s42 20 42 50v6h-84v-6z" fill="#6B21E8" />
      <path d="M118 236c0-30 19-50 42-50s42 20 42 50" stroke="#4A0FB8" strokeWidth="2" opacity="0.4" />

      {/* neck */}
      <rect x="150" y="150" width="20" height="18" rx="6" fill="#8C5A3B" />

      {/* head */}
      <circle cx="160" cy="128" r="30" fill="#8C5A3B" />

      {/* coily/curly hair — rounded cluster shapes for texture, premium flat style */}
      <g fill="#1B1116">
        <circle cx="132" cy="112" r="13" />
        <circle cx="140" cy="98" r="14" />
        <circle cx="156" cy="90" r="15" />
        <circle cx="174" cy="92" r="14" />
        <circle cx="188" cy="104" r="13" />
        <circle cx="192" cy="120" r="12" />
        <circle cx="130" cy="128" r="11" />
        <circle cx="128" cy="144" r="9" />
        <circle cx="190" cy="140" r="9" />
        <path d="M132 112c-6 14-6 30 2 42l10-6c-6-10-7-24-2-34z" />
      </g>

      {/* face features — simple, confident */}
      <path d="M148 132c2 2 5 2 7 0" stroke="#1B1116" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M165 132c2 2 5 2 7 0" stroke="#1B1116" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M153 144c3 3 9 3 12 0" stroke="#1B1116" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M144 122c3-2 7-2 9 0" stroke="#1B1116" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M168 122c3-2 7-2 9 0" stroke="#1B1116" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

      {/* earrings — small confident detail */}
      <circle cx="131" cy="140" r="2.4" fill="#FFC857" />
      <circle cx="189" cy="140" r="2.4" fill="#FFC857" />

      {/* arms reaching toward the laptop */}
      <motion.path
        d="M124 200c6-10 16-16 26-18"
        stroke="#6B21E8"
        strokeWidth="14"
        strokeLinecap="round"
        animate={settled ? { rotate: [0, -2, 0] } : {}}
        style={{ transformOrigin: '124px 200px' }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M196 200c-6-10-16-16-26-18"
        stroke="#6B21E8"
        strokeWidth="14"
        strokeLinecap="round"
        animate={settled ? { rotate: [0, 2, 0] } : {}}
        style={{ transformOrigin: '196px 200px' }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />
      {/* hands */}
      <circle cx="146" cy="184" r="7" fill="#8C5A3B" />
      <circle cx="174" cy="184" r="7" fill="#8C5A3B" />
    </svg>
  );
}

/* ---- premium line-icon tools, orbiting near the desk (not emoji) ---- */
function CameraIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none">
      <rect x="4" y="13" width="32" height="21" rx="4" stroke="#fff" strokeWidth="1.8" />
      <path d="M13 13l2.2-4h9.6l2.2 4" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="20" cy="23.5" r="6.5" stroke="#fff" strokeWidth="1.8" />
      <circle cx="29" cy="17.5" r="1.1" fill="#fff" />
    </svg>
  );
}
function PenIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none">
      <path d="M8 32l3-9.5L27 6c1.8-1.8 4.6-1.8 6.4 0 1.8 1.8 1.8 4.6 0 6.4L17 28.5 8 32z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M23.5 9.5l7 7" stroke="#fff" strokeWidth="1.8" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 30 40" fill="none">
      <rect x="2" y="2" width="26" height="36" rx="6" stroke="#fff" strokeWidth="1.8" />
      <line x1="11" y1="8" x2="19" y2="8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="15" cy="33" r="1.6" fill="#fff" />
      <rect x="8" y="14" width="14" height="14" rx="2" stroke="#fff" strokeWidth="1.4" />
    </svg>
  );
}
function ClapperIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 40 34" fill="none">
      <rect x="3" y="12" width="34" height="20" rx="3" stroke="#fff" strokeWidth="1.8" />
      <path d="M3 12l4-8h6l-4 8M15 12l4-8h6l-4 8M27 12l4-8h4l-4 8" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function FloatingIcon({ children, x, y, size, delay, phase, driftDuration = 3.2 }) {
  const converge = phase === 'converge' || phase === 'out';
  return (
    <motion.div
      className="loading-float"
      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, width: size, height: size }}
      initial={{ opacity: 0, scale: 0.4, y: 16 }}
      animate={
        converge
          ? { opacity: 0, scale: 0.4, transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] } }
          : { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 220, damping: 15, delay } }
      }
    >
      <motion.div
        animate={converge ? {} : { y: [0, -8, 0], rotate: [0, 4, 0, -4, 0] }}
        transition={{ duration: driftDuration, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.4 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const TOOLS = [
  { Icon: CameraIcon, x: -128, y: -58, size: 40, delay: 0.35 },
  { Icon: PenIcon, x: 122, y: -66, size: 40, delay: 0.5 },
  { Icon: PhoneIcon, x: 132, y: 20, size: 30, delay: 0.65 },
  { Icon: ClapperIcon, x: -132, y: 30, size: 40, delay: 0.8 },
];

export default function LoadingScreen({ phase }) {
  // phase: 'in' (character + tools settle, gentle motion) | 'converge' (shrink away) | 'out' (wipe away)
  return (
    <motion.div
      className="loading-screen purple-field"
      initial={{ opacity: 1 }}
      animate={phase === 'out' ? { opacity: 0, transition: { duration: 0.6, ease: EASE_OUT } } : { opacity: 1 }}
    >
      <motion.div className="loading-backdrop-ring" variants={RING_VARIANTS} initial="hidden" animate="visible" />

      <div className="loading-desk-scene">
        <motion.div
          className="loading-desk-character"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={
            phase === 'converge' || phase === 'out'
              ? { opacity: 0, scale: 0.85, transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] } }
              : { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } }
          }
        >
          <Character phase={phase} />
        </motion.div>

        <div className="loading-float-field">
          {TOOLS.map(({ Icon, x, y, size, delay }, i) => (
            <FloatingIcon key={i} x={x} y={y} size={size} delay={delay} phase={phase}>
              <Icon />
            </FloatingIcon>
          ))}
        </div>
      </div>

      <motion.div
        className="loading-mark"
        initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE_OUT, delay: 0.55 } }}
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
