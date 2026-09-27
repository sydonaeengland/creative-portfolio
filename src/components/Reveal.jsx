import { motion } from 'framer-motion';

// Scroll-triggered reveal — replaces the old IntersectionObserver + CSS
// class approach with Framer Motion's whileInView.
//
// `as` is passed as a plain tag-name string (e.g. "p", "h2") by callers
// throughout the site, but Framer Motion's animation props only work on
// its own `motion.*` components, not raw DOM tags — passing `whileInView`
// etc. straight to a plain <p> just dumps them as invalid DOM attributes
// and the element never actually animates. Map the requested tag to its
// `motion` equivalent here so every call site keeps working as intended.
const MOTION_TAGS = {
  div: motion.div,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
  section: motion.section,
  article: motion.article,
};

export default function Reveal({ children, as = 'div', delay = 0, className, style, variant = 'up' }) {
  const Component = typeof as === 'string' ? (MOTION_TAGS[as] || motion.div) : as;
  const initial = variant === 'scale'
    ? { opacity: 0, y: 20, scale: 0.92 }
    : { opacity: 0, y: 28 };
  const animate = variant === 'scale'
    ? { opacity: 1, y: 0, scale: 1 }
    : { opacity: 1, y: 0 };
  return (
    <Component
      className={className}
      style={style}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.14, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </Component>
  );
}
