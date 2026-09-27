import { useEffect, useRef, useState } from 'react';

// Plain CSS opacity transition, no Framer Motion — driven by mount timing
// instead of AnimatePresence. Framer Motion's enter/exit here made buttons
// and the image pop in at full opacity on the very first frame while only
// the wrapper's opacity ticked up, which reads as a blink at both open and
// close. Toggling a single `.is-open` class after mount (and delaying
// unmount until the fade-out finishes) gives one smooth, atomic cross-fade
// instead — everything appears/disappears together, nothing pops.
const FADE_MS = 300;

export default function Lightbox({ open, onClose, children }) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    if (open) {
      clearTimeout(closeTimer.current);
      setMounted(true);
      // Next frame, so the browser paints the 0-opacity state first —
      // otherwise it can coalesce straight to opacity:1 with no transition.
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      closeTimer.current = setTimeout(() => setMounted(false), FADE_MS);
    }
    return () => clearTimeout(closeTimer.current);
  }, [open]);

  if (!mounted) return null;

  return (
    <div className={`lightbox${visible ? ' is-open' : ''}`} onClick={onClose}>
      <div className="lightbox-backdrop" aria-hidden="true" />
      {children}
    </div>
  );
}
