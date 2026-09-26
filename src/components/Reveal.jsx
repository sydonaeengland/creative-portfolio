import { motion } from 'framer-motion';

// Scroll-triggered reveal — replaces the old IntersectionObserver + CSS
// class approach with Framer Motion's whileInView.
export default function Reveal({ children, as: Component = motion.div, delay = 0, className, style }) {
  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </Component>
  );
}
