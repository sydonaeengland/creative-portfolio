import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

// Parses "250+" into { number: 250, suffix: '+' } so we can animate the
// numeric part and keep the trailing symbol static.
function parseValue(value) {
  const match = String(value).match(/^(\d+)(.*)$/);
  if (!match) return { number: 0, suffix: String(value) };
  return { number: parseInt(match[1], 10), suffix: match[2] };
}

export default function CountUp({ value, duration = 1.4, className }) {
  const { number, suffix } = parseValue(value);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? number : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * number));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, number, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  );
}
